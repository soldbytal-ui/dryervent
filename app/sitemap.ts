import type { MetadataRoute } from 'next';
import { areas } from '@/lib/areas';
import { services } from '@/lib/services';
import { COUNTIES } from '@/lib/internal-links';
import { posts } from '@/lib/posts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

// Tier 1 city slugs — rank higher than Tier 2 stubs-that-became-real.
// These are the 15 cities that shipped with full 1500-2000 word content in
// Phase 3. Tier 2 cities (promoted in Phase 4) ship with 800-1200 word bodies.
const TIER_1_SLUGS = new Set([
  'tampa',
  'st-petersburg',
  'south-tampa',
  'wesley-chapel',
  'brandon',
  'new-tampa',
  'carrollwood',
  'westchase',
  'plant-city',
  'apollo-beach',
  'riverview',
  'clearwater',
  'land-o-lakes',
  'lutz',
  'valrico',
]);

// changeFrequency mapping: high-velocity conversion pages → weekly,
// most content → monthly, static About/Contact → yearly.
function cf(group: 'weekly' | 'monthly' | 'yearly'): 'weekly' | 'monthly' | 'yearly' {
  return group;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: cf('weekly'), priority: 1.0 },
    { url: `${SITE}/pricing`, lastModified: now, changeFrequency: cf('weekly'), priority: 0.95 },
    { url: `${SITE}/local-vs-franchise-dryer-vent-cleaning`, lastModified: now, changeFrequency: cf('monthly'), priority: 0.9 },
    { url: `${SITE}/services/condo-dryer-vent-cleaning`, lastModified: now, changeFrequency: cf('monthly'), priority: 0.85 },
    { url: `${SITE}/hoa-dryer-vent-cleaning`, lastModified: now, changeFrequency: cf('monthly'), priority: 0.85 },
    { url: `${SITE}/landlord-dryer-vent-cleaning`, lastModified: now, changeFrequency: cf('monthly'), priority: 0.85 },
    { url: `${SITE}/areas`, lastModified: now, changeFrequency: cf('monthly'), priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: cf('yearly'), priority: 0.55 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: cf('yearly'), priority: 0.55 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: cf('yearly'), priority: 0.55 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => {
    // Per-slug priority + changeFrequency overrides:
    // - dryer-vent-inspection is the free-inspection conversion driver → weekly + 0.95
    // - air-duct-cleaning is a secondary service (per Apr-26 add) → monthly + 0.85
    const isInspection = s.slug === 'dryer-vent-inspection';
    const isAirDuct = s.slug === 'air-duct-cleaning';
    return {
      url: `${SITE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: cf(isInspection ? 'weekly' : 'monthly'),
      priority: isInspection ? 0.95 : isAirDuct ? 0.85 : 0.9,
    };
  });

  const countyPages: MetadataRoute.Sitemap = COUNTIES.map((c) => ({
    url: `${SITE}/areas/counties/${c.slug}`,
    lastModified: now,
    changeFrequency: cf('monthly'),
    priority: 0.75,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${SITE}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: cf('monthly'),
    // Tier 1 cities: 0.85. Tier 2 (bradenton/sarasota/etc. promoted from stubs): 0.7
    priority: TIER_1_SLUGS.has(a.slug) ? 0.85 : 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((p) => p.body && p.body.length > 0) // only full posts, not placeholders
    .map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: cf('monthly'),
      priority: 0.7,
    }));

  return [...staticPages, ...servicePages, ...countyPages, ...areaPages, ...blogPages];
}
