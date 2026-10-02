import { AdminPageHeader } from "@/components/admin/page-header";
import { ReviewButtons } from "@/components/admin/review-buttons";
import { requirePlatformAdmin } from "@/lib/admin/session";
import { getCollectionDefinition } from "@/lib/cms/collections";
import { getPath } from "@/lib/cms/fields";
import { getEntry, listPendingChanges } from "@/lib/cms/write";

export const metadata = { title: "Approvals" };

function display(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    return value
      .map((item) => (item && typeof item === "object" ? Object.values(item).map(display).join(" · ") : String(item)))
      .join("\n");
  }
  if (typeof value === "object") return Object.values(value).map(display).join(" → ");
  return String(value);
}

const actionLabels = { create: "New item", update: "Edit", delete: "Delete" } as const;

export default async function ApprovalsPage() {
  await requirePlatformAdmin();
  const changes = await listPendingChanges();

  const rows = await Promise.all(
    changes.map(async (change) => {
      const definition = getCollectionDefinition(change.collection);
      const current = change.entryId ? await getEntry(change.collection, change.entryId) : null;
      return { change, definition, current };
    }),
  );

  return (
    <>
      <AdminPageHeader
        title="Approvals"
        description="Changes submitted by editors. Approving publishes them on the website immediately."
      />

      {rows.length === 0 ? (
        <p className="rounded-md border bg-background p-8 text-center text-muted-foreground">
          Nothing waiting for approval.
        </p>
      ) : (
        <ul className="space-y-6">
          {rows.map(({ change, definition, current }) => {
            const proposed = (change.data ?? {}) as Record<string, unknown>;
            const fields = definition?.fields ?? [];
            const changedFields =
              change.action === "update" && current
                ? fields.filter((field) => display(getPath(current.data, field.name)) !== display(getPath(proposed, field.name)))
                : fields;
            const title =
              change.action === "delete"
                ? current && definition ? definition.itemLabel(current.data) : "Item"
                : definition?.itemLabel(proposed) ?? "Item";

            return (
              <li key={change.id} className="rounded-md border bg-background p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-primary">
                      {definition?.label ?? change.collection} · {actionLabels[change.action as keyof typeof actionLabels]}
                    </p>
                    <h2 className="mt-1 font-heading text-lg font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground">
                      From {change.submittedByName} on{" "}
                      {change.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                  <ReviewButtons changeId={change.id} />
                </div>

                {change.action === "delete" ? (
                  <p className="mt-4 rounded-sm bg-[#fdecef] px-4 py-3 text-sm text-[#8c1d33]">
                    The editor asks to delete this item from the website.
                  </p>
                ) : (
                  <table className="mt-5 w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="w-48 pb-2 font-semibold">Field</th>
                        {change.action === "update" ? <th className="pb-2 font-semibold">Now</th> : null}
                        <th className="pb-2 font-semibold">Proposed</th>
                      </tr>
                    </thead>
                    <tbody className="align-top">
                      {changedFields.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-2 text-muted-foreground">No visible differences.</td>
                        </tr>
                      ) : (
                        changedFields.map((field) => (
                          <tr key={field.name} className="border-t">
                            <td className="py-2 pr-4 font-semibold">{field.label}</td>
                            {change.action === "update" ? (
                              <td className="py-2 pr-4 whitespace-pre-line text-muted-foreground line-through decoration-[#c62d4a]/40">
                                {display(current ? getPath(current.data, field.name) : undefined)}
                              </td>
                            ) : null}
                            <td className="py-2 whitespace-pre-line">{display(getPath(proposed, field.name))}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
