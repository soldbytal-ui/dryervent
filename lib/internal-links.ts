import { areas, type Area } from './areas';

// ─────────────────────────────────────────────────────────────────────────────
// Counties + adjacency
// ─────────────────────────────────────────────────────────────────────────────

export type County = {
  slug: string;
  name: string;
  displayName: string;
  description: string;
};

export const COUNTIES: County[] = [
  {
    slug: 'hillsborough',
    name: 'Hillsborough',
    displayName: 'Hillsborough County',
    description: 'Tampa, Brandon, Riverview, and the Tampa metro core — our largest service cluster.',
  },
  {
    slug: 'pinellas',
    name: 'Pinellas',
    displayName: 'Pinellas County',
    description: 'St. Petersburg, Clearwater, and the Gulf beaches peninsula.',
  },
  {
    slug: 'pasco',
    name: 'Pasco',
    displayName: 'Pasco County',
    description: 'Wesley Chapel, Land O\' Lakes, and Tampa\'s northern suburbs.',
  },
  {
    slug: 'manatee',
    name: 'Manatee',
    displayName: 'Manatee County',
    description: 'Bradenton and the Lakewood Ranch master-planned corridor.',
  },
  {
    slug: 'sarasota',
    name: 'Sarasota',
    displayName: 'Sarasota County',
    description: 'Sarasota, Siesta Key, and south-coast luxury communities.',
  },
];

// Hand-curated county adjacency map.
const COUNTY_ADJACENCY: Record<string, string[]> = {
  hillsborough: ['pinellas', 'pasco', 'manatee'],
  pinellas: ['hillsborough', 'pasco'],
  pasco: ['hillsborough', 'pinellas'],
  manatee: ['hillsborough', 'sarasota'],
  sarasota: ['manatee'],
};

export function getCountyList() {
  return COUNTIES.map((c) => ({
    ...c,
    cityCount: areas.filter((a) => a.county === c.name).length,
  }));
}

export function getCountyBySlug(slug: string): County | undefined {
  return COUNTIES.find((c) => c.slug === slug);
}

export function getCitiesByCounty(countySlug: string): Area[] {
  const county = getCountyBySlug(countySlug);
  if (!county) return [];
  return areas
    .filter((a) => a.county === county.name)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCountyNeighbors(countySlug: string): County[] {
  const neighbors = COUNTY_ADJACENCY[countySlug] ?? [];
  return neighbors
    .map((slug) => getCountyBySlug(slug))
    .filter((c): c is County => Boolean(c));
}

// ─────────────────────────────────────────────────────────────────────────────
// Geo helpers
// ─────────────────────────────────────────────────────────────────────────────

function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth radius in miles
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export type NearbyArea = Area & { distance_miles: number };

export function getNearbyAreas(currentSlug: string, limit = 3): NearbyArea[] {
  const current = areas.find((a) => a.slug === currentSlug);
  if (!current) return [];
  return areas
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({
      ...a,
      distance_miles: Math.round(haversineMiles(current.lat, current.lng, a.lat, a.lng) * 10) / 10,
    }))
    .sort((a, b) => a.distance_miles - b.distance_miles)
    .slice(0, limit);
}

export function getAllCities(): Area[] {
  return [...areas].sort((a, b) => a.name.localeCompare(b.name));
}

// ─────────────────────────────────────────────────────────────────────────────
// Market / housing tags — used to choose relevant specialty pages + blog posts
// ─────────────────────────────────────────────────────────────────────────────

export type MarketTag =
  | 'condo-dense'
  | 'master-planned'
  | 'rental-heavy'
  | 'historic-housing'
  | 'new-construction'
  | 'retirement'
  | 'waterfront'
  | 'rural-large-lot';

const AREA_TAGS: Record<string, MarketTag[]> = {
  tampa: ['condo-dense', 'rental-heavy'],
  'st-petersburg': ['condo-dense', 'rental-heavy', 'historic-housing', 'waterfront'],
  clearwater: ['condo-dense', 'rental-heavy', 'waterfront'],
  brandon: [],
  riverview: ['new-construction', 'master-planned'],
  'wesley-chapel': ['master-planned', 'new-construction'],
  'new-tampa': [],
  carrollwood: ['historic-housing'],
  westchase: ['master-planned'],
  'south-tampa': ['condo-dense', 'historic-housing'],
  lutz: ['rural-large-lot'],
  'land-o-lakes': ['master-planned', 'new-construction'],
  'plant-city': ['historic-housing', 'rural-large-lot'],
  'apollo-beach': ['condo-dense', 'new-construction', 'waterfront'],
  valrico: ['master-planned'],
  'sun-city-center': ['retirement', 'master-planned'],
  dunedin: ['historic-housing', 'waterfront'],
  largo: [],
  'pinellas-park': [],
  'new-port-richey': ['retirement', 'waterfront'],
  odessa: ['new-construction', 'rural-large-lot'],
  bradenton: ['master-planned', 'new-construction'],
  sarasota: ['rental-heavy', 'waterfront'],
};

export function getAreaTags(slug: string): MarketTag[] {
  return AREA_TAGS[slug] ?? [];
}

export function getTaggedAreas(tag: MarketTag): Area[] {
  const slugs = Object.keys(AREA_TAGS).filter((slug) => AREA_TAGS[slug]?.includes(tag));
  return slugs
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is Area => Boolean(a))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ─────────────────────────────────────────────────────────────────────────────
// Tag → specialty page mapping
// ─────────────────────────────────────────────────────────────────────────────

export type RelatedPage = { path: string; title: string };

const TAG_TO_SPECIALTY: Partial<Record<MarketTag, RelatedPage>> = {
  'condo-dense': {
    path: '/services/condo-dryer-vent-cleaning',
    title: 'Condo & High-Rise Dryer Vent Cleaning',
  },
  'master-planned': {
    path: '/hoa-dryer-vent-cleaning',
    title: 'HOA Dryer Vent Cleaning (Bulk Pricing)',
  },
  'rental-heavy': {
    path: '/landlord-dryer-vent-cleaning',
    title: 'Landlord & Property Manager Service',
  },
  'new-construction': {
    path: '/services/dryer-vent-installation',
    title: 'Dryer Vent Installation',
  },
  'historic-housing': {
    path: '/services/dryer-vent-repair',
    title: 'Dryer Vent Repair',
  },
  retirement: {
    path: '/hoa-dryer-vent-cleaning',
    title: 'HOA & Community Service',
  },
  waterfront: {
    path: '/services/dryer-vent-repair',
    title: 'Dryer Vent Repair (Salt-Air Wear)',
  },
};

const ALWAYS_INCLUDED: RelatedPage[] = [
  { path: '/pricing', title: 'Transparent Per-Foot Pricing' },
  { path: '/services/dryer-vent-inspection', title: 'Free Dryer Vent Inspection' },
];

export function getRelatedSpecialtyPages(cityTags: MarketTag[]): RelatedPage[] {
  const tagged = cityTags
    .map((t) => TAG_TO_SPECIALTY[t])
    .filter((p): p is RelatedPage => Boolean(p));
  const deduped = [...ALWAYS_INCLUDED, ...tagged].reduce<RelatedPage[]>((acc, cur) => {
    if (!acc.some((p) => p.path === cur.path)) acc.push(cur);
    return acc;
  }, []);
  return deduped.slice(0, 4);
}

// ─────────────────────────────────────────────────────────────────────────────
// Tag → related blog post mapping
// ─────────────────────────────────────────────────────────────────────────────

export type RelatedBlogPost = { slug: string; title: string };

const UNIVERSAL_POSTS: RelatedBlogPost[] = [
  {
    slug: 'dryer-takes-too-long-to-dry',
    title: 'Why Is Your Dryer Taking Too Long to Dry?',
  },
  {
    slug: 'signs-dryer-vent-is-clogged',
    title: '10 Warning Signs Your Dryer Vent Is Clogged',
  },
];

const FLORIDA_FREQUENCY_POST: RelatedBlogPost = {
  slug: 'how-often-clean-dryer-vent-florida',
  title: 'How Often Should You Clean Your Dryer Vent? Florida Guide',
};

export function getRelatedBlogPosts(cityTags: MarketTag[]): RelatedBlogPost[] {
  const out: RelatedBlogPost[] = [...UNIVERSAL_POSTS];
  if (cityTags.includes('condo-dense') || cityTags.includes('rental-heavy')) {
    out.push(FLORIDA_FREQUENCY_POST);
  } else {
    // For cities without the heavy-use profile, still include the Florida guide
    // as the third slot — it applies everywhere, just with lower priority.
    out.push(FLORIDA_FREQUENCY_POST);
  }
  return out.slice(0, 3);
}

// ─────────────────────────────────────────────────────────────────────────────
// Popular cities (used for footer / index / specialty-page bridges)
// ─────────────────────────────────────────────────────────────────────────────

const POPULAR_CITY_SLUGS = [
  'tampa',
  'st-petersburg',
  'clearwater',
  'brandon',
  'wesley-chapel',
];

export function getPopularCities(limit = 5): Area[] {
  return POPULAR_CITY_SLUGS.slice(0, limit)
    .map((slug) => areas.find((a) => a.slug === slug))
    .filter((a): a is Area => Boolean(a));
}
