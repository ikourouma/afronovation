"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { and, count, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getDb } from "@/db";
import { contactSubmissions, newsletterSubscribers, user } from "@/db/schema";
import { getAdminUser, type AdminUser } from "@/lib/admin/session";
import { getAuth, type AdminRole } from "@/lib/auth";
import {
  applyChange,
  audit,
  moveEntry,
  reviewChange,
  submitChange,
  type ChangeAction,
  type WriteResult,
} from "@/lib/cms/write";
import { getR2 } from "@/lib/r2";

async function currentUser(): Promise<AdminUser> {
  const adminUser = await getAdminUser();
  if (!adminUser) throw new Error("Not signed in.");
  return adminUser;
}

async function currentPlatformAdmin(): Promise<AdminUser> {
  const adminUser = await currentUser();
  if (adminUser.role !== "platform_admin") throw new Error("Only the Platform Admin can do this.");
  return adminUser;
}

/* ---------------------------------- Content ---------------------------------- */

export async function saveEntryAction(
  collection: string,
  entryId: string | null,
  data: Record<string, unknown>,
): Promise<WriteResult> {
  const actor = await currentUser();
  const action: ChangeAction = entryId ? "update" : "create";
  const result =
    actor.role === "platform_admin"
      ? await applyChange(actor, collection, action, entryId, data)
      : await submitChange(actor, collection, action, entryId, data);
  // Refresh admin views (lists, approval counts) after every save.
  revalidatePath("/admin", "layout");
  return result;
}

export async function deleteEntryAction(collection: string, entryId: string): Promise<WriteResult> {
  const actor = await currentUser();
  const result =
    actor.role === "platform_admin"
      ? await applyChange(actor, collection, "delete", entryId, null)
      : await submitChange(actor, collection, "delete", entryId, null);
  revalidatePath("/admin", "layout");
  return result;
}

export async function moveEntryAction(collection: string, entryId: string, direction: "up" | "down") {
  const actor = await currentPlatformAdmin();
  const result = await moveEntry(actor, collection, entryId, direction);
  revalidatePath(`/admin/content/${collection}`);
  return result;
}

export async function reviewChangeAction(
  changeId: string,
  decision: "approve" | "reject",
  note: string,
): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  const result = await reviewChange(actor, changeId, decision, note.trim() || null);
  revalidatePath("/admin", "layout");
  return result;
}

/* ----------------------------------- Leads ----------------------------------- */

const leadStatuses = ["new", "contacted", "qualified", "closed"] as const;

export async function updateLeadStatusAction(leadId: string, status: string): Promise<WriteResult> {
  const actor = await currentUser();
  if (!leadStatuses.includes(status as (typeof leadStatuses)[number])) {
    return { ok: false, message: "Unknown status." };
  }
  await getDb().update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, leadId));
  await audit(actor, "lead-status", "Leads", `Marked a lead as ${status}`);
  revalidatePath("/admin/leads");
  return { ok: true, message: "Status updated." };
}

/** Deletes a lead permanently, e.g. for a data-deletion request. */
export async function deleteLeadAction(leadId: string): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  const [removed] = await getDb()
    .delete(contactSubmissions)
    .where(eq(contactSubmissions.id, leadId))
    .returning({ email: contactSubmissions.email });
  if (!removed) return { ok: false, message: "This lead no longer exists." };
  await audit(actor, "lead-delete", "Leads", `Deleted the lead for ${removed.email}`);
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Lead deleted." };
}

/** Removes a subscriber (unsubscribe or data-deletion request). */
export async function removeSubscriberAction(subscriberId: string): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  const [removed] = await getDb()
    .delete(newsletterSubscribers)
    .where(eq(newsletterSubscribers.id, subscriberId))
    .returning({ email: newsletterSubscribers.email });
  if (!removed) return { ok: false, message: "This subscriber no longer exists." };
  await audit(actor, "subscriber-remove", "Subscribers", `Removed ${removed.email} from the newsletter list`);
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Subscriber removed." };
}

/* ----------------------------------- Users ----------------------------------- */

function isRole(value: string): value is AdminRole {
  return value === "platform_admin" || value === "editor";
}

async function otherActiveAdmins(excludingId: string) {
  const [{ total }] = await getDb()
    .select({ total: count() })
    .from(user)
    .where(and(eq(user.role, "platform_admin"), eq(user.active, true), ne(user.id, excludingId)));
  return total;
}

export async function createUserAction(input: {
  name: string;
  email: string;
  role: string;
  password: string;
}): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  if (name.length < 2) return { ok: false, message: "Enter the person's name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter a valid email address." };
  if (!isRole(input.role)) return { ok: false, message: "Choose a role." };
  if (input.password.length < 12) return { ok: false, message: "The temporary password needs at least 12 characters." };

  const context = await getAuth().$context;
  if (await context.internalAdapter.findUserByEmail(email)) {
    return { ok: false, message: "A user with this email already exists." };
  }
  const hash = await context.password.hash(input.password);
  const created = await context.internalAdapter.createUser({
    name,
    email,
    emailVerified: true,
    role: input.role,
    active: true,
  });
  await context.internalAdapter.linkAccount({
    userId: created.id,
    providerId: "credential",
    accountId: created.id,
    password: hash,
  });
  await audit(actor, "user-create", "Users", `Created ${input.role === "platform_admin" ? "Platform Admin" : "Editor"} account for ${email}`);
  revalidatePath("/admin/users");
  return { ok: true, message: `Account created. Share the temporary password with ${name} securely.` };
}

export async function setUserRoleAction(userId: string, role: string): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  if (!isRole(role)) return { ok: false, message: "Unknown role." };
  if (role === "editor" && (await otherActiveAdmins(userId)) === 0) {
    return { ok: false, message: "There must always be at least one active Platform Admin." };
  }
  await getDb().update(user).set({ role, updatedAt: new Date() }).where(eq(user.id, userId));
  await audit(actor, "user-role", "Users", `Changed a user's role to ${role}`);
  revalidatePath("/admin/users");
  return { ok: true, message: "Role updated." };
}

export async function setUserActiveAction(userId: string, active: boolean): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  if (!active && userId === actor.id) return { ok: false, message: "You cannot deactivate your own account." };
  if (!active && (await otherActiveAdmins(userId)) === 0) {
    return { ok: false, message: "There must always be at least one active Platform Admin." };
  }
  const db = getDb();
  await db.update(user).set({ active, updatedAt: new Date() }).where(eq(user.id, userId));
  if (!active) {
    // Sign the person out everywhere straight away.
    const context = await getAuth().$context;
    await context.internalAdapter.deleteUserSessions(userId);
  }
  await audit(actor, active ? "user-activate" : "user-deactivate", "Users", `${active ? "Reactivated" : "Deactivated"} a user account`);
  revalidatePath("/admin/users");
  return { ok: true, message: active ? "Account reactivated." : "Account deactivated and signed out." };
}

export async function resetPasswordAction(userId: string, password: string): Promise<WriteResult> {
  const actor = await currentPlatformAdmin();
  if (password.length < 12) return { ok: false, message: "The temporary password needs at least 12 characters." };
  const context = await getAuth().$context;
  await context.internalAdapter.updatePassword(userId, await context.password.hash(password));
  await context.internalAdapter.deleteUserSessions(userId);
  await audit(actor, "user-password", "Users", "Reset a user's password");
  return { ok: true, message: "Password reset. Share it securely; the person has been signed out." };
}

/* ----------------------------------- Media ----------------------------------- */

const allowedImageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "application/pdf": "pdf",
};

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export async function uploadMediaAction(formData: FormData): Promise<{ ok: true; key: string } | { ok: false; message: string }> {
  const actor = await currentUser();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Choose a file to upload." };
  const extension = allowedImageTypes[file.type];
  // SVG is excluded on purpose: it can carry scripts.
  if (!extension) return { ok: false, message: "Use a JPG, PNG, WebP, AVIF or PDF file." };
  if (file.size > MAX_UPLOAD_BYTES) return { ok: false, message: "Files must be 8 MB or smaller." };

  const now = new Date();
  const key = `uploads/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${extension}`;
  const body = Buffer.from(await file.arrayBuffer());

  if (process.env.R2_PUBLIC_URL && process.env.R2_BUCKET_NAME) {
    await getR2().send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } else if (process.env.NODE_ENV !== "production") {
    // Local development without R2: keep uploads beside the staged media.
    const target = path.join(process.cwd(), "public", "media-staging", key);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body);
  } else {
    return { ok: false, message: "File storage is not configured (R2_PUBLIC_URL and R2_BUCKET_NAME)." };
  }

  await audit(actor, "upload", "Media", `Uploaded ${file.name}`);
  return { ok: true, key };
}
