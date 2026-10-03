# Afronovation.com Rebuild

Rebuild of [afronovation.com](https://afronovation.com/) as a modern, conversion-focused web application. The current WordPress/Hostinger site is documented end-to-end in `audit_report.md`; everything needed to execute the rebuild lives in this repository.

## Stack

Next.js 15 (App Router) - TypeScript - Tailwind CSS v4 - Radix UI (shadcn) - Neon Postgres - Neon Auth (managed Better Auth) - Drizzle ORM - Cloudflare R2 - Resend - Vercel hosting (domain + DNS remain at Hostinger).

## Repository layout

| Path | Contents |
|---|---|
| `audit_report.md` | Full content + platform audit of the current site (frozen record) |
| `knowledgebase.md` | Living project brain: decisions, architecture, env registry, conventions |
| `backlog.md` | Phased execution plan (Phases 0-6) with priorities |
| `docs/rebuild-guide.md` | Operator runbook: scripts, credentials, DNS cutover, rollback |
| `docs/launch-checklist.md` | Phase 6: verified checks, account tasks, smoke test, go-live and rollback |
| `docs/lead-handling-guide.md` | Team guide: responding to website leads, downloads, subscribers and data requests |
| `.env.example` | Environment variable template (placeholders only) |
| `scripts/` | Idempotent PowerShell setup scripts (00-06) |
| `app/` | The Next.js application (created by `scripts/01-scaffold.ps1`) |

## Status

Phase 0 complete (documentation and scripts). No code has been scaffolded or executed yet - that begins once API keys are provided. Start with `docs/rebuild-guide.md`.

## Ground rules

- Never commit secrets; `.env.example` is the only env file in git.
- All marketing copy comes from the typed content module (`app/src/content/`) - never hard-code copy in components.
- Update `knowledgebase.md` before changing any decision.
