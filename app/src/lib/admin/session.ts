import "server-only";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { hasDatabase } from "@/db";
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
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "platform_admin" ? "platform_admin" : "editor",
  };
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
