import "server-only";

import { asc, desc, gt, inArray } from "drizzle-orm";

import { getDb } from "@/db";
import { auditLog, session, user } from "@/db/schema";

import { ONLINE_WINDOW_MS } from "./session";

export type Presence = "online" | "idle" | "offline";

export type TeamMemberPresence = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  presence: Presence;
  lastSignInAt: Date | null;
  lastSeenAt: Date | null;
};

/**
 * online  - signed in and used the admin in the last 5 minutes
 * idle    - still signed in, but not active recently
 * offline - signed out (or session expired)
 */
export async function getTeamPresence(): Promise<TeamMemberPresence[]> {
  const db = getDb();
  const now = new Date();
  const [users, liveSessions] = await Promise.all([
    db.select().from(user).orderBy(asc(user.name)),
    db.select({ userId: session.userId }).from(session).where(gt(session.expiresAt, now)),
  ]);
  const signedIn = new Set(liveSessions.map((row) => row.userId));

  return users.map((account) => {
    const recentlySeen =
      account.lastSeenAt !== null && now.getTime() - account.lastSeenAt.getTime() < ONLINE_WINDOW_MS;
    const presence: Presence = !signedIn.has(account.id) ? "offline" : recentlySeen ? "online" : "idle";
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      active: account.active,
      presence,
      lastSignInAt: account.lastSignInAt,
      lastSeenAt: account.lastSeenAt,
    };
  });
}

export async function getRecentSignInActivity(limit = 8) {
  return getDb()
    .select()
    .from(auditLog)
    .where(inArray(auditLog.action, ["sign-in", "sign-out"]))
    .orderBy(desc(auditLog.createdAt))
    .limit(limit);
}

export function formatRelative(date: Date | null): string {
  if (!date) return "Never";
  const minutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return date.toLocaleDateString("en-US", { dateStyle: "medium" });
}

