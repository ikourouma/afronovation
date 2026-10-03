import "server-only";

import { and, eq, isNull, lt, or } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { getDb, hasDatabase } from "@/db";
import { user as userTable } from "@/db/schema";
import { getAuth, type AdminRole } from "@/lib/auth";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

export async function getAdminUser(): Promise<AdminUser | null> {
  if (!hasDatabase()) return null;
  const result = await getAuth().api.getSession({ headers: await headers() });
  if (!result) return null;
  const { user } = result as { user: { id: string; name: string; email: string; role?: string; active?: boolean } };
  if (user.active === false) return null;
  await touchLastSeen(user.id);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "platform_admin" ? "platform_admin" : "editor",
  };
}

/** A person counts as online if they used the admin in the last few minutes. */
export const ONLINE_WINDOW_MS = 5 * 60 * 1000;
const LAST_SEEN_THROTTLE_MS = 60 * 1000;

async function touchLastSeen(userId: string) {
  const now = new Date();
  // At most one write per minute per person.
  await getDb()
    .update(userTable)
    .set({ lastSeenAt: now })
    .where(
      and(
        eq(userTable.id, userId),
        or(isNull(userTable.lastSeenAt), lt(userTable.lastSeenAt, new Date(now.getTime() - LAST_SEEN_THROTTLE_MS))),
      ),
    );
}

/**
 * Admin pages answer 404 to anyone signed out, so the dashboard's existence
 * is not advertised (knowledgebase Section 9).
 */
export async function requireAdminUser(): Promise<AdminUser> {
  const adminUser = await getAdminUser();
  if (!adminUser) notFound();
  return adminUser;
}

export async function requirePlatformAdmin(): Promise<AdminUser> {
  const adminUser = await requireAdminUser();
  if (adminUser.role !== "platform_admin") redirect("/admin");
  return adminUser;
}

export function isPlatformAdmin(adminUser: AdminUser): boolean {
  return adminUser.role === "platform_admin";
}
