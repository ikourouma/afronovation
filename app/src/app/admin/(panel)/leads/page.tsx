import { desc } from "drizzle-orm";
import { Download } from "lucide-react";

import { LeadStatusSelect } from "@/components/admin/lead-status-select";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { contactIntents } from "@/content/contact-form";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { requireAdminUser } from "@/lib/admin/session";

export const metadata = { title: "Leads" };

function requestLabel(source: string, inquiryType: string | null) {
  if (source === "demo-request") return "Platform demo";
  return inquiryType && inquiryType in contactIntents
    ? contactIntents[inquiryType as keyof typeof contactIntents].label
    : "General enquiry";
}

export default async function LeadsPage() {
  await requireAdminUser();
  const leads = await getDb().select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(500);

  return (
    <>
      <AdminPageHeader
        title="Leads"
        description="Every contact form and demo request. Each one is also emailed to the team."
        actions={
          <Button asChild variant="outline">
            <a href="/admin/export/leads">
              <Download aria-hidden /> Export CSV
            </a>
          </Button>
        }
      />
      {leads.length === 0 ? (
        <p className="rounded-md border bg-background p-8 text-center text-muted-foreground">No leads yet.</p>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-md border bg-background p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-primary">
                    {requestLabel(lead.source, lead.inquiryType)}
                    {lead.platformSlug ? ` · ${lead.platformSlug}` : ""} ·{" "}
                    {lead.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                  <p className="mt-1 font-heading text-lg font-bold">
                    {lead.fullName}
                    {lead.company ? <span className="font-normal text-muted-foreground"> · {lead.company}</span> : null}
                  </p>
                  <p className="text-sm">
                    <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a> · {lead.phone}
                  </p>
                </div>
                <LeadStatusSelect leadId={lead.id} status={lead.status} />
              </div>
              {lead.message ? (
                <p className="mt-3 rounded-sm bg-muted px-4 py-3 text-sm whitespace-pre-line">{lead.message}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
