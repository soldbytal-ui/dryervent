import type { Area } from './areas';
import type { Service } from './services';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';
const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';

// ─────────────────────────────────────────────────────────────────────────────
// LocalBusiness — the canonical entity. Main-site version at /#localbusiness;
// per-area versions at /areas/{slug}#localbusiness with parentOrganization ref.
// ─────────────────────────────────────────────────────────────────────────────

export function localBusinessSchema(area?: Area) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Airflow Dryer Vent Cleaning Tampa',
    image: `${SITE}/og-image.jpg`,
    url: SITE,
    telephone: PHONE,
    priceRange: '$79-$595',
    slogan: 'Free Inspection · Transparent Pricing · Locally Owned Tampa Bay',
    description:
      'Locally owned dryer vent cleaning, repair, and installation across Tampa Bay and all of Florida within 50 miles of Tampa. Free on-site inspection, transparent per-foot pricing, licensed and insured.',
    address: {
      '@type': 'PostalAddress',
      // TODO: Update streetAddress + postalCode with real business address when
      //       client registers LLC / physical location or P.O. box.
      streetAddress: 'Tampa, FL',
      addressLocality: area?.name || 'Tampa',
      addressRegion: 'FL',
      postalCode: '33602',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: area?.lat ?? 27.9506,
      longitude: area?.lng ?? -82.4572,
    },
    // 50-mile service radius from Tampa center (80,467 meters) — matches the
    // "within 50 miles of Tampa" messaging throughout the site.
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 27.9506,
        longitude: -82.4572,
      },
      geoRadius: '80467',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    // aggregateRating removed pending real Review schema backing.
    // Re-add only when: (1) minimum 5 verified Google/BBB reviews exist,
    // AND (2) actual Review schema entries render on-page with matching count.
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Free Dryer Vent Inspection',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Residential Dryer Vent Cleaning',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '79',
          priceCurrency: 'USD',
          description:
            'From $79 for the first 10 feet plus $10 per additional foot. Typical residential total $79–$249. Wall ductwork repair $195–$595.',
        },
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'Florida Contractor License',
        recognizedBy: { '@type': 'Organization', name: 'State of Florida' },
        // TODO: Update `identifier` field here with real license # from client.
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'insurance',
        name: 'General Liability Insurance (Florida)',
        // TODO: Populate recognizedBy.name with real insurance carrier + add
        //       `identifier` with policy # when client provides.
      },
    ],
    sameAs: [
      'https://www.facebook.com/airflowdryerventcleaning',
      'https://www.instagram.com/airflowdryerventcleaning',
      'https://www.google.com/maps/place/airflowdryerventcleaning',
    ],
  };

  if (area) {
    return {
      ...base,
      '@id': `${SITE}/areas/${area.slug}#localbusiness`,
      parentOrganization: { '@id': `${SITE}/#localbusiness` },
    };
  }

  return {
    ...base,
    '@id': `${SITE}/#localbusiness`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Organization — separate entity for brand/knowledge-graph signals. Distinct
// @id from LocalBusiness so Google can treat the brand and the business as
// related but not identical nodes.
// ─────────────────────────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Airflow Dryer Vent Cleaning Tampa',
    url: SITE,
    // TODO: When a real raster logo PNG (1x1-ish square, minimum 112x112, ideally 600x60) is
    //       generated and placed at /public/logo.png, this URL will resolve. Until then Google
    //       will fall back gracefully and only skip the logo property.
    logo: `${SITE}/logo.png`,
    sameAs: [
      'https://www.facebook.com/airflowdryerventcleaning',
      'https://www.instagram.com/airflowdryerventcleaning',
      'https://www.google.com/maps/place/airflowdryerventcleaning',
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WebSite — enables sitelinks search box in Google SERPs when a /search route
// eventually exists. SearchAction is aspirational; Google renders it only when
// the target URL 200s and returns relevant results.
// ─────────────────────────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: 'Airflow Dryer Vent Cleaning Tampa',
    description:
      'Professional dryer vent cleaning across Tampa Bay. Free inspection, transparent per-foot pricing, locally owned.',
    publisher: { '@id': `${SITE}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Service — used on /services/[slug] + specialty-page subtypes
// ─────────────────────────────────────────────────────────────────────────────

export function serviceSchema(service: Service) {
  let offers;
  if (service.free) {
    offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: 1 },
    };
  } else if (service.priceFrom) {
    offers = {
      '@type': 'Offer',
      price: service.priceFrom.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.intro,
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: { '@type': 'State', name: 'Florida' },
    offers,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-level wrappers: AboutPage, ContactPage, WebPage
// ─────────────────────────────────────────────────────────────────────────────

export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE}/about#webpage`,
    url: `${SITE}/about`,
    name: 'About Airflow Dryer Vent Cleaning Tampa',
    description:
      'Airflow Dryer Vent Cleaning is a locally-owned, independent Tampa Bay dryer vent cleaning service. Free inspection, transparent per-foot pricing, licensed and insured in Florida.',
    mainEntity: { '@id': `${SITE}/#localbusiness` },
    isPartOf: { '@id': `${SITE}/#website` },
  };
}

export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE}/contact#webpage`,
    url: `${SITE}/contact`,
    name: 'Contact Airflow Dryer Vent Cleaning Tampa',
    description:
      'Get in touch with Airflow Dryer Vent Cleaning for a free dryer vent or duct cleaning estimate. Call (813) 744-1127, email, or book online. Same-day service across Tampa Bay.',
    mainEntity: { '@id': `${SITE}/#localbusiness` },
    isPartOf: { '@id': `${SITE}/#website` },
  };
}

export function webPageSchema(args: {
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'CollectionPage' | 'ItemPage';
}) {
  const type = args.type ?? 'WebPage';
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${SITE}${args.path}#webpage`,
    url: `${SITE}${args.path}`,
    name: args.name,
    description: args.description,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#localbusiness` },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ + Breadcrumbs — unchanged from Phase 1
// ─────────────────────────────────────────────────────────────────────────────

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.url}`,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Article helper — consolidates blog post Article schema to enforce required
// Google Rich Results properties (headline ≤110 chars, author+publisher as
// Organization refs, mainEntityOfPage, image, dateModified).
// ─────────────────────────────────────────────────────────────────────────────

export function articleSchema(args: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  const headline = args.title.length > 110 ? `${args.title.slice(0, 107)}...` : args.title;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE}/blog/${args.slug}#article`,
    headline,
    description: args.description,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@id': `${SITE}/#organization` },
    publisher: { '@id': `${SITE}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${args.slug}` },
    image: args.image ?? `${SITE}/og-image.jpg`,
    isPartOf: { '@id': `${SITE}/#website` },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// reviewSchema — DISABLED until real Google Business Profile reviews exist.
// ─────────────────────────────────────────────────────────────────────────────
//
// When ready to re-enable:
//   1. Collect a minimum of 5 verified Google reviews via Google Business Profile.
//   2. Populate lib/reviews.ts `reviews` array with the real review text, author
//      first name + last initial (with explicit opt-in permission), date, rating.
//   3. Import reviewSchema() from this file into appropriate pages (likely
//      homepage, /pricing, and /about — places with organic review-proof intent).
//   4. Restore aggregateRating to localBusinessSchema() above with reviewCount
//      matching the real count and ratingValue computed from the reviews.
//
// The function body is intentionally a no-op stub: calling it returns null and
// any array it produced historically is no longer consumed anywhere. See Phase 1
// audit and the cleanup commit for the original removal rationale.

export function reviewSchema(
  _reviews: { name: string; rating: number; text: string; date: string }[] = [],
): null {
  void _reviews;
  return null;
}
