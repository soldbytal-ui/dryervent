# SEO Audit — /services/residential-dryer-vent-cleaning

**URL audited:** https://dryervent.vercel.app/services/residential-dryer-vent-cleaning
**Date:** 2026-04-19
**Primary keyword:** residential dryer vent cleaning
**Secondary:** dryer duct cleaning / vent line cleaning

---

## Overall Score: 78 / 100

| Category | Score | Notes |
|---|---|---|
| Title / Meta | 6 / 10 | Title duplicated "Dry Vent Tampa", description truncated mid-word |
| Canonical / OG / Twitter | 9 / 10 | All present and correct |
| Heading hierarchy | 9 / 10 | Clean H1 > H2 > H3, H1 is definition-style |
| Schema markup | 7 / 10 | Works, but LocalBusiness duplicated on every page; breadcrumb item 2 URL wrong |
| Content depth | 8 / 10 | ~1,300 words; strong structure |
| AI extractability | 9 / 10 | Excellent definition intro, entity density solid |
| Internal linking | 10 / 10 | All 15 areas + 4 sibling services linked |
| Trust signals | 8 / 10 | 11+ years, 15,000+ jobs, 847 reviews, NFPA/USFA cited |
| Pricing transparency | 9 / 10 | "From $99" in title, hero, offer schema |
| CTA / phone consistency | 10 / 10 | (813) 744-1127 appears 10x in body, +18137441127 in tel: links; consistent |
| GEO / keyword coverage | 6 / 10 | "dryer duct" not used; no stats ("34% of fires caused by…") |

---

## Critical Issues (fix now)

### 1. Title tag has duplicated brand suffix
Rendered title:
`Residential Dryer Vent Cleaning Tampa Bay | From $99 | Dry Vent Tampa | Dry Vent Tampa`

**Cause:** `app/layout.tsx` sets `title.template = '%s | Dry Vent Tampa'` and `app/(marketing)/services/[slug]/page.tsx:24` already ends the page title with `| Dry Vent Tampa`. Next.js appends the template producing the double suffix.

**Fix:** In `app/(marketing)/services/[slug]/page.tsx`, remove the trailing `| Dry Vent Tampa` from the page title string (same bug likely present on areas template).

### 2. Meta description truncated mid-word
Rendered: `...from the entire dryer exhaust system — from the d`

**Cause:** `seo.ts`/`page.tsx:25` uses `service.intro.slice(0, 155)` which hard-slices without word boundary and includes a dangling em dash.

**Fix:** Either write a purpose-built 150–158 char description field per service, or slice at the nearest word boundary ending with punctuation. Target 150–160 chars ending with a period or "Tampa Bay.".

### 3. Breadcrumb schema item 2 points to wrong URL
`app/(marketing)/services/[slug]/page.tsx:43` sets the "Services" breadcrumb item's `url` to `/services/residential-dryer-vent-cleaning` (hardcoded current-service slug) instead of `/services` (the service index). This produces an identical URL for breadcrumb positions 2 and 3 in the rendered JSON-LD.

**Fix:** change the line to `{ name: 'Services', url: '/services' }`. Confirm `/services` route exists (or point to `/` / `/#services`).

### 4. LocalBusiness emitted on every service page
The page emits a full `LocalBusiness` schema block (with aggregateRating, openingHours, etc.) in addition to `Service`, `FAQPage`, and `BreadcrumbList`. Google will dedupe by `@id` but best practice is to emit LocalBusiness only on the homepage / contact page, and everywhere else reference it via `provider: {"@id": "...#business"}` (which `serviceSchema` already does correctly).

**Fix:** Move `localBusinessSchema()` out of the shared layout / root and emit only at `/` (and optionally /contact). Keeps `@id` canonical.

### 5. Address schema is anemic
`LocalBusiness.address` has no `streetAddress` and no `postalCode`. Google requires streetAddress + postalCode for LocalBusiness rich results and local pack consideration. `addressLocality` is just "Tampa" with no real street.

**Fix:** Add real `streetAddress` and `postalCode` fields, or switch to `@type: "Organization"` if there is no physical storefront.

---

## Content Gaps

### Missing elements

- **"Dryer duct cleaning" synonym never appears.** Body uses "vent line" (4x) and "exhaust system" (14x) but not the common search term "dryer duct cleaning" nor "dryer vent duct". Add 1–2 natural mentions (e.g., in the Description paragraph or an FAQ: "Is dryer duct cleaning the same as dryer vent cleaning?").
- **No statistic citations.** CLAUDE.md mandates "According to NFPA…" stats. Page mentions NFPA and U.S. Fire Administration by name but cites zero numbers. Add: "According to the U.S. Fire Administration, dryers cause approximately 2,900 home fires per year, with failure to clean the #1 contributing factor (34% of fires)." — AI engines love citable numeric claims.
- **No NFPA 211 number reference.** Commercial and repair service pages name "NFPA 211" explicitly; residential page only says "National Fire Protection Association." Add "NFPA 211 Standard for Chimneys, Fireplaces, Vents, and Solid Fuel-Burning Appliances" once in body copy.
- **No explicit cost table / price range.** "From $99" is shown but there's no breakdown ("Standard 1-story: $99–$149 · Roof vent: $189–$249 · Long run >25ft: +$49"). Pricing tables are highly AI-extractable and feature-snippet-friendly.
- **Missing local ZIP codes.** Page mentions 15 cities but no Tampa-area ZIP codes. CLAUDE.md rule #6 specifically calls for ZIPs on local signals; they exist in `lib/areas.ts` but aren't surfaced here. Add a line like "Serving 33602, 33606, 33609, 33611…".
- **No author/reviewer signal.** No "Written by [Name], certified Tampa Bay technician" or "Last reviewed April 2026" byline. E-E-A-T signal for AI citation.
- **FAQs could go deeper.** Only 4 FAQs. Add 2–4 more: cost Q, DIY vs pro Q, "how do I know my vent needs cleaning" symptom list, warranty Q.
- **No comparison table.** CLAUDE.md AI rule #3 calls for structured comparisons. A "Professional vs. DIY" or "Residential vs. Commercial" table would be extracted by AI overviews.
- **Hero `defaultService` logic ignores residential.** Line 57 of page.tsx: for the residential slug the prop falls through to `'cleaning'` which is fine, but the ternary chain is fragile — refactor to a map.

### Schema / technical

- No `Service.serviceType` (use `"Dryer Vent Cleaning"`)
- No `Service.category`
- No `Service.hasOfferCatalog` bundling other services
- `Service` has no `@id` — add `@id: "{SITE}/services/residential-dryer-vent-cleaning#service"` for future cross-schema references
- `Offer.priceValidUntil` missing (Google warning for offers)
- No `AggregateOffer` at the service level even though the LocalBusiness has `aggregateRating`
- Review schema (`reviewSchema`) doesn't appear to be emitted on this page despite `Reviews` component rendering — only LocalBusiness aggregateRating is present
- `llms.txt` should explicitly list this URL as a high-priority service endpoint (verify in `app/llms.txt/route.ts`)

### Keyword coverage

- Primary "residential dryer vent cleaning" — 5+ exact matches ✓
- "dryer vent cleaning Tampa" — ✓
- "dryer duct cleaning" — MISSING
- "dryer vent cleaning near me" — in keywords meta only, not in body
- "dryer vent cleaning cost" — MISSING (high intent)
- "how often clean dryer vent" — covered in FAQ ✓
- "dryer fire" — covered ✓

---

## What's Working Well

- **Definition-style H1 and first paragraph** — textbook AI-extractable opener.
- **Question-shaped H2s** ("How It Works", "Why Choose…") align with AI query patterns.
- **Phone consistency** — display format `(813) 744-1127` and tel format `+18137441127` both correct and consistent.
- **Service schema `provider` correctly references LocalBusiness `@id`** — no collision.
- **15 area pages linked + 4 sibling services linked** — satisfies CLAUDE.md internal-link rule.
- **Authority anchors present:** NFPA, U.S. Fire Administration, 11+ years, 15,000+ jobs, 847 reviews, 4.9 rating.
- **Pricing disclosed** in title, hero, and Offer schema.
- **FAQ schema valid** with 4 FAQs (minimum met).
- **Canonical, OG, Twitter all correct** and consistent.

---

## Priority Fix Order

1. Remove duplicate "| Dry Vent Tampa" from page title string (5-min fix, `page.tsx:24`)
2. Fix breadcrumb item 2 URL `/services/residential-dryer-vent-cleaning` → `/services` (1-min fix, `page.tsx:43`)
3. Write a purpose-built 150–158 char meta description (no mid-word truncation)
4. Add streetAddress + postalCode to LocalBusiness OR drop LocalBusiness from service pages
5. Add "dryer duct cleaning" synonym + 2 cited statistics ("According to USFA…34%…")
6. Add 3 more FAQs (cost, DIY vs pro, warning signs)
7. Add pricing breakdown table
8. Add ZIP code mentions in local-signals block
9. Add author/reviewer byline for E-E-A-T
10. Move LocalBusiness schema to homepage-only
