# SEO Audit — /areas/tampa

URL: https://dryervent.vercel.app/areas/tampa
Audit date: 2026-04-19
Page type: Tier 1 City (primary local money page)

## Overall Score: 72 / 100

| Category | Score | Notes |
|---|---|---|
| Title & Meta | 6/10 | Targets primary kw but ignores "dryer duct cleaning" synonym (590 vol/mo gap). |
| Heading Structure | 9/10 | Clean H1, logical H2/H3, question-shaped headings present. |
| Schema | 5/10 | FAQ + Breadcrumb OK, but LocalBusiness @id collides site-wide and areaServed is not narrowed to Tampa. |
| Content Depth | 9/10 | ~3,200–3,500 words, strong. |
| Local Signals | 8/10 | 10 neighborhoods, 26 ZIPs in data (only 8 rendered in FAQ), Hillsborough County, 5 landmarks — but landmarks are NEVER rendered on page. |
| Internal Links | 10/10 | All 5 services + all 14 sibling areas linked. |
| Originality | 10/10 | Unique `intro`/`why`/`drivers` — no duplication vs other areas. |
| AI-Extractability | 8/10 | Definition-style intro present; stats/sources light. |
| Synonym Coverage | 2/10 | "dryer duct cleaning Tampa" = 0 occurrences. Competitors also ignore — easy win. |
| Canonical/Meta Desc | 5/10 | buildMetadata() emits canonical, but rendered extractor could not see explicit values — verify on live. |

---

## Critical Issues (P0 — fix first)

### 1. LocalBusiness `@id` collision across all pages
`lib/schema.ts:11` hardcodes:
```
'@id': `${SITE}#business`
```
Every area page, service page, and the homepage emit the SAME `@id`. Google dedupes and picks one entity; the Tampa page loses its local signal. Also `areaServed` is the full 15-city array regardless of page — Tampa's LocalBusiness block looks identical to St. Pete's, Clearwater's, etc.

**Fix:** For area pages, emit `@id: ${SITE}/areas/${slug}#business` and narrow `areaServed` to just `[{ '@type': 'City', name: area.name }]` (optionally + immediate neighbors). Keep the site-wide `#business` only on the homepage / organization-level schema.

### 2. "dryer duct cleaning Tampa" — 0 occurrences
Competitors in this SERP ignore this 590 vol/mo synonym. It's absent from the title, meta description, H1, H2s, intro, FAQs, and body copy. Adding it once to the title tag + once in the intro + once as an FAQ answer would capture a keyword cluster competitors don't even try for.

**Fix — title:**
`Dryer Vent Cleaning Tampa, FL | Dryer Duct Cleaning & Same-Day Service | Dry Vent Tampa`

**Fix — meta description:** add the synonym in sentence 1.

**Fix — body:** Add one line in the intro: "Also called *dryer duct cleaning*, this service removes lint from the entire exhaust run — not just the lint trap."

### 3. Missing "Bayshore" / "Palma Ceia" in Tampa `neighborhoods`
`lib/areas.ts:27` — the Tampa array has Hyde Park, SoHo, Davis Islands, Seminole Heights, Ybor, Channelside, Westshore, Carrollwood, New Tampa, Westchase. Missing: **Bayshore Beautiful, Palma Ceia, Beach Park, Hunters Green, Tampa Palms** (these show up on the `south-tampa` / `new-tampa` pages but Tampa city proper should also name them since they are Tampa neighborhoods people search for).

### 4. Landmarks array exists but is never rendered
`area.landmarks` is defined for Tampa (5 entries including Tampa International Airport, USF, Tampa General) but the template (`app/(marketing)/areas/[slug]/page.tsx`) never outputs them. Free local signal left on the table. Add a "Tampa Landmarks We Service Near" list next to the neighborhoods chips.

---

## High-Priority Issues (P1)

### 5. Meta description could not be parsed from rendered HTML
`buildMetadata()` at `lib/seo.ts:18` sets it, but the rendered extract didn't surface it. Verify via `curl -s … | grep '<meta name="description"'`. If missing, the Next metadata isn't reaching the <head> on this route.

### 6. Canonical tag verification
Same note — `alternates.canonical` is set in `buildMetadata()` but not confirmed in rendered HTML. Canonical should be `https://dryventtampa.com/areas/tampa` (production domain, not the vercel.app preview).

### 7. FAQ section is only 5 questions
Tier 1 cities should ship 8–10 FAQs for FAQ-rich-result eligibility and AI citation density. Missing high-value questions:
- "Is dryer vent cleaning worth it in Tampa's humidity?"
- "What are the signs my Tampa dryer vent needs cleaning?"
- "Are you licensed and insured in Hillsborough County?"
- "How long does dryer vent cleaning take in Tampa?"
- "Do you clean dryer vents in Tampa condos and high-rises?" (high intent for downtown/Channelside/Westshore)

### 8. Breadcrumb points "Areas" back to /areas/tampa
`app/(marketing)/areas/[slug]/page.tsx:66` — the breadcrumb "Areas" URL is `/areas/tampa` which is wrong. It should point to an `/areas` index page (create one) or be omitted. Currently the Tampa crumb chain is Home → Areas (= Tampa) → Tampa, which is a loop.

### 9. Only 8 of 26 ZIPs surfaced
The FAQ answer slices `area.zip.slice(0, 8)`. Tampa has 26 ZIPs (33602–33637 range) — rendering all of them in a "ZIP Codes We Serve" list is a classic local-SEO pattern that captures long-tail "dryer vent cleaning 33606" queries.

---

## Content Gaps

1. **No pricing table.** Add a "Tampa Pricing" section with at least 3 rows (residential standard, long run / 2-story, condo). AI extracts tables. Currently prices only appear as "From $X" badges on service cards.
2. **No NFPA citation.** Per CLAUDE.md AI-SEO rule 2 ("Statistics with sources"). Add "According to NFPA, failure to clean dryer vents is a leading cause of home dryer fires (NFPA 2022)."
3. **No comparison table** (DIY vs professional, or us vs competitors). Per CLAUDE.md AI-SEO rule 3.
4. **No "how often" explicit answer in body** — it's in the FAQ but not as a standalone H2 ("How often should you clean a dryer vent in Tampa?"). This is the #2 question-shaped query.
5. **No review count in copy** outside the schema (`aggregateRating` says 847 but body says "847+ Tampa Bay Homeowners" — good, but pair it with a visible star average "4.9 ★").
6. **No cost range in visible body copy.** $99–$199 only appears in FAQ. Add as a stat card near the three existing cards (Population / County / Response Time).
7. **Service cards use generic `s.description`** — could be dynamically rewritten to "Residential Dryer Vent Cleaning in Tampa: [1-line Tampa-specific benefit]" for entity density.
8. **No mention of Hillsborough County in body copy** except schema/header label. Add a sentence: "Serving every Tampa ZIP in Hillsborough County from Westshore to New Tampa."

---

## Recommendations (prioritized)

### Do this week (code changes)

1. **Fix LocalBusiness @id + areaServed per page.** Edit `lib/schema.ts` `localBusinessSchema(area)` to accept an optional `pageUrl` and emit `@id: ${pageUrl}#business` plus `areaServed` narrowed to `[area]` when called from an area page.
2. **Update Tampa title tag** in `app/(marketing)/areas/[slug]/page.tsx:24` to include "Dryer Duct Cleaning" for the Tampa slug specifically (or globally — competitors ignore it across all cities):
   ```
   title: `Dryer Vent Cleaning ${area.name}, FL | Dryer Duct Cleaning & Same-Day Service | Dry Vent Tampa`
   ```
3. **Update Tampa `intro` and add synonym line** in `lib/areas.ts:25` to naturally include "dryer duct cleaning" once.
4. **Add landmarks render block** to the area template after the neighborhoods chips.
5. **Expand Tampa neighborhoods** in `lib/areas.ts:27` to include Bayshore Beautiful, Palma Ceia, Beach Park.
6. **Add FAQ 6–10** to `areaFaqs` array at `app/(marketing)/areas/[slug]/page.tsx:35`, with Tampa-specific condo/high-rise and Hillsborough County licensing questions.
7. **Add full ZIP list section** (remove the slice(0,8) cap; render all ZIPs as pill chips).
8. **Fix breadcrumb** — either create an `/areas` index page or change the crumb to `{ name: 'Service Areas', url: '/#areas' }`.

### Do next sprint (content)

9. **Add Tampa pricing table** (3 rows minimum) with schema `Offer` markup.
10. **Add NFPA citation + stat** in the `why` paragraph.
11. **Add "Signs Your Tampa Dryer Vent Needs Cleaning" H2** with a 5-item bullet list — high AI-extractability pattern.
12. **Add a DIY-vs-professional comparison table** unique to Tampa conditions (humidity, vent length).
13. **Add a "Cleaning Frequency by Tampa Home Type" mini-table** (single-family / condo / vacation rental / pet household).

### Verify in production

14. Confirm `<meta name="description">` and `<link rel="canonical">` render on the live route.
15. Run the page through Google's Rich Results Test — confirm FAQPage, LocalBusiness, and BreadcrumbList all validate and that only one LocalBusiness `@id` appears across `/`, `/areas/tampa`, and `/services/residential-dryer-vent-cleaning`.
16. Verify canonical uses the production `dryventtampa.com` domain, not the `dryervent.vercel.app` preview.

---

## Files to edit

- `/Users/user/dev/dry-vent-tampa/lib/schema.ts` — per-page @id, narrow areaServed
- `/Users/user/dev/dry-vent-tampa/lib/areas.ts` — Tampa intro synonym, neighborhoods expansion
- `/Users/user/dev/dry-vent-tampa/app/(marketing)/areas/[slug]/page.tsx` — title synonym, FAQ expansion, landmarks render, ZIP list, breadcrumb fix
- `/Users/user/dev/dry-vent-tampa/lib/seo.ts` — verify canonical reaches rendered HTML
