import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { EntryOrderButtons } from "@/components/admin/entry-order-buttons";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { contentChanges } from "@/db/schema";
import { isPlatformAdmin, requireAdminUser } from "@/lib/admin/session";
import { getCollectionDefinition } from "@/lib/cms/collections";
import { listEntries } from "@/lib/cms/write";

type PageProps = { params: Promise<{ collection: string }> };

export async function generateMetadata({ params }: PageProps) {
  return { title: getCollectionDefinition((await params).collection)?.label ?? "Content" };
}

export default async function CollectionPage({ params }: PageProps) {
  const adminUser = await requireAdminUser();
  const { collection } = await params;
  const definition = getCollectionDefinition(collection);
  if (!definition) notFound();

  const entries = await listEntries(collection);
  if (definition.singleton && entries[0]) redirect(`/admin/content/${collection}/${entries[0].id}`);

  const admin = isPlatformAdmin(adminUser);
  const pending = await getDb()
    .select({ id: contentChanges.id })
    .from(contentChanges)
    .where(and(eq(contentChanges.collection, collection), eq(contentChanges.status, "pending")));
  const activeCount = definition.maxActive
    ? entries.filter((entry) => entry.data.active === true).length
    : null;

  return (
    <>
      <AdminPageHeader
        title={definition.label}
        description={definition.description}
        actions={
          <Button asChild>
            <Link href={`/admin/content/${collection}/new`}>
              <Plus aria-hidden /> Add new
            </Link>
          </Button>
        }
      />

      {pending.length > 0 ? (
        <p className="mb-4 rounded-md border border-violet/30 bg-secondary px-4 py-3 text-sm">
          {pending.length} change{pending.length > 1 ? "s" : ""} to this section {pending.length > 1 ? "are" : "is"} waiting for
          approval.{" "}
          {admin ? (
            <Link href="/admin/approvals" className="font-semibold text-primary hover:underline">
              Review now
            </Link>
          ) : null}
        </p>
      ) : null}
      {activeCount !== null ? (
        <p className="mb-4 text-sm text-muted-foreground">
          {activeCount} of {definition.maxActive} shown on the site.
        </p>
      ) : null}

      {entries.length === 0 ? (
        <p className="rounded-md border bg-background p-8 text-center text-muted-foreground">
          Nothing here yet. Use &ldquo;Add new&rdquo; to create the first item.
        </p>
      ) : (
        <ol className="divide-y rounded-md border bg-background">
          {entries.map((entry, index) => {
            const status = definition.itemStatus?.(entry.data) ?? null;
            return (
              <li key={entry.id} className="flex items-center gap-4 px-4 py-3">
                {admin ? (
                  <EntryOrderButtons
                    collection={collection}
                    entryId={entry.id}
                    canMoveUp={index > 0}
                    canMoveDown={index < entries.length - 1}
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/content/${collection}/${entry.id}`}
                    className="line-clamp-1 font-semibold hover:text-primary"
                  >
                    {definition.itemLabel(entry.data) || "Untitled"}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Updated {entry.updatedAt.toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </p>
                </div>
                {status ? (
                  <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    {status}
                  </span>
                ) : (
                  <span className="rounded-sm bg-[#e6f4ee] px-2 py-0.5 text-xs font-semibold text-[#185c3d]">Live</span>
                )}
                <Link
                  href={`/admin/content/${collection}/${entry.id}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Edit
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
