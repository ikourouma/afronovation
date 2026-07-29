<#
.SYNOPSIS
    Afronovation rebuild - Step 3 (Phase 5): wire Neon Auth (managed Better Auth).
.DESCRIPTION
    Idempotent: overwrites scaffold-owned auth files. Writes a Better Auth setup
    backed by Neon Postgres with clear TODOs for the Neon-managed (Neon Auth)
    configuration, plus the route handler, client helper, and a gated /admin
    skeleton. Does NOT run migrations - Neon Auth's managed tables are provisioned
    from the Neon console; self-hosted mode needs `pnpm dlx @better-auth/cli generate`.
    Requires: scripts\01-scaffold.ps1 and 02-setup-database.ps1 completed.
.EXAMPLE
    .\scripts\03-setup-auth.ps1
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

Write-Step "Writing src/lib/auth.ts"
$auth = @'
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

// Neon Auth is Neon's managed Better Auth service.
// When Neon Auth is enabled in the Neon console, set NEON_AUTH_BASE_URL in
// .env.local and point baseURL at it; otherwise Better Auth self-hosts on the
// same Neon database via the Drizzle adapter below.
// Docs: Neon console -> Auth page (managed), or https://www.better-auth.com
export const auth = betterAuth({
  baseURL: process.env.NEON_AUTH_BASE_URL ?? process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    // TODO(phase-5): restrict sign-ups to approved admin emails before enabling in production.
    // disableSignUp: true,
  },
});

export type Session = typeof auth.$Infer.Session;
'@
Write-ScaffoldFile 'src\lib\auth.ts' $auth

Write-Step "Writing src/lib/auth-client.ts"
$authClient = @'
"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEON_AUTH_BASE_URL ?? process.env.BETTER_AUTH_URL,
});

export const { useSession, signIn, signOut } = authClient;
'@
Write-ScaffoldFile 'src\lib\auth-client.ts' $authClient

Write-Step "Writing src/app/api/auth/[...all]/route.ts"
$route = @'
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth.handler);
'@
Write-ScaffoldFile 'src\app\api\auth\[...all]\route.ts' $route

Write-Step "Writing src/app/admin/page.tsx (gated skeleton)"
$adminPage = @'
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";

// Phase 5 skeleton: unauthenticated visitors get a 404 (no information leakage).
export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as {session.user.email}. Management UI ships in Phase 5
        (backlog.md stories 5.3-5.7): projects, testimonials, team, leads.
      </p>
    </main>
  );
}
'@
Write-ScaffoldFile 'src\app\admin\page.tsx' $adminPage

Write-Step "Checking auth environment"
$envPath = Join-Path $AppDir '.env.local'
$needs = @('BETTER_AUTH_SECRET', 'NEON_AUTH_BASE_URL', 'DATABASE_URL')
if (Test-Path $envPath) {
    $raw = Get-Content $envPath -Raw
    foreach ($name in $needs) {
        $hasValue = ($raw -match "(?m)^$name=") -and ($raw -notmatch "(?m)^$name=`"?(CHANGE_ME|$|YOUR_)")
        if ($hasValue) { Write-Ok "$name is set" } else { Write-Host "  [TODO] $name missing or placeholder in app\.env.local" -ForegroundColor Yellow }
    }
} else {
    Write-Host "  [TODO] app\.env.local not found - copy ..\.env.example and fill it in." -ForegroundColor Yellow
}

Write-Step "Done"
Write-Host "  Reminder: if self-hosting Better Auth tables (not using Neon-managed Auth)," -ForegroundColor Green
Write-Host "  generate its schema with: cd app; pnpm dlx @better-auth/cli generate" -ForegroundColor Green
Write-Host "  Then fold the output into src/db/schema.ts and re-run migrations (script 02)." -ForegroundColor Green
