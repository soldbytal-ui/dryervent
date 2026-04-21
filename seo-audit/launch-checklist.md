# Pre-Launch Checklist — Airflow Dryer Vent Cleaning Tampa

Client-facing prep steps for launch. Build is technically complete — these are operational and data tasks.

---

## Immediate (Day 0)

- [ ] Verify production site loads at https://dryerventcleaningtampa.com (or current production alias)
- [ ] Test "Call (813) 744-1127" button from homepage on mobile + desktop
- [ ] Test lead form submission — confirm destination (Resend email + n8n webhook)
- [ ] Test "Book Free Inspection" CTA routes to `/services/dryer-vent-inspection` or `#quote`
- [ ] Confirm favicon displays correctly in Chrome, Safari, Firefox
- [ ] Confirm Apple Touch icon displays when adding site to iOS home screen

## Google (Day 1–7)

- [ ] Submit sitemap to Google Search Console: `https://dryerventcleaningtampa.com/sitemap.xml`
- [ ] Verify ownership via DNS TXT record (or the domain-property method)
- [ ] Request indexing of top 5 pages:
  - https://dryerventcleaningtampa.com/
  - https://dryerventcleaningtampa.com/pricing
  - https://dryerventcleaningtampa.com/services/dryer-vent-inspection
  - https://dryerventcleaningtampa.com/areas/tampa
  - https://dryerventcleaningtampa.com/areas/south-tampa
- [ ] Create Google Business Profile for **"Airflow Dryer Vent Cleaning Tampa"**
  - Category: Furnace repair service + Air duct cleaning service (both)
  - Include service areas for all 23 cities (the list in `/areas/counties/*` hubs matches)
  - Hours: Mon–Sat 7 AM – 7 PM ET
  - Services: Free Inspection, Residential Cleaning, Commercial Cleaning, Vent Repair, Installation, Condo Cleaning
  - Price range: $$ ($79 start)
  - Add at least 10 photos (truck, team, before/after shots as they're collected)
- [ ] Verify Google Business Profile via postcard (5–14 day delivery)
- [ ] Set up Google Search Console property for the live domain
- [ ] Submit URL structure to Google's Indexing API for /services/* pages (optional — accelerates indexation)

## Bing + Others (Day 1–7)

- [ ] Submit to Bing Webmaster Tools (import from GSC is the fastest path)
- [ ] Submit sitemap to Bing
- [ ] Submit to DuckDuckGo (no official submission — DDG crawls from Bing index; done automatically once Bing indexes)

## Legal / Compliance (Before Launch)

- [ ] Provide **Florida Contractor License number** → update `lib/schema.ts` `hasCredential[0].identifier`
- [ ] Provide **insurance carrier + policy number** → update `lib/schema.ts` `hasCredential[1].recognizedBy.name` + `identifier`
- [ ] Provide **real business street address** → update `lib/schema.ts` `LocalBusiness.address.streetAddress`
- [ ] Provide **real business ZIP** (if different from placeholder 33602) → update `postalCode`
- [ ] Confirm Mon–Sat 7 AM – 7 PM hours on the site match actual operational hours
- [ ] Confirm same-day availability claim matches real dispatch capability in Hillsborough + Pinellas counties
- [ ] Review all three blog posts (`/blog/*`) for any claims that need client factual review
- [ ] Review `/about` page for any claims that need factual review

## Review Generation (Weeks 1–4)

- [ ] Set up review collection system — email sequence or direct "leave us a review" link in post-service email
- [ ] Ask first 5–10 customers for Google reviews
- [ ] Once **5+ verified reviews** exist on Google Business Profile:
  - Re-enable `aggregateRating` block in `lib/schema.ts` `localBusinessSchema()` with real `ratingValue` and `reviewCount`
  - Populate `lib/reviews.ts` `reviews` array with real customer first name + last initial (with explicit opt-in permission), rating, date, text
  - Re-wire `components/Reviews.tsx` to read from `lib/reviews.ts` (template comment documents the flip)
  - Re-enable area-page testimonial sections (hidden by comment in `app/(marketing)/areas/[slug]/page.tsx`)

## Paid Ads (If running)

- [ ] Review `GOOGLE-ADS-PRELAUNCH-STRATEGY.md` line 240 — remove "15,000+ Tampa Bay Vents Cleaned" claim (currently false; unverified)
- [ ] Set up Google Ads conversion tracking for:
  - Lead form submissions (already instrumented via `gtag('event', 'generate_lead')` in `components/LeadForm.tsx`)
  - Phone-click conversions (`data-conversion="phone-click"` attribute is on all tel: links)
- [ ] Coordinate organic + paid keyword strategy — don't bid against ranking organic pages
- [ ] Google Ads ID + conversion label env vars: `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`

## Monitoring (Ongoing)

- [ ] Weekly Google Search Console review: impressions / clicks / position for target keywords
- [ ] Weekly rank tracking on top keywords:
  - dryer vent cleaning tampa
  - dryer vent cleaning st petersburg
  - dryer vent cleaning clearwater
  - dryer vent cleaning brandon
  - dryer vent cleaning wesley chapel
  - dryer duct cleaning tampa (synonym — should rank within weeks)
  - dryer vent cleaning cost tampa
  - free dryer vent inspection tampa
- [ ] Monthly content audit — add 1–2 new blog posts based on Google Search Console query data
- [ ] Quarterly backlink audit via Google Search Console Links report
- [ ] Quarterly competitor re-scrape — check if Dryer Vent Wizard or VentSmart/Superb adjusted pricing / added missing city pages

## Content Additions (Post-launch)

- [ ] Real customer photos — before/after dryer duct cleaning
- [ ] Team photo — for About page and Google Business Profile
- [ ] Service area photos — local Tampa Bay landmarks or truck-at-location shots
- [ ] Real testimonials as collected (with customer permission)
- [ ] Additional blog posts — candidates from Phase 2 content-gap analysis:
  - "Dryer Vent Cleaning vs. Dryer Duct Cleaning: Are They the Same?" (own the synonym)
  - "Florida Storm Prep for Dryer Vents" (seasonal June–November)
  - "Why Condo HOAs Are Requiring Annual Dryer Vent Cleaning" (condo angle)
  - "Snowbird Homeowners: Pre-Season Vent Checklist"
- [ ] Expand Tier 2 cities to Tier 1 depth (1,500–2,000 words) as capacity allows

## Technical Follow-ups (Low-priority)

- [ ] Generate raster logo PNG at `public/logo.png` (600×60 or 1:1 square, min 112×112) so `Organization.logo` schema resolves
- [ ] Create favicon variants: 16×16, 32×32, 180×180 (Apple Touch), 512×512 (PWA)
- [ ] Add a real `/search` route if Google starts showing sitelinks search box in SERPs (until then, the WebSite SearchAction schema is aspirational)
- [ ] When first images are added: set up `next/image` with priority loading on hero images; audit CLS (Cumulative Layout Shift) via Lighthouse
- [ ] Consider `Review` schema from Google Business Profile API integration (vs hand-populated `lib/reviews.ts`) once review volume justifies it
- [ ] Optional: add `hreflang` if Spanish-language pages are ever added for Tampa's Hispanic market

## Rollback Plan (In case of launch issues)

- Site is deployed via Vercel with GitHub main branch as production source
- Each commit is a deploy; rollback = revert commit + push (Vercel redeploys on each push)
- Git history preserves every phase: `git log --oneline | head -30` shows all incremental commits from Phase 1 through current
- No database migrations pending — Prisma schema unchanged throughout SEO build
- Lead intake (Resend + Supabase + n8n webhook) is independent of SEO changes and should continue functioning even if a marketing page rollback is needed
