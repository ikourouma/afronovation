import { desc } from "drizzle-orm";
import { Download } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { DeleteRecordButton } from "@/components/admin/delete-record-button";
import { isPlatformAdmin, requireAdminUser } from "@/lib/admin/session";

export const metadata = { title: "Subscribers" };

export default async function SubscribersPage() {
  const adminUser = await requireAdminUser();
  const admin = isPlatformAdmin(adminUser);
  const subscribers = await getDb()
    .select()
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.createdAt))
    .limit(1000);
  const confirmed = subscribers.filter((row) => row.status === "confirmed").length;

  return (
    <>
      <AdminPageHeader
        title="Newsletter subscribers"
        description={`${confirmed} confirmed. People appear as "Pending" until they click the link in their confirmation email.`}
        actions={
          <Button asChild variant="outline">
            <a href="/admin/export/subscribers">
              <Download aria-hidden /> Export CSV
            </a>
          </Button>
        }
      />
      {subscribers.length === 0 ? (
        <p className="rounded-md border bg-background p-8 text-center text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Email</th>
                <th className="px-4 py-2.5 font-semibold">Interests</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Signed up</th>
                {admin ? <th className="px-4 py-2.5 font-semibold"><span className="sr-only">Actions</span></th> : null}
              </tr>
            </thead>
            <tbody>
              {subscribers.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-2.5 font-medium">{row.email}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{row.interests.join(", ") || "—"}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={
                        row.status === "confirmed"
                          ? "rounded-sm bg-[#e6f4ee] px-2 py-0.5 text-xs font-semibold text-[#185c3d]"
                          : "rounded-sm bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground"
                      }
                    >
                      {row.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {row.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </td>
                  {admin ? (
                    <td className="px-4 py-2.5 text-right">
                      <DeleteRecordButton kind="subscriber" id={row.id} email={row.email} />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
