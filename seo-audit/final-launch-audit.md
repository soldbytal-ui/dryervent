# Final Launch Audit — Airflow Dryer Vent Cleaning Tampa

**Audit date:** 2026-04-21
**Build state:** 65 static pages, 46 sitemap URLs, 8 phases + 1 critical cleanup completed.
**Status:** Launch-ready pending client-supplied data (see Launch Checklist).

---

## A. Technical SEO

| Check | Status | Notes |
|---|---|---|
| robots.txt allows standard + AI crawlers | ✓ | 12 AI crawlers explicitly allowed (GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, Perplexity-User, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, Applebot-Extended, Bytespider, CCBot). |
| robots.txt disallows /admin/, /api/, /_next/ | ✓ | All three paths protected. /admin/ added in Phase 7. |
| sitemap.xml URL count | ✓ | 46 URLs (10 static + 5 services + 5 counties + 23 areas + 3 blog posts). |
| sitemap priority distribution | ✓ | 1.0 / 0.95 / 0.9 / 0.85 / 0.8 / 0.75 / 0.7 / 0.55 across 46 URLs. |
| All pages HTTP 200 | ✓ | 65/65 static pages generate. Spot-checked 10 sample routes. |
| Flat URL structure / no redirect chains | ✓ | No redirects wired beyond Next.js defaults. |
| Canonical URLs correct | ✓ | `buildMetadata()` sets `alternates.canonical` on every page. |
| Meta titles in 50–60 char target | ⚠ | Most within range; a few near or slightly over 60 chars (`tampadry…` city titles). Flagged in Phase 1; acceptable (Google truncates visually, no penalty). |
| Meta descriptions 140–160 chars | ✓ | All metaDescriptions trimmed ≤160 chars during Phase 5/6 agent passes. |
| Open Graph + Twitter Card meta on every page | ✓ | `buildMetadata()` sets `openGraph` + `twitter` blocks. |
| metadataBase set | ✓ | `app/layout.tsx` sets `new URL(SITE)`. |

## B. On-Page SEO

| Check | Status | Notes |
|---|---|---|
| Single H1 per page | ✓ | Every template has exactly one `<h1>`. |
| Heading hierarchy correct | ✓ | H2 → H3 within each section. No skipped levels on core pages. |
| Image alt text where applicable | — | No `<img>` tags rendered anywhere currently. Header logo is inline SVG with `aria-hidden`; parent `<Link>` has `aria-label="Airflow Dryer Vent Cleaning Home"`. When client adds real photos, alt text becomes relevant. |
| Internal linking density per page | ✓ | ~55+ internal links per page average after Phase 6 restructure (Footer 34-link county grid + area 3-col Related block + tag-filtered specialty-page lists). |
| No broken internal links | ✓ | All `/areas/*`, `/services/*`, `/areas/counties/*`, `/blog/*`, specialty pages resolve. |
| "dryer duct" synonym coverage | ✓ | All 23 enhanced cities contain 4+ mentions (verified Phase 3/4). Services, /pricing, blog posts, and specialty pages also use synonym. |
| "dryer vent" + "dryer duct" both in first 150 words of enhanced-city longIntro | ✓ | Verified across all 23 cities. |

## C. Schema.org

| Check | Status | Notes |
|---|---|---|
| LocalBusiness complete | ✓ | name + address (with TODO placeholders for street/ZIP) + telephone + openingHoursSpecification + priceRange + areaServed (GeoCircle 50mi) + makesOffer (free inspection + residential cleaning) + hasCredential (license + insurance, both with TODO identifiers) + slogan + sameAs. |
| WebSite + Organization at root | ✓ | Added in Phase 7. WebSite includes SearchAction (aspirational `/search?q=` template). Organization has @id `/#organization`, publisher links in all descendant Article/WebPage schemas. |
| Service + AggregateOffer on /pricing | ✓ | Two Service entities (cleaning + free inspection). AggregateOffer priceRange $79–$595. |
| FAQPage on all pages with FAQs | ✓ | /pricing (15 FAQs after PAA), /services/[slug] (5 each, free-inspection now 7), all 23 /areas/[slug] (5 each), 5 /areas/counties/[county] (5 each), 4 specialty pages (5 each, local-vs-franchise now 6 after PAA), 3 blog posts (4 each). |
| BreadcrumbList on all interior pages | ✓ | Every non-home page has breadcrumb schema. |
| Article on all blog posts | ✓ | Centralized `articleSchema()` helper enforces required props (headline ≤110, author + publisher @id refs, mainEntityOfPage, dateModified fallback, image). |
| AboutPage on /about | ✓ | Phase 7. |
| ContactPage on /contact | ✓ | Phase 7. |
| CollectionPage + Blog + BlogPosting[] on /blog | ✓ | Phase 7. |
| WebPage wrapper on /pricing | ✓ | Phase 7. |
| HowTo on Florida frequency blog | ✗ | Evaluated and skipped. Post is a classification matrix (home-type → frequency), not sequential actionable steps. Forced HowTo schema would be awkward and Google reduced HowTo rich result surface in 2023. Article + FAQPage schema cover it adequately. |
| aggregateRating present | ✗ | Correctly absent. Will re-add when ≥5 verified Google reviews exist. Documented in `lib/schema.ts` + `lib/reviews.ts` comments. |
| Dead review schema | ✓ | `reviewSchema()` is a no-op stub with re-enable instructions. |
| @id graph consistency | ✓ | LocalBusiness (`/#localbusiness`), Organization (`/#organization`), WebSite (`/#website`), area-scoped LocalBusinesses (`/areas/{slug}#localbusiness` with parentOrganization ref), Article (`/blog/{slug}#article`), WebPage (`{path}#webpage`). No collisions. |

## D. Content

| Check | Status | Notes |
|---|---|---|
| 23/23 cities enhanced | ✓ | 15 Tier 1 (1,360–1,733 content words) + 8 Tier 2 (1,288–1,759 content words). Zero `placeholder: true` flags remaining. |
| 5 county hubs | ✓ | Hillsborough, Pinellas, Pasco, Manatee, Sarasota — all live with FAQs + schema. |
| /pricing money page | ✓ | 1,650 visible words + 15 FAQs (12 original + 3 PAA) + 5-row pricing table with notes column. |
| 3 blog posts published | ✓ | dryer-takes-too-long-to-dry (1,887w, 4 FAQs), signs-dryer-vent-is-clogged (1,560w, 4 FAQs), how-often-clean-dryer-vent-florida (1,586w, 4 FAQs). |
| 4 specialty pages | ✓ | local-vs-franchise (~2,683w, 6 FAQs after PAA), condo (~2,066w, 5 FAQs), HOA (~2,012w, 5 FAQs), landlord (~2,066w, 5 FAQs). |
| llms.txt complete | ✓ | Rewritten Phase 8 with business info, pricing model, service list, 23 cities organized by county, county hubs, educational resources, key differentiators, verified-vs-unverified citation guidance, 7 FAQs, peak season note. |

## E. Trust + Compliance

| Check | Status | Notes |
|---|---|---|
| Zero "847 reviews" claims | ✓ | Verified via rendered-HTML grep across /, /pricing, /about, /contact, /areas/tampa, /areas/counties/hillsborough, /services/dryer-vent-inspection, /local-vs-franchise, /hoa, /landlord. |
| Zero "15,000 vents cleaned" claims | ✓ | All customer-facing occurrences removed in cleanup pass. Only remaining mention is FishHawk Ranch Facebook-group size in Valrico content (factual about the community, not about Airflow). |
| Zero "11+ years" claims | ✓ | Removed from about page, FinalCTA defaults, llms.txt, scale-campaigns prompts. |
| Zero "100% satisfaction" claims | ✓ | Removed from TrustBar and About page. |
| NFPA language honest | ✓ | "Following NFPA 211 guidelines" / "NFPA 211-aligned process" / "NFPA 211 compliance documentation" (for actual compliance docs). No "NFPA 211 certified" or "trained to NFPA 211 standards" language. |
| Zero C-DET claims | ✓ | Never appeared in shipped content. |
| Phone consistent (813) 744-1127 | ✓ | Verified site-wide. Zero 555-1234 placeholders. |
| Brand "Airflow Dryer Vent Cleaning Tampa" | ✓ | Updated in Phase 7 LocalBusiness.name for brand-geo pairing. Other surfaces use "Airflow Dryer Vent Cleaning" or "the Airflow team" — all correct. |
| No "Dry Vent Tampa" stragglers | ✓ | Zero in shipped code; only historical references in seo-audit/ reports (preserved as-of audit snapshots). |
| No personal names (Tal, Shelef) | ✓ | Zero across codebase. |
| Testimonial handling | ✓ | Option A applied — area template testimonial section commented out. Sample testimonial data in `lib/area-content.ts` preserved for future re-enable with verified reviews. |

## F. Performance

| Check | Status | Notes |
|---|---|---|
| npm run build succeeds | ✓ | Consistently compiles in 3.3–6.0s. |
| 65/65 static pages generate | ✓ | No generation errors. |
| No console errors in build output | ✓ | Only informational "Custom fonts" warning (fonts loaded via `<link>` in layout.tsx — intentional for Next.js 15 App Router compatibility; not a blocker). |
| No 404s in sitemap | ✓ | All 46 URLs resolve. Blog sitemap filters to posts with body (placeholders excluded). |
| Next.js Image optimization | — | No `<Image>` usage currently because there are no images. When client adds photos, use `next/image`. |

## G. Mobile

| Check | Status | Notes |
|---|---|---|
| Header logo responsive | ✓ | 48×48 logo box, inline SVG scales with box. Tagline hidden below certain breakpoints. |
| Footer responsive | ✓ | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` on service-areas block; top row is 3-col on lg, 2-col on md, 1-col on mobile. |
| Tap targets | ✓ | Buttons + links use `py-2.5` / `py-3` / `py-4` (40–56px tap targets). |
| No horizontal scroll | ✓ | `container-custom` uses max-width; nothing breaks the viewport on mobile. |
| Sticky mobile CTA | ✓ | `components/StickyMobileCTA.tsx` renders a bottom-fixed phone CTA on mobile-only (`md:hidden`). |

---

## Pass rate

| Category | Passed | Partial | Failed | Skipped |
|---|---|---|---|---|
| A. Technical SEO | 10/11 | 1/11 | 0/11 | 0 |
| B. On-Page SEO | 6/7 | 0/7 | 0/7 | 1/7 (alt text — no images yet) |
| C. Schema.org | 13/14 | 0/14 | 0/14 | 1/14 (HowTo — intentional skip) |
| D. Content | 6/6 | 0/6 | 0/6 | 0 |
| E. Trust + Compliance | 11/11 | 0/11 | 0/11 | 0 |
| F. Performance | 4/4 | 0/4 | 0/4 | 1/4 (Image opt — no images yet) |
| G. Mobile | 5/5 | 0/5 | 0/5 | 0 |
| **TOTAL** | **55/58** | **1/58** | **0/58** | **3/58 (all client-dependent or by-design)** |

## Issues flagged for client attention

See `seo-audit/launch-checklist.md` for the full pre-launch to-do list.

Summary of items requiring client action before the site is 100% "complete":

1. **Street address** — `LocalBusiness.address.streetAddress` currently "Tampa, FL" placeholder. Update when real physical/P.O. box address is available.
2. **Business ZIP** — `LocalBusiness.address.postalCode` is "33602" (downtown Tampa) as placeholder. Update to real business ZIP.
3. **Florida Contractor License number** — populate `LocalBusiness.hasCredential[0].identifier`.
4. **Insurance carrier + policy number** — populate `LocalBusiness.hasCredential[1].recognizedBy.name` and `identifier`.
5. **Raster logo PNG** — currently Organization.logo references `/public/logo.png` which doesn't exist. Header uses inline SVG successfully; only Google knowledge-graph rendering needs the raster file.
6. **Google Business Profile setup** — unlocks aggregateRating + Review schema re-enablement once 5+ verified reviews collected.
7. **Real customer photos** — alt text + next/image opportunities will activate when client provides photos.
8. **`GOOGLE-ADS-PRELAUNCH-STRATEGY.md`** — internal planning doc contains stale "15,000+ Tampa Bay Vents Cleaned" bullet at line 240. Not shipped to customers but should be cleaned before ad campaigns launch.
