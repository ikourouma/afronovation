# Afronovation Rebuild - Operator Runbook

> Step-by-step instructions to rebuild and relaunch afronovation.com. Read fully before running anything. All scripts live in `scripts/` and are idempotent - re-running is safe.
>
> **Do not start until you have the API keys** (Neon, Cloudflare R2, Resend) - see Step 0.

---

## Step 0 - Gather credentials

Collect these before touching the scripts (registry with exact locations: `knowledgebase.md` Section 7):

1. **Neon:** create a project at console.neon.tech; copy the pooled connection string (`DATABASE_URL`). Enable Neon Auth and copy `NEON_AUTH_BASE_URL`.
2. **Cloudflare R2:** create bucket `afronovation-media`; create an R2 API token (Object Read & Write, scoped to the bucket); note account ID, access key ID, secret access key.
3. **Resend:** create an API key; add and verify the sending domain `afronovation.com` (DNS records go into Hostinger - see Step 6).
4. **Vercel:** account + CLI login (`vercel login`).
5. Copy `.env.example` to `app/.env.local` after Step 2 creates the `app/` folder, and fill every value. Never commit this file.

## Step 1 - Verify prerequisites

```powershell
.\scripts\00-prerequisites.ps1
```

Checks Node 20+, pnpm, git, and the Vercel CLI. Re-run with `-InstallMissing` to let it install what's missing via corepack/npm.

## Step 2 - Scaffold the application

```powershell
.\scripts\01-scaffold.ps1
```

Creates the Next.js 15 app (TypeScript strict, Tailwind v4, App Router, src dir) in `app/`, initializes shadcn (Radix), adds the component set for the mega menu and forms, and installs drizzle-orm, better-auth, the Neon serverless driver, Resend, the S3 client for R2, zod, and react-hook-form.

Then: `cd app; copy ..\.env.example .env.local` and fill in the values from Step 0.

## Step 3 - Database

```powershell
.\scripts\02-setup-database.ps1
```

Writes the Drizzle schema (`contact_submissions` plus the Phase 5 content tables), the DB client, and `drizzle.config.ts`. If `DATABASE_URL` is set and reachable, it generates and applies migrations; otherwise it stops after writing files and tells you what to run later.

## Step 4 - Storage and email

```powershell
.\scripts\04-setup-storage-email.ps1
```

Writes the R2 S3 client helper, the Resend client, and the `/api/contact` route handler skeleton (zod validation -> DB insert -> email notification). Phase 3 backlog stories complete the honeypot and rate limiting.

## Step 5 - Media staging and upload

```powershell
.\scripts\05-migrate-media.ps1
```

Downloads the ~30 curated assets identified in `audit_report.md` Sections 7.1-7.2 from the live WordPress library into `app/public/media-staging/`. Review the folder, rename to stable kebab-case keys, then upload to your R2 bucket (dashboard drag-and-drop or an S3-compatible CLI). Point `R2_PUBLIC_URL` at the bucket's public URL or custom domain.

## Step 6 - Auth (Phase 5; can be deferred)

```powershell
.\scripts\03-setup-auth.ps1
```

Wires Neon Auth (managed Better Auth): auth config, route handler, client helper, and the `/admin` gate skeleton. Requires `DATABASE_URL`, `NEON_AUTH_BASE_URL`, and `BETTER_AUTH_SECRET` (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).

## Step 7 - Deploy and cut over

```powershell
.\scripts\06-deploy.ps1              # verify env + link Vercel project
.\scripts\06-deploy.ps1 -PushEnv     # push app/.env.local values to Vercel production
.\scripts\06-deploy.ps1 -Deploy      # vercel --prod
```

### Resend DNS (do before cutover, in Hostinger hPanel -> Domains -> DNS)

Add the DKIM/SPF records exactly as shown in the Resend dashboard for `afronovation.com` (typically a TXT record for SPF and CNAME/TXT records for DKIM, plus an MX for the sending subdomain if provided). Domain verification must be green in Resend before the form goes live.

### DNS cutover (Hostinger hPanel)

1. Lower TTL to 300 on the existing records a few hours ahead.
2. Delete/park the old A record pointing at the WordPress origin (`193.42.137.207` at audit time).
3. Add: **A record** `@` -> `76.76.21.21` (Vercel anycast).
4. Add: **CNAME** `www` -> `cname.vercel-dns.com`.
5. In the Vercel project, add domains `afronovation.com` and `www.afronovation.com`; wait for SSL (automatic once DNS resolves).
6. Smoke test: apex and www load, redirect to canonical host, form submits end-to-end (check Neon row + Resend email), images load from R2, headers pass (securityheaders.com).

### Rollback

If anything fails after cutover: in Hostinger DNS, restore the A record `@` -> `193.42.137.207` and remove the Vercel records. The WordPress site remains untouched until backlog item 6.9 (decommission) is explicitly executed, so rollback is DNS-only.

## Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| `pnpm` not found in Step 2 | Corepack not enabled | Run Step 1 with `-InstallMissing` |
| Migrations skipped | `DATABASE_URL` missing/placeholder | Fill `app/.env.local`, re-run Step 3 |
| Images 404 after deploy | `R2_PUBLIC_URL` wrong or bucket not public | Check bucket public access; update env; redeploy |
| Form 500 | Resend key or `CONTACT_FROM_EMAIL` unverified | Verify domain in Resend; check function logs in Vercel |
| SSL pending after cutover | DNS not propagated or old A record remains | `nslookup afronovation.com`; remove leftover Hostinger records |
