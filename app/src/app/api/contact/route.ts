import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { contactSubmissions } from "@/db/schema";
import { getDb } from "@/db";
import {
  contactIntents,
  contactInterestOptions,
  contactMethodOptions,
} from "@/content/contact-form";
import { getPlatformBySlug } from "@/content/platforms";
import { CONTACT_FROM, CONTACT_TO, getResend } from "@/lib/email";
import {
  contactFormSchema,
  demoRequestSchema,
  inquiryTypeLabels,
  organizationTypeLabels,
} from "@/lib/contact-schema";
import type { ContactFormValues, DemoRequestValues } from "@/lib/contact-schema";

export const runtime = "nodejs";

type Submission =
  | { kind: "contact"; data: ContactFormValues }
  | { kind: "demo-request"; data: DemoRequestValues };

function formatInterests(values: ContactFormValues["interests"]): string {
  return values
    .map(
      (value) =>
        contactInterestOptions.find((option) => option.value === value)?.label ??
        value,
    )
    .join(", ");
}

function formatContactMethod(value: ContactFormValues["preferredContactMethod"]) {
  return (
    contactMethodOptions.find((option) => option.value === value)?.label ??
    value
  );
}

function buildEmailBody(submission: Submission): string {
  if (submission.kind === "demo-request") {
    const { data } = submission;
    const platform = getPlatformBySlug(data.platformSlug);
    return [
      `New demo request: ${platform?.name ?? data.platformSlug}`,
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Company: ${data.company || "—"}`,
      `Organization type: ${organizationTypeLabels[data.organizationType]}`,
      `Inquiry type: ${inquiryTypeLabels[data.inquiryType]}`,
      `Platform: ${platform?.name ?? data.platformSlug}`,
      `Message: ${data.message || "—"}`,
      data.utmSource || data.utmMedium || data.utmCampaign
        ? `UTM: source=${data.utmSource || "—"} medium=${data.utmMedium || "—"} campaign=${data.utmCampaign || "—"}`
        : null,
      `Consent: yes`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
  }

  const { data } = submission;
  return [
    "New website lead submission",
    "",
    `Request: ${contactIntents[data.intent ?? "general"].label}`,
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company || "—"}`,
    `Interests: ${formatInterests(data.interests)}`,
    `Preferred contact: ${formatContactMethod(data.preferredContactMethod)}`,
    `Message: ${data.message || "—"}`,
    `Consent: yes`,
  ].join("\n");
}

function buildEmailSubject(submission: Submission): string {
  if (submission.kind === "demo-request") {
    const platform = getPlatformBySlug(submission.data.platformSlug);
    return `New demo request (${platform?.name ?? submission.data.platformSlug}): ${submission.data.fullName}`;
  }
  const intent = contactIntents[submission.data.intent ?? "general"];
  return `New website lead (${intent.label}): ${submission.data.fullName}`;
}

async function saveLeadLocally(submission: Submission) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  const record = {
    kind: submission.kind,
    ...submission.data,
    website: undefined,
    timestamp: new Date().toISOString(),
  };
  const line = `${JSON.stringify(record)}\n`;
  await appendFile(path.join(dataDir, "leads.jsonl"), line, "utf8");
  console.log("[contact] Lead saved locally:", record);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  let submission: Submission;

  const demoParsed = demoRequestSchema.safeParse(body);
  if (demoParsed.success) {
    submission = { kind: "demo-request", data: demoParsed.data };
  } else {
    const contactParsed = contactFormSchema.safeParse(body);
    if (!contactParsed.success) {
      return Response.json(
        { error: "Validation failed.", details: contactParsed.error.flatten() },
        { status: 422 },
      );
    }
    submission = { kind: "contact", data: contactParsed.data };
  }

  if (submission.data.website) {
    return Response.json({ ok: true });
  }

  const hasDatabase = Boolean(process.env.DATABASE_URL);
  const hasEmail = Boolean(process.env.RESEND_API_KEY);

  try {
    if (hasDatabase && hasEmail) {
      const db = getDb();
      const data = submission.data;

      await db.insert(contactSubmissions).values({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        interests:
          submission.kind === "contact" ? [...submission.data.interests] : null,
        preferredContactMethod:
          submission.kind === "contact"
            ? submission.data.preferredContactMethod
            : null,
        message: data.message || null,
        consent: data.consent,
        source: submission.kind === "demo-request" ? "demo-request" : "contact-form",
        platformSlug:
          submission.kind === "demo-request" ? submission.data.platformSlug : null,
        organizationType:
          submission.kind === "demo-request"
            ? submission.data.organizationType
            : null,
        // Demo requests store their inquiry type; contact-page leads store
        // which call to action brought them (briefing, investor, ...).
        inquiryType:
          submission.kind === "demo-request"
            ? submission.data.inquiryType
            : (submission.data.intent ?? "general"),
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
      });

      try {
        const resend = getResend();
        await resend.emails.send({
          from: CONTACT_FROM,
          to: CONTACT_TO,
          replyTo: data.email,
          subject: buildEmailSubject(submission),
          text: buildEmailBody(submission),
        });
      } catch (emailError) {
        console.error("[contact] Email notification failed:", emailError);
        return Response.json({ ok: true, warning: "email-deferred" });
      }
    } else {
      await saveLeadLocally(submission);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Submission failed:", error);
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
