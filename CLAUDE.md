# CLAUDE.md — Project Guide for Claude Code

This file teaches Claude Code how to work on **Airflow Dryer Vent Cleaning**. Read it completely before making changes.

## Project Overview

Airflow Dryer Vent Cleaning Tampa is a Next.js 15 lead-generation website for a Tampa Bay dryer vent cleaning business (formerly named "Dry Vent Tampa" in early code history). The business is locally owned and independent — not a national franchise. The site is engineered to rank in both traditional Google search AND AI search engines (ChatGPT, Perplexity, Claude, Gemini).

**Status:** 8-phase SEO build complete as of 2026-04-21. See `seo-audit/final-launch-audit.md` and `seo-audit/launch-checklist.md` for current state and pre-launch tasks.

**Site inventory:** 65 static pages, 46 URLs in sitemap, 23 service-area city pages, 5 county hubs, 5 services, 4 specialty pages, 3 blog posts, core pages (/, /pricing, /about, /contact).

**Phone:** (813) 744-1127 — always reference via `process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY`
**Production URL:** Set via `NEXT_PUBLIC_SITE_URL` env var. The client will choose a final domain later; until then the live deployment is at whatever URL is configured in `.env.local`.
**Team voice:** "the Airflow team" / "our technicians" / "our trained technicians". Never mention personal names. Do NOT use "certified technicians" or "NFPA 211 certified" — those imply credentials we can't back.
**Counter-positioning:** Against national franchises (Dryer Vent Wizard). Emphasize locally owned, not a franchise.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · Prisma · Supabase (Postgres) · Resend · Vercel · n8n webhook

## Critical Files

| File | Purpose |
|------|---------|
| `lib/areas.ts` | 23 service areas with shared `Area` type (slug, name, county, zip[], population, lat/lng, intro, why, neighborhoods[], landmarks[], drivers[]). No `placeholder: true` entries remain — all 23 are indexable. |
| `lib/area-content.ts` | Per-city enhanced content (longIntro, whyClogHere, neighborhoodDetail with ZIPs, pricingNotes, cityFaqs, testimonial, counterPositioning). Shared `STANDARD_PRICING` table drives the pricing table on every enhanced area page. 23/23 cities have entries. |
| `lib/services.ts` | 5 services with `Service` type including optional `free?: boolean` flag (inspection uses it). |
| `lib/schema.ts` | Schema.org generators: `localBusinessSchema(area?)`, `organizationSchema()`, `websiteSchema()`, `serviceSchema()`, `faqSchema()`, `breadcrumbSchema()`, `aboutPageSchema()`, `contactPageSchema()`, `webPageSchema()`, `articleSchema()`, `reviewSchema()` (stub). |
| `lib/seo.ts` | `buildMetadata()` helper — use on every page. |
| `lib/internal-links.ts` | COUNTIES registry, `getCountyList`, `getCountyBySlug`, `getCitiesByCounty`, `getCountyNeighbors`, `getNearbyAreas` (haversine miles), `getAllCities`, `getAreaTags`, `getTaggedAreas`, `getRelatedSpecialtyPages`, `getRelatedBlogPosts`, `getPopularCities`. Eight market tags: condo-dense, master-planned, rental-heavy, historic-housing, new-construction, retirement, waterfront, rural-large-lot. |
| `lib/posts.ts` | Blog posts with `Post` type + `BodySection` discriminated union (p/h2/h3/ul/ol/callout/faq). 9 entries: 3 full posts + 6 placeholder posts. Sitemap filters to posts with body. |
| `lib/reviews.ts` | DISABLED stub. Empty reviews array. Re-enable when 5+ verified Google reviews exist. |
| `app/layout.tsx` | Root metadata + 3 root JSON-LD blocks: Organization → WebSite → LocalBusiness. |
| `app/sitemap.ts` | Dynamic sitemap. Priority rebalanced Phase 6: 1.0 home / 0.95 /pricing + /services/dryer-vent-inspection / 0.9 services + /local-vs-franchise / 0.85 specialty + Tier 1 cities / 0.75 counties / 0.7 Tier 2 + blog / 0.55 about+contact+blog-index. |
| `app/robots.ts` | Allow all, disallow /api/ + /_next/ + /admin/. 12 AI crawlers explicitly allowed. |
| `app/llms.txt/route.ts` | AI crawler roadmap — rewritten Phase 8 with full service list, 23 cities by county, county hubs, educational resources, verified-vs-unverified citation guidance. |
| `app/(marketing)/areas/[slug]/page.tsx` | Single template renders all 23 area pages. Related Pages 3-column block (nearby cities with distance_miles + tag-filtered specialty + blog posts). |
| `app/(marketing)/areas/counties/[county]/page.tsx` | 5 county hubs. Adjacent Counties section before FinalCTA. |
| `app/(marketing)/services/[slug]/page.tsx` | 5 services dynamic route. |
| `app/(marketing)/services/condo-dryer-vent-cleaning/page.tsx` | Static file override for condo specialty; NOT in services array. |
| `app/(marketing)/hoa-dryer-vent-cleaning/page.tsx` | HOA specialty. |
| `app/(marketing)/landlord-dryer-vent-cleaning/page.tsx` | Landlord specialty. |
| `app/(marketing)/local-vs-franchise-dryer-vent-cleaning/page.tsx` | Counter-positioning flagship. |
| `components/Reviews.tsx` | No longer reads lib/reviews.ts — renders trust signals only. Re-wire when real reviews exist. |
| `components/TrustBar.tsx` | 4 verified signals (Free Inspection / $79+$10/ft / Locally Owned / Same-Day). No stats claims. |
| `components/Header.tsx` | 'use client'. Two-level county flyout. Airflow-lines SVG logo (not Flame icon). |
| `components/Footer.tsx` | Top row: Brand/Services/Company (3 cols). Full-width Service Areas block: 4 county columns. |
| `seo-audit/final-launch-audit.md` | Phase 8 comprehensive checklist. |
| `seo-audit/launch-checklist.md` | Client-facing pre-launch to-dos. |

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
6. **Author signals.** Use only verifiable trust phrases: "locally owned Tampa Bay", "free on-site inspection", "transparent per-foot pricing", "licensed and insured in Florida", "following NFPA 211 guidelines". **DO NOT** claim years-in-business, customer counts, review counts, or certifications (all unverified for a new business).

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
- **Never add unverifiable claims:** no specific review counts, years-in-business, customer volumes, NFPA/C-DET certifications, or satisfaction rate percentages. Airflow is a new brand. Use only verifiable trust signals (free inspection, transparent pricing, locally owned, licensed and insured, NFPA 211 *guidelines* — not *certification*).

## Build History

| Phase | Date | Scope |
|---|---|---|
| Phase 1 | 2026-04-19 | Rename "Dry Vent Tampa" → "Airflow Dryer Vent Cleaning" across codebase, fix LocalBusiness `@id` collision in `lib/schema.ts`, phone audit (placeholder → (813) 744-1127), 6 SEO audit reports saved to `seo-audit/` |
| Phase 1 hotfix | 2026-04-19 | Replace single "Areas" link in Header with two-level county→city flyout; create `/areas` index + 5 `/areas/counties/[county]` hub pages; `lib/internal-links.ts` helpers; add 8 Tier 2 stub cities (later enhanced in Phase 4) |
| Phase 2 | 2026-04-19 | Competitor research via agents: SERP analysis, Dryer Vent Wizard deep scrape, 3 local Tampa competitors (VentSmart, Superb, Clean Air Pros), production verification; 10 content gaps documented |
| Phase 3 | 2026-04-19 | Enhance all 15 Tier 1 cities (1,500–2,000 content words each), 3 batches (A: Tampa/St. Pete/South Tampa/Wesley Chapel/Brandon; B: New Tampa/Carrollwood/Westchase/Plant City/Apollo Beach; C: Riverview/Clearwater/Land O' Lakes/Lutz/Valrico) |
| Phase 3 pricing correction | 2026-04-19 | Per-foot pricing model rollout: $79 base (first 10 ft) + $10/ft after. STANDARD_PRICING table restructured with notes column. All 19 enhanced cities' pricingNotes + cityFaqs rewritten. AggregateOffer schema priceRange $79–$595 |
| Phase 4 | 2026-04-19 | Expand 8 Tier 2 city stubs to 1,200–1,800 content words each: Batch 1 (Sun City Center/Dunedin/Largo/Pinellas Park); Batch 2 (New Port Richey/Odessa/Bradenton/Sarasota with 45/55 mi service-radius notation). Free dryer vent inspection rebrand — `free?: boolean` flag on Service type; FREE badge and Offer{price:0} schema; homepage callout strip; header FREE INSPECTION pill; footer Free Inspection link; STANDARD_PRICING top row; llms.txt. Lutz multi-structure pricing clarification. |
| Phase 5 | 2026-04-19 | 8 new strategic pages: /pricing full rebuild (1,650 words, 15 FAQs including Phase 8 PAA additions, full pricing table); 3 blog posts with structured body + BodySection type + Article/FAQPage schema (dryer-takes-too-long-to-dry, signs-dryer-vent-is-clogged, how-often-clean-dryer-vent-florida); 4 specialty pages (local-vs-franchise, /services/condo-dryer-vent-cleaning, /hoa-dryer-vent-cleaning, /landlord-dryer-vent-cleaning); Footer + sitemap updated |
| Critical cleanup pass | 2026-04-20 | Remove false statistical claims (847 reviews, 15,000+ vents, 11+ years, 100% satisfaction, 4.9★) sitewide. Remove aggregateRating from LocalBusiness. Replace TrustBar stats with 4 verified signals. Deactivate `components/Reviews.tsx` placeholder rendering. NFPA language correction ("following NFPA 211 guidelines" — not "certified"). Remove testimonial section on area pages. Document deferred client TODOs (license #, insurance, reviews, address). |
| Phase 6 | 2026-04-21 | Internal linking utilities: `getCountyNeighbors`, `getAreaTags`, 8 MarketTags, `getTaggedAreas`, `getRelatedSpecialtyPages`, `getRelatedBlogPosts`, `getPopularCities`. `getNearbyAreas` upgraded to haversine miles. Related Pages 3-column blocks on 23 area pages + Adjacent Counties on 5 county hubs + tag-filtered city lists on 4 specialty pages + Related Resources on 3 blog posts. Footer county 4-column restructure. Sitemap priority rebalance. |
| Header logo swap | 2026-04-21 | Flame icon → 3 airflow S-curves (inline SVG). Same color tokens, same size, no visual design changes elsewhere. |
| Phase 7 | 2026-04-21 | Schema polish: LocalBusiness streetAddress + postalCode + GeoCircle 80467m areaServed + 2nd hasCredential. Added `organizationSchema()` + `websiteSchema()` (with SearchAction) + `aboutPageSchema()` + `contactPageSchema()` + `webPageSchema()` helpers. Centralized `articleSchema()`. `reviewSchema()` converted to no-op stub. robots.txt `/admin/` block. About/Contact/Blog/Pricing gained page-specific schema. |
| Phase 8 | 2026-04-21 | llms.txt comprehensive rewrite (verified vs unverified citation guidance, 23 cities by county, educational resources, peak season guidance). PAA schema additions on /pricing (3 new FAQs), /services/dryer-vent-inspection (2 new), /local-vs-franchise (1 new). HowTo schema evaluated and skipped (post is classification matrix, not sequential actions — Google reduced HowTo rich results in 2023). Final audit + launch checklist written to `seo-audit/`. |

## Deferred Client TODOs

All TODO comments in the codebase tag these client-dependent items:

1. **Street address** — `lib/schema.ts` `LocalBusiness.address.streetAddress` currently "Tampa, FL" placeholder. Update when real address is available.
2. **Business ZIP** — `LocalBusiness.address.postalCode` currently "33602" placeholder.
3. **Florida Contractor License number** — `hasCredential[0].identifier`.
4. **Insurance carrier + policy number** — `hasCredential[1].recognizedBy.name` + `identifier`.
5. **Raster logo PNG** — Organization schema references `/public/logo.png`; create asset (600×60 or 1:1 ≥112×112).
6. **Google Business Profile + 5 verified reviews** — enables re-activating `aggregateRating`, repopulating `lib/reviews.ts`, and re-wiring `components/Reviews.tsx`.
7. **Real customer photos** — activates `<Image>` + alt-text audit.
8. **`/search` route** — if implemented, `WebSite.potentialAction.SearchAction` becomes live (currently aspirational).
9. **`GOOGLE-ADS-PRELAUNCH-STRATEGY.md` line 240** — remove stale "15,000+ Tampa Bay Vents Cleaned" bullet before any ad campaign launches.
