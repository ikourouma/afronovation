import type { Metadata } from "next";
import { count, eq } from "drizzle-orm";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getDb } from "@/db";
import { contentChanges } from "@/db/schema";
import { isPlatformAdmin, requireAdminUser } from "@/lib/admin/session";
import { adminRoleLabels } from "@/lib/auth";
import { collections } from "@/lib/cms/collections";

export const metadata: Metadata = {
  title: { template: "%s | Afronovation admin", default: "Afronovation admin" },
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const adminUser = await requireAdminUser();
  const admin = isPlatformAdmin(adminUser);
  const [{ pending }] = await getDb()
    .select({ pending: count() })
    .from(contentChanges)
    .where(eq(contentChanges.status, "pending"));

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar
        user={{ name: adminUser.name, roleLabel: adminRoleLabels[adminUser.role] }}
        isAdmin={admin}
        pendingApprovals={pending}
        sections={collections.map((collection) => ({
          key: collection.key,
          label: collection.label,
          group: collection.group,
        }))}
      />
      <main className="min-w-0 flex-1 px-4 pt-22 pb-10 sm:px-8 lg:pt-10">{children}</main>
    </div>
  );
}
