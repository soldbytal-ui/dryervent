# Production Verification — Airflow Dryer Vent Cleaning (Phase 1 Rename)

**Date:** 2026-04-19
**Local HEAD:** `807e12d` — "Inline fixes: revert Lutz to Hillsborough + noindex Tier 2 stubs"
**Previous commit live in prod (inferred):** `d1ab600` — "Phase 1: rename to Airflow Dryer Vent Cleaning + schema @id fix + phone audit"
**Fetch method:** `curl` (firecrawl MCP returned `Unauthorized: Invalid token`)
**Raw HTML saved to:** `/tmp/prod-verify/*.html`

---

## 1. URL Resolution Status

| ID | URL | HTTP | Bytes | Notes |
|----|-----|------|-------|-------|
| A  | https://dryerventcleaningtampa.com/                        | 200 | 156,587 | Custom domain LIVE and serving app |
| B  | https://dryerventcleaningtampa.com/areas/tampa             | 200 | 182,749 | Custom domain LIVE |
| C  | https://dryervent.vercel.app/                              | 200 | 156,587 | Vercel default domain LIVE |
| D  | https://dryervent.vercel.app/areas/tampa                   | 200 | 182,749 | Vercel default domain LIVE |
| E  | https://dryervent.vercel.app/areas                         | 200 | 174,071 | Areas hub LIVE |
| F  | https://dryervent.vercel.app/areas/counties/hillsborough   | 200 | 176,910 | County hub LIVE |
| G  | https://dryervent.vercel.app/areas/dunedin (Tier 2 stub)   | 200 | 174,199 | Fetched for noindex check |

**Custom domain confirmed configured.** A and C return byte-identical bodies, as do B and D — `dryerventcleaningtampa.com` is correctly aliased to the same Vercel deployment (no DNS fail, no 404, no redirect to vercel.app).

---

## 2. Brand Cleanliness

Exact-match occurrence counts via `grep -o` against raw HTML.

| Term (should be 0) | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| `Dry Vent Tampa`       | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `dryventtampa.com`     | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `Tal` (word boundary)  | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `Shelef` (case-insens) | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `(813) 555-1234`       | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `+18135551234`         | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

**Result:** Zero remnants on any URL. Phase 1 rename is clean.

---

## 3. New Brand Presence

| Term | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| `Airflow Dryer Vent Cleaning` | 27 | 27 | 27 | 27 | 29 | 37 | 27 |
| `Airflow` (any)               | 30 | 30 | 30 | 30 | 36 | 44 | 30 |
| `(813) 744-1127` (display)    | 15 | 15 | 15 | 15 | 14 | 15 | 15 |
| `+18137441127` (tel)          | 12 | 14 | 12 | 14 | 10 | 12 | 14 |
| `locally owned`               |  3 |  5 |  3 |  5 |  5 | 11 |  5 |
| `not a franchise`             |  8 |  4 |  8 |  4 | 10 | 10 |  4 |
| `dryer duct cleaning` (syn)   | 10 | 10 | 10 | 10 | 12 | 14 | 10 |

All pages have strong new-brand density. County hub F (Hillsborough) leads, as expected.

---

## 4. Schema Audit (JSON-LD)

All LocalBusiness nodes share identical `name`, `telephone`, and `sameAs`:

- **name**: `Airflow Dryer Vent Cleaning`
- **telephone**: `+18137441127`
- **sameAs**:
  - `https://www.facebook.com/airflowdryerventcleaning`
  - `https://www.instagram.com/airflowdryerventcleaning`
  - `https://www.google.com/maps/place/airflowdryerventcleaning`

`@id` values (note: all @id values are pinned to the custom domain, even on vercel.app responses — correct canonical behavior):

| Page | Blocks | LocalBusiness @id(s) |
|---|---|---|
| A home (custom)        | 3 | `https://dryerventcleaningtampa.com/#localbusiness` |
| B tampa (custom)       | 4 | `https://dryerventcleaningtampa.com/#localbusiness` + `.../areas/tampa#localbusiness` |
| C home (vercel)        | 3 | `https://dryerventcleaningtampa.com/#localbusiness` |
| D tampa (vercel)       | 4 | same as B |
| E /areas (vercel)      | 3 | `https://dryerventcleaningtampa.com/#localbusiness` (+ ItemList w/ 21 ListItem, BreadcrumbList) |
| F hillsborough county  | 4 | `https://dryerventcleaningtampa.com/#localbusiness` (+ Service, FAQPage, BreadcrumbList) |
| G dunedin              | 4 | `https://dryerventcleaningtampa.com/#localbusiness` + `.../areas/dunedin#localbusiness` |

Supplemental types detected per page: FAQPage (4-6 Q&A), BreadcrumbList, AggregateRating, OpeningHoursSpecification, PostalAddress, GeoCoordinates, and City nodes (16 cities enumerated in each LocalBusiness `areaServed`). County page F adds `Service` + `AdministrativeArea` + `State`. `/areas` hub E adds `ItemList`.

No schema anomalies. No leftover old-brand strings inside JSON-LD.

---

## 5. Header Dropdown

Homepage HTML (server-rendered, pre-hydration):

| Element | A (custom) | C (vercel) | E (/areas) |
|---|---|---|---|
| `Areas Served` text        | 3 | 3 | 3 |
| `Hillsborough County`      | 0 | 0 | 2 |
| `Pinellas County`          | 0 | 0 | 2 |
| `Pasco County`             | 0 | 0 | 2 |
| `aria-haspopup`            | 1 | 1 | 1 |
| `aria-expanded`            | 7 | 7 | 1 |

The "Areas Served" trigger button AND the required aria attributes are present in the initial HTML. However, the county labels (Hillsborough/Pinellas/Pasco County) are NOT in the server-rendered markup on the home page — they appear only in the `/areas` hub body. This means the flyout's county groupings are rendered client-side only (JS-hydrated). This is expected for a hover dropdown, but note that county strings are not available to non-JS crawlers via the dropdown itself (they are however available via the `/areas` hub page and the sitemap).

---

## 6. Stub Noindex Check (CRITICAL — FAILING)

Target: `https://dryervent.vercel.app/areas/dunedin` (dunedin is flagged `placeholder: true` in `lib/areas.ts`).

**Observed on production:**
```
<meta name="robots" content="index, follow"/>
```
- `noindex` string count in HTML: **0**
- `Full service information coming soon` notice: **0** occurrences
- LocalBusiness schema: **rendered fully** (with `areas/dunedin#localbusiness` @id)
- Page title: `Dryer Vent & Duct Cleaning Dunedin, FL | Same-Day Service | Airflow Dryer Vent Cleaning`

**Local source code is correct** at `app/(marketing)/areas/[slug]/page.tsx`:
- Line 28-30: `if (area.placeholder) return { ...base, robots: { index: false, follow: true } };`
- Line 89+: placeholder banner `<section>` guarded by `{area.placeholder && ...}`

**Diagnosis:** The stub-noindex commit (`807e12d`, committed 2026-04-19 13:50) has NOT yet been deployed to production. The current live build corresponds to the earlier commit `d1ab600` (Phase 1 rename), which added the rename and phone-audit fixes but did not include the Tier 2 stub guard.

**Also affected:** The homepage (A/C) and `/areas` hub (E) currently have `<meta name="robots" content="index, follow"/>` on every page including stubs; no stubs are currently noindex on production.

**Action required:** Trigger a new Vercel deploy (`git push origin main`) so commit `807e12d` reaches prod. Re-run this check afterward.

---

## 7. Critical Remnants

| Issue | Status | Details |
|---|---|---|
| Old brand "Dry Vent Tampa" in HTML               | CLEAN  | 0/7 URLs |
| Old domain `dryventtampa.com` in HTML            | CLEAN  | 0/7 URLs |
| Personal names (Tal, Shelef)                      | CLEAN  | 0/7 URLs |
| Placeholder phone `(813) 555-1234` / `+18135551234` | CLEAN | 0/7 URLs |
| New phone `(813) 744-1127` present                | PRESENT | 14-15 per page |
| New brand `Airflow Dryer Vent Cleaning` present   | PRESENT | 27-37 per page |
| LocalBusiness schema points to new brand+phone    | PRESENT | All LocalBusiness nodes |
| Custom domain `dryerventcleaningtampa.com`        | LIVE    | Serves byte-identical content to vercel.app |
| Schema `@id` canonical to custom domain           | CORRECT | All `@id` use `dryerventcleaningtampa.com` |
| Header dropdown server-rendered (button + aria)   | PARTIAL | "Areas Served" + aria-haspopup present; county labels JS-only |
| **Tier 2 stub noindex (dunedin)**                 | **FAILING** | Production still serves `index, follow`; stub banner missing; full LocalBusiness schema rendered. Latest commit `807e12d` not yet deployed. |

### Summary

Phase 1 rename is **complete and verified** on the currently-deployed production build. Custom domain is live. Zero old-brand leaks across all 7 sampled URLs. New brand name, new phone, "locally owned / not a franchise" positioning, and "dryer duct cleaning" synonym are all present at healthy density. Schema is well-formed and canonicalizes to the custom domain.

**One blocker:** the Tier 2 stub noindex mechanism shipped in commit `807e12d` has not reached production. Push `main` to trigger a new Vercel deploy, then re-verify the dunedin URL for `<meta name="robots" content="noindex, follow"/>` and the "Full service information coming soon" banner.
