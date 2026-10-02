import "server-only";

import { and, asc, count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getDb } from "@/db";
import { auditLog, contentChanges, contentEntries } from "@/db/schema";
import type { AdminUser } from "@/lib/admin/session";

import { getCollectionDefinition, type AnyCollection } from "./collections";
import { parseFields } from "./fields";

export type ChangeAction = "create" | "update" | "delete";

export type EntryRow = {
  id: string;
  data: Record<string, unknown>;
  sortOrder: number;
  updatedAt: Date;
};

export type WriteResult =
  | { ok: true; message: string; entryId?: string }
  | { ok: false; message: string; errors?: Record<string, string> };

function requireDefinition(key: string): AnyCollection {
  const definition = getCollectionDefinition(key);
  if (!definition) throw new Error(`Unknown collection: ${key}`);
  return definition;
}

export async function audit(actor: Pick<AdminUser, "id" | "name">, action: string, target: string, summary: string) {
  await getDb().insert(auditLog).values({ userId: actor.id, userName: actor.name, action, target, summary });
}

/** Imports the built-in content the first time a section is opened or saved. */
export async function ensureSeeded(key: string) {
  const definition = requireDefinition(key);
  const db = getDb();
  const [{ total }] = await db
    .select({ total: count() })
    .from(contentEntries)
    .where(eq(contentEntries.collection, key));
  if (total > 0) return;

  const defaults = definition.defaults();
  if (defaults.length === 0) return;
  await db.insert(contentEntries).values(
    defaults.map((item, index) => {
      // Row id and position are stored in their own columns.
      const data = { ...(item as Record<string, unknown>) };
      delete data.id;
      delete data.sortOrder;
      return { collection: key, data, sortOrder: index + 1, updatedBy: "seed" };
    }),
  );
}

export async function listEntries(key: string): Promise<EntryRow[]> {
  await ensureSeeded(key);
  const rows = await getDb()
    .select()
    .from(contentEntries)
    .where(eq(contentEntries.collection, key))
    .orderBy(asc(contentEntries.sortOrder), asc(contentEntries.createdAt));
  return rows.map((row) => ({
    id: row.id,
    data: row.data as Record<string, unknown>,
    sortOrder: row.sortOrder,
    updatedAt: row.updatedAt,
  }));
}

export async function getEntry(key: string, id: string): Promise<EntryRow | null> {
  const [row] = await getDb()
    .select()
    .from(contentEntries)
    .where(and(eq(contentEntries.collection, key), eq(contentEntries.id, id)));
  return row
    ? { id: row.id, data: row.data as Record<string, unknown>, sortOrder: row.sortOrder, updatedAt: row.updatedAt }
    : null;
}

/** Merge onto the stored item so fields the form does not show are kept. */
function mergeData(existing: Record<string, unknown> | undefined, incoming: Record<string, unknown>) {
  const result: Record<string, unknown> = { ...(existing ?? {}) };
  for (const [key, value] of Object.entries(incoming)) {
    const current = result[key];
    result[key] =
      value && typeof value === "object" && !Array.isArray(value) && current && typeof current === "object" && !Array.isArray(current)
        ? mergeData(current as Record<string, unknown>, value as Record<string, unknown>)
        : value;
  }
  return result;
}

async function checkActiveLimit(definition: AnyCollection, entryId: string | null, data: Record<string, unknown>) {
  if (!definition.maxActive || data.active !== true) return null;
  const entries = await listEntries(definition.key);
  const othersActive = entries.filter((entry) => entry.id !== entryId && entry.data.active === true).length;
  return othersActive >= definition.maxActive
    ? `Only ${definition.maxActive} items can be shown at once. Switch another one off first.`
    : null;
}

function publish() {
  revalidatePath("/", "layout");
}

/** Validates and immediately publishes a change (Platform Admin path). */
export async function applyChange(
  actor: AdminUser,
  key: string,
  action: ChangeAction,
  entryId: string | null,
  raw: Record<string, unknown> | null,
): Promise<WriteResult> {
  const definition = requireDefinition(key);
  const db = getDb();
  await ensureSeeded(key);

  if (action === "delete") {
    if (definition.singleton) return { ok: false, message: "This section cannot be deleted." };
    if (!entryId) return { ok: false, message: "Missing item." };
    const existing = await getEntry(key, entryId);
    if (!existing) return { ok: false, message: "This item no longer exists." };
    await db.delete(contentEntries).where(eq(contentEntries.id, entryId));
    await audit(actor, "delete", definition.label, `Deleted "${definition.itemLabel(existing.data)}"`);
    publish();
    return { ok: true, message: "Deleted and published." };
  }

  const parsed = parseFields(definition.fields, raw ?? {});
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: parsed.errors };

  if (action === "update") {
    if (!entryId) return { ok: false, message: "Missing item." };
    const existing = await getEntry(key, entryId);
    if (!existing) return { ok: false, message: "This item no longer exists." };
    const data = mergeData(existing.data, parsed.data);
    const limit = await checkActiveLimit(definition, entryId, data);
    if (limit) return { ok: false, message: limit };
    await db
      .update(contentEntries)
      .set({ data, updatedBy: actor.id, updatedAt: new Date() })
      .where(eq(contentEntries.id, entryId));
    await audit(actor, "update", definition.label, `Updated "${definition.itemLabel(data)}"`);
    publish();
    return { ok: true, message: "Saved and published.", entryId };
  }

  if (definition.singleton) return { ok: false, message: "This section has a single entry; edit it instead." };
  const limit = await checkActiveLimit(definition, null, parsed.data);
  if (limit) return { ok: false, message: limit };
  const [last] = await db
    .select({ sortOrder: contentEntries.sortOrder })
    .from(contentEntries)
    .where(eq(contentEntries.collection, key))
    .orderBy(desc(contentEntries.sortOrder))
    .limit(1);
  const [created] = await db
    .insert(contentEntries)
    .values({ collection: key, data: parsed.data, sortOrder: (last?.sortOrder ?? 0) + 1, updatedBy: actor.id })
    .returning({ id: contentEntries.id });
  await audit(actor, "create", definition.label, `Added "${definition.itemLabel(parsed.data)}"`);
  publish();
  return { ok: true, message: "Added and published.", entryId: created.id };
}

/** Records an editor's change for Platform Admin approval. */
export async function submitChange(
  actor: AdminUser,
  key: string,
  action: ChangeAction,
  entryId: string | null,
  raw: Record<string, unknown> | null,
): Promise<WriteResult> {
  const definition = requireDefinition(key);
  let data: Record<string, unknown> | null = null;

  if (action !== "delete") {
    const parsed = parseFields(definition.fields, raw ?? {});
    if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: parsed.errors };
    data = parsed.data;
  } else if (definition.singleton) {
    return { ok: false, message: "This section cannot be deleted." };
  }

  await getDb().insert(contentChanges).values({
    collection: key,
    entryId,
    action,
    data,
    submittedBy: actor.id,
    submittedByName: actor.name,
  });
  const label = data ? definition.itemLabel(data) : "an item";
  await audit(actor, `submit-${action}`, definition.label, `Submitted for approval: ${action} "${label}"`);
  return { ok: true, message: "Sent to the Platform Admin for approval." };
}

export async function reviewChange(
  admin: AdminUser,
  changeId: string,
  decision: "approve" | "reject",
  note: string | null,
): Promise<WriteResult> {
  const db = getDb();
  const [change] = await db.select().from(contentChanges).where(eq(contentChanges.id, changeId));
  if (!change || change.status !== "pending") return { ok: false, message: "This change has already been handled." };

  if (decision === "approve") {
    const result = await applyChange(
      admin,
      change.collection,
      change.action as ChangeAction,
      change.entryId,
      change.data as Record<string, unknown> | null,
    );
    if (!result.ok) return result;
  }

  await db
    .update(contentChanges)
    .set({ status: decision === "approve" ? "approved" : "rejected", reviewedBy: admin.id, reviewNote: note, reviewedAt: new Date() })
    .where(eq(contentChanges.id, changeId));
  if (decision === "reject") {
    const definition = getCollectionDefinition(change.collection);
    await audit(admin, "reject", definition?.label ?? change.collection, `Rejected a change from ${change.submittedByName}${note ? `: ${note}` : ""}`);
  }
  return { ok: true, message: decision === "approve" ? "Approved and published." : "Change rejected." };
}

/** Moves an item one place up or down (Platform Admin only). */
export async function moveEntry(actor: AdminUser, key: string, entryId: string, direction: "up" | "down"): Promise<WriteResult> {
  const definition = requireDefinition(key);
  const entries = await listEntries(key);
  const index = entries.findIndex((entry) => entry.id === entryId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= entries.length) return { ok: false, message: "Cannot move further." };

  const db = getDb();
  const reordered = [...entries];
  [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];
  for (const [position, entry] of reordered.entries()) {
    if (entry.sortOrder !== position + 1) {
      await db.update(contentEntries).set({ sortOrder: position + 1 }).where(eq(contentEntries.id, entry.id));
    }
  }
  await audit(actor, "reorder", definition.label, `Moved "${definition.itemLabel(entries[index].data)}" ${direction}`);
  publish();
  return { ok: true, message: "Order updated." };
}

export async function listPendingChanges() {
  return getDb()
    .select()
    .from(contentChanges)
    .where(eq(contentChanges.status, "pending"))
    .orderBy(asc(contentChanges.createdAt));
}
