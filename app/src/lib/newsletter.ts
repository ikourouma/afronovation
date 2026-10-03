import "server-only";

import { randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { getDb } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { CONTACT_FROM, getResend } from "@/lib/email";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

type SubscribeInput = {
  email: string;
  fullName?: string | null;
  interests?: readonly string[];
  source?: string;
};

/**
 * Adds a pending subscriber and emails the double opt-in link. Existing
 * subscribers are left untouched (and the caller cannot tell the difference,
 * so the form never reveals who is on the list).
 */
export async function subscribeToNewsletter({
  email,
  fullName = null,
  interests = [],
  source = "website",
}: SubscribeInput): Promise<{ warning?: string }> {
  if (!process.env.DATABASE_URL) {
    const dataDir = path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    await appendFile(
      path.join(dataDir, "newsletter.jsonl"),
      `${JSON.stringify({ email, fullName, interests, source, status: "pending", timestamp: new Date().toISOString() })}\n`,
      "utf8",
    );
    return {};
  }

  const token = randomBytes(24).toString("hex");
  const inserted = await getDb()
    .insert(newsletterSubscribers)
    .values({
      email: email.toLowerCase(),
      fullName: fullName || null,
      interests: [...interests],
      confirmToken: token,
      source,
    })
    .onConflictDoNothing({ target: newsletterSubscribers.email })
    .returning({ id: newsletterSubscribers.id });

  if (inserted.length === 0 || !process.env.RESEND_API_KEY) return {};

  try {
    await getResend().emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: "Confirm your Afronovation updates subscription",
      text: [
        fullName ? `Hello ${fullName},` : "Hello,",
        "",
        "Please confirm you would like to receive insights and news from Afronovation:",
        `${siteUrl}/api/newsletter/confirm?token=${token}`,
        "",
        "If you did not request this, you can ignore this email.",
      ].join("\n"),
    });
    return {};
  } catch (emailError) {
    console.error("[newsletter] Confirmation email failed:", emailError);
    return { warning: "email-deferred" };
  }
}
