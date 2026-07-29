<#
.SYNOPSIS
    Afronovation rebuild - Step 4: write the Cloudflare R2 + Resend integration layer.
.DESCRIPTION
    Idempotent: overwrites scaffold-owned files. Writes the R2 S3 client helper,
    the Resend client, and the /api/contact route handler skeleton implementing
    the audit's 8-field lead spec (zod validation -> Neon insert -> Resend email).
    The honeypot and rate limiting are Phase 3 backlog items (3.4-3.5) marked TODO.
    Requires: scripts\01-scaffold.ps1 and 02-setup-database.ps1 completed.
.EXAMPLE
    .\scripts\04-setup-storage-email.ps1
#>
#requires -Version 5.1
[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$AppDir = Join-Path $ProjectRoot 'app'

function Write-Step([string]$Msg) { Write-Host "`n==> $Msg" -ForegroundColor Cyan }
function Write-Ok([string]$Msg)   { Write-Host "  [OK] $Msg" -ForegroundColor Green }

if (-not (Test-Path (Join-Path $AppDir 'package.json'))) {
    throw "app\ not scaffolded yet. Run .\scripts\01-scaffold.ps1 first."
}

function Write-ScaffoldFile([string]$RelativePath, [string]$Content) {
    $dest = Join-Path $AppDir $RelativePath
    $dir = Split-Path -Parent $dest
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    Set-Content -Path $dest -Value $Content -Encoding UTF8
    Write-Ok $RelativePath
}

Write-Step "Writing src/lib/r2.ts"
$r2 = @'
import { S3Client } from "@aws-sdk/client-s3";

// Cloudflare R2 is S3-compatible. Endpoint format:
// https://<account-id>.r2.cloudflarestorage.com
// Used in Phase 4 (uploads) and Phase 5 (admin media). Public reads go through
// R2_PUBLIC_URL, not this client.
export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

export const R2_BUCKET = process.env.R2_BUCKET_NAME ?? "";
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL ?? "";

export function mediaUrl(key: string): string {
  return `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}
'@
Write-ScaffoldFile 'src\lib\r2.ts' $r2

Write-Step "Writing src/lib/email.ts"
$email = @'
import { Resend } from "resend";

// Sender domain (afronovation.com) must be verified in Resend before launch;
// DKIM/SPF records live in Hostinger DNS - see docs/rebuild-guide.md Step 7.
export const resend = new Resend(process.env.RESEND_API_KEY);

export const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? "";
export const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "hello@afronovation.com";
'@
Write-ScaffoldFile 'src\lib\email.ts' $email

Write-Step "Writing src/app/api/contact/route.ts"
$route = @'
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { resend, CONTACT_FROM, CONTACT_TO } from "@/lib/email";

// Field spec preserved from audit_report.md Section 6.3 (SureForms 8-field form).
const contactSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(32),
  company: z.string().max(160).optional().or(z.literal("")),
  interests: z
    .array(
      z.enum([
        "program-change-management",
        "saas-platform-development",
        "digital-transformation",
        "government-digitalization",
      ])
    )
    .min(1),
  preferredContactMethod: z.enum(["email", "phone", "text-message"]),
  message: z.string().max(5000).optional().or(z.literal("")),
  consent: z.literal(true),
  // Honeypot (backlog 3.5): must stay empty; bots that fill it are dropped below.
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  // TODO(backlog 3.4): per-IP rate limiting (Upstash or Vercel KV) before parsing.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot filled: pretend success, store nothing (silent drop).
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  await db.insert(contactSubmissions).values({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    company: data.company || null,
    interests: data.interests,
    preferredContactMethod: data.preferredContactMethod,
    message: data.message || null,
    consent: data.consent,
  });

  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    replyTo: data.email,
    subject: `New website lead: ${data.fullName}`,
    text: [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Company: ${data.company || "-"}`,
      `Interests: ${data.interests.join(", ")}`,
      `Preferred contact: ${data.preferredContactMethod}`,
      `Consent: yes`,
      "",
      data.message || "(no message)",
    ].join("\n"),
  });

  if (error) {
    // Lead is safely in the database; report email failure without exposing internals.
    return NextResponse.json({ ok: true, warning: "email-deferred" }, { status: 202 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
'@
Write-ScaffoldFile 'src\app\api\contact\route.ts' $route

Write-Step "Checking storage/email environment"
$envPath = Join-Path $AppDir '.env.local'
$needs = @('R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_URL', 'RESEND_API_KEY', 'CONTACT_FROM_EMAIL')
if (Test-Path $envPath) {
    $raw = Get-Content $envPath -Raw
    foreach ($name in $needs) {
        $hasValue = ($raw -match "(?m)^$name=") -and ($raw -notmatch "(?m)^$name=`"?(CHANGE_ME|YOUR_|re_YOUR|$)")
        if ($hasValue) { Write-Ok "$name is set" } else { Write-Host "  [TODO] $name missing or placeholder in app\.env.local" -ForegroundColor Yellow }
    }
} else {
    Write-Host "  [TODO] app\.env.local not found - copy ..\.env.example and fill it in." -ForegroundColor Yellow
}

Write-Step "Done"
Write-Host "  Next: .\scripts\05-migrate-media.ps1 (stage images), then Phase 2/3 stories in backlog.md" -ForegroundColor Green
