import { desc } from "drizzle-orm";

import { AdminPageHeader } from "@/components/admin/page-header";
import { getDb } from "@/db";
import { auditLog } from "@/db/schema";
import { requirePlatformAdmin } from "@/lib/admin/session";

export const metadata = { title: "Change log" };

export default async function ActivityPage() {
  await requirePlatformAdmin();
  const entries = await getDb().select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(300);

  return (
    <>
      <AdminPageHeader title="Change log" description="Who changed what, and when (latest 300 actions)." />
      {entries.length === 0 ? (
        <p className="rounded-md border bg-background p-8 text-center text-muted-foreground">No activity yet.</p>
      ) : (
        <ol className="divide-y rounded-md border bg-background">
          {entries.map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3 text-sm">
              <time className="w-40 shrink-0 text-muted-foreground" dateTime={entry.createdAt.toISOString()}>
                {entry.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
              </time>
              <span className="w-40 shrink-0 font-semibold">{entry.userName}</span>
              <span className="min-w-0 flex-1">
                <span className="text-muted-foreground">{entry.target}: </span>
                {entry.summary}
              </span>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
