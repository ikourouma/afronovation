<#
.SYNOPSIS
    Afronovation rebuild - Step 1: scaffold the Next.js application into .\app.
.DESCRIPTION
    Idempotent: aborts if .\app already exists (use -Force to archive it first).
    Creates a Next.js 15 app (TypeScript, Tailwind v4, App Router, src dir),
    initializes shadcn/ui (Radix), adds the component set for the mega menu,
    forms, and marketing sections, then installs backend dependencies.
    Requires: Node 20+, pnpm (run scripts\00-prerequisites.ps1 first).
.EXAMPLE
    .\scripts\01-scaffold.ps1
    .\scripts\01-scaffold.ps1 -Force
#>
#requires -Version 5.1
[CmdletBinding()]
param(
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$AppDir = Join-Path $ProjectRoot 'app'

function Write-Step([string]$Msg) { Write-Host "`n==> $Msg" -ForegroundColor Cyan }
function Write-Ok([string]$Msg)   { Write-Host "  [OK] $Msg" -ForegroundColor Green }

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    throw "pnpm not found. Run .\scripts\00-prerequisites.ps1 first."
}

if (Test-Path $AppDir) {
    if (-not $Force) {
        throw "Directory '$AppDir' already exists. Re-run with -Force to archive it (renamed to app.bak-<timestamp>), or remove it manually."
    }
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $archive = Join-Path $ProjectRoot "app.bak-$stamp"
    Write-Step "Archiving existing app directory to $archive"
    Move-Item -Path $AppDir -Destination $archive
}

Write-Step "Creating Next.js app in .\app (this takes a few minutes)"
Push-Location $ProjectRoot
try {
    & pnpm create next-app@latest app `
        --typescript `
        --tailwind `
        --eslint `
        --app `
        --src-dir `
        --import-alias "@/*" `
        --turbopack `
        --use-pnpm
    if ($LASTEXITCODE -ne 0) { throw "create-next-app failed with exit code $LASTEXITCODE" }
} finally {
    Pop-Location
}
Write-Ok "Next.js app created"

Push-Location $AppDir
try {
    Write-Step "Initializing shadcn/ui (Radix primitives, Tailwind v4)"
    & pnpm dlx shadcn@latest init -y -d
    if ($LASTEXITCODE -ne 0) { throw "shadcn init failed with exit code $LASTEXITCODE" }

    Write-Step "Adding shadcn components (mega menu, drawer, forms, marketing)"
    & pnpm dlx shadcn@latest add `
        button navigation-menu sheet accordion card carousel avatar badge `
        separator input textarea label select checkbox radio-group form sonner
    if ($LASTEXITCODE -ne 0) { throw "shadcn add failed with exit code $LASTEXITCODE" }
    Write-Ok "shadcn components installed"

    Write-Step "Installing runtime dependencies"
    & pnpm add `
        drizzle-orm `
        @neondatabase/serverless `
        better-auth `
        resend `
        @aws-sdk/client-s3 `
        zod `
        react-hook-form `
        @hookform/resolvers `
        next-themes
    if ($LASTEXITCODE -ne 0) { throw "dependency install failed with exit code $LASTEXITCODE" }

    Write-Step "Installing dev dependencies"
    & pnpm add -D drizzle-kit
    if ($LASTEXITCODE -ne 0) { throw "dev dependency install failed with exit code $LASTEXITCODE" }
    Write-Ok "Dependencies installed"

    Write-Step "Creating project folders (src/content, src/lib, src/db)"
    foreach ($dir in @('src\content', 'src\lib', 'src\db')) {
        $path = Join-Path $AppDir $dir
        if (-not (Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force | Out-Null }
        $keep = Join-Path $path '.gitkeep'
        if (-not (Test-Path $keep)) { New-Item -ItemType File -Path $keep | Out-Null }
    }
    Write-Ok "Folders ready"
} finally {
    Pop-Location
}

Write-Step "Done"
Write-Host "  Next steps:" -ForegroundColor Green
Write-Host "    1. copy .env.example app\.env.local   (then fill in real values)"
Write-Host "    2. .\scripts\02-setup-database.ps1"
Write-Host "    3. cd app; pnpm dev"
