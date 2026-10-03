# Afronovation.com: Launch Checklist (Phase 6)

What has been verified, what still needs Afronovation's accounts, and how to go live safely.

---

## 1. Verified before launch (2026-10-03)

| Area | Result |
|---|---|
| Accessibility (axe, WCAG 2.1 AA) | No issues on 12 key pages (home, solutions, platforms, a platform page, enterprise services, about, insights, an article, contact, client stories, privacy, admin sign-in) |
| Lighthouse, desktop | Performance 100 · Accessibility 100 · Best practices 96* · SEO 100 |
| Lighthouse, mobile (simulated slow 4G) | Performance 90-91 · Accessibility 100 · SEO 100. Re-measure on Vercel |
| Security headers | Content-Security-Policy, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy on every page |
| Form abuse protection | Contact 5 / newsletter 5 / downloads 10 submissions per visitor per 10 minutes; admin sign-in locks after 5 wrong passwords in 5 minutes (stored in the database, so limits hold on every server) |
| Admin | Hidden from search engines (`robots.txt`); signed-out visitors get "not found"; no public sign-up |
| Dependencies | Next.js upgraded to 16.3.8 (critical fixes); `pnpm audit --prod` leaves one moderate item in a database setup tool (drizzle-kit loader) that never runs on the live site |
| Content | Every admin section falls back to built-in content if the database is unreachable |

\* The best-practices note is about `upgrade-insecure-requests` on the plain-HTTP test server; it does not apply on HTTPS.

## 2. Needs Afronovation's accounts

| # | Task | Who | Where |
|---|---|---|---|
| 1 | Create the database tables and import content: `pnpm db:push`, `pnpm db:seed` | Developer, with Neon access | `docs/rebuild-guide.md`, Step 6 |
| 2 | Create the first Platform Admin: `pnpm admin:create "Name" email "password"` | Developer | Same |
| 3 | Make the media bucket public and copy its address into `R2_PUBLIC_URL` (needed for admin image/PDF uploads) | Cloudflare account owner | Cloudflare → R2 → bucket `afronovation` → Settings → Public access |
| 4 | Optional at launch: upload the staged media and downloads to R2 (`scripts/05-migrate-media.ps1`). Until then they are served from the website itself | Developer | Runbook Step 5 |
| 5 | Verify the sending domain in Resend (DKIM/SPF records in Hostinger DNS) so lead alerts, download emails and newsletter confirmations are delivered | Hostinger + Resend account owner | Runbook Step 7 |
| 6 | Create the Vercel project and add the environment variables below | Vercel account owner | `scripts/06-deploy.ps1 -PushEnv` |
| 7 | Deploy, then run the smoke test (section 4) on the `*.vercel.app` address | Developer | |
| 8 | Switch DNS at Hostinger to Vercel | Hostinger account owner | Runbook Step 7 |

**Production environment variables (Vercel):** `DATABASE_URL`, `BETTER_AUTH_SECRET` (new random value for production), `BETTER_AUTH_URL=https://afronovation.com`, `NEXT_PUBLIC_SITE_URL=https://afronovation.com`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`.

## 3. Decisions before launch

- **Analytics:** recommended: Vercel Web Analytics (cookie-free, no consent banner needed). Enable it in the Vercel project once it exists.
- **Remove test content:** the live database starts from the built-in content, so test entries from development are not carried over.
- **Content sign-off:** testimonials stay hidden until real, approved quotes are added in the admin.

## 4. Smoke test on the Vercel preview (about 15 minutes)

1. Homepage: hero rotates, flash banner rotates and can be paused, menus open, mobile "Book a Briefing" bar appears after scrolling.
2. Every main page loads: Solutions, Platforms (and EmbassyOS), Enterprise services, About, Insights, the article, Contact, Client stories, Privacy, Terms.
3. Submit the contact form via "Book a Briefing": the lead appears in Admin → Leads and the alert email arrives.
4. Download the roadmap from the article: the PDF opens, the lead appears, the email copy arrives.
5. Subscribe to the newsletter in the footer: the confirmation email arrives, and after clicking it the subscriber shows as Confirmed.
6. Admin: sign in, edit the flash banner, check the change is live, then change it back.
7. Check `https://<preview>/sitemap.xml` and `/robots.txt`.

## 5. Go-live and rollback

- **Go live:** in Hostinger DNS, point `@` (A record) to `76.76.21.21` and `www` (CNAME) to `cname.vercel-dns.com`; lower TTL to 300 seconds first. Vercel issues the SSL certificate automatically.
- **Check after switching:** the padlock (HTTPS) is shown, `www` redirects correctly, and one test lead and one test download work.
- **Rollback (if anything is wrong):** restore the previous A record (`193.42.137.207`) in Hostinger. The old WordPress site is back within minutes. Keep WordPress running for two weeks after launch before retiring it.

## 6. After launch

- Re-run Lighthouse on the live domain (mobile and desktop).
- Submit `https://afronovation.com/sitemap.xml` in Google Search Console.
- Gather feedback on the roadmap PDF and article; edit them in the admin.
- Turn on social media accounts in Admin → Social media as each one goes live.
- French version: planned as the next enhancement.
