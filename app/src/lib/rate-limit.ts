import "server-only";

import { createHash } from "node:crypto";

import { sql } from "drizzle-orm";

import { getDb, hasDatabase } from "@/db";
import { formRateLimits } from "@/db/schema";

/** Best-effort client IP (Vercel and most proxies set x-forwarded-for). */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/**
 * Fixed-window limit per form and visitor. IP addresses are hashed, never
 * stored. Returns false when the visitor should wait.
 */
export async function allowFormSubmission(
  request: Request,
  form: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number },
): Promise<boolean> {
  if (!hasDatabase()) return true;
  const salt = process.env.BETTER_AUTH_SECRET ?? "afronovation";
  const key = `${form}:${createHash("sha256").update(`${salt}:${clientIp(request)}`).digest("hex").slice(0, 32)}`;
  const windowExpired = sql`${formRateLimits.windowStart} < now() - make_interval(secs => ${windowSeconds})`;

  try {
    const [row] = await getDb()
      .insert(formRateLimits)
      .values({ key, count: 1, windowStart: new Date() })
      .onConflictDoUpdate({
        target: formRateLimits.key,
        set: {
          count: sql`CASE WHEN ${windowExpired} THEN 1 ELSE ${formRateLimits.count} + 1 END`,
          windowStart: sql`CASE WHEN ${windowExpired} THEN now() ELSE ${formRateLimits.windowStart} END`,
        },
      })
      .returning({ count: formRateLimits.count });
    return row.count <= limit;
  } catch (error) {
    // Never block a genuine enquiry because the limiter itself failed.
    console.error("[rate-limit] Check failed:", error);
    return true;
  }
}

export function tooManyRequests() {
  return Response.json(
    { error: "Too many submissions. Please wait a few minutes and try again." },
    { status: 429 },
  );
}
