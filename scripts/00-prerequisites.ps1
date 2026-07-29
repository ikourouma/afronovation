<#
.SYNOPSIS
    Afronovation rebuild - Step 0: verify (and optionally install) prerequisites.
.DESCRIPTION
    Idempotent. Checks Node.js 20+, pnpm, git, and the Vercel CLI.
    Run with -InstallMissing to install missing tools via corepack/npm.
.EXAMPLE
    .\scripts\00-prerequisites.ps1
    .\scripts\00-prerequisites.ps1 -InstallMissing
#>
#requires -Version 5.1
[CmdletBinding()]
param(
    [switch]$InstallMissing
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step([string]$Msg) { Write-Host "`n==> $Msg" -ForegroundColor Cyan }
function Write-Ok([string]$Msg)   { Write-Host "  [OK] $Msg" -ForegroundColor Green }
function Write-Miss([string]$Msg) { Write-Host "  [MISSING] $Msg" -ForegroundColor Yellow }

$script:Missing = @()

function Test-Command([string]$Name) {
    $cmd = Get-Command $Name -ErrorAction SilentlyContinue
    return ($null -ne $cmd)
}

Write-Step "Checking Node.js (need >= 20)"
if (Test-Command 'node') {
    $raw = (& node --version) -replace '^v', ''
    $major = [int]($raw.Split('.')[0])
    if ($major -ge 20) {
        Write-Ok "node v$raw"
    } else {
        Write-Miss "node v$raw is too old - install Node 20+ from https://nodejs.org"
        $script:Missing += 'node'
    }
} else {
    Write-Miss "node not found - install Node 20+ LTS from https://nodejs.org"
    $script:Missing += 'node'
}

Write-Step "Checking pnpm"
if (Test-Command 'pnpm') {
    Write-Ok "pnpm $(& pnpm --version)"
} elseif ($InstallMissing) {
    Write-Host "  Installing pnpm via corepack..." -ForegroundColor Yellow
    & corepack enable
    & corepack prepare pnpm@latest --activate
    if (Test-Command 'pnpm') { Write-Ok "pnpm $(& pnpm --version)" } else { $script:Missing += 'pnpm' }
} else {
    Write-Miss "pnpm not found - re-run with -InstallMissing, or: corepack enable; corepack prepare pnpm@latest --activate"
    $script:Missing += 'pnpm'
}

Write-Step "Checking git"
if (Test-Command 'git') {
    Write-Ok "git $((& git --version) -replace 'git version ', '')"
} else {
    Write-Miss "git not found - install from https://git-scm.com/download/win"
    $script:Missing += 'git'
}

Write-Step "Checking Vercel CLI"
if (Test-Command 'vercel') {
    Write-Ok "vercel $(& vercel --version)"
} elseif ($InstallMissing) {
    Write-Host "  Installing Vercel CLI globally via npm..." -ForegroundColor Yellow
    & npm install -g vercel
    if (Test-Command 'vercel') { Write-Ok "vercel $(& vercel --version)" } else { $script:Missing += 'vercel' }
} else {
    Write-Miss "vercel CLI not found - re-run with -InstallMissing, or: npm install -g vercel"
    $script:Missing += 'vercel'
}

Write-Step "Summary"
if ($script:Missing.Count -eq 0) {
    Write-Ok "All prerequisites satisfied. Next: .\scripts\01-scaffold.ps1"
    exit 0
} else {
    Write-Host "  Missing or outdated: $($script:Missing -join ', ')" -ForegroundColor Red
    Write-Host "  Install the items above (or re-run with -InstallMissing), then run this script again." -ForegroundColor Red
    exit 1
}
