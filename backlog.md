# Afronovation Rebuild - Backlog

> Prioritized execution plan from scaffold to launch. Phases are sequential; stories within a phase are roughly ordered. Priority: **P0** = launch blocker, **P1** = launch-critical polish, **P2** = post-launch. Size: S (< half day), M (1-2 days), L (3+ days).
>
> Content decisions pending stakeholder answers are tracked in `knowledgebase.md` Section 11 (Q1-Q13) and gate the stories marked [blocked-Qn]. Q10 is resolved; Q11-Q13 were added during Phase 2R (trademark clearance, verified impact metrics, R2 custom domain).

---

## Phase 0 - Documentation & Scripts (COMPLETE)

- [x] Site + platform audit (`audit_report.md`) - Kimi K2.7
- [x] Knowledge base (`knowledgebase.md`)
- [x] Backlog (this file)
- [x] Operator runbook (`docs/rebuild-guide.md`)
- [x] Environment template (`.env.example`)
- [x] PowerShell setup scripts (`scripts/00-06*.ps1`)

**Exit criteria:** all documents committed in project root. Status: DONE 2026-07-28.

## Phase 1 - Scaffold & Design System

*Prerequisite: API keys provided (Neon, Cloudflare R2, Resend) and `.env.local` populated from `.env.example`. Execution is delegated to a Composer 2.5 agent per project decision.*

| ID | Story | P | Size |
|---|---|---|---|
| 1.1 | Run `scripts/00-prerequisites.ps1`; verify Node 20+, pnpm, git, Vercel CLI | P0 | S |
| 1.2 | Run `scripts/01-scaffold.ps1`; Next.js 15 + TS strict + Tailwind v4 + shadcn/Radix app created in `app/` | P0 | S |
| 1.3 | Initialize git repo, `.gitignore` (env files, media-staging), first commit | P0 | S |
| 1.4 | Design tokens: brand palette from logo, typography scale, spacing, radii in Tailwind theme | P0 | M |
| 1.5 | Core UI kit: Button, Card, Badge, Section, Container, eyebrow/heading primitives | P0 | M |
| 1.6 | App shell: sticky header + mega menu (Radix NavigationMenu: Services, Projects, Company panels) + persistent primary CTA | P0 | L |
| 1.7 | Mobile drawer navigation (Radix Dialog + Accordion) mirroring mega menu | P0 | M |
| 1.8 | Footer with nav, contact details (from content module), social links [blocked-Q9], legal links | P0 | S |
| 1.9 | Security headers in Next.js config per knowledgebase Section 9 | P0 | S |

**Exit criteria:** `pnpm dev` renders the app shell with mega menu on desktop and mobile; Lighthouse a11y baseline >= 95.

**Status:** DONE 2026-07-29 (scaffold executed; 1.6/1.8 superseded by Phase 2R's 4-panel mega menu and Wordmark-based header/footer).

## Phase 2 - Content Module & Marketing Pages

| ID | Story | P | Size |
|---|---|---|---|
| 2.1 | Typed content module (`src/content/`): practice areas, services, team, testimonials, partners, contact details - copy verbatim from `audit_report.md` | P0 | M |
| 2.2 | Apply stakeholder content decisions (typos, titles, testimonial status) [blocked-Q1-Q6] | P0 | S |
| 2.3 | Home: hero + trust bar, capabilities, services grid, engagements preview, testimonial preview, team preview, unified CTA | P0 | L |
| 2.4 | About: story, values, full team section with headshots + LinkedIn links | P0 | M |
| 2.5 | Services: three practice areas with key-services detail, mid-page CTA | P0 | M |
| 2.6 | Projects index: placeholder project cards (sector/scope/outcome slots, "case study coming soon") | P0 | M |
| 2.7 | `/projects/[slug]/` case-study template (placeholder state) | P1 | M |
| 2.8 | Testimonials: carousel + partner logo wall | P0 | M |
| 2.9 | Unified CTA section component used on every page (defined once) | P0 | S |
| 2.10 | Mega menu Projects panel wired to placeholder project data | P0 | S |
| 2.11 | `/privacy/` + `/terms/` pages [blocked-Q8] | P0 | S |
| 2.12 | Legacy redirects (`/Contact/` -> `/contact/`, `/hello-world/`, `/feed/`, `/author/*`) | P1 | S |

**Exit criteria:** all routes render from the content module with zero hard-coded copy in components; placeholder projects appear in mega menu, index, and detail template.

**Status:** DONE 2026-07-29, then superseded by Phase 2R below (2.6/2.7/2.10 replaced by the Platforms ecosystem; 2.11 delivered with real copy, not just unblocked).

## Phase 2R - Dark Conversion Redesign & Enterprise Platform Ecosystem (COMPLETE)

*Stakeholder-directed pivot (2026-07-29): real API credentials wired in, visual identity moved to a dark-forward theme, and the site's content pillars expanded from "Services + Projects" to "Services + Enterprise Digital Services + Platforms". Full plan: `dark_conversion_redesign_e17df0f6.plan.md`.*

| ID | Story | P | Size |
|---|---|---|---|
| 2R.1 | Environment linkage: `.gitignore` fix for `afronovation_APIs.md`, `app/.env.local` populated, self-generated `BETTER_AUTH_SECRET` | P0 | S |
| 2R.2 | Brand identity: `Wordmark` component, code-generated icon/apple-icon/OG images via `next/og`, `manifest.ts` | P0 | M |
| 2R.3 | Dark design tokens (`globals.css`): gold `primary` / teal `accent` oklch palette, gradient-mesh + radial-glow + stat-number + badge-roadmap utilities | P0 | M |
| 2R.4 | 4-panel mega menu (Services / Platforms / Enterprise Digital Services / Company) + matching mobile accordion | P0 | L |
| 2R.5 | Content model v2: `enterprise-services.ts` (18 services, 5 categories), `platforms.ts` (7 case studies + EmbassyOS flagship + Future Platforms callout), `process-steps.ts`, `methodologies.ts`, `faq.ts`, `audiences.ts` - `projects.ts` removed | P0 | L |
| 2R.6 | Demo-request flow: `contact_submissions` extended (`platform_slug`, `organization_type`, `inquiry_type`, `utm_*`), `/api/contact` handles both `contactFormSchema` and `demoRequestSchema`, `DemoRequestForm` component | P0 | M |
| 2R.7 | Homepage rebuild: hero, stat bar, audience strip, methodology badges, comparison section, engagement process, flagship spotlight, Enterprise Services teaser, logo marquee, testimonial carousel, FAQ | P0 | L |
| 2R.8 | `/enterprise-services/` catalog page (5 categories, Roadmap badges, anchor links) | P0 | M |
| 2R.9 | `/platforms/` index + `/platforms/[slug]/` canonical case-study template; `/projects` -> `/platforms` redirects | P0 | L |
| 2R.10 | Restyle About/Services/Testimonials/Contact for the dark theme (icon-chip colors, `InteriorHero` overlay fix) | P0 | M |
| 2R.11 | SEO/trust pass: dynamic OG images (root + per-platform), Organization/Person/FAQPage JSON-LD, `sitemap.ts`, `robots.ts`, real Privacy/Terms copy, custom `not-found.tsx`, skip-link | P0 | M |
| 2R.12 | Docs sync: this file + `knowledgebase.md` Sections 2, 3, 5, 6, 7, 11, 12 | P0 | S |

**Exit criteria:** `pnpm lint` and `pnpm build` clean; every route renders in the dark theme; mega menu, marquee, carousel, and demo form are keyboard/screen-reader accessible; contact + demo APIs reach Neon/Resend when credentials are present and fall back to local JSONL otherwise. Tracked in `verify-redesign` (Phase 2R.13, in progress).

## Phase 3 - Lead Capture (Neon Postgres + Resend)

| ID | Story | P | Size |
|---|---|---|---|
| 3.1 | Run `scripts/02-setup-database.ps1`; `contact_submissions` schema + migration against Neon | P0 | S |
| 3.2 | Staged 2-step contact form (step 1 identity, step 2 needs) preserving the audit's 8-field spec; corrected interest options [blocked-Q4] | P0 | M |
| 3.3 | `/api/contact` route: zod validation, honeypot, DB insert via Drizzle, Resend notification to `CONTACT_TO_EMAIL` - **extended in Phase 2R** to also accept platform demo requests (`formType: "demo-request"`) on the same route/table | P0 | M |
| 3.4 | Per-IP rate limiting (decide Upstash vs Vercel KV at implementation) | P0 | S |
| 3.5 | Form UX states: per-step validation, progress, success/error, consent copy linking to `/privacy/` | P0 | S |
| 3.6 | Analytics events: `cta_click`, `form_step_complete`, `form_submit`, `megamenu_open` | P1 | S |
| 3.7 | Resend domain verification (DKIM/SPF records in Hostinger DNS) - pre-cutover task | P0 | S |

**Exit criteria:** a submission on the preview deployment lands in `contact_submissions` and triggers a Resend email; spam/honeypot submissions are dropped silently.

## Phase 4 - Media Migration to Cloudflare R2

| ID | Story | P | Size |
|---|---|---|---|
| 4.1 | Run `scripts/05-migrate-media.ps1`; ~30 curated assets (audit Sections 7.1-7.2) staged locally | P0 | S |
| 4.2 | Create R2 bucket + API token; enable public access (or bind `media.afronovation.com` custom domain) - bucket/token exist (`afronovation`); **`R2_PUBLIC_URL` still unset**, see knowledgebase Section 7 / Q13 | P0 | S |
| 4.3 | Upload staged assets to R2 with stable key names (kebab-case, no timestamps) | P0 | S |
| 4.4 | Content module image references switched to R2 URLs; `next/image` remote patterns configured | P0 | S |
| 4.5 | Alt text written for every migrated image (audit found 100% empty alts) | P0 | M |
| 4.6 | Verify performance budget (knowledgebase Section 10): responsive sizes, WebP/AVIF, no oversized sources | P1 | S |

**Exit criteria:** no image served from the repo or from `afronovation.com/wp-content`; every image has meaningful alt text.

## Phase 5 - Admin & Auth (Neon managed Better Auth)

| ID | Story | P | Size |
|---|---|---|---|
| 5.1 | Run `scripts/03-setup-auth.ps1`; self-hosted Better Auth (Drizzle adapter) wired, env vars set - see knowledgebase Section 4 auth decision | P1 | M |
| 5.2 | `/admin` gated server-side; unauthenticated requests return 404 | P1 | S |
| 5.3 | Drizzle tables `platforms`, `testimonials`, `team_members`; seed from content module | P1 | M |
| 5.4 | Admin CRUD for platforms (case-study rich fields stay content-module-only until this is scoped in detail) | P1 | L |
| 5.5 | Admin CRUD for testimonials and team members | P2 | M |
| 5.6 | Admin: view/export `contact_submissions` | P2 | M |
| 5.7 | R2 image upload from admin (S3-compatible presigned flow) | P2 | M |

**Exit criteria:** a stakeholder can publish a real case study via `/admin` and see it in the mega menu, index, and detail page without a code change. (Note: table renamed `platforms` in Phase 2R; content model is the `Platform` type, richer than the DB row until this phase.)

## Phase 6 - SEO, Launch Hardening & DNS Cutover

| ID | Story | P | Size |
|---|---|---|---|
| 6.1 | Per-page metadata (crafted titles/descriptions - replacing auto-generated ones), OpenGraph/Twitter cards, sitemap.xml, robots.txt - **delivered in Phase 2R** (dynamic OG images, `sitemap.ts`, `robots.ts`); revisit per-route title/description copy before launch | P0 | M |
| 6.2 | Structured data: Organization/ProfessionalService, Person, FAQPage JSON-LD - **delivered in Phase 2R**; BreadcrumbList still open | P1 | S |
| 6.3 | Lighthouse pass: performance >= 90, a11y >= 95, SEO >= 95 on all marketing routes | P0 | M |
| 6.4 | `pnpm audit` clean (or documented exceptions); dependency pinning review | P1 | S |
| 6.5 | Vercel project linked, production env vars pushed (`scripts/06-deploy.ps1 -PushEnv`) | P0 | S |
| 6.6 | Production deploy smoke test on `*.vercel.app` (form end-to-end, images, headers via securityheaders.com) | P0 | S |
| 6.7 | Hostinger DNS cutover: A `@` -> `76.76.21.21`, CNAME `www` -> `cname.vercel-dns.com`; remove old A record `193.42.137.207`; TTL 300 during cutover | P0 | S |
| 6.8 | Verify SSL issuance, www/apex redirect, form delivery, analytics on the live domain | P0 | S |
| 6.9 | Decommission WordPress (export backup first); cancel/retire Hostinger hosting plan - keep domain registration | P1 | S |
| 6.10 | Rollback drill documented and rehearsed (restore old A record; see runbook) | P1 | S |

**Exit criteria:** `https://afronovation.com` serves the Next.js site with valid SSL; lead form delivers email; old WordPress origin no longer publicly referenced.

## Post-Launch (Parking Lot)

- Blog/insights hub (Neon-backed) for SEO
- Vercel Analytics conversion funnels + A/B tests on hero CTA
- Performance: R2 custom domain (`media.afronovation.com`) + Cloudflare cache rules review (Q13)
- Verified impact metrics to replace every "Target outcome" pill across the 7 platform case studies (Q12)
- Trademark clearance review for BridgeX / Civis / ElectionOS naming (Q11)

### Deferred enhancements (explicitly out of scope for Phase 2R, per plan)

- EN/FR bilingual routing
- Downloadable lead-magnet PDF
- Newsletter capture (Resend audiences)
- Live chat / AI concierge widget
- Vercel Analytics + Speed Insights (natural fit once the Vercel project exists at deploy time)
