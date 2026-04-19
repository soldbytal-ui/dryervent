# CLAUDE.md — Project Guide for Claude Code

This file teaches Claude Code how to work on **Airflow Dryer Vent Cleaning**. Read it completely before making changes.

## Project Overview

Airflow Dryer Vent Cleaning is a Next.js 15 lead-generation website for a Tampa Bay dryer vent cleaning business (formerly named "Dry Vent Tampa" in early code history). The business is locally owned and independent — not a national franchise. The site is engineered to dominate both traditional Google search AND AI search engines (ChatGPT, Perplexity, Claude, Gemini).

**Phone:** (813) 744-1127 — always reference via `process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY`
**Production URL:** Set via `NEXT_PUBLIC_SITE_URL` env var. The client will choose a final domain later; until then the live deployment is at whatever URL is configured in `.env.local`.
**Team voice:** "the Airflow team" / "our certified technicians". Never mention personal names.
**Counter-positioning:** Against national franchises (Dryer Vent Wizard). Emphasize locally owned, not a franchise.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · Prisma · Supabase (Postgres) · Resend · Vercel · n8n webhook

## Critical Files

| File | Purpose |
|------|---------|
| `lib/areas.ts` | 15 service areas — EACH has unique SEO-optimized intro, why-local, neighborhoods, landmarks, drivers. Never make two areas say the same thing. |
| `lib/services.ts` | 5 services — each has definition-style intro (AI-extractable), benefits, process, FAQs. |
| `lib/schema.ts` | Schema.org generators. Use for every page. |
| `lib/seo.ts` | `buildMetadata()` helper — use on every page for consistent metadata. |
| `app/sitemap.ts` | Dynamic sitemap. Auto-includes new areas/services. |
| `app/llms.txt/route.ts` | AI crawler documentation. Update when adding major content. |
| `app/(marketing)/areas/[slug]/page.tsx` | Single template renders all 15 area pages. |
| `app/(marketing)/services/[slug]/page.tsx` | Single template renders all 5 service pages. |

## SEO Rules (Non-Negotiable)

1. **Every page needs:** metadata via `buildMetadata()`, schema markup via `<SchemaMarkup>`, breadcrumbs.
2. **AI-extractable intros:** First paragraph of every page should be a complete, standalone answer to the page's primary query. AI engines quote first paragraphs.
3. **FAQ schema:** Every service and area page includes 4+ FAQs with `faqSchema()`.
4. **Internal links:** Every area page links to all services; every service page links to all areas.
5. **Originality:** Never duplicate content between pages. Each area/service is genuinely unique.
6. **Local signals:** Area pages must include ZIP codes, county, neighborhoods, landmarks.

## AI Search Optimization Rules

1. **Definition-style intros.** Start with: "[Topic] is [clear definition]. [Key fact]." — AI quotes this.
2. **Statistics with sources.** "According to NFPA..." — AI cites sources.
3. **Structured comparisons.** Tables and clear bullet lists. AI extracts these.
4. **Question-shaped headings.** H2/H3 should match how people ask AI ("How often should...", "What does X cost...").
5. **Entity density.** Mention "Tampa Bay", "Florida", "NFPA 211", specific neighborhoods. Builds authority.
6. **Author signals.** "11 years serving Tampa Bay", "certified technicians", "15,000+ vents cleaned".

## Commands (Slash Commands)

See `.claude/commands/` folder:
- `/SEO` — Audit and optimize a page for traditional SEO
- `/firecrawl` — Scrape competitor sites for content gaps
- `/ai-seo` — Rewrite for AI search dominance

## Deployment Workflow

```bash
# Local dev
npm install
cp .env.example .env.local   # fill in secrets
npx prisma generate
npx prisma db push
npm run dev

# Production
git push origin main          # triggers Vercel deploy
```

## When Adding a New Service Area

1. Add entry to `lib/areas.ts` with unique `intro`, `why`, `neighborhoods`, `drivers`, `landmarks`, ZIPs, geo coords.
2. Sitemap auto-updates.
3. Run `/SEO areas/<slug>` to audit the new page.
4. Run `/ai-seo areas/<slug>` to optimize for AI search.
5. Add internal links from related service pages if relevant.

## When Adding a New Service

1. Add entry to `lib/services.ts` with unique `intro`, `description`, `benefits`, `process`, `faqs`.
2. Add icon mapping in `app/(marketing)/page.tsx` `serviceIcons` object.
3. Sitemap auto-updates.
4. Run `/SEO services/<slug>` to audit.

## Never Do

- Never hardcode phone numbers — use `process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY`
- Never duplicate content between area pages — each must be genuinely unique
- Never skip `SchemaMarkup` on a public page
- Never use generic AI-slop language ("in today's fast-paced world", "unlock your potential", etc.)
- Never commit `.env.local`
