# SEO Audit — dryervent.vercel.app

**Audit date:** 2026-04-19
**Auditor:** Claude Code
**Domain:** https://dryervent.vercel.app (soon to be rebranded to **Airflow Dryer Vent Cleaning**)
**Scope:** Homepage, /sitemap.xml, /robots.txt, /llms.txt, /areas/tampa, /areas/brandon, /services/residential-dryer-vent-cleaning, /about, /contact, /pricing

---

## Executive Summary

The site has a strong content foundation (unique per-area intros, definition-style service copy, good internal linking, FAQ/breadcrumb schema on content pages, well-formed sitemap, comprehensive AI crawler allowlist in robots.txt, and a thorough llms.txt). However, several **critical, Google-penalty-class technical SEO defects** are present, all of which block the site from ranking at its potential:

1. **Duplicate LocalBusiness schema with identical `@id`** on every area and service page (the root `app/layout.tsx` injects the schema globally, and the page template injects it again). Google Search Console will flag this as structured-data conflict and may ignore the rich result eligibility.
2. **Every `<title>` ends with `… | Dry Vent Tampa | Dry Vent Tampa`** — the Next.js title template `%s | Dry Vent Tampa` in root metadata stacks on titles that already contain "Dry Vent Tampa". Every page has brand-stuffed, truncation-prone titles 80–85 chars long.
3. **Placeholder phone `(813) 555-1234`** still appears in `app/layout.tsx` default description and on the Contact page's public meta description and OG/Twitter tags (visible to Google, Facebook, and AI crawlers) — a direct trust/conversion killer.
4. **Zero images across the entire site** (0 `<img>` tags on every audited page). No hero imagery, no technician photos, no before/after proof. Huge gap for image SEO, E-E-A-T, CWV visual stability, and social preview authenticity.
5. **About, Contact, and Pricing pages emit no page-specific schema** — only the global LocalBusiness. Pricing has no `Offer`/`Service` schema despite listing five priced services; Contact has no `ContactPage`/`ContactPoint`; About has no `AboutPage` or `Organization` `founder`/`foundingDate`.
6. **Thin content on About (437 words) and Contact (232 words)** relative to E-E-A-T expectations for a local home-services business.

Once the rebrand to **Airflow Dryer Vent Cleaning** ships, the entire `Dry Vent Tampa` string must be replaced globally (found in metadata defaults, schema `name`, footer, headers, FAQ answers, llms.txt, social handles, and email domain `info@dryventtampa.com`). The rebrand is the right moment to fix all six issues above in a single PR.

**Overall grade (pre-fix):** C+ — strong content/IA, poor technical execution.
**Projected grade (post-fix):** A− with minor content additions.

---

## Critical Issues (ranked by severity)

| # | Severity | Issue | Where | Impact |
|---|----------|-------|-------|--------|
| 1 | **CRITICAL** | `LocalBusiness` schema duplicated with identical `@id="https://dryervent.vercel.app#business"` on area/service pages (2 copies per page); emitted globally on every page and again by page templates | `app/layout.tsx` line 59-62 + `app/(marketing)/areas/[slug]/page.tsx` line 62, `app/(marketing)/services/[slug]/page.tsx` | Google ignores duplicate structured data; risks SDTT errors; rich-result eligibility lost |
| 2 | **CRITICAL** | Title template doubles brand: every page title ends with `| Dry Vent Tampa | Dry Vent Tampa` | `app/layout.tsx` line 14 `template: '%s | Dry Vent Tampa'` combined with page titles that already contain the brand | All titles 80–85 chars → truncated in SERP; looks like keyword stuffing |
| 3 | **CRITICAL** | Placeholder phone `(813) 555-1234` still in production | `app/layout.tsx` line 17 (root description default), visible on `/contact` meta description + OG + Twitter cards, form placeholder on every page | Broken trust signal indexed by Google and AI crawlers; appears in social previews |
| 4 | **CRITICAL** | Schema `SITE` fallback points to wrong domain `https://dryventtampa.com` while site is deployed at `dryervent.vercel.app` | `lib/schema.ts` line 4, `lib/seo.ts` line 3, `app/layout.tsx` line 6 | `@id`, `url`, canonicals, OG URLs can mismatch depending on env var; inconsistent canonical risk |
| 5 | **HIGH** | Zero images sitewide — 0 `<img>` on every audited page | All templates | No image SEO, no alt-text signals, no E-E-A-T visual proof, OG image `/og-image.jpg` referenced but no evidence it exists |
| 6 | **HIGH** | About, Contact, Pricing pages missing page-specific schema (no `Offer`, `Service`, `AboutPage`, `ContactPage`, `BreadcrumbList`, `FAQPage`) | `app/(marketing)/about/page.tsx`, `contact/page.tsx`, `pricing/page.tsx` | Missed rich-result surface area; pricing especially could win `PriceSpecification` rich results |
| 7 | **HIGH** | Rebrand not yet applied — "Dry Vent Tampa" hardcoded in schema `name`, metadata templates, layout defaults, footer component, title templates, social `sameAs` URLs, email `info@dryventtampa.com` | `lib/schema.ts` line 12, `app/layout.tsx` lines 12-30, `app/llms.txt/route.ts`, all page templates, Footer, Header | Blocks rebrand to Airflow Dryer Vent Cleaning |
| 8 | **HIGH** | `google` site-verification still a placeholder `'add-your-google-site-verification-here'` | `app/layout.tsx` line 38 | GSC cannot verify; search performance data blind spot |
| 9 | **MEDIUM** | Homepage H1 present but the site uses both `<em>` wrapping inside H1 text (e.g. `Tampa Bay's #1 _Dryer Vent Cleaning_ Service`) rendering screen-reader-friendly but the markdown-style underscore (`_`) in extracted content suggests the actual DOM may contain emphasis tags mid-keyword — verify it doesn't break keyword-phrase crawling | Hero component | Low but worth verifying H1 keyword remains a continuous phrase |
| 10 | **MEDIUM** | Thin content: About = 437 words, Contact = 232 words | `app/(marketing)/about/page.tsx`, `contact/page.tsx` | Below E-E-A-T floor for local services; no team bios, no certifications named, no license numbers |
| 11 | **MEDIUM** | `LocalBusiness.address` in schema has no `streetAddress` or `postalCode` — only locality/region/country. Google treats incomplete addresses as low-trust for local pack | `lib/schema.ts` lines 19-24 | Reduced local-pack eligibility |
| 12 | **MEDIUM** | `sameAs` social URLs are unverified placeholders (`facebook.com/dryventtampa`, etc.) — if these accounts don't exist, Google treats the signal as deceptive | `lib/schema.ts` lines 48-52 | Potential knowledge-graph penalty |
| 13 | **LOW** | Breadcrumb on area pages: item 2 "Areas" points to `/areas/tampa` (a single area) rather than an areas index `/areas` which does not exist | `app/(marketing)/areas/[slug]/page.tsx` line 66 | Minor IA/breadcrumb inconsistency |
| 14 | **LOW** | Sitemap `lastmod` for all URLs identical (`2026-04-18T23:20:59.477Z` = build time) — doesn't reflect real content change dates | `app/sitemap.ts` | Signal dilution |
| 15 | **LOW** | Meta description on `/services/residential-dryer-vent-cleaning` is truncated mid-sentence ending with "from the d" — descriptions are auto-generated from `service.intro` without a description-specific field | `app/(marketing)/services/[slug]/page.tsx` metadata generator | Ugly SERP snippet |

---

## Per-Page Findings

### 1. Homepage — `https://dryervent.vercel.app/`

- **HTTP status:** 200
- **Title:** `Dry Vent Tampa | #1 Dryer Vent Cleaning in Tampa Bay, FL | Dry Vent Tampa` (80 chars — TOO LONG, brand doubled)
- **Meta description:** 171 chars (slightly over Google's 155–160 char display limit; cleanly written)
- **Canonical:** `https://dryervent.vercel.app` (correct)
- **H1:** `Tampa Bay's #1 Dryer Vent Cleaning Service` (single, keyword-targeted — GOOD)
- **H2 hierarchy:** 9 H2s (Get Your Free Estimate, THE HIDDEN DANGER, Your Dryer Could Be a Fire Hazard Right Now, Professional Dryer Vent Services, How It Works, Trusted by 847+, Serving All of Tampa Bay, FAQs, Protect Your Home Today). Good semantic flow.
- **Schema:** 3 JSON-LD blocks — `LocalBusiness` (global), `FAQPage` (6 FAQs), `BreadcrumbList` (only 1 item = Home — essentially empty). GOOD that only 1 LocalBusiness here (not duplicated on home).
- **@id collision:** `https://dryervent.vercel.app#business` — this `@id` is repeated identically on EVERY other page (see issue #1).
- **Internal links:** All 15 areas + all 5 services linked. Excellent.
- **Word count:** ~1,219 words of body text (good for a homepage).
- **Images:** 0 images. No hero photo, no service icons as raster images, no social-proof photos.
- **Open Graph:** Complete (title, description, url, site_name, locale, image, image:width/height/alt, type). All `og:image` points to `/og-image.jpg` — verify this asset exists in `/public/`.
- **Twitter:** `summary_large_image` card complete.
- **Brand mentions:** "Dry Vent Tampa" appears 2 visible times in body text, plus header/footer, plus twice in `<title>`.
- **Phone:** `(813) 744-1127` displayed 2 times (body). Form placeholder uses `(813) 555-1234` (placeholder attribute, not actual display, but indexable by some crawlers).

### 2. `/sitemap.xml`

- **HTTP status:** 200
- **URLs:** 25 total (home + about + contact + pricing + blog + 5 services + 15 areas)
- **Blog:** Listed in sitemap with priority 0.7 — verify the `/blog` page actually renders content (if empty, remove from sitemap to avoid thin-content signals).
- **lastmod:** All identical = build timestamp. Should reflect content change dates.
- **Missing URLs:** No blog posts listed. No `/areas` index page (doesn't exist but is referenced in breadcrumbs).
- **Format:** Valid XML, correct structure.

### 3. `/robots.txt`

- **HTTP status:** 200
- **Structure:** Clean. Allows all with API/_next blocked.
- **AI crawlers:** Explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, Perplexity-User, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, Applebot-Extended, Bytespider, CCBot. EXCELLENT — matches AI-SEO mandate in CLAUDE.md.
- **Sitemap directive:** Present.
- **Host directive:** `Host: https://dryervent.vercel.app` (non-standard; `Host` is deprecated by Google. Safe but unnecessary.)

### 4. `/llms.txt`

- **HTTP status:** 200
- **Size:** 11,255 bytes
- **Structure:** Excellent — follows llms.txt conventions (H1 brand, blockquote description, About section, Key Facts, Services with definitions and prices, Service Areas with population and "why local matters", URLs).
- **Facts referenced:** NFPA, U.S. Fire Administration stats, 30% energy claim, Florida humidity note. Perfect for AI citation.
- **Branding:** Uses "Dry Vent Tampa" — must be rebranded.

### 5. `/areas/tampa`

- **HTTP status:** 200
- **Title:** `Dryer Vent Cleaning Tampa, FL | Same-Day Service | Dry Vent Tampa | Dry Vent Tampa` (85 chars — WAY TOO LONG, brand doubled)
- **Meta description:** 178 chars — slightly over limit but well-crafted
- **Canonical:** `https://dryervent.vercel.app/areas/tampa` (correct)
- **H1 count:** 1 (`#1 Dryer Vent Cleaning in Tampa, FL` — extracted HTML shows this; note also an H1-style text `Dryer Vent Cleaning in Tampa, Florida` in Hero — verify only one actual `<h1>` in DOM)
- **H2/H3:** Well-structured (Why Tampa, Neighborhoods, Why Tampa Is Different, Services in Tampa, Why Tampa Chooses…, Reviews, FAQs, Nearby Areas). Good semantic markup.
- **Schema — CRITICAL ISSUE:** TWO `LocalBusiness` entities emitted with IDENTICAL `@id="https://dryervent.vercel.app#business"`. Root `app/layout.tsx` injects it globally; area page injects it again through SchemaMarkup. Also has FAQPage (5 Tampa-specific questions — GOOD), BreadcrumbList.
- **Internal links:** All 5 services + all 14 other areas linked. Excellent.
- **Word count:** ~1,131 words
- **Images:** 0
- **Open Graph / Twitter:** Complete
- **First paragraph:** "Trusted by 403,000 residents and businesses in Tampa…" — this is the Hero subtitle, NOT an AI-extractable definition intro. The definition-style intro (`Dryer vent cleaning in Tampa is essential because…`) appears in the body, not the first paragraph/position-zero slot.
- **Local signals:** ZIPs 33602–33610, neighborhoods (Hyde Park, SoHo, Davis Islands, Seminole Heights, Ybor City, Channelside, Westshore), Hillsborough County. GOOD.
- **Phone:** `(813) 744-1127` displayed 2x; form placeholder `(813) 555-1234`.

### 6. `/areas/brandon`

- **HTTP status:** 200
- **Title:** `Dryer Vent Cleaning Brandon, FL | Same-Day Service | Dry Vent Tampa | Dry Vent Tampa` (83 chars — same issue)
- **Meta description:** 175 chars
- **Canonical:** Correct
- **H1:** 1 (`#1 Dryer Vent Cleaning in Brandon, FL`)
- **Schema:** Same 2-duplicate LocalBusiness issue. FAQPage has 5 Brandon-specific questions (GOOD). BreadcrumbList present.
- **Internal links:** All services + 14 other areas (EXCEPT the "Areas" breadcrumb points to `/areas/tampa` — minor IA issue).
- **Word count:** ~1,073 words
- **Images:** 0
- **Local signals:** ZIPs 33508–33511, neighborhoods (Bloomingdale, Brandon Lakes, FishHawk Ranch, Heather Lakes, Providence Lakes), Hillsborough County.
- **Content originality:** The Brandon intro in body (`Brandon dryer vent cleaning is especially important for the area's many family-sized homes and growing suburban developments…`) is genuinely distinct from Tampa's (`Dryer vent cleaning in Tampa is essential because the city's combination of high humidity, year-round dryer use, and aging housing stock…`). GOOD — per-area uniqueness is working.
- **Duplicate content risk:** Most non-intro/why text (services section, why-choose-us, FAQs-by-template, nearby-areas, final CTA) is produced from shared templates. The FAQ answers are templated but interpolate the city name — acceptable but could be strengthened with area-specific stats.

### 7. `/services/residential-dryer-vent-cleaning`

- **HTTP status:** 200
- **Title:** `Residential Dryer Vent Cleaning Tampa Bay | From $99 | Dry Vent Tampa | Dry Vent Tampa` (86 chars — same doubling issue)
- **Meta description:** 158 chars but TRUNCATED mid-sentence ending with "from the d" — broken UX
- **Canonical:** Correct
- **H1:** 1 (`Residential dryer vent cleaning in Tampa Bay`)
- **H2/H3:** Well-structured (What's Included, Key Benefits, Process with 5 steps, Reviews, FAQs, Areas served, Other services, CTA).
- **Schema:** 4 JSON-LD blocks:
  - `LocalBusiness` with `@id="https://dryervent.vercel.app#business"` (from root layout)
  - `Service` with `provider: { @id: "https://dryervent.vercel.app#business" }` — cross-reference is correct pattern, but the provider entity is being redefined globally on this same page
  - `FAQPage` with 4 service-specific FAQs
  - `BreadcrumbList` with 3 items (Home > Services > Residential Cleaning)
- **Offer:** Present inside Service schema (`price: "99"`, `priceCurrency: "USD"`, `availability: InStock`)
- **Internal links:** All 15 areas + all 5 services linked. Excellent.
- **Word count:** ~1,019 words
- **First paragraph:** `Residential dryer vent cleaning is the professional removal of accumulated lint, debris, and obstructions…` — EXCELLENT definition-style intro, AI-extractable per the CLAUDE.md rule.
- **Images:** 0
- **Phone:** `(813) 744-1127` displayed 2x; form placeholder `(813) 555-1234`.

### 8. `/about`

- **HTTP status:** 200
- **Title:** `About Dry Vent Tampa | Florida's Trusted Dryer Vent Experts | Dry Vent Tampa` (76 chars — still brand-doubled)
- **Meta description:** 156 chars — good length
- **Canonical:** Correct
- **H1:** 1 (`Tampa Bay's Most Trusted Dryer Vent Company`)
- **H2/H3:** Our Story, What Makes Us Different (Licensed & Insured, Certified Technicians, 847+ Reviews, Same-Day), Our Commitment, Final CTA. Minimal but clean.
- **Schema:** ONLY the global `LocalBusiness` — **missing:** `AboutPage`, `Organization` with `founder` / `foundingDate: "2015"`, `BreadcrumbList`.
- **Internal links:** Services + most areas linked.
- **Word count:** ~437 words — THIN for an About page. Needs team bios, license numbers, certifications (NFPA 211 mentioned generally but no certifying body, technician names, CSIA/LintAlert credentials, etc.).
- **Claims unsupported:** "Since 2015", "15,000+ vents cleaned", "847+ five-star reviews", "100% satisfaction rate" — claims are good for E-E-A-T IF backed by proof (review screenshots, Google Business link, before/afters). Currently unsupported visually.
- **Phone:** `(813) 744-1127` x 2. No placeholder here.
- **Open Graph / Twitter:** Complete.

### 9. `/contact`

- **HTTP status:** 200
- **Title:** `Contact Dry Vent Tampa | Get a Free Estimate | Dry Vent Tampa` (61 chars — good length, still brand-doubled)
- **Meta description:** **CONTAINS PLACEHOLDER PHONE** — `Call (813) 555-1234, email us, or book online.` This is **visible in Google SERPs and social previews** — top-tier severity.
- **Canonical:** Correct
- **H1:** 1 (`Get a Free Estimate`)
- **Schema:** ONLY global `LocalBusiness`. **Missing:** `ContactPage`, `ContactPoint` schema with phone/email/hours/languages.
- **Phone:** `(813) 744-1127` displayed 1x in body; **placeholder `(813) 555-1234` appears in meta description, og:description, and twitter:description** — critical brand leak.
- **Email:** `info@dryventtampa.com` — will need to change to `@airflowdryervent.com` or similar post-rebrand.
- **Business address:** Not displayed on contact page. Missing. Bad for local SEO.
- **Hours:** `Mon–Sat · 7AM–7PM` shown.
- **Contact form:** Fields are Full Name, Phone, ZIP (required), Email (optional), Service Needed dropdown.
- **Word count:** ~232 words — VERY THIN. Add driving directions, service-area map, "What happens after you submit" expectations, response-time guarantee, alternative contact methods.
- **Open Graph / Twitter:** Complete (but og:description also contains the 555-1234 placeholder).

### 10. `/pricing`

- **HTTP status:** 200
- **Title:** `Dryer Vent Cleaning Prices Tampa Bay | Transparent Pricing | Dry Vent Tampa` (76 chars — brand-doubled)
- **Meta description:** 172 chars — good. Clean.
- **Canonical:** Correct
- **H1:** 1 (`Transparent Pricing`)
- **H2s:** Fair Prices. No Surprises. · Residential Cleaning · Commercial Service · Vent Repair · New Installation · Vent Inspection · Pricing FAQs · Final CTA. Clean.
- **Schema:** ONLY global `LocalBusiness`. **MAJOR MISS:** Should emit a `PriceSpecification` or multiple `Offer`/`Service` entities for each tier. Could win rich-result pricing snippets in SERPs.
- **FAQ:** 4 Q&A on-page (hidden fees, estimate charges, base-price inclusions, when additional costs apply) BUT no `FAQPage` schema. Easy win.
- **Prices:** $99 residential, $79 inspection, $149 repair, $249 installation, custom commercial.
- **Word count:** ~663 words
- **Phone:** `(813) 744-1127` x 2. No placeholder leakage here.
- **Open Graph / Twitter:** Complete.

---

## Schema Issues (dedicated section)

### Issue A — Duplicate LocalBusiness with identical `@id` (CRITICAL)

**Location 1 (global):** `app/layout.tsx` lines 59-62 injects `localBusinessSchema()` into every page via the root `<head>`.

**Location 2 (per-page):** Each marketing route template (areas, services) ALSO calls `localBusinessSchema(area)` and passes it to `<SchemaMarkup>`, which injects a second `<script type="application/ld+json">` in the body.

**Result:** On `/areas/tampa`, `/areas/brandon`, etc., TWO identical JSON-LD blocks share `@id="https://dryervent.vercel.app#business"`. Schema.org's `@id` must be globally unique per entity. Google's SDTT will flag duplicate entity definitions; rich-result eligibility may be silently dropped.

**Fix options:**
- **Preferred:** Remove the global injection from `app/layout.tsx`. Let each page template inject its own LocalBusiness tailored with area-specific `address.addressLocality` and `geo` (the per-page call already does this — the global one just overwrites with generic Tampa values).
- **Alternative:** Keep the global one and remove the per-page emission from the area/service templates. But this loses per-area address/geo fidelity.
- **Best of both:** Keep global for pages that don't define their own (home, about, contact, pricing). Remove it from layout for `/areas/[slug]` and `/services/[slug]` — use route-level conditional rendering or a layout-level opt-out.

### Issue B — Missing per-page schema on About/Contact/Pricing

| Page | Should add |
|------|-----------|
| `/about` | `AboutPage`, `Organization` (founder, foundingDate, numberOfEmployees if known), `BreadcrumbList` |
| `/contact` | `ContactPage`, `ContactPoint` (telephone, email, areaServed, availableLanguage, contactType: "customer service"), `BreadcrumbList` |
| `/pricing` | `OfferCatalog` with itemListElement of 5 `Offer` entities, `BreadcrumbList`, `FAQPage` for on-page pricing FAQs |

### Issue C — Incomplete LocalBusiness PostalAddress

`lib/schema.ts` lines 19-24 emits:
```
{ addressLocality, addressRegion: 'FL', addressCountry: 'US' }
```
Missing `streetAddress` and `postalCode`. For a home-services business targeting local pack, Google needs a full NAP (Name/Address/Phone) — even a "service area business" needs a verifiable address (typically the owner's address registered with Google Business Profile).

### Issue D — Schema references wrong default domain

`lib/schema.ts` line 4, `lib/seo.ts` line 3, `app/layout.tsx` line 6 all fall back to `https://dryventtampa.com` when `NEXT_PUBLIC_SITE_URL` is unset. If the env var is unset in any environment (preview deploys, local builds), schema `@id`, canonicals, OG URLs will mismatch the real host. Post-rebrand this domain string also needs updating.

### Issue E — Unverified sameAs social profiles

`lib/schema.ts` lines 48-52 lists three social URLs (facebook.com/dryventtampa, instagram.com/dryventtampa, google.com/maps/place/dryventtampa). If these pages don't actually exist, Google treats the claim as misleading. Verify each URL 200s and the profile name matches before keeping in schema.

---

## Content Gaps

1. **No images sitewide.** 0 `<img>` tags on all 7 audited pages. Need:
   - Hero background photo (technician at work in a Tampa home)
   - Team/owner photo for About
   - Before/after lint photos (high CTR in image search)
   - Service icons as raster/SVG for social previews
   - Verify `/og-image.jpg` asset exists in `/public/`
2. **About page is 437 words** and has no:
   - Owner/founder name
   - Technician photos and names
   - License number / proof of insurance
   - Certifications named (CSIA, NFPA-trained, NADCA member?)
   - Year-by-year milestones or "our story" detail
   - Links to Google Business Profile, BBB rating, etc.
3. **Contact page is 232 words** and has no:
   - Physical/business address (required for local pack)
   - Service-area map embed
   - Response-time SLA ("we reply within 15 minutes 7am–7pm")
   - Alternate contact methods (text, WhatsApp, chat)
4. **Pricing page has FAQ content but no FAQ schema** — easy rich-result win.
5. **No blog posts indexed in sitemap** despite `/blog` being in the sitemap — publish 5-10 topical posts ("How to tell if your dryer vent is clogged", "NFPA 211 compliance for Tampa landlords", "Dryer fire statistics Florida 2025") to support topical authority and internal linking.
6. **Area pages** don't reference local fire-marshal contact info, county code references, or Tampa-specific fire incident statistics — high-value E-E-A-T additions.
7. **No reviews/testimonials with schema.** Reviews are referenced ("847+ five-star reviews") but not emitted as `Review` schema (even though `lib/schema.ts` has a `reviewSchema()` function — it's unused).

---

## Recommendations (prioritized)

### Immediate (do before rebrand ships)

1. **Remove `localBusinessSchema()` injection from `app/layout.tsx`** (lines 59-62). Let each page template emit its own. Prevents duplicate `@id`.
2. **Fix title template.** Change `template: '%s | Dry Vent Tampa'` to `template: '%s'` OR strip "| Dry Vent Tampa" from every page-level title. Goal: titles ≤ 60 chars with brand appearing only ONCE.
3. **Replace the `(813) 555-1234` placeholder** in:
   - `app/layout.tsx` line 17 (root description)
   - Contact page metadata (source currently: wherever the contact page generates its meta — verify `app/(marketing)/contact/page.tsx`)
   - Form `placeholder` attribute in the lead form component (cosmetic but indexed)
   - Use `process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY` per CLAUDE.md rule
4. **Fix `PHONE` fallback in `lib/schema.ts` line 5** — currently `'+18135551234'`. Change to `'+18137441127'` or throw if missing.
5. **Fix `SITE` fallback** — set to the production domain or throw at build time.
6. **Add real Google site-verification** to `app/layout.tsx` line 38.

### Rebrand-coupled changes (next PR — "Airflow Dryer Vent Cleaning")

7. **Global rename:** "Dry Vent Tampa" → "Airflow Dryer Vent Cleaning" across:
   - `lib/schema.ts` `name` field, `sameAs` URLs
   - `lib/seo.ts` `siteName`
   - `app/layout.tsx` metadata defaults + title template
   - `app/llms.txt/route.ts` H1 and company name references
   - Header, Footer components
   - Every H2/H3/CTA that says "Why [Area] Chooses Dry Vent Tampa" or "Dry Vent Tampa is…"
   - Email domain `info@dryventtampa.com` → new domain
8. **Update `sameAs` URLs** to the new brand's verified social profiles.
9. **Update title template** to match new brand length budget.

### Schema enhancements

10. Add `streetAddress` + `postalCode` to `PostalAddress` in `localBusinessSchema()`.
11. Add `Offer`/`Service` schema objects on `/pricing` via an `OfferCatalog`.
12. Add `ContactPoint` + `ContactPage` schema on `/contact`.
13. Add `AboutPage` + `Organization` with `founder`, `foundingDate: "2015"`, `numberOfEmployees` on `/about`.
14. Add `FAQPage` schema for the 4 on-page pricing FAQs.
15. Wire up the unused `reviewSchema()` function in `lib/schema.ts` to emit `Review` schema for the testimonials shown on area pages and homepage.
16. Fix breadcrumb `Areas > /areas/tampa` (line 66 of area template) — either create an `/areas` index page or drop the intermediate breadcrumb.

### Content additions

17. Add at least 6 images to the site: hero photo, before/after pair, technician photo, service icons, OG image (verify exists).
18. Expand `/about` to 800+ words with named team, credentials, license #, proof photos.
19. Expand `/contact` to 500+ words with address/map, SLA, alternate channels.
20. Publish 5 blog posts on `/blog` (NFPA guidance, Florida-specific risks, cost breakdowns, DIY-vs-pro, code compliance).
21. Move each area page's definition-style intro to be the true first paragraph (above the hero stats grid), to match CLAUDE.md's AI-extractable rule.

### Low priority / nice-to-have

22. Have `sitemap.ts` emit per-URL `lastmod` based on content revision timestamps rather than build time.
23. Remove deprecated `Host:` directive from robots.txt.
24. Verify the Open Graph image `/og-image.jpg` exists and is 1200×630; consider per-route dynamic OG images via `opengraph-image.tsx`.
25. Consider adding `hreflang="en-us"` self-referencing link (low priority for single-language site).

---

## Files that will need edits

- `/Users/user/dev/dry-vent-tampa/app/layout.tsx` (title template, root description phone, schema injection, SITE fallback, site-verification)
- `/Users/user/dev/dry-vent-tampa/lib/schema.ts` (PHONE fallback, SITE fallback, name, sameAs, address completeness, new schema generators)
- `/Users/user/dev/dry-vent-tampa/lib/seo.ts` (siteName, SITE fallback)
- `/Users/user/dev/dry-vent-tampa/app/(marketing)/areas/[slug]/page.tsx` (title length, breadcrumb)
- `/Users/user/dev/dry-vent-tampa/app/(marketing)/services/[slug]/page.tsx` (title length, description truncation)
- `/Users/user/dev/dry-vent-tampa/app/(marketing)/about/page.tsx` (add schema, expand content)
- `/Users/user/dev/dry-vent-tampa/app/(marketing)/contact/page.tsx` (add schema, remove phone placeholder from meta, expand content)
- `/Users/user/dev/dry-vent-tampa/app/(marketing)/pricing/page.tsx` (add Offer/FAQPage schema)
- `/Users/user/dev/dry-vent-tampa/app/llms.txt/route.ts` (rebrand)
- `/Users/user/dev/dry-vent-tampa/components/Header.tsx`, `Footer.tsx` (rebrand)
- Lead form component (phone placeholder)
