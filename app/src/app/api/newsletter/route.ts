import { randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { CONTACT_FROM, getResend } from "@/lib/email";
import { newsletterSchema } from "@/lib/newsletter-schema";

export const runtime = "nodejs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

async function saveLocally(record: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(
    path.join(dataDir, "newsletter.jsonl"),
    `${JSON.stringify({ ...record, timestamp: new Date().toISOString() })}\n`,
    "utf8",
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { email, fullName, interests, website } = parsed.data;
  if (website) {
    return Response.json({ ok: true });
  }

  const token = randomBytes(24).toString("hex");

  try {
    if (!process.env.DATABASE_URL) {
      await saveLocally({ email, fullName, interests, status: "pending" });
      return Response.json({ ok: true });
    }

    const inserted = await getDb()
      .insert(newsletterSubscribers)
      .values({
        email: email.toLowerCase(),
        fullName: fullName || null,
        interests: [...interests],
        confirmToken: token,
      })
      .onConflictDoNothing({ target: newsletterSubscribers.email })
      .returning({ id: newsletterSubscribers.id });

    // Already subscribed: respond identically so the form can't be used to
    // discover who is on the list.
    if (inserted.length === 0 || !process.env.RESEND_API_KEY) {
      return Response.json({ ok: true });
    }

    try {
      const confirmUrl = `${siteUrl}/api/newsletter/confirm?token=${token}`;
      await getResend().emails.send({
        from: CONTACT_FROM,
        to: email,
        subject: "Confirm your Afronovation updates subscription",
        text: [
          fullName ? `Hello ${fullName},` : "Hello,",
          "",
          "Please confirm you would like to receive insights and news from Afronovation:",
          confirmUrl,
          "",
          "If you did not request this, you can ignore this email.",
        ].join("\n"),
      });
    } catch (emailError) {
      console.error("[newsletter] Confirmation email failed:", emailError);
      return Response.json({ ok: true, warning: "email-deferred" });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] Subscription failed:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
