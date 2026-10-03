import { AdminPageHeader } from "@/components/admin/page-header";
import { PresenceBadge } from "@/components/admin/presence-badge";
import { CreateUserForm, UserRowActions } from "@/components/admin/user-management";
import { formatRelative, getTeamPresence } from "@/lib/admin/presence";
import { requirePlatformAdmin } from "@/lib/admin/session";
import { adminRoleLabels, type AdminRole } from "@/lib/auth";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  const me = await requirePlatformAdmin();
  const users = await getTeamPresence();

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Only people listed here can sign in. Platform Admins publish directly and approve editors' changes; Editors' changes need approval."
      />
      <ul className="divide-y rounded-md border bg-background">
        {users.map((account) => (
          <li key={account.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {account.name}
                {account.id === me.id ? <span className="font-normal text-muted-foreground"> (you)</span> : null}
              </p>
              <p className="text-sm text-muted-foreground">{account.email}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <PresenceBadge presence={account.presence} />
                <span>Last sign-in: {formatRelative(account.lastSignInAt)}</span>
              </p>
            </div>
            <span className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
              {adminRoleLabels[account.role as AdminRole] ?? account.role}
            </span>
            {account.active ? null : (
              <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">Deactivated</span>
            )}
            <UserRowActions
              userId={account.id}
              role={account.role}
              active={account.active}
              isSelf={account.id === me.id}
            />
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-heading text-xl font-bold">Add a team member</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Set a temporary password and share it securely. They can change it under &ldquo;My account&rdquo;.
      </p>
      <CreateUserForm />
    </>
  );
}
