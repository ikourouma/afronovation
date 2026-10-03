import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { getDb } from "@/db";
import { contactSubmissions, contentChanges, newsletterSubscribers } from "@/db/schema";
import { PresenceBadge } from "@/components/admin/presence-badge";
import { formatRelative, getRecentSignInActivity, getTeamPresence } from "@/lib/admin/presence";
import { isPlatformAdmin, requireAdminUser } from "@/lib/admin/session";
import { adminRoleLabels, type AdminRole } from "@/lib/auth";
import { collections } from "@/lib/cms/collections";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const adminUser = await requireAdminUser();
  const db = getDb();
  const [[newLeads], [subscribers], [pending]] = await Promise.all([
    db.select({ total: count() }).from(contactSubmissions).where(eq(contactSubmissions.status, "new")),
    db.select({ total: count() }).from(newsletterSubscribers).where(eq(newsletterSubscribers.status, "confirmed")),
    db.select({ total: count() }).from(contentChanges).where(eq(contentChanges.status, "pending")),
  ]);

  const cards = [
    { label: "New leads", value: newLeads.total, href: "/admin/leads" },
    { label: "Confirmed subscribers", value: subscribers.total, href: "/admin/subscribers" },
    {
      label: isPlatformAdmin(adminUser) ? "Changes awaiting your approval" : "Changes awaiting approval",
      value: pending.total,
      href: isPlatformAdmin(adminUser) ? "/admin/approvals" : null,
    },
  ];
  const groups = [...new Set(collections.map((collection) => collection.group))];
  const admin = isPlatformAdmin(adminUser);
  const [team, signIns] = admin
    ? await Promise.all([getTeamPresence(), getRecentSignInActivity()])
    : [[], []];
  const activeTeam = team.filter((member) => member.active);
  const onlineCount = activeTeam.filter((member) => member.presence === "online").length;

  return (
    <>
      <AdminPageHeader
        title={`Welcome, ${adminUser.name.split(" ")[0]}`}
        description={
          isPlatformAdmin(adminUser)
            ? "Your changes publish immediately. Editors' changes wait for your approval."
            : "Your changes are sent to the Platform Admin for approval before they go live."
        }
      />

      <dl className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-md border border-t-4 border-t-violet bg-background p-5">
            <dt className="text-sm text-muted-foreground">{card.label}</dt>
            <dd className="mt-1 flex items-end justify-between">
              <span className="font-heading text-4xl font-bold">{card.value}</span>
              {card.href ? (
                <Link href={card.href} className="text-sm font-semibold text-primary hover:underline">
                  Open
                </Link>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      {admin ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="team-heading" className="rounded-md border bg-background p-5">
            <div className="flex items-baseline justify-between">
              <h2 id="team-heading" className="font-heading text-lg font-bold">Team</h2>
              <p className="text-sm text-muted-foreground">{onlineCount} online now</p>
            </div>
            <ul className="mt-3 divide-y">
              {activeTeam.map((member) => (
                <li key={member.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <span>
                    <span className="font-semibold">{member.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {adminRoleLabels[member.role as AdminRole] ?? member.role} · last active{" "}
                      {formatRelative(member.lastSeenAt ?? member.lastSignInAt)}
                    </span>
                  </span>
                  <PresenceBadge presence={member.presence} />
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="signins-heading" className="rounded-md border bg-background p-5">
            <div className="flex items-baseline justify-between">
              <h2 id="signins-heading" className="font-heading text-lg font-bold">Sign-ins and sign-outs</h2>
              <Link href="/admin/activity" className="text-sm font-semibold text-primary hover:underline">
                Change log
              </Link>
            </div>
            {signIns.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No activity yet.</p>
            ) : (
              <ul className="mt-3 divide-y">
                {signIns.map((entry) => (
                  <li key={entry.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span>
                      <span className="font-semibold">{entry.userName}</span>{" "}
                      <span className={entry.action === "sign-in" ? "text-[#185c3d]" : "text-muted-foreground"}>
                        {entry.action === "sign-in" ? "signed in" : "signed out"}
                      </span>
                    </span>
                    <time className="text-muted-foreground" dateTime={entry.createdAt.toISOString()}>
                      {entry.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : null}

      <h2 className="mt-12 font-heading text-xl font-bold">Website content</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {groups.map((group) => (
          <section key={group} className="rounded-md border bg-background p-5">
            <h3 className="text-sm font-semibold text-muted-foreground">{group}</h3>
            <ul className="mt-3 divide-y">
              {collections
                .filter((collection) => collection.group === group)
                .map((collection) => (
                  <li key={collection.key}>
                    <Link
                      href={`/admin/content/${collection.key}`}
                      className="group flex items-center justify-between gap-4 py-3"
                    >
                      <span>
                        <span className="font-semibold group-hover:text-primary">{collection.label}</span>
                        <span className="block text-sm text-muted-foreground">{collection.description}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
