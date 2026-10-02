import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { EntryForm } from "@/components/admin/entry-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { isPlatformAdmin, requireAdminUser } from "@/lib/admin/session";
import { getCollectionDefinition } from "@/lib/cms/collections";
import { getEntry, listEntries } from "@/lib/cms/write";

type PageProps = { params: Promise<{ collection: string; id: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { collection, id } = await params;
  const label = getCollectionDefinition(collection)?.label ?? "Content";
  return { title: id === "new" ? `New: ${label}` : `Edit: ${label}` };
}

export default async function EditEntryPage({ params }: PageProps) {
  const adminUser = await requireAdminUser();
  const { collection, id } = await params;
  const definition = getCollectionDefinition(collection);
  if (!definition) notFound();

  const isNew = id === "new";
  await listEntries(collection); // imports built-in content on first visit
  const entry = isNew ? null : await getEntry(collection, id);
  if (!isNew && !entry) notFound();

  return (
    <>
      {definition.singleton ? null : (
        <Link
          href={`/admin/content/${collection}`}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> {definition.label}
        </Link>
      )}
      <AdminPageHeader
        title={isNew ? `New item: ${definition.label}` : entry ? definition.itemLabel(entry.data) || "Edit" : "Edit"}
        description={definition.description}
      />
      <EntryForm
        collection={collection}
        entryId={entry?.id ?? null}
        fields={definition.fields}
        initialData={entry?.data ?? null}
        isAdmin={isPlatformAdmin(adminUser)}
        canDelete={!definition.singleton && !isNew}
      />
    </>
  );
}
