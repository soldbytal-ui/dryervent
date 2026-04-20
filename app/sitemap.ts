import type { MetadataRoute } from 'next';
import { areas } from '@/lib/areas';
import { services } from '@/lib/services';
import { COUNTIES } from '@/lib/internal-links';
import { posts } from '@/lib/posts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/local-vs-franchise-dryer-vent-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/services/condo-dryer-vent-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/hoa-dryer-vent-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/landlord-dryer-vent-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const countyPages: MetadataRoute.Sitemap = COUNTIES.map((c) => ({
    url: `${SITE}/areas/counties/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${SITE}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((p) => p.body && p.body.length > 0) // only full posts, not placeholders
    .map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly',
      priority: 0.75,
    }));

  return [...staticPages, ...servicePages, ...countyPages, ...areaPages, ...blogPages];
}
