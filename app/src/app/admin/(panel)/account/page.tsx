import { ChangePasswordForm } from "@/components/admin/change-password-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { requireAdminUser } from "@/lib/admin/session";
import { adminRoleLabels } from "@/lib/auth";

export const metadata = { title: "My account" };

export default async function AccountPage() {
  const me = await requireAdminUser();
  return (
    <>
      <AdminPageHeader title="My account" description={`${me.email} · ${adminRoleLabels[me.role]}`} />
      <ChangePasswordForm />
    </>
  );
}
