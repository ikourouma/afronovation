import { desc } from "drizzle-orm";

import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { getAdminUser } from "@/lib/admin/session";
import { csvResponse, toCsv } from "@/lib/admin/csv";

export const runtime = "nodejs";

export async function GET() {
  if (!(await getAdminUser())) return new Response("Not found", { status: 404 });
  const rows = await getDb().select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  const csv = toCsv(
    ["Date", "Status", "Request", "Source", "Name", "Email", "Phone", "Organisation", "Organisation type", "Platform", "Interests", "Message"],
    rows.map((lead) => [
      lead.createdAt.toISOString(),
      lead.status,
      lead.inquiryType,
      lead.source,
      lead.fullName,
      lead.email,
      lead.phone,
      lead.company,
      lead.organizationType,
      lead.platformSlug,
      lead.interests?.join("; "),
      lead.message,
    ]),
  );
  return csvResponse(`afronovation-leads-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}
