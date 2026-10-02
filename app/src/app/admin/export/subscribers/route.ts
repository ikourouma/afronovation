import { desc } from "drizzle-orm";

import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { getAdminUser } from "@/lib/admin/session";
import { csvResponse, toCsv } from "@/lib/admin/csv";

export const runtime = "nodejs";

export async function GET() {
  if (!(await getAdminUser())) return new Response("Not found", { status: 404 });
  const rows = await getDb().select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  const csv = toCsv(
    ["Signed up", "Status", "Confirmed", "Email", "Name", "Interests"],
    rows.map((row) => [
      row.createdAt.toISOString(),
      row.status,
      row.confirmedAt?.toISOString(),
      row.email,
      row.fullName,
      row.interests.join("; "),
    ]),
  );
  return csvResponse(`afronovation-subscribers-${new Date().toISOString().slice(0, 10)}.csv`, csv);
}
