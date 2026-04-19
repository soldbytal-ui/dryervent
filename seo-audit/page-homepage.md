# Homepage SEO Audit — https://dryervent.vercel.app

**Audited:** 2026-04-19
**URL:** https://dryervent.vercel.app/
**Primary keyword:** dryer vent cleaning Tampa

---

## Score: 72 / 100

Strong technical foundation (schema, metadata, internal linking) but clearly missing two high-leverage items: a definition-style AI-extractable opening paragraph and any counter-positioning language ("locally owned", "not a franchise"). Also zero `<img>` tags on a 1,200-word homepage, which is unusual and hurts both image search and perceived trust.

---

## Critical Issues

1. **No definition-style opening paragraph.** The hero copy is a benefit statement ("Protect your home from dryer fires..."), not an AI-extractable definition. ChatGPT/Perplexity will not quote it. CLAUDE.md explicitly mandates definition-style intros: *"[Topic] is [clear definition]. [Key fact]."*
2. **Zero counter-positioning.** Not a single mention of "locally owned", "family owned", "independent", or "not a franchise" anywhere on the page. CLAUDE.md lists this as an evaluation criterion; competitors (Dryer Vent Wizard, Dryer Vent Squad) are franchises, and this is the single biggest positioning lever available.
3. **Zero `<img>` tags on the page.** 0 images means 0 alt text, no image SERP surface, and a visually weak page. Stats, service cards, and team photos should be real images with descriptive alt text ("certified technician cleaning dryer vent in Tampa home").
4. **Title tag has duplicate brand.** `Dry Vent Tampa | #1 Dryer Vent Cleaning in Tampa Bay, FL | Dry Vent Tampa` — 73 chars, brand appears twice. Wastes ~15 chars that could carry "Same-Day" or "Licensed & Insured".
5. **Unverified Google site verification placeholder** shipping to production: `<meta name="google-site-verification" content="add-your-google-site-verification-here"/>`. Search Console is not connected.
6. **`og:url` and canonical use the Vercel preview domain** (`dryervent.vercel.app`). If/when a production domain exists (e.g., `dryventtampa.com`), every signal here is pointing at the wrong host and link equity is being lost.
7. **NFPA not named explicitly in visible copy.** The FAQ schema mentions "National Fire Protection Association" but the visible body text never spells out "NFPA" or "NFPA 211". CLAUDE.md AI rule #5 ("Entity density") calls this out specifically.
8. **BreadcrumbList schema has only one item** (Home). That is a degenerate breadcrumb and should simply be omitted on the homepage rather than shipped as a single-item list.
9. **`sameAs` links are likely broken.** `facebook.com/dryventtampa`, `instagram.com/dryventtampa`, `google.com/maps/place/dryventtampa` look placeholder-shaped. Broken `sameAs` hurts entity trust for AI engines.
10. **`reviewCount: 847` in AggregateRating with no visible reviews on page and no GBP link.** This is a Google rich-result policy risk — aggregate ratings must be substantiated. Either show reviews on the page (with Review schema) or remove the count.

---

## Quick Wins (ship this week)

- **Rewrite H1 sibling paragraph** to definition-style: *"Dryer vent cleaning in Tampa removes accumulated lint, debris, and moisture buildup from your dryer's exhaust line. According to NFPA 211, professional cleaning is recommended at least once per year — Tampa Bay's humidity and year-round dryer use make it essential. Dry Vent Tampa has cleaned 15,000+ vents across Hillsborough, Pinellas, and Pasco Counties since 2015."* (Hits: primary keyword, definition, NFPA citation, entity density, counties, authority signal.)
- **Add counter-positioning badge/block** above the fold: *"Locally owned. Not a franchise. Tampa-based technicians — same crew every visit."*
- **Shorten title** to ~60 chars: `Dryer Vent Cleaning Tampa | Same-Day Service | Dry Vent Tampa` (60 chars, primary keyword first, removes duplicate brand).
- **Add 4–6 real images** with descriptive alt text: hero image, service thumbnails (residential/commercial/repair/install/inspection), before/after lint photo, technician photo.
- **Remove placeholder `google-site-verification`** meta or set it to the real token.
- **Fix `sameAs`** to real, live URLs — or remove.
- **Drop the 1-item BreadcrumbList** from the homepage.
- **Add "Hillsborough County", "Pinellas County", "Pasco County"** to visible copy for entity density (currently 0 mentions).
- **Add `priceRange` detail and `paymentAccepted`** to LocalBusiness schema; consider adding `PostalAddress.streetAddress` + `postalCode` (currently missing — LocalBusiness with no street address is a weak entity for Google).

---

## Full Analysis

### 1. Title Tag
```
Dry Vent Tampa | #1 Dryer Vent Cleaning in Tampa Bay, FL | Dry Vent Tampa
```
- **Length:** 73 chars (over the ~60-char SERP truncation line — will truncate on mobile).
- **Primary keyword:** "Dryer Vent Cleaning" + "Tampa Bay, FL" — covered.
- **Issue:** Brand repeated twice. Likely caused by `title.template` appending site name to an already-branded title in `lib/seo.ts`. Fix either the template or the page's title value.
- **Recommendation:** `Dryer Vent Cleaning Tampa | Same-Day Service | Dry Vent Tampa` (60 chars).

### 2. Meta Description
```
Tampa Bay's top-rated dryer vent cleaning service. Prevent fires, cut energy bills,
and dry clothes faster. Same-day service. Licensed & insured. Free estimate.
```
- **Length:** 162 chars — ideal range (150–160).
- **CTA:** "Free estimate" — present but weak. Consider adding the phone: *"Call (813) 744-1127 for a same-day free estimate."*
- **Keywords:** "dryer vent cleaning" + "Tampa Bay" present.
- **Score:** 8/10.

### 3. Canonical
```
<link rel="canonical" href="https://dryervent.vercel.app"/>
```
- Present. Self-referential.
- **Concern:** vercel.app preview domain will not be the final home. Canonical to that domain bleeds equity once a real domain is launched. Migrate as soon as prod domain is live.

### 4. Open Graph / Twitter
- All core OG tags present: `og:title`, `og:description`, `og:url`, `og:image` (1200x630 with alt), `og:type`, `og:site_name`, `og:locale`.
- Twitter card: `summary_large_image` with title/description/image.
- **Verify:** `/og-image.jpg` resolves. If the image is the auto-generated Next default, replace with a branded 1200x630 social card featuring phone number + "Same-Day Tampa Bay".
- **Score:** 9/10.

### 5. H1
```
Tampa Bay's #1 Dryer Vent Cleaning Service
```
- Contains primary keyword (Dryer Vent Cleaning) + city (Tampa Bay).
- Single H1 — correct.
- "#1" is a superlative claim without substantiation adjacent — consider "Tampa Bay's Top-Rated Dryer Vent Cleaning Service" to match the meta description and avoid review-policy risk.

### 6. Heading Hierarchy
- 1 H1, 7 H2s, 14 H3s, 3 H4s. Clean hierarchy, no skipped levels.
- H2s cover: hazard, services, process, reviews, areas, FAQs, final CTA — great structure.
- **Question-shaped headings:** Only "How It Works" and the FAQ questions are question-shaped. Add at least one H2 like *"How Often Should Tampa Homeowners Clean Their Dryer Vent?"* for AI extraction.

### 7. Word Count
- ~1,203 words. Under the 1,500+ target in CLAUDE.md for a local metro homepage.
- **Recommendation:** Add a ~400-word "Why Tampa Bay Homes Need Annual Dryer Vent Cleaning" section referencing humidity, salt air (coastal communities), common vent-termination issues in Florida stucco, and county-level context (Hillsborough, Pinellas, Pasco).

### 8. Schema.org Structured Data

**LocalBusiness @id:** `https://dryervent.vercel.app#business` — unique and stable. Good.

**Fields present:** `name`, `image`, `url`, `telephone`, `priceRange`, `description`, `address` (locality/region/country only), `geo`, `areaServed` (15 cities), `openingHoursSpecification`, `aggregateRating`, `sameAs`.

**Issues:**
- `PostalAddress` missing `streetAddress` and `postalCode`. A LocalBusiness without a street address is a weak entity; consider using the service-area pattern with `areaServed` + `address` to a valid mailing address, or switch `@type` to `HomeAndConstructionBusiness` / `ProfessionalService` if no storefront.
- `sameAs` URLs look placeholder (facebook.com/dryventtampa, etc.). Verify each resolves 200 or remove.
- `aggregateRating.reviewCount: 847` with no visible, crawlable reviews on the page — Google's structured-data guidelines require the rating to come from reviews on the same page. **Risk of manual action.** Either embed the reviews with `Review` schema, or remove aggregate rating until a GBP-linked review widget is in place.
- No `Service` schema for the 5 services listed.
- No `Organization` schema (though LocalBusiness inherits, an explicit `Organization` `@id` with `logo` improves Knowledge Graph eligibility).
- `BreadcrumbList` with only 1 item (Home) is degenerate — remove on homepage.

**FAQPage schema:** 6 Q&As, all well-formed, NFPA cited in answer #1. Excellent.

### 9. Internal Links
- **57 total anchors.**
- **28 links to `/areas/*`** — all 15 cities linked, several linked twice (once in hero/services region, once in footer). Anchor text is just the city name ("Tampa", "Brandon") which is fine but could be enriched (e.g., "Tampa dryer vent cleaning").
- **11 links to `/services/*`** — all 5 services linked, 2x each (card + footer). Anchor text mixes long descriptive ("Residential Dryer Vent Cleaning Our residential service uses commercial-grade...") and short ("Residential Cleaning"). The long card-wrapped anchors are actually good for SEO.
- **6 `tel:` links** to `+18137441127` — consistent NAP.
- **10 other internal links** (Pricing, About, Blog, Contact) — standard nav.
- **Score:** 9/10. Rich internal linking satisfies CLAUDE.md rule #4.

### 10. Image Alt Text Coverage
- **0 `<img>` tags on the page.** 100% coverage by default but this is a symptom of a bigger issue: the page has no images. Add hero, service cards, process illustrations, technician photos. Alt text should include "Tampa", "dryer vent", and service context.

### 11. Content & AI-Optimization

**Definition-style opening?** No. Hero paragraph is benefit-led ("Protect your home from dryer fires, cut energy bills..."). Need to add a definition sentence adjacent to the H1.

**FAQ schema?** Yes — 6 FAQs, NFPA cited. Strong.

**Question-shaped headings?** Partial — FAQ section yes, main body no.

**Entity density (body text):**
- "Tampa": 36 mentions — excellent
- "Tampa Bay": 17 mentions — excellent
- "Florida": 6 — good
- "NFPA" (acronym): **0 in visible body text** (only in schema) — fix
- "National Fire": 1 — present in schema and FAQ answer
- "Licensed": 7, "Insured": 7 — strong trust signals
- "Hillsborough County" / "Pinellas County" / "Pasco County": 0 — **missing**
- Neighborhoods: 15 cities listed in services-area block, no sub-neighborhoods — OK for homepage

**Author/authority signals:** "11+ Years Experience", "15,000+ Vents Cleaned", "847+ 5-Star Reviews", "100% Satisfaction Rate" — all present, good.

### 12. Counter-Positioning vs Franchises
**Not present anywhere on the page.**
- "locally owned": 0
- "family owned": 0
- "independent": 0
- "not a franchise": 0
- "owner operated": 0

This is the single biggest missed opportunity. Competitors in this space (Dryer Vent Wizard, Dryer Vent Squad, Dustless Duct) are national franchises. Adding "Locally owned. Not a franchise. Same crew every visit." as a trust bar under the hero is a high-ROI change with zero downside.

### 13. Phone Number Consistency
- Visible: `(813) 744-1127` (6 instances)
- `tel:` links: `+18137441127` (6 instances, E.164 format)
- LocalBusiness schema: `+18137441127`
- All match. No hardcoding — pulled from env var per CLAUDE.md convention.
- **Score:** 10/10.

---

## Section Scores

| Section | Score |
|---|---|
| Title tag | 6/10 |
| Meta description | 8/10 |
| Canonical | 7/10 (vercel.app domain) |
| Open Graph / Twitter | 9/10 |
| H1 | 8/10 |
| Heading hierarchy | 9/10 |
| Word count | 7/10 |
| Schema.org | 6/10 (rich, but review-count risk + placeholder sameAs) |
| Internal links | 9/10 |
| Image coverage | 2/10 |
| AI-extractable intro | 3/10 |
| FAQ schema | 10/10 |
| Entity density | 7/10 |
| Counter-positioning | 0/10 |
| Phone consistency | 10/10 |
| **Weighted total** | **72/100** |

---

## Recommended Edit Order

1. Fix title duplicate-brand bug in `lib/seo.ts` / homepage metadata.
2. Add definition-style paragraph directly under the H1 in `app/(marketing)/page.tsx`.
3. Add locally-owned counter-positioning trust bar.
4. Insert 4–6 images with descriptive alt text.
5. Remove `google-site-verification` placeholder; set real token.
6. Verify or remove `sameAs` URLs; remove single-item BreadcrumbList.
7. Expand visible copy to 1,500+ words with a county-level "Why Tampa" section.
8. Either substantiate `aggregateRating` with on-page reviews (+ Review schema) or remove.
9. Add `Service` schema for each of the 5 services.
10. Migrate `canonical` + `og:url` to production domain as soon as it's live.
