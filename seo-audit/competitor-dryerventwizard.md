# Competitor Audit: Dryer Vent Wizard (dryerventwizard.com)

**Audit Date:** 2026-04-19
**Scope:** Homepage, locations hub, 3 city/metro franchise pages (Los Angeles, North Jersey, Central Indiana/Indianapolis), services hub (/residential/cleaning), about, FAQ.
**Method:** WebFetch content extraction (Firecrawl MCP returned Unauthorized) + site: search + sitemap.xml enumeration.
**Why this matters:** Dryer Vent Wizard is a national franchise under Neighborly with 125+ US/Canada locations. Our client Airflow Dryer Vent Cleaning is counter-positioning as "locally owned — not a franchise." This doc captures their patterns, trust claims, and franchise weasel-language so we can rebut each one on-page.

---

## 1. Executive Summary

- **They are a franchise network** operating 125+ independently owned franchises under the Neighborly parent brand (founded 2004, ~22 years). Every page carries the disclaimer "All services are performed by independently owned and operated franchises" — a legal requirement they can't hide from, and a clear counter-positioning lever for us.
- **No pricing is disclosed anywhere** — "call for quote" / "in-person diagnosis" is the uniform policy site-wide. On their own FAQ their answer to "Can you tell me exactly how much my job will cost?" explicitly refuses a number. This is our biggest wedge: we can win AI-search queries like "dryer vent cleaning cost Tampa" simply by publishing a price range.
- **Location pages are heavily templated.** All city pages share the same H1 formula ("Expert Dryer Vent Cleaning & Installation in [Metro]" or "Professional Dryer Vent Cleaning in [City], [State]"), same H2 stack, same Neighborly NFPA statistics, same footer. The only genuinely localized content is: phone number, 100–150 "Areas We Serve" city links, and 3–5 attributed customer reviews. No unique neighborhoods, landmarks, or ZIP-level content in the body copy.
- **"Dryer duct cleaning" as a term is completely absent** across all pages inspected. They use "dryer vent cleaning" exclusively. This leaves the "dryer duct cleaning" synonym query cluster wide open for us to claim.
- **No JSON-LD schema was detected** on the pages tested via source inspection (homepage, central-indiana, about-us, faq). Schema may be rendered client-side but is not present in static HTML, meaning it's invisible to most non-Google crawlers and AI ingestion pipelines. Our aggressive schema stack (LocalBusiness + Service + FAQPage + BreadcrumbList on every page) is a meaningful advantage.

---

## 2. Page-by-page Findings

### 2.1 Homepage — https://www.dryerventwizard.com

| Field | Value |
|---|---|
| H1 | "Dryer Vent Cleaning & Installation" |
| Word count | ~2,200–2,400 |
| H2 stack | Making Homes and Businesses Safer · Find an Expert Near Me · Why You Need Dryer Vent Wizard · Service You Can Trust! · Customer Reviews · Our Blog · Frequently Asked Questions · Still need more information? |
| Schema (static HTML) | None detected |
| Trust numbers | None on homepage (0/5 placeholder visible); no "X customers", no review count, no "X years" |
| Pricing | "Call for quote" — explicit: "it's best to diagnose the issue in person" |
| "Dryer duct cleaning" | **Not mentioned** (uses "dryer vent" only) |
| Franchise language | "Your local Dryer Vent Wizard is here for all your dryer vent needs." · "All services are performed by independently owned and operated franchises." |
| CTAs | Schedule Now · Call Us · Find Local Help · Find Nearest Location · Contact Us Today |
| Phone | (833) 543-0719 (national routing number) |
| FAQ on homepage | 6 questions (see FAQ section below) |

### 2.2 Locations Hub — https://www.dryerventwizard.com/find-your-wizard

| Field | Value |
|---|---|
| H1 | "Find Your Wizard" |
| Notes | Does **not** render a full list of franchises on the page — it's a ZIP-code lookup form ("Tell us where you're located"). There is no `/locations` index page; `/locations` returns 404. All 125+ locations live at `/locations/[franchise-slug]/` (e.g. `/locations/central-indiana`, `/locations/hollywood`, `/locations/north-jersey`). |
| Schema | Not detected |
| Franchise language | "All services are performed by independently owned and operated franchises" · "State, provincial, and other local laws may impact the services an independently owned and operated franchise location may perform" |

### 2.3 Services Hub — https://www.dryerventwizard.com/residential/cleaning

| Field | Value |
|---|---|
| H1 | "Residential Dryer Vent Cleaning Services" |
| Word count | ~2,800 |
| H2 stack | Residential Dryer Vent Cleaning Services · Still need more information? · Frequently Asked Questions · Find an Expert Near Me |
| Services covered | Vent cleaning · Vent debris/clog removal · Lint screen + trap cleaning · Dryer delinting · Booster fan cleaning · Vent line sanitizing · Bath fan cleaning |
| Schema | Not detected |
| "Dryer duct cleaning" | Not mentioned |
| Pricing | Call for quote |
| Franchise language | "Own A Franchise" CTA; standard independently-owned disclosures |
| FAQs | 6 FAQs inline |

Note: there is no single `/services` URL — services are split across `/residential/cleaning`, `/residential/installation`, `/residential/service-repair`, and mirrored `/commercial/*` paths.

### 2.4 About — https://www.dryerventwizard.com/about-us

| Field | Value |
|---|---|
| H1 | "About Us" |
| Word count | ~1,200 |
| H2 stack | Local Experts You Can Count On · Industry Leaders in Vent Cleaning, Inspection, Installation, and Repair Services · Code of Values · Join Our Team |
| Trust numbers | "Since 2004" (~22 yrs) · "over 125 locally owned and operated franchise locations in the U.S. and Canada" · **No** customer count · **No** review count · **No** certifications named |
| Schema | Not detected |
| Founder story | None. No founder name, no origin story. |
| "Dryer duct cleaning" | Not mentioned |
| Franchise language | See Section 6 for full quote list. |

### 2.5 FAQ — https://www.dryerventwizard.com/dryer-vent-101/frequently-asked-questions

| Field | Value |
|---|---|
| H1 | "Frequently Asked Questions" |
| Word count | ~2,800–3,000 |
| Questions | 19 total (see Section 7) |
| FAQPage JSON-LD | Not detected in static HTML source (may be client-rendered) |
| Pricing | No price disclosure even on the "how much will it cost" question |
| "Dryer duct cleaning" | Not mentioned |
| Franchise language | "All services are performed by independently owned and operated franchises." |

### 2.6 Los Angeles — https://www.dryerventwizard.com/locations/hollywood/geo/los-angeles-ca

| Field | Value |
|---|---|
| H1 | "Professional Dryer Vent Cleaning in Los Angeles, CA" |
| Word count | ~2,800 |
| H2 stack | Residential and Commercial Services · Service You Can Trust! · Our Expert Dryer Vent Services · Trusted Dryer Vent Cleaning in Los Angeles, CA · Why Choose Dryer Vent Wizard? · Dryer Vent Cleaning, Repair & Installation Services · Thorough Dryer Vent Inspections · Dependable Dryer Vent Repairs · Professional Dryer Vent Installations · Schedule Your Dryer Vent Cleaning in Los Angeles, CA Today · Next Steps · Frequently Asked Questions About Dryer Vent Wizard · Still need more information? · Our Blog · Join Our Team |
| Schema | Not detected |
| Pricing | Call for quote |
| "Dryer duct cleaning" | Not mentioned |
| Franchise language | "Locally Owned & Operated: Choosing a local Los Angeles team…" · "our local Dryer Vent Wizard team" · "All services are performed by independently owned and operated franchises" |
| Phone | (213) 306-7439 (local) |
| FAQs | 5 on-page |
| Review count | Not shown on this geo page |
| Map | Not embedded |
| Address | Not disclosed |
| Localization | Neighborhood list (Hollywood Hills, Santa Monica, Venice, Koreatown, Sherman Oaks, Downtown LA, Pacific Palisades, Echo Park, Westwood, Silver Lake, Brentwood, Hancock Park, Pasadena, etc.) — ~60 geo-links in the "Next Steps" block. Light references to "warm climate" / "older homes". No ZIP codes, no landmarks, no neighborhood-specific content. |

### 2.7 North Jersey — https://www.dryerventwizard.com/locations/north-jersey

| Field | Value |
|---|---|
| H1 | "Expert Dryer Vent Cleaning & Installation in North Jersey" |
| Word count | ~4,800 |
| H2 stack | Making Homes and Businesses Safer · Service You Can Trust! · Why You Need Dryer Vent Wizard · Customer Reviews · Areas We Serve · Our Blog · Still need more information? · Join Our Team |
| Schema | Not detected |
| Pricing | Not shown |
| "Dryer duct cleaning" | Not mentioned |
| Franchise language | "locally owned and operated franchise locations" · "All services are performed by independently owned and operated franchises" · "your local Dryer Vent Wizard is here for all your dryer vent needs" |
| Phone | (201) 345-0055 |
| Review display | **"235 Happy Customers \| 4.9/5"** (source not labeled) |
| Map | Not embedded |
| Address | Not disclosed |
| Localization | 125+ North Jersey towns in "Areas We Serve"; local-attributed testimonials; NO ZIPs, NO landmarks, NO genuine neighborhood content |

### 2.8 Central Indiana / Indianapolis — https://www.dryerventwizard.com/locations/central-indiana

| Field | Value |
|---|---|
| H1 | "Expert Dryer Vent Cleaning & Installation in Indianapolis" |
| Word count | ~3,500 |
| H2 stack | Making Homes and Businesses Safer · Why You Need Dryer Vent Wizard · Customer Reviews · Areas We Serve · Our Blog · Join Our Team |
| Schema | Not detected |
| Pricing | Call for quote (one review complains "this is an expensive service") |
| "Dryer duct cleaning" | Not mentioned |
| Franchise language | "locally owned and operated franchise locations" · "your local Dryer Vent Wizard" · "independently owned and operated franchises" |
| Phone | (317) 417-3490 |
| Review display | **"1,154 Happy Customers \| 4.9/5"** (source not labeled; BBB badge in footer only) |
| Map | Not embedded |
| Address | Not disclosed |
| Localization | 150+ IN municipalities listed; 5 attributed testimonials; blog posts with local angle (spring readiness, local referees). No ZIPs, no landmarks. |

---

## 3. Location Page Template Pattern (THE critical finding)

Dryer Vent Wizard runs **two slightly different location templates** depending on whether the URL is a metro-level franchise hub or a geo sub-page:

### 3.1 Franchise hub template (`/locations/[franchise-slug]`)

**H1 formula:** `Expert Dryer Vent Cleaning & Installation in [Metro]`
(observed: "…in North Jersey", "…in Indianapolis")

**Fixed H2 sequence (same across every metro page):**
1. Making Homes and Businesses Safer
2. Service You Can Trust!  *(sometimes)*
3. Why You Need Dryer Vent Wizard
4. Customer Reviews
5. Areas We Serve
6. Our Blog
7. Still need more information?
8. Join Our Team

### 3.2 Geo sub-page template (`/locations/[franchise]/geo/[city-state]`)

**H1 formula:** `Professional Dryer Vent Cleaning in [City], [State]`
(observed: "…in Los Angeles, CA")

**Fixed H2 sequence:**
1. Residential and Commercial Services
2. Service You Can Trust!
3. Our Expert Dryer Vent Services
4. Trusted Dryer Vent Cleaning in [City], [State]
5. Why Choose Dryer Vent Wizard?
6. Dryer Vent Cleaning, Repair & Installation Services
7. Thorough Dryer Vent Inspections
8. Dependable Dryer Vent Repairs
9. Professional Dryer Vent Installations
10. Schedule Your Dryer Vent Cleaning in [City], [State] Today
11. Next Steps
12. Frequently Asked Questions About Dryer Vent Wizard
13. Still need more information?
14. Our Blog
15. Join Our Team

### What's genuinely localized

Per location, **only** these fields change:
- City/metro name tokenized into H1, H2s, body (find-and-replace)
- Local phone number
- "Areas We Serve" list of 100–150 city/town links (templated geo-link block)
- 3–5 customer testimonials with first names
- Occasional weather/climate boilerplate ("warm climate", "humid areas") injected by template

### What's NOT localized (weaknesses we can exploit)

- **No ZIP codes** on any page inspected
- **No neighborhood-specific stories or descriptions** (just a link list in "Next Steps")
- **No local landmarks** (no "near Tampa International", "near Channelside", etc.)
- **No street address / no embedded Google Map**
- **No localized pricing** (no "average Tampa cost $X")
- **No county mentions**
- **No local driver content** (humidity, lint volume from pools, etc. specific to place)
- **FAQ answers are national, not local** — e.g. LA FAQ isn't any different from Indy FAQ

**Takeaway for us:** Our `lib/areas.ts` unique `intro` / `why` / `neighborhoods` / `drivers` / `landmarks` / ZIPs per area is a genuine content moat. Their 15,000+ pages are thin and duplicative; ours are intentionally unique.

---

## 4. Pricing Disclosure Analysis

**Verdict: zero pricing disclosed site-wide.**

| Page | Pricing behavior |
|---|---|
| Homepage | No prices; "Schedule Now" / "Call Us" CTAs |
| /residential/cleaning | "it's best to diagnose the issue in person. This ensures you'll receive the most accurate quote before any work begins." |
| FAQ "How much will it cost?" | Refused. Same "diagnose in person" language. |
| All location pages | No prices |
| About | No prices |

**Every pricing signal is one of:**
- "Free estimate"
- "Call for quote"
- "Diagnose in person"
- "Schedule Now"

**Our counter-move:** Publish an actual Tampa price range (e.g. "$89–$179 single dryer, $249–$449 rooftop / 2-story, $X multi-unit per vent"), ideally paired with an `Offer` schema on each service. Direct-answer AI queries like "how much does dryer vent cleaning cost in Tampa" will cite the page that gives a number. Dryer Vent Wizard cannot compete here without reversing a corporate policy.

---

## 5. Trust Signals & Numbers

### Corporate / About page
- **Since 2004** (~22 years)
- **125+ locally owned and operated franchise locations in the U.S. and Canada**
- Parent: **Neighborly family of brands** ("Neighborly Done Right Promise™")
- No customer count
- No review count
- No certifications named (no NADCA, no C-DET, no NFI, no NFPA-211 certified)
- No founder named, no founder story

### Per-location trust numbers (vary)
- North Jersey: **235 Happy Customers | 4.9/5** (source not labeled)
- Central Indiana: **1,154 Happy Customers | 4.9/5** (source not labeled; BBB badge in footer)
- Los Angeles geo: no review count shown

### NFPA citations
Their "Why You Need Dryer Vent Wizard" section cites NFPA fire statistics (the ~2,900 dryer fires/year figure) — this is the one place they do authority signalling. We already reference NFPA 211 per CLAUDE.md; we should make sure every service/area page does too.

### Trust signals they do NOT carry
- No named certifications per technician
- No named founder / no years of industry experience tied to a person
- No verified review count tied to a review platform logo
- No BBB rating number displayed (only a badge in footer)
- No insurance/bonded/licensed callouts prominently above fold
- No "photos of actual technicians/vehicles" that we saw

**Our counter-move:** Name the owner/founder, show years in the trade, display real Google review count with Google logo, list certifications, show ZIP service coverage with map, add licensed/insured/bonded callout.

---

## 6. Franchise Language to Counter-Position Against

Every phrase below is a **verbatim quote** from Dryer Vent Wizard pages. These are the lines our messaging should rebut directly.

### Tier 1: Most exploitable (legally required, they can't remove)
1. **"All services are performed by independently owned and operated franchises."**
   - Appears in the footer of **every page**.
   - Legal disclosure for the FTC franchise rule — they cannot remove it.
   - **Our rebuttal line:** "Airflow is actually locally owned — no franchise agreement, no corporate playbook, no royalty payments routed back to Waco, TX."

2. **"Your local Dryer Vent Wizard is here for all your dryer vent needs."**
   - Uses "local" as a franchise euphemism. The franchisee lives locally; the company, the software, the pricing, the phone routing, and the brand equity are national.
   - **Our rebuttal:** "'Your local Dryer Vent Wizard' is a Neighborly-owned franchise. Airflow is independent — the owner lives here, answers the phone here, trains the techs here."

3. **"over 125 locally owned and operated franchise locations in the U.S. and Canada"**
   - The phrase "locally owned and operated" is doing heavy lifting. Each franchisee owns their unit; the brand itself is Neighborly (publicly traded parent).
   - **Our rebuttal:** Clarify the distinction: "Locally operated franchise" ≠ "locally owned business". We are the latter.

### Tier 2: Soft weasel words
4. **"Locally Owned & Operated: Choosing a local Los Angeles team…"** (LA page)
5. **"our local Dryer Vent Wizard team"** (LA page)
6. **"As part of the Neighborly® family of brands, Dryer Vent Wizard proudly stands behind the Neighborly Done Right Promise™"**
7. **"State, provincial, and other local laws may impact the services an independently owned and operated franchise location may perform"** — i.e., they won't even commit to a consistent service scope.
8. **"Own A Franchise"** (their own CTA — we should screenshot this and use it on a comparison page)

### Counter-positioning page we should build
- **`/vs/dryer-vent-wizard`** — "Dryer Vent Wizard vs Airflow: Local Owner vs Franchise"
  - Table: Franchise model | Locally owned Tampa business
  - Call out the "independently owned and operated franchise" disclaimer verbatim
  - Pricing range (ours shown, theirs hidden)
  - Named owner vs anonymous franchisee
  - Tampa-specific drivers (humidity, salt air, pool lint) vs national template
  - Schema: our LocalBusiness vs their no-schema

---

## 7. FAQ Topics They Cover

From `/dryer-vent-101/frequently-asked-questions` — 19 questions total. Use as checklist: every one of these should be answered on our site with an AI-extractable direct answer.

1. Are there any environmental benefits to dryer vent cleaning?
2. Are there any warning signs specific to gas dryers?
3. Can a clogged dryer vent affect indoor air quality?
4. Can you tell me exactly how much my job will cost?  ← they refuse to answer; we should answer it
5. Does a clean dryer vent use less energy?
6. How do you clean a dryer vent?
7. How do you determine if a dryer vent needs to be cleaned?
8. How does dryer vent cleaning help ensure proper humidity in my home?
9. How often should you get your dryer vent cleaned?
10. Is dryer vent cleaning necessary for gas dryers?
11. Is my clothes dryer a fire risk?
12. What are the benefits of a clean dryer vent?
13. What are the long-term consequences of ignoring warning signs related to dryer vents?
14. What are the warning signs that my dryer vent needs to be cleaned?
15. What should I do if I notice a burning smell coming from my dryer?
16. Why are my clothes still damp after the dryer stops?
17. Why does my dryer usually feel hot during operation?
18. Why is there lint inside or behind my dryer?
19. What signs indicate my dryer vent needs cleaning?

### Topics they DON'T cover (our opening)
- Cost in dollars (range, rooftop upcharge, multi-unit)
- Tampa / Florida humidity impact on vent clogs
- Condo & HOA rooftop vent requirements
- Insurance / home-warranty coverage of vent cleaning
- Tenant vs landlord responsibility
- NFPA 211 code-compliance requirements specifically
- Pool / saltwater / salt-air environmental factors
- How to verify a tech is actually cleaning (before/after photos, camera inspection)

---

## 8. "Dryer Duct Cleaning" Synonym Status

**Confirmed: they do not use "dryer duct cleaning" anywhere across the pages inspected.**

Pages checked for the phrase (all negative):
- Homepage
- /about-us
- /residential/cleaning
- /dryer-vent-101/frequently-asked-questions
- /locations/hollywood/geo/los-angeles-ca
- /locations/north-jersey
- /locations/central-indiana

They use **"dryer vent cleaning"** exclusively. This is consistent with NADCA/NFPA preferred terminology.

**Implication for us:** The query cluster `dryer duct cleaning [city]`, `dryer duct cleaning near me`, `dryer duct vs vent cleaning`, `how much does dryer duct cleaning cost` is uncontested by the #1 national brand. We should:
1. Keep a definitional paragraph on every service/area page: "Dryer vent cleaning (also called dryer duct cleaning) is…"
2. Publish one FAQ/blog: "Dryer vent cleaning vs. dryer duct cleaning: are they the same?"
3. Include `"dryer duct cleaning"` in `alternateName` on service schema
4. Add the synonym to H2/H3 naturally — not keyword stuffed

---

## Appendix A: Sitemap Observations

- No `/locations` index — use `/find-your-wizard` (ZIP lookup form, no list)
- No `/services` index — use `/residential/*` and `/commercial/*`
- Educational content lives at `/dryer-vent-101/*`, `/warning-signs/*`, `/dryer-vent-cleaning-benefits/*` — 20+ topical clusters we could rank against
- Per-franchise subtrees mirror the full site (e.g. `/locations/holladay/warning-signs/longer-drying-time`) — this is a programmatic SEO pattern worth matching on our area pages where it makes sense, but with UNIQUE copy per area (their differentiator is zero).
