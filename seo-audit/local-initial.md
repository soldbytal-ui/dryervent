# Local SEO Audit — Dry Vent Tampa (dryervent.vercel.app)
**Audit date:** 2026-04-19  
**Auditor:** Claude Local SEO Agent  
**Rebranding context:** Site currently branded "Dry Vent Tampa"; rebrand to "Airflow Dryer Vent Cleaning" pending  
**Business type:** Service Area Business (SAB) — no storefront address, Tampa Bay 50-mile radius  
**Industry vertical:** Home Services / Residential Maintenance  

---

## Local SEO Score: 61 / 100

| Dimension | Weight | Raw Score | Weighted |
|-----------|--------|-----------|----------|
| GBP Signals | 25% | 44/100 | 11.0 |
| Reviews & Reputation | 20% | 65/100 | 13.0 |
| Local On-Page SEO | 20% | 82/100 | 16.4 |
| NAP Consistency & Citations | 15% | 48/100 | 7.2 |
| Local Schema Markup | 10% | 62/100 | 6.2 |
| Local Link & Authority Signals | 10% | 30/100 | 3.0 |
| **TOTAL** | | | **56.8 → rounded 57/100** |

---

## 1. NAP Consistency Audit

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Homepage visible | Dry Vent Tampa | Not displayed (SAB — correct) | (813) 744-1127 |
| Contact page | Dry Vent Tampa | Not displayed | (813) 744-1127 |
| Footer | Dry Vent Tampa | Not displayed | (813) 744-1127 |
| JSON-LD schema (lib/schema.ts) | Dry Vent Tampa | No street address (SAB — correct) | Falls back to placeholder `+18135551234` if `NEXT_PUBLIC_BUSINESS_PHONE` env var is unset |
| sameAs Facebook | dryventtampa (unverified live) | — | — |
| sameAs Google Maps | /maps/place/dryventtampa (generic path, not a Place ID) | — | — |
| sameAs Yelp | Not listed in schema | — | — |
| sameAs BBB | Not listed in schema | — | — |

**NAP Score: 52 / 100**

Critical flags:
- `NEXT_PUBLIC_BUSINESS_PHONE` env var fallback in schema.ts is `+18135551234` (placeholder). If this env var is not set in Vercel production, the phone in every JSON-LD block on every page reads as a fake number. This is the single most urgent NAP fix.
- Google Maps `sameAs` uses a generic text path (`/maps/place/dryventtampa`) not a verified Place ID or CID URL. Google cannot resolve this to a GBP listing.
- Yelp and BBB are absent from `sameAs` despite reviews being sourced from Yelp in lib/reviews.ts.
- No `@id` IRI disambiguation between area pages — every area page emits `@id: {SITE}#business` pointing to the same node, which is correct for an SAB but means area-level geo coordinates appear on what is declared as a single business entity. This can confuse structured data parsers.

---

## 2. LocalBusiness Schema Validation

Schema type used: `LocalBusiness` (lib/schema.ts line 8)

**Correct subtype for this vertical:** `HomeAndConstructionBusiness` or more specifically the Google-accepted `LocalBusiness` with `@type: ["LocalBusiness", "HomeAndConstructionBusiness"]` array. Using bare `LocalBusiness` is not wrong but misses vertical-specific ranking signals.

| Property | Present | Notes |
|----------|---------|-------|
| name | Yes | "Dry Vent Tampa" — will need update on rebrand |
| url | Yes | Pulls from NEXT_PUBLIC_SITE_URL |
| telephone | Yes | **Risk: placeholder fallback if env var unset** |
| address (PostalAddress) | Partial | addressLocality + addressRegion + addressCountry only. No streetAddress (correct for SAB), but no postalCode either |
| geo (GeoCoordinates) | Yes | Per-area lat/lng pulled from areas.ts — good |
| geo precision | 4 decimal places (e.g., 27.9506) | Whitespark recommends 5 decimal places for ranking signal strength |
| openingHoursSpecification | Yes | Mon-Sat 07:00-19:00 |
| areaServed | Yes | 15 cities as City nodes |
| priceRange | Yes | "$$" |
| aggregateRating | Yes | 4.9 / 847 reviews — hardcoded, not dynamic |
| sameAs | Partial | Facebook + Instagram + broken Google Maps path. Missing Yelp, BBB, Nextdoor |
| image | Yes | /og-image.jpg |
| @id | Yes | {SITE}#business |
| serviceType | Missing | No serviceType property on LocalBusiness node |
| hasMap | Missing | No Maps embed URL |
| currenciesAccepted | Missing | Minor but easy win |
| paymentAccepted | Missing | Minor |

**Schema Score: 62 / 100**

---

## 3. Location Page Quality — 15 Area Pages

### Template Assessment
All 15 area pages render from a single template (`app/(marketing)/areas/[slug]/page.tsx`). This is architecturally sound provided the data layer ensures genuine differentiation.

### Uniqueness Audit (sampled: Tampa, St. Petersburg, Clearwater, Brandon)

| Signal | Tampa | St. Pete | Clearwater | Brandon |
|--------|-------|----------|------------|---------|
| Unique intro paragraph | Yes — humidity/housing age | Yes — coastal salt/condos | Yes — vacation rentals/sand | Yes — long vent runs |
| Unique "why" paragraph | Yes | Yes | Yes | Yes |
| Area-specific neighborhoods | 10 | 9 | 7 | 5 |
| Landmarks listed in data | 5 (not rendered on page) | 5 (not rendered) | 4 (not rendered) | 3 (not rendered) |
| ZIP codes in FAQ answer | Yes (up to 8) | Yes | Yes | Yes |
| County reference | Hillsborough (rendered in UI) | Pinellas | Pinellas | Hillsborough |
| Climate/building-stock differentiation | Strong | Strong | Strong | Moderate |
| Doorway page risk | Low | Low | Low | Low |

**Landmarks are stored in areas.ts but never rendered on the page template.** This is a significant missed opportunity — landmark references are a key local signal for both traditional search and AI engines. The `area.landmarks` array is populated with quality data for all 15 cities but the area page template has no section that outputs it.

### Gaps Across All 15 Areas

1. **Landmarks not rendered** — `area.landmarks` data exists but is invisible on the page. Fix: add a "Near Your Neighborhood" or "Local Landmarks We Serve Near" section.
2. **County hub pages absent** — The site serves 3 counties (Hillsborough, Pinellas, Pasco) but has no `/areas/hillsborough-county` or `/areas/pinellas-county` hub pages. County-level pages capture "dryer vent cleaning Hillsborough County" queries that city pages miss.
3. **ZIP codes only in FAQ** — ZIPs appear only in the final FAQ answer. They should also appear in the body of the page (e.g., in a "Service Area" callout box) to be crawled as page-level geographic signals rather than buried in FAQ schema.
4. **"Dryer duct cleaning [city]" synonym absent** — lib/scale-brain.ts explicitly instructs the brand voice to say "dryer vent cleaning" not "dryer duct cleaning." This is correct for brand consistency but leaves a synonym gap. Competitors who rank for "dryer duct cleaning Tampa" are capturing a separate search cohort. Recommendation: add a single sentence per area page acknowledging the synonym ("also called dryer duct cleaning") without overusing it.
5. **Driving-time / distance disclaimers absent** — No page states "We serve [city] from our Tampa Bay service base, typically arriving within [X] minutes." This is a conversion signal and a local relevance signal.
6. **Single-ZIP areas are thin on geographic breadth** — Westchase (33626 only), New Tampa (33647 only), Apollo Beach (33572 only) have one ZIP each. These pages are inherently geo-thin. Adding a "surrounding ZIPs we also serve" note would help.
7. **Meta descriptions are identical in structure** — All 15 meta descriptions follow the exact same template: "Professional dryer vent cleaning in [City], Florida. Prevent fires, reduce energy bills, dry clothes faster. Licensed, insured, same-day appointments. Call now for free estimate." While each is technically unique, the identical structure is a missed opportunity for city-specific hooks.

---

## 4. GBP Signals

| Signal | Status | Notes |
|--------|--------|-------|
| Google Maps embed on any page | Not detected | No iframe embed found on homepage or contact page |
| sameAs GBP/Maps URL | Broken | Uses `/maps/place/dryventtampa` text path, not a valid CID or Place ID URL |
| Review widget (live GBP pull) | Not detected | Reviews in lib/reviews.ts appear hardcoded |
| GBP posts indicators | Not detected | |
| GBP photo evidence | Not detected | |
| Place reference in content | Indirect | "Google" mentioned as review source in about page |
| NAP match to GBP | Unverifiable without GBP access | Phone matches page; name matches page |

**GBP Score: 44 / 100**

The single largest GBP gap: the Google Maps `sameAs` URL in schema.ts is not a valid Google Maps business URL. It must be the verified CID URL from the actual GBP listing (format: `https://maps.google.com/?cid=XXXXXXXXXXXXXXX`) or the full Place URL. An invalid `sameAs` Google Maps link means Google's Knowledge Graph cannot connect this schema entity to the GBP listing, which weakens the entity association that drives Local Pack rankings.

No Maps embed exists on the site. For an SAB this is less critical than for brick-and-mortar, but embedding a service-area map or a "Where we serve" styled map on the Contact page would add a GBP association signal.

---

## 5. Review Health

| Metric | Value | Notes |
|--------|-------|-------|
| Claimed rating | 4.9 / 5 | Displayed site-wide |
| Claimed review count | 847 | Hardcoded in schema and visible text |
| aggregateRating in schema | Yes | 4.9 / 847 — hardcoded, not pulled from live GBP |
| Review sources referenced | Google, Yelp, Facebook, Nextdoor | Per lib/reviews.ts |
| Review velocity visible | Not displayed | No "most recent review" date shown |
| Response rate visible | Not displayed | |
| Review schema (individual Review nodes) | Present in lib/schema.ts reviewSchema() | Function exists but usage on pages not confirmed |

**Reviews Score: 65 / 100**

Key concern: The 847 review count and 4.9 rating are hardcoded. If the GBP listing has different numbers, schema aggregateRating will be out of sync with GBP reality — a potential trust signal inconsistency Google can detect. Recommend dynamic pull or at minimum a monthly manual sync process.

Sterling Sky's "18-day rule": if no new Google reviews appear for 18+ days, local pack rankings can drop measurably. There is no review solicitation mechanism visible on the site (no post-service review request flow, no QR code reference, no "leave a review" CTA).

---

## 6. Citation Presence — Tier 1 Directories

| Directory | Status | Notes |
|-----------|--------|-------|
| Google Business Profile | Assumed claimed (site live) | sameAs URL is invalid — needs correct CID |
| Yelp | Referenced in lib/reviews.ts as source | Not in sameAs schema; URL unknown |
| BBB (Better Business Bureau) | Not referenced anywhere | Should be claimed for trust signal |
| Angi (formerly Angie's List) | Not referenced | Major home services directory — absent |
| HomeAdvisor | Not referenced | |
| Thumbtack | Not referenced | |
| Nextdoor | Referenced as review source | Not in sameAs |
| Facebook | In sameAs | Unverified if page exists |
| Instagram | In sameAs | |
| Yelp | Not in sameAs | Inconsistency: reviews sourced from Yelp but Yelp URL not in sameAs |

**Citation Score: 35 / 100 (estimated — paid tools needed for full NAP consistency check)**

The 3 top AI visibility factors identified by Whitespark 2026 are citation-related. Yelp and BBB are especially important for home services. The absence of Angi is notable — Angi dominates home services local search and drives significant referral traffic for competitors.

---

## 7. Mobile Click-to-Call UX

**Score: Good**

- Multiple `tel:+18137441127` links confirmed on homepage and contact page
- "Call / Text" option on contact page
- Phone formatted consistently as (813) 744-1127 display with tel: href

No issues detected. The risk noted above (schema phone placeholder) does not affect visible click-to-call functionality but does affect structured data.

---

## 8. "Near Me" and "[City] Dryer Vent Cleaning" Keyword Targeting

| Page | Primary Target Keyword | H1 Structure | Title Tag Structure |
|------|----------------------|-------------|-------------------|
| /areas/tampa | "dryer vent cleaning tampa" | "#1 Dryer Vent Cleaning in Tampa, FL" | "Dryer Vent Cleaning Tampa, FL | Same-Day..." |
| /areas/st-petersburg | "dryer vent cleaning st petersburg" | "#1 Dryer Vent Cleaning in St. Petersburg, FL" | Same pattern |
| All 15 areas | Same pattern | Same H1 template | Same title template |

**"Near me" targeting:** No page explicitly targets "dryer vent cleaning near me" or includes content structured to capture the query. A brief FAQ item ("Do you serve my neighborhood?") or a dedicated sentence mentioning "near me" service would capture this variant.

**Assessment:** Title tags and H1s are well-optimized for city-modifier queries. The consistent template structure is strong for coverage but the identical H1 pattern ("'#1 Dryer Vent Cleaning in [City], FL'") across all 15 pages reduces differentiation signals.

---

## 9. "Dryer Duct Cleaning [City]" Synonym Coverage

**lib/scale-brain.ts explicitly prohibits the phrase "dryer duct cleaning"** as a brand voice rule. This creates a deliberate synonym gap. Competitors using "dryer duct cleaning Tampa" in their content are capturing a separate search cohort that the current site does not reach.

Evidence of gap: The services.ts content uses "dryer exhaust system" as an alternative but "dryer duct cleaning" appears zero times across all public-facing page content.

Recommendation: Add a single canonical acknowledgment per key page — e.g., "Dryer vent cleaning (also called dryer duct cleaning) is..." — to capture the synonym without violating brand voice. This does not require the brand to "say" the phrase repeatedly; one mention per major page is sufficient for index coverage.

---

## Industry-Specific Recommendations

### Schema Subtype Upgrade
Change `@type: 'LocalBusiness'` to `@type: ['LocalBusiness', 'HomeAndConstructionBusiness']` in lib/schema.ts. This is the correct Schema.org subtype for home services businesses and is preferred by Google for this vertical.

### County Hub Pages
Add three hub pages:
- `/areas/hillsborough-county` — aggregates Tampa, Brandon, Riverview, Plant City, Apollo Beach, Valrico, South Tampa, Carrollwood, Westchase, New Tampa, Lutz
- `/areas/pinellas-county` — aggregates St. Petersburg, Clearwater
- `/areas/pasco-county` — aggregates Wesley Chapel, Land O' Lakes

Each hub page should have a unique intro, county-level statistics, and link to all city pages within the county.

### Review Acquisition CTA
Add a post-service review request mechanism. Options: email follow-up with GBP review link via Resend (already integrated), a `/thank-you` page with review CTA, or a QR code reference in service pages.

### Landmarks Section on Area Pages
The area page template should render `area.landmarks` as a visible section. Suggested placement: after the neighborhoods grid, under an H3 like "Serving Homes Near [Landmark 1], [Landmark 2], and More."

### Rebrand Preparation
When rebranding to "Airflow Dryer Vent Cleaning":
- Update `name` in lib/schema.ts
- Update `siteName` in lib/seo.ts
- Update all `sameAs` URLs to new brand handles
- Ensure GBP name change is submitted before site rebrand goes live (mismatched name between GBP and site schema is a NAP inconsistency flag)
- Register new brand name on Yelp, BBB, Angi, Thumbtack before launch

---

## Limitations Disclaimer

The following could not be assessed without paid tools or authenticated access:

1. **Live GBP data** — Cannot confirm GBP is claimed, verified, categories set, or posting activity. DataForSEO `local_business_data` would provide this.
2. **Actual review count and rating on GBP** — The 847/4.9 figures are hardcoded on-site. Cannot confirm GBP reality without GBP access.
3. **Citation NAP consistency audit** — Cannot run automated NAP checks across Yelp, BBB, Angi, Localeze, InfoUSA, Acxiom without Whitespark or BrightLocal.
4. **Local Pack ranking positions** — Cannot confirm which queries trigger Local Pack appearances or current rank positions without DataForSEO `google_local_pack_serp`.
5. **Proximity variance** — Search Atlas ML study indicates proximity accounts for 55.2% of ranking variance. This cannot be engineered on-site; it is determined by the searcher's location relative to the GBP pin.
6. **Facebook/Instagram page live status** — sameAs URLs not verified as live pages.
7. **Competitor gap analysis** — "Dryer Vent Wizard" franchise pages not fetched for direct comparison.
