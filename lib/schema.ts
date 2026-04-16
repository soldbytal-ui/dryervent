import type { Area } from './areas';
import type { Service } from './services';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryventtampa.com';
const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18135551234';

export function localBusinessSchema(area?: Area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}#business`,
    name: 'Dry Vent Tampa',
    image: `${SITE}/og-image.jpg`,
    url: SITE,
    telephone: PHONE,
    priceRange: '$$',
    description:
      'Professional dryer vent cleaning, repair, and installation services across Tampa Bay. Licensed, insured, same-day appointments available.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: area?.name || 'Tampa',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: area?.lat ?? 27.9506,
      longitude: area?.lng ?? -82.4572,
    },
    areaServed: [
      'Tampa', 'St. Petersburg', 'Clearwater', 'Brandon', 'Riverview',
      'Wesley Chapel', 'New Tampa', 'Carrollwood', 'Westchase', 'South Tampa',
      'Lutz', 'Land O\' Lakes', 'Plant City', 'Apollo Beach', 'Valrico',
    ].map((c) => ({ '@type': 'City', name: c })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.intro,
    provider: { '@id': `${SITE}#business` },
    areaServed: { '@type': 'State', name: 'Florida' },
    offers: service.priceFrom
      ? {
          '@type': 'Offer',
          price: service.priceFrom.toString(),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  };
}

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

export function reviewSchema(reviews: { name: string; rating: number; text: string; date: string }[]) {
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: '5',
    },
    reviewBody: r.text,
    datePublished: r.date,
    itemReviewed: { '@id': `${SITE}#business` },
  }));
}
