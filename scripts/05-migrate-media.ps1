<#
.SYNOPSIS
    Afronovation rebuild - Step 5: stage the curated WordPress media for R2.
.DESCRIPTION
    Idempotent: skips files that already exist. Downloads the ~30 migration
    candidates identified in audit_report.md Sections 7.1-7.2 from the live
    WordPress library into app/public/media-staging/, renaming each to a stable
    kebab-case key suitable for Cloudflare R2. Unused stock/demo imagery and
    resized duplicates are intentionally excluded.
    After staging: review the folder, then upload to the R2 bucket
    (docs/rebuild-guide.md Step 5).
.EXAMPLE
    .\scripts\05-migrate-media.ps1
    .\scripts\05-migrate-media.ps1 -OutDir app\public\media-staging
#>
#requires -Version 5.1
[CmdletBinding()]
param(
    [string]$OutDir = (Join-Path (Split-Path -Parent $PSScriptRoot) 'app\public\media-staging')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$Base = 'https://afronovation.com/wp-content/uploads'

# Curated from audit_report.md Section 7. Key = target R2 object key, Src = source path.
$Assets = @(
    # Brand
    @{ Key = 'brand/logo-full.png';            Src = '2025/09/afronovation-high-resolution-logo-transparent.png' }
    @{ Key = 'brand/logo-footer.png';          Src = '2025/09/afronovation.-750x150-1-e1757554780133.png' }
    @{ Key = 'brand/logo-grayscale.png';       Src = '2025/09/afronovation-high-resolution-logo-grayscale-e1757445188365.png' }
    @{ Key = 'brand/icon-mark.png';            Src = '2025/09/layout-circle-icon-color-transparent.png' }
    # Team (audit Section 3)
    @{ Key = 'team/ibrahima-kourouma.jpg';     Src = '2025/09/Ibrahima-Kourouma-Afronovation.jpeg' }
    @{ Key = 'team/ibrahima-kourouma-alt.jpg'; Src = '2025/09/Favorite-Aragon-Headshot-Ibrahima-Kourouma-2025-09-10-14-e1757545215420.jpeg' }
    @{ Key = 'team/adrienne-boykin.png';       Src = '2025/09/Screenshot-2025-09-10-192533.png' }
    @{ Key = 'team/justin-fawson.png';         Src = '2025/09/Screenshot-2025-09-10-194855.png' }
    @{ Key = 'team/justin-fawson-alt.png';     Src = '2025/09/Screenshot-2025-09-10-192931.png' }
    @{ Key = 'team/portrait-unconfirmed-1.png'; Src = '2025/09/Screenshot-2025-09-10-192436.png' }
    @{ Key = 'team/portrait-unconfirmed-2.png'; Src = '2025/09/Screenshot-2025-09-10-192300.png' }
    # Partner logos (audit Section 7.1)
    @{ Key = 'partners/oracle.png';            Src = '2025/09/Oracle-01.png' }
    @{ Key = 'partners/cisco.png';             Src = '2025/09/Cisco-01.png' }
    @{ Key = 'partners/microsoft.png';         Src = '2025/09/Microsoft-01.png' }
    @{ Key = 'partners/aws-wide.png';          Src = '2025/09/Amazon-Web-Services-AWS-1.png' }
    @{ Key = 'partners/aws-square.png';        Src = '2025/09/Amazon-Webservices-01.png' }
    @{ Key = 'partners/afdb-wide.png';         Src = '2025/09/African-Development-Bank-Group.png' }
    @{ Key = 'partners/afdb-square.png';       Src = '2025/09/african-development-bank-logo-06.png' }
    @{ Key = 'partners/african-union.png';     Src = '2025/09/african-union.png' }
    @{ Key = 'partners/smart-africa.png';      Src = '2025/09/Smart-Africa.png' }
    @{ Key = 'partners/zensar.png';            Src = '2025/09/Zensar-New-Logo-scaled.png' }
    @{ Key = 'partners/presidence-guinea.png'; Src = '2025/09/Presidence-Guinea-1.png' }
    # Project placeholders + heroes (audit Section 7.2)
    @{ Key = 'projects/placeholder-05.jpg';    Src = '2023/03/portfolio-image-05-free-img.jpg' }
    @{ Key = 'projects/placeholder-06.jpg';    Src = '2023/03/portfolio-image-06-free-img.jpg' }
    @{ Key = 'projects/placeholder-07.jpg';    Src = '2023/03/portfolio-image-07-free-img.jpg' }
    @{ Key = 'projects/placeholder-08.jpg';    Src = '2023/03/portfolio-image-08-free-img.jpg' }
    @{ Key = 'projects/placeholder-09.jpg';    Src = '2023/03/portfolio-image-09-free-img.jpg' }
    @{ Key = 'projects/placeholder-10.jpg';    Src = '2023/03/portfolio-image-10-free-img.jpg' }
    @{ Key = 'projects/placeholder-11.jpg';    Src = '2023/03/portfolio-image-11-free-img.jpg' }
    @{ Key = 'heroes/hero-bg.jpg';             Src = '2023/03/hero-bg.jpg' }
    @{ Key = 'heroes/interior-header.jpg';     Src = '2023/03/interior-header-image.jpg' }
    @{ Key = 'heroes/testimonial-bg.jpg';      Src = '2023/03/testimonial-image-free-img.jpg' }
)

function Write-Step([string]$Msg) { Write-Host "`n==> $Msg" -ForegroundColor Cyan }

Write-Step "Staging $($Assets.Count) assets into $OutDir"
$downloaded = 0; $skipped = 0; $failed = @()

foreach ($asset in $Assets) {
    $dest = Join-Path $OutDir ($asset.Key -replace '/', '\')
    $destDir = Split-Path -Parent $dest
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }

    if (Test-Path $dest) {
        $skipped++
        continue
    }

    $url = "$Base/$($asset.Src)"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -TimeoutSec 60
        $downloaded++
        Write-Host "  [OK] $($asset.Key)" -ForegroundColor Green
    } catch {
        $failed += "$($asset.Key)  ($url)"
        Write-Host "  [FAIL] $($asset.Key) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Step "Summary"
Write-Host "  Downloaded: $downloaded   Already present: $skipped   Failed: $($failed.Count)"
if ($failed.Count -gt 0) {
    Write-Host "  Failed assets (re-run to retry; WordPress may be serving the Hostinger default page for some paths):" -ForegroundColor Yellow
    $failed | ForEach-Object { Write-Host "    - $_" -ForegroundColor Yellow }
}
Write-Host "`n  Next: review $OutDir, then upload to your R2 bucket (afronovation-media) keeping these keys." -ForegroundColor Green
Write-Host "  Guide: docs/rebuild-guide.md Step 5." -ForegroundColor Green
