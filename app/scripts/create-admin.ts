/**
 * Creates (or promotes) a Platform Admin account. There is no public sign-up,
 * so this is how the first account is made; further accounts are created in
 * /admin/users.
 *
 *   pnpm admin:create "Full Name" email@afronovation.com "a-strong-password"
 */
import "./load-env";

import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { user } from "@/db/schema";
import { getAuth } from "@/lib/auth";

async function main() {
  const [name, email, password] = process.argv.slice(2);
  if (!name || !email || !password) {
    console.error('Usage: pnpm admin:create "Full Name" email@example.com "password (12+ characters)"');
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("The password needs at least 12 characters.");
    process.exit(1);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const context = await getAuth().$context;
  const hash = await context.password.hash(password);
  const existing = await context.internalAdapter.findUserByEmail(normalizedEmail);

  if (existing?.user) {
    await getDb()
      .update(user)
      .set({ role: "platform_admin", active: true, name, updatedAt: new Date() })
      .where(eq(user.id, existing.user.id));
    await context.internalAdapter.updatePassword(existing.user.id, hash);
    console.log(`Updated ${normalizedEmail}: Platform Admin, password reset.`);
  } else {
    const created = await context.internalAdapter.createUser({
      name,
      email: normalizedEmail,
      emailVerified: true,
      role: "platform_admin",
      active: true,
    });
    await context.internalAdapter.linkAccount({
      userId: created.id,
      providerId: "credential",
      accountId: created.id,
      password: hash,
    });
    console.log(`Created Platform Admin ${normalizedEmail}. Sign in at /admin/login.`);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
