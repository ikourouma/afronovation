import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { account, auditLog, session, user, verification } from "@/db/schema";

export type AdminRole = "platform_admin" | "editor";

export const adminRoleLabels: Record<AdminRole, string> = {
  platform_admin: "Platform Admin",
  editor: "Editor",
};

function createAuth() {
  const db = getDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: { user, session, account, verification },
    }),
    emailAndPassword: {
      enabled: true,
      // Accounts are created by the Platform Admin only - no public sign-up.
      disableSignUp: true,
      minPasswordLength: 12,
    },
    user: {
      additionalFields: {
        role: { type: "string", defaultValue: "editor", input: false },
        active: { type: "boolean", defaultValue: true, input: false },
      },
    },
    session: {
      expiresIn: 60 * 60 * 8,
      updateAge: 60 * 60,
    },
    databaseHooks: {
      session: {
        create: {
          // Deactivated accounts cannot start a session.
          before: async (newSession) => {
            const [owner] = await db
              .select({ active: user.active })
              .from(user)
              .where(eq(user.id, newSession.userId));
            return owner?.active ? { data: newSession } : false;
          },
          // Every sign-in is recorded in the change log.
          after: async (newSession) => {
            const now = new Date();
            const [owner] = await db
              .update(user)
              .set({ lastSignInAt: now, lastSeenAt: now })
              .where(eq(user.id, newSession.userId))
              .returning({ name: user.name });
            await db.insert(auditLog).values({
              userId: newSession.userId,
              userName: owner?.name ?? "Unknown user",
              action: "sign-in",
              target: "Account",
              summary: "Signed in",
            });
          },
        },
        delete: {
          // Sign-outs (and sessions ended by a Platform Admin) are recorded too.
          after: async (endedSession) => {
            const [owner] = await db
              .update(user)
              .set({ lastSeenAt: null })
              .where(eq(user.id, endedSession.userId))
              .returning({ name: user.name });
            await db.insert(auditLog).values({
              userId: endedSession.userId,
              userName: owner?.name ?? "Unknown user",
              action: "sign-out",
              target: "Account",
              summary: "Signed out",
            });
          },
        },
      },
    },
    plugins: [nextCookies()],
  });
}

let instance: ReturnType<typeof createAuth> | null = null;

/** Lazily created so builds without a database still succeed. */
export function getAuth() {
  instance ??= createAuth();
  return instance;
}
