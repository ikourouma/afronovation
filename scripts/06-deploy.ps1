<#
.SYNOPSIS
    Afronovation rebuild - Step 6: verify env, link/push to Vercel, print DNS cutover.
.DESCRIPTION
    Idempotent. Verifies app/.env.local is complete, links the Vercel project if
    needed, optionally pushes env vars to Vercel production (-PushEnv), optionally
    deploys to production (-Deploy), and always prints the Hostinger DNS cutover
    checklist. Requires the Vercel CLI (scripts\00-prerequisites.ps1).
.EXAMPLE
    .\scripts\06-deploy.ps1
    .\scripts\06-deploy.ps1 -PushEnv
    .\scripts\06-deploy.ps1 -PushEnv -Deploy
#>
#requires -Version 5.1
[CmdletBinding()]
param(
    [switch]$PushEnv,
    [switch]$Deploy
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$AppDir = Join-Path $ProjectRoot 'app'
$EnvPath = Join-Path $AppDir '.env.local'

function Write-Step([string]$Msg) { Write-Host "`n==> $Msg" -ForegroundColor Cyan }
function Write-Ok([string]$Msg)   { Write-Host "  [OK] $Msg" -ForegroundColor Green }

if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    throw "Vercel CLI not found. Run .\scripts\00-prerequisites.ps1 -InstallMissing first."
}
if (-not (Test-Path $EnvPath)) {
    throw "app\.env.local not found. Copy .env.example and fill in real values first."
}

# --- Verify required variables are present and not placeholders -----------------
$Required = @(
    'DATABASE_URL',
    'NEON_AUTH_BASE_URL',
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'R2_PUBLIC_URL',
    'RESEND_API_KEY',
    'CONTACT_FROM_EMAIL',
    'CONTACT_TO_EMAIL',
    'NEXT_PUBLIC_SITE_URL'
)

Write-Step "Checking app\.env.local"
$vars = @{}
foreach ($line in (Get-Content $EnvPath)) {
    if ($line -match '^\s*#' -or $line -notmatch '=') { continue }
    $name, $value = $line -split '=', 2
    $vars[$name.Trim()] = $value.Trim().Trim('"')
}

$missing = @()
foreach ($name in $Required) {
    $value = $vars[$name]
    $bad = [string]::IsNullOrWhiteSpace($value) -or
           ($value -match '^(CHANGE_ME|YOUR_|re_YOUR|https://YOUR|postgresql://USER)')
    if ($bad) { $missing += $name } else { Write-Ok $name }
}

if ($missing.Count -gt 0) {
    Write-Host "`n  These variables are missing or still placeholders:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
    throw "Fix app\.env.local before deploying. See .env.example for the expected format."
}

# --- Link project ---------------------------------------------------------------
Push-Location $AppDir
try {
    Write-Step "Linking Vercel project"
    if (Test-Path (Join-Path $AppDir '.vercel')) {
        Write-Ok "Already linked (.vercel exists)"
    } else {
        Write-Host "  Running 'vercel link' (interactive - select your team/project)..." -ForegroundColor Yellow
        & vercel link --yes
        if ($LASTEXITCODE -ne 0) { throw "vercel link failed with exit code $LASTEXITCODE" }
    }

    # --- Push env vars ----------------------------------------------------------
    if ($PushEnv) {
        Write-Step "Pushing environment variables to Vercel (production)"
        foreach ($name in $Required) {
            $value = $vars[$name]
            $value | & vercel env add $name production --force 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Ok "$name"
            } else {
                Write-Host "  [WARN] Could not push $name automatically - add it in the Vercel dashboard (Project -> Settings -> Environment Variables)." -ForegroundColor Yellow
            }
        }
    } else {
        Write-Host "  Skipping env push (pass -PushEnv to push $($Required.Count) variables to production)." -ForegroundColor DarkGray
    }

    # --- Deploy -----------------------------------------------------------------
    if ($Deploy) {
        Write-Step "Deploying to production"
        & vercel --prod
        if ($LASTEXITCODE -ne 0) { throw "vercel --prod failed with exit code $LASTEXITCODE" }
        Write-Ok "Deployment complete"
    } else {
        Write-Host "  Skipping deploy (pass -Deploy to run 'vercel --prod')." -ForegroundColor DarkGray
    }
} finally {
    Pop-Location
}

# --- DNS cutover checklist ------------------------------------------------------
Write-Step "Hostinger DNS cutover checklist (hPanel -> Domains -> afronovation.com -> DNS)"
Write-Host @"
  1. Resend first: add the DKIM/SPF records from the Resend dashboard and wait for a green check.
  2. Lower TTL to 300 on existing records a few hours ahead.
  3. Remove the old A record for @ pointing at the WordPress origin (193.42.137.207 at audit time).
  4. Add A record:      @     -> 76.76.21.21          (Vercel anycast)
  5. Add CNAME record:  www   -> cname.vercel-dns.com
  6. In Vercel: add domains afronovation.com and www.afronovation.com; wait for automatic SSL.
  7. Smoke test: site loads on apex + www, lead form delivers to hello@afronovation.com,
     images serve from R2, securityheaders.com shows the new headers.
  Rollback: restore the old A record (@ -> 193.42.137.207) and remove the Vercel records.
  The WordPress origin stays live until backlog item 6.9 (decommission) is done on purpose.
"@ -ForegroundColor Cyan
