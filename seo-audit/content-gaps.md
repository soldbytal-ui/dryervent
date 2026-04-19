# Content Gap Analysis — Airflow Dryer Vent Cleaning

**Synthesized from:** `serp-competitors.md`, `serp-features.md`, `competitor-dryerventwizard.md`, `competitor-local-safedryervent-com.md`, `competitor-local-superbdryerventcleaning-com.md`, `competitor-local-cleanairprosfl-com.md`, `production-verification.md`, and Phase 1 audit reports.

**Priority legend:**
- **A** = high value × high ease (own immediately)
- **B** = high value × medium ease (Phase 3–5)
- **C** = medium value or harder (Phase 5–8 or optional)

---

## Top 10 Content Gaps (ranked)

### 1. Transparent pricing with `Offer` schema per service
**Priority:** A
**Page type:** Enhance `/pricing`; add `Offer` schema to each `/services/[slug]`
**Competitors who miss it:**
- Dryer Vent Wizard — hides all prices, FAQ explicitly refuses the cost question
- Clean Air Pros FL — hides prices (call-for-quote)
- Superb — prices only shown behind the form
**Only VentSmart (safedryervent.com) competes on price ($69 anchor).**
**Our angle:** Publish a full Tampa Bay pricing table — residential $99, inspection $79, repair $149, installation $249, with "what drives a higher quote" clarity. Add `Offer` JSON-LD per service so Google/AI can extract it for PAA and AI Overviews ("dryer vent cleaning cost Tampa" = 8,000+ monthly searches nationally, all KD 0 per the pre-existing keyword data).
**Estimated search volume indicator:** PAA shows "How much does dryer vent cleaning cost in Tampa?" — active demand.

### 2. "Dryer duct cleaning" synonym in titles, H1s, and body copy
**Priority:** A
**Page type:** 23 area pages + 5 service pages + homepage + blog
**Competitors who miss it:**
- Dryer Vent Wizard — 0 mentions site-wide (confirmed)
- Superb — 0 mentions
- Clean Air Pros FL — 0 mentions
- VentSmart — minimal
- Only Freedom Appliance uses exact "dryer duct" phrase in title
**Our angle:** Phase 1 added synonym to metadata; Phase 3 integrates into body copy on every area + service page. 590 vol/mo keyword sitting essentially uncontested at KD 0–2.
**Estimated search volume indicator:** 590/mo for "dryer duct cleaning" per pre-existing keyword data.

### 3. St. Petersburg Tier 1 enhancement (unbelievable gap)
**Priority:** A
**Page type:** `/areas/st-petersburg` expanded to 1800 words
**Competitors who miss it:** ALL THREE of VentSmart, Superb, and Clean Air Pros have **zero** dedicated St. Pete pages. For a city of 258,000+ with coastal salt-air drivers, this is the single biggest moat on the board.
**Our angle:** Tier 1 enhancement sequence should lead with St. Pete, not Tampa. Historic 1940s–60s bungalows, salt-air corrosion, high-rise condo vent stacks (which feeds gap #7), 16 ZIP codes rendered, Old Northeast / Snell Isle / Shore Acres neighborhood specificity.

### 4. NFPA 211 / C-DET certification authority lane
**Priority:** A
**Page type:** Service pages + new blog post (`NFPA 211 compliance in Tampa`) + homepage trust bar + llms.txt
**Competitors who miss it:**
- DVW: 0 certifications named
- Superb: 0 named certifications
- VentSmart: BBB A+ only
- Clean Air Pros: NADCA only (close competitor on this lane)
**Our angle:** Lead with "NFPA 211 aligned process" and C-DET ambition on every service page. No competitor owns the NFPA 211 keyword cluster — safety-conscious Tampa homeowners search this explicitly.

### 5. Peak season guidance (January + September demand spikes)
**Priority:** A
**Page type:** Homepage FAQ + new blog post + area page FAQs
**Competitors who miss it:** Zero competitor references January/September demand peaks. Zero reference Florida seasonal patterns.
**Our angle:** Already in llms.txt from Phase 1; Phase 3 surfaces into visible page content. Blog post: *"When to Book Dryer Vent Cleaning in Tampa Bay: The January and September Rule."* Hits AI Overviews for seasonal queries; answers a PAA-adjacent question.
**Estimated search volume indicator:** Pre-existing data — January 880 vol/mo, September 880 vol/mo.

### 6. Explicit counter-positioning vs Dryer Vent Wizard
**Priority:** A
**Page type:** New page `/local-vs-franchise-dryer-vent-cleaning` (or `/dryer-vent-wizard-alternative` if we can stomach the brand mention) + homepage trust bar enhancement
**Competitors who miss it:** DVW itself can't counter — they're legally required (FTC) to print "All services are performed by independently owned and operated franchises" on every page. Their copy leans on the weasel-phrase "your local Dryer Vent Wizard."
**Our angle:** Name the Airflow owner, show the truck, publish a price — all three of which DVW does not. Include an explicit call-out of the FTC disclosure language. Converts higher because the search intent behind "dryer vent cleaning Tampa" is partially anti-corporate.
**Estimated search volume indicator:** "Dryer Vent Wizard alternative" + "local dryer vent cleaning Tampa" long-tail cluster.

### 7. Condo and high-rise vent stack guide
**Priority:** B
**Page type:** New guide `/services/condo-dryer-vent-cleaning` (or blog `Condo Dryer Vent Cleaning in St. Pete, South Tampa, and Clearwater Beach`)
**Competitors who miss it:** Zero dedicated condo pages across all competitors. Superb mentions "multi-family" in passing; nobody has a real guide.
**Our angle:** Tampa Bay has massive condo inventory — Snell Isle, Channelside, Sand Key, Apollo Beach, South Tampa Bayshore. Own the vertical with a proper condo-stack guide covering shared vent infrastructure, HOA approval, roof vs side termination. Feeds directly into St. Pete, Clearwater, and South Tampa area pages.

### 8. HOA / property-manager bulk pricing page
**Priority:** B
**Page type:** New page `/hoa-dryer-vent-cleaning` with ContactPoint schema + Service schema
**Competitors who miss it:** Zero competitor HOA-dedicated pages. DVW has franchise-level commercial but no HOA-specific content.
**Our angle:** Target property managers and HOA boards in Wesley Chapel, Westchase, FishHawk Ranch (10,000+ homes), Lakewood Ranch (20,000+ homes), and Sun City Center Kings Point. Bulk-pricing disclosure + a "how to evaluate HOA contracts" FAQ block. B2B conversion value far exceeds single-home leads.

### 9. Landlord / property manager / rental portfolio page
**Priority:** B
**Page type:** New page `/landlord-dryer-vent-cleaning` with service plans
**Competitors who miss it:** Zero competitor landlord pages.
**Our angle:** Tampa has one of the country's highest concentrations of single-family rentals and snowbird rentals. Page frames annual/semiannual professional cleaning as both a fire-risk mitigation and an insurance compliance lever. Hits a recurring-revenue buyer segment competitors ignore.

### 10. Rendered ZIP codes, neighborhoods, and landmarks on every area page
**Priority:** A
**Page type:** Existing `/areas/[slug]` template (we already have the data in `lib/areas.ts`)
**Competitors who miss it:**
- DVW location pages: **zero** ZIPs, zero neighborhoods, zero landmarks rendered anywhere
- Superb city pages: templated 300–2,200 words with identical boilerplate
- VentSmart: minimal local specificity
**Our angle:** The data is already in `lib/areas.ts` — landmarks array is defined but never rendered in the current template (confirmed in Phase 1 page-tampa.md finding #3). Phase 3 enhancement renders landmarks + expands ZIP display from current 8 to full list, adds neighborhood paragraphs instead of pill-chips. Pure structural change with no new data fetch.

---

## Additional gaps worth calling out (not in top 10 but on the roadmap)

- **Snowbird seasonal rental angle** (Sarasota, Clearwater Beach, Apollo Beach) — Phase 5 blog
- **Storm / hurricane season prep** — seasonal content for June–November
- **New-construction builder-grade vent failures** — hits Riverview, Wesley Chapel, Land O' Lakes directly
- **Pet hair × Florida humidity combo** — uniquely Tampa Bay angle, zero competitor coverage
- **Sub-brand / EMD farm awareness** — `.us` EMD farm detected (`tampadryerventcleaning.us` family) may represent one black-hat operator. Monitor but don't compete on their terms.

---

## Page-type priority order for Phase 3–5

1. `/areas/st-petersburg` enhancement (A)
2. `/pricing` enhancement + `Offer` schema (A)
3. "Dryer duct" synonym integration across existing 23 pages (A)
4. `/local-vs-franchise-dryer-vent-cleaning` (A, new page)
5. NFPA 211 blog + service-page authority signals (A)
6. Peak-season blog + homepage FAQ refresh (A)
7. All 15 Tier 1 cities enhanced to 1500–2000 words (A, Phase 3 scope)
8. Condo guide (B)
9. HOA + landlord pages (B)
10. Remaining blog cluster — pricing, warning signs, DIY-vs-pro (B)
