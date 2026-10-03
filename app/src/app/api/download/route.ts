import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { getCollection } from "@/lib/cms/read";
import { downloadRequestSchema } from "@/lib/download-schema";
import { CONTACT_FROM, CONTACT_TO, getResend } from "@/lib/email";
import { media } from "@/lib/media";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { allowFormSubmission, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

export async function POST(request: Request) {
  if (!(await allowFormSubmission(request, "download", { limit: 10, windowSeconds: 600 }))) {
    return tooManyRequests();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = downloadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed.", details: parsed.error.flatten() }, { status: 422 });
  }
  const { slug, fullName, email, organization, newsletter, website } = parsed.data;

  const resource = (await getCollection("downloads")).find((item) => item.slug === slug && item.active);
  if (!resource) return Response.json({ error: "This download is not available." }, { status: 404 });

  const fileUrl = new URL(media(resource.fileKey), siteUrl).toString();
  // Bots that fill the hidden field get a normal-looking answer and no lead.
  if (website) return Response.json({ ok: true, url: fileUrl });

  try {
    if (process.env.DATABASE_URL) {
      await getDb().insert(contactSubmissions).values({
        fullName,
        email,
        phone: null,
        company: organization || null,
        message: `Downloaded: ${resource.title}${newsletter ? " (opted in to the newsletter)" : ""}`,
        consent: true,
        source: "download",
        inquiryType: resource.slug,
      });
    } else {
      const dataDir = path.join(process.cwd(), "data");
      await mkdir(dataDir, { recursive: true });
      await appendFile(
        path.join(dataDir, "leads.jsonl"),
        `${JSON.stringify({ kind: "download", slug, fullName, email, organization, newsletter, timestamp: new Date().toISOString() })}\n`,
        "utf8",
      );
    }

    if (newsletter) {
      await subscribeToNewsletter({ email, fullName, interests: ["digital-government"], source: "download" });
    }

    let emailed = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = getResend();
        await Promise.all([
          resend.emails.send({
            from: CONTACT_FROM,
            to: CONTACT_TO,
            replyTo: email,
            subject: `New download (${resource.title}): ${fullName}`,
            text: [
              `Resource: ${resource.title}`,
              `Name: ${fullName}`,
              `Email: ${email}`,
              `Organisation: ${organization || "—"}`,
              `Newsletter opt-in: ${newsletter ? "yes" : "no"}`,
            ].join("\n"),
          }),
          resend.emails.send({
            from: CONTACT_FROM,
            to: email,
            subject: `Your download: ${resource.title}`,
            text: [
              `Hello ${fullName},`,
              "",
              `Thank you for your interest. Here is your copy of "${resource.title}":`,
              fileUrl,
              "",
              "When you are ready, book a 30-minute briefing with our team:",
              `${siteUrl}/contact?intent=briefing`,
              "",
              "Team Afronovation",
            ].join("\n"),
          }),
        ]);
        emailed = true;
      } catch (emailError) {
        console.error("[download] Email failed:", emailError);
      }
    }

    return Response.json({ ok: true, url: fileUrl, emailed });
  } catch (error) {
    console.error("[download] Request failed:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
