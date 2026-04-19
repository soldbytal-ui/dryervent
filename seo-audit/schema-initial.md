# Schema.org Structured Data Audit — dryervent.vercel.app
**Date:** 2026-04-19  
**Audited pages:** Homepage, /areas/brandon, /services/residential-dryer-vent-cleaning

---

## 1. Schema Inventory

### Homepage
| Block | Type | Source |
|-------|------|--------|
| 1 | `LocalBusiness` | layout (global inject) |
| 2 | `FAQPage` | page-level |
| 3 | `BreadcrumbList` | page-level |

### Area page (/areas/brandon)
| Block | Type | Source |
|-------|------|--------|
| 1 | `LocalBusiness` | layout (global inject) |
| 2 | `LocalBusiness` | area page-level (duplicate @id) |
| 3 | `FAQPage` | area page-level |
| 4 | `BreadcrumbList` | area page-level |

### Service page (/services/residential-dryer-vent-cleaning)
| Block | Type | Source |
|-------|------|--------|
| 1 | `LocalBusiness` | layout (global inject) |
| 2 | `Service` | page-level |
| 3 | `FAQPage` | page-level |
| 4 | `BreadcrumbList` | page-level |

**Schema types in use:** LocalBusiness, Service, FAQPage, BreadcrumbList  
**Schema types NOT in use:** Organization, WebSite (SearchAction), Review, AggregateRating (standalone), Product, VideoObject, ImageObject

---

## 2. Validation Results

### LocalBusiness (all pages)
| Property | Status | Note |
|----------|--------|------|
| `@context` | PASS | `https://schema.org` |
| `@type` | PASS | `LocalBusiness` valid |
| `@id` | FAIL — CRITICAL | See §3 |
| `name` | PASS | |
| `telephone` | PASS | E.164 format |
| `address` | PASS | PostalAddress present |
| `address.postalCode` | FAIL | Missing — required for local SEO |
| `address.streetAddress` | WARN | Missing — recommended for rich results |
| `geo` | PASS | GeoCoordinates present |
| `openingHoursSpecification` | PASS | |
| `aggregateRating` | PASS | ratingValue, reviewCount, bestRating, worstRating all present |
| `priceRange` | PASS | |
| `sameAs` | PASS | |
| `currenciesAccepted` | WARN | Missing — recommended for LocalBusiness |
| `paymentAccepted` | WARN | Missing — recommended for LocalBusiness |

### Service (/services/residential-dryer-vent-cleaning)
| Property | Status | Note |
|----------|--------|------|
| `@type` | PASS | `Service` valid |
| `name` | PASS | |
| `description` | PASS | |
| `provider` | PASS | References `#business` via `@id` |
| `areaServed` | PASS | State-level — could be more granular |
| `offers` | PASS | Offer block present |
| `offers.price` | PASS | `"99"` |
| `offers.priceCurrency` | PASS | `"USD"` |
| `offers.availability` | PASS | `InStock` |
| `offers.priceValidUntil` | WARN | Missing — recommended by Google |
| `offers.url` | WARN | Missing — recommended |
| `serviceType` | WARN | Missing — helps classifiers |
| `@id` | WARN | No `@id` on Service nodes — provider cross-reference works but limits graph linking |

### FAQPage (homepage, area pages, service pages)
| Property | Status | Note |
|----------|--------|------|
| `@type` | INFO | FAQPage valid schema.org type; Google restricted rich results to government/healthcare (Aug 2023). Commercial use no longer triggers Google rich result panel. Retains AI/LLM citation value. |
| `mainEntity` | PASS | Array of Question nodes |
| `Question.name` | PASS | |
| `acceptedAnswer.text` | PASS | |

### BreadcrumbList (all pages)
| Property | Status | Note |
|----------|--------|------|
| `@type` | PASS | |
| `itemListElement` | PASS | |
| `ListItem.position` | PASS | 1-indexed |
| `ListItem.name` | PASS | |
| `ListItem.item` | PASS | Absolute URLs |
| Breadcrumb step 2 on area pages | WARN | Points to `/areas/tampa` (a specific city, not a category page). Should point to an `/areas` index if one exists, or be removed |

---

## 3. @id Collision — CONFIRMED CRITICAL

**The `@id` collision is confirmed live on every audited page.**

On `/areas/brandon`, **two separate LocalBusiness blocks** are emitted in the same HTML document, both declaring:

```
"@id": "https://dryervent.vercel.app#business"
```

Block 1 (from layout): `"addressLocality": "Tampa"`, `"latitude": 27.9506`  
Block 2 (from area page): `"addressLocality": "Brandon"`, `"latitude": 27.9378`

JSON-LD `@id` is a canonical IRI. Two nodes with the same `@id` in a graph are merged. Google's structured data parser merges conflicting property values unpredictably — the area-specific geo coordinates and locality override the canonical business address, or vice versa, depending on parser evaluation order.

**Root cause:** `localBusinessSchema()` in `lib/schema.ts` line 11 always emits `${SITE}#business` regardless of context. The layout injects it once; each area page injects it again with area-specific overrides.

**Fix:** Area pages should NOT re-emit a full LocalBusiness with the same `@id`. Instead they should emit a `Service` node or a lightweight `Place` with a distinct `@id` that references `parentOrganization`.

---

## 4. Missing High-Value Schemas

### MISSING — High Priority

#### 4a. WebSite with SearchAction
Not present on any page. This enables the Google sitelinks search box for branded queries.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://dryervent.vercel.app#website",
  "url": "https://dryervent.vercel.app",
  "name": "Dry Vent Tampa",
  "description": "Professional dryer vent cleaning, repair, and installation across Tampa Bay.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://dryervent.vercel.app/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

#### 4b. Organization (sameAs hub)
`Organization` should be declared once at the root as the canonical entity graph node. `LocalBusiness` extends it, but having a distinct `Organization` node anchors the knowledge graph and supports AI entity resolution.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://dryervent.vercel.app#organization",
  "name": "Dry Vent Tampa",
  "url": "https://dryervent.vercel.app",
  "logo": {
    "@type": "ImageObject",
    "url": "https://dryervent.vercel.app/logo.png",
    "width": 200,
    "height": 60
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+18137441127",
    "contactType": "customer service",
    "areaServed": "US-FL",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.facebook.com/dryventtampa",
    "https://www.instagram.com/dryventtampa",
    "https://www.google.com/maps/place/dryventtampa"
  ]
}
```

#### 4c. Review schema (individual reviews)
`reviewSchema()` exists in `lib/schema.ts` (lines 100–114) but is never called from any page template. The `Reviews` component renders visible review text but emits no structured data. Individual `Review` nodes with `author`, `reviewRating`, `datePublished`, and `reviewBody` would strengthen the `aggregateRating` credibility signal.

#### 4d. Service @id — cross-page graph linking
Service nodes have no `@id`. Adding `"@id": "https://dryervent.vercel.app/services/{slug}#service"` allows area pages to reference services by IRI, enabling a proper graph relationship: LocalBusiness → hasOfferCatalog → Service.

### MISSING — Medium Priority

#### 4e. ImageObject for og-image
The `og-image.jpg` is referenced in LocalBusiness `image` as a bare URL string. It should be an `ImageObject`:

```json
"image": {
  "@type": "ImageObject",
  "@id": "https://dryervent.vercel.app/og-image.jpg",
  "url": "https://dryervent.vercel.app/og-image.jpg",
  "width": 1200,
  "height": 630,
  "caption": "Dry Vent Tampa — Professional Dryer Vent Cleaning"
}
```

#### 4f. PostalAddress — missing postalCode
LocalBusiness `address` block has no `postalCode`. Google's local business guidelines treat this as a data quality signal:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Tampa Bay Area",
  "addressLocality": "Tampa",
  "addressRegion": "FL",
  "postalCode": "33602",
  "addressCountry": "US"
}
```

### NOT RECOMMENDED (per current Google policy)

- **HowTo**: Rich results removed September 2023. Do not add.
- **SpecialAnnouncement**: Deprecated July 31, 2025. Do not add.
- **FAQPage (new additions)**: Current FAQPage blocks are acceptable to retain for AI/LLM citation value. Do not add more FAQPage blocks expecting Google rich result panels on commercial pages.

---

## 5. Recommended Fixes — Code-Ready

### Fix 1 (CRITICAL): Resolve @id collision on area pages

**File:** `lib/schema.ts`

Replace `localBusinessSchema` with two separate functions:

```typescript
// Canonical business — used in layout only
export function canonicalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}#business`,
    name: 'Dry Vent Tampa',
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE}/og-image.jpg`,
      url: `${SITE}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    url: SITE,
    telephone: PHONE,
    priceRange: '$$',
    description: 'Professional dryer vent cleaning, repair, and installation services across Tampa Bay. Licensed, insured, same-day appointments available.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tampa Bay Area',
      addressLocality: 'Tampa',
      addressRegion: 'FL',
      postalCode: '33602',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 27.9506, longitude: -82.4572 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '847',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/dryventtampa',
      'https://www.instagram.com/dryventtampa',
      'https://www.google.com/maps/place/dryventtampa',
    ],
  };
}

// Area-specific Place — used on area pages instead of re-emitting LocalBusiness
export function areaPlaceSchema(area: Area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${SITE}/areas/${area.slug}#place`,
    name: area.name,
    geo: { '@type': 'GeoCoordinates', latitude: area.lat, longitude: area.lng },
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: 'FL',
      addressCountry: 'US',
    },
  };
}
```

Then update `app/(marketing)/areas/[slug]/page.tsx` to call `areaPlaceSchema(area)` instead of `localBusinessSchema(area)`.

---

### Fix 2: Add WebSite + Organization to layout

**File:** `lib/schema.ts` — add `websiteSchema()` and `organizationSchema()`.  
**File:** `app/layout.tsx` — inject alongside canonicalBusinessSchema.

The JSON-LD for both is shown in §4a and §4b above.

---

### Fix 3: Add @id to Service nodes

**File:** `lib/schema.ts`, `serviceSchema` function — add:

```typescript
'@id': `${SITE}/services/${service.slug}#service`,
```

---

### Fix 4: Wire up reviewSchema in page templates

**File:** `app/(marketing)/services/[slug]/page.tsx` — the `Reviews` component already receives data. Import `reviewSchema` from `lib/schema.ts`, pass the same review array used by the `Reviews` component, and add it to the `SchemaMarkup` data array.

---

### Fix 5: Fix BreadcrumbList step 2 on area pages

**File:** `app/(marketing)/areas/[slug]/page.tsx`

Current step 2: `{ name: 'Areas', url: '/areas/tampa' }` — this points to a specific city, not a category.  
Correct step 2: `{ name: 'Service Areas', url: '/areas' }` — use the areas index URL, or omit the intermediate step entirely if no `/areas` index exists.

---

## 6. Architecture Recommendation: Area Pages as Sub-Entities

The current pattern (re-emit LocalBusiness with area geo on every area page) is architecturally wrong. The recommended graph pattern:

```
Organization (#organization)
  └── LocalBusiness (#business)  [canonical, in layout]
        └── hasOfferCatalog → Service (/services/{slug}#service)
        └── areaServed → Place (/areas/{slug}#place)
```

Area pages should emit a `Place` node (`/areas/{slug}#place`) referenced from the canonical `LocalBusiness.areaServed`. This eliminates the `@id` collision and creates a coherent entity graph that both Google and AI crawlers can traverse.

Service pages should emit a `Service` node with `provider: { "@id": "#business" }` (already done) but also add `"@id"` and `"serviceType"` for full compliance.

---

## Summary Priority Table

| # | Issue | Type | Priority |
|---|-------|------|----------|
| 1 | Two LocalBusiness blocks share `#business` @id on area pages | Collision | CRITICAL |
| 2 | No WebSite schema — missing SearchAction potential | Missing | High |
| 3 | FAQPage will not trigger Google rich results on commercial pages | Policy | Info |
| 4 | reviewSchema() defined but never emitted — wasted structured data infrastructure | Missing | High |
| 5 | LocalBusiness missing `postalCode` and `streetAddress` | Incomplete | Medium |
| 6 | Service nodes have no `@id` — limits graph traversal | Incomplete | Medium |
| 7 | BreadcrumbList step 2 on area pages points to a city URL, not a category | Invalid | Medium |
| 8 | `image` is a bare string URL, not an ImageObject | Quality | Low |
| 9 | No Organization node as separate graph anchor | Missing | Low |
