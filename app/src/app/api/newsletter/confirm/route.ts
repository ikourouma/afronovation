import { and, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const done = new URL("/?subscribed=1", request.url);

  if (!token || !/^[a-f0-9]{48}$/.test(token) || !process.env.DATABASE_URL) {
    return Response.redirect(new URL("/", request.url), 303);
  }

  try {
    await getDb()
      .update(newsletterSubscribers)
      .set({ status: "confirmed", confirmedAt: new Date() })
      .where(
        and(
          eq(newsletterSubscribers.confirmToken, token),
          eq(newsletterSubscribers.status, "pending"),
        ),
      );
  } catch (error) {
    console.error("[newsletter] Confirmation failed:", error);
  }

  return Response.redirect(done, 303);
}
