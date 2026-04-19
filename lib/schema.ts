import type { Area } from './areas';
import type { Service } from './services';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';
const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';

export function localBusinessSchema(area?: Area) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Airflow Dryer Vent Cleaning',
    image: `${SITE}/og-image.jpg`,
    url: SITE,
    telephone: PHONE,
    priceRange: '$$',
    description:
      'Locally owned, professional dryer vent cleaning, repair, and installation serving Tampa Bay and all of Florida within 50 miles of Tampa. Licensed, insured, same-day appointments available.',
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

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.intro,
    provider: { '@id': `${SITE}/#localbusiness` },
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
    itemReviewed: { '@id': `${SITE}/#localbusiness` },
  }));
}
