import { areas, type Area } from './areas';

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

export function getNearbyAreas(currentSlug: string, limit = 3): Area[] {
  const current = areas.find((a) => a.slug === currentSlug);
  if (!current) return [];
  return areas
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({
      area: a,
      dist: Math.hypot(a.lat - current.lat, a.lng - current.lng),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit)
    .map((x) => x.area);
}

export function getAllCities(): Area[] {
  return [...areas].sort((a, b) => a.name.localeCompare(b.name));
}
