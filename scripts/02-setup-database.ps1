<#
.SYNOPSIS
    Afronovation rebuild - Step 2: write the Drizzle/Neon database layer.
.DESCRIPTION
    Idempotent: overwrites scaffold-owned files (src/db/*, drizzle.config.ts).
    If DATABASE_URL in app/.env.local is real (not a placeholder), generates and
    applies migrations; otherwise writes files and prints what to run later.
    Requires: scripts\01-scaffold.ps1 completed.
.EXAMPLE
    .\scripts\02-setup-database.ps1
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

Write-Step "Writing src/db/schema.ts"
$schema = @'
import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

// Phase 3: lead capture (audit_report.md Section 6 - the 8-field SureForms spec)
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  interests: text("interests").array().notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  message: text("message"),
  consent: boolean("consent").notNull(),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("contact-form"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Phase 5: admin-managed content (mirrors the typed content module; see knowledgebase.md Section 6)
export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  credentials: text("credentials").array(),
  headshotKey: text("headshot_key"),
  headshotAlt: text("headshot_alt"),
  linkedinUrl: text("linkedin_url"),
  sortOrder: text("sort_order").notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  role: text("role"),
  company: text("company"),
  confirmed: boolean("confirmed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  sector: text("sector").notNull(),
  scope: text("scope"),
  outcome: text("outcome"),
  summary: text("summary"),
  imageKey: text("image_key"),
  imageAlt: text("image_alt"),
  status: text("status").notNull().default("placeholder"), // placeholder | draft | published
  featured: boolean("featured").notNull().default(false),  // shown in mega menu
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
'@
Write-ScaffoldFile 'src\db\schema.ts' $schema

Write-Step "Writing src/db/index.ts"
$dbClient = @'
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
'@
Write-ScaffoldFile 'src\db\index.ts' $dbClient

Write-Step "Writing drizzle.config.ts"
$drizzleConfig = @'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
'@
Write-ScaffoldFile 'drizzle.config.ts' $drizzleConfig

Write-Step "Checking DATABASE_URL"
$envPath = Join-Path $AppDir '.env.local'
$databaseUrl = $null
if (Test-Path $envPath) {
    $match = Select-String -Path $envPath -Pattern '^DATABASE_URL="?([^"\r\n]+)"?' | Select-Object -First 1
    if ($match) { $databaseUrl = $match.Matches[0].Groups[1].Value }
}

$isPlaceholder = ($null -eq $databaseUrl) -or ($databaseUrl -match 'USER:PASSWORD') -or ($databaseUrl -match 'CHANGE_ME')
if ($isPlaceholder) {
    Write-Host "`n  DATABASE_URL is missing or still a placeholder in app\.env.local." -ForegroundColor Yellow
    Write-Host "  Files were written. After filling in the Neon connection string, run:" -ForegroundColor Yellow
    Write-Host "    cd app"
    Write-Host "    pnpm drizzle-kit generate"
    Write-Host "    pnpm drizzle-kit migrate"
    exit 0
}

Write-Step "Generating and applying migrations against Neon"
Push-Location $AppDir
try {
    $env:DATABASE_URL = $databaseUrl
    & pnpm drizzle-kit generate
    if ($LASTEXITCODE -ne 0) { throw "drizzle-kit generate failed with exit code $LASTEXITCODE" }
    & pnpm drizzle-kit migrate
    if ($LASTEXITCODE -ne 0) { throw "drizzle-kit migrate failed with exit code $LASTEXITCODE" }
} finally {
    Pop-Location
}
Write-Ok "Migrations applied. Next: .\scripts\04-setup-storage-email.ps1"
