import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { getCountyList, getCitiesByCounty } from '@/lib/internal-links';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export const metadata = buildMetadata({
  title: 'Service Areas Across Tampa Bay | Airflow Dryer Vent Cleaning',
  description:
    'Locally-owned dryer vent and dryer duct cleaning across 23+ Tampa Bay cities — Hillsborough, Pinellas, Pasco, Manatee, and Sarasota counties. Not a franchise. Call (813) 744-1127 for same-day service.',
  path: '/areas',
});

export default function AreasIndexPage() {
  const counties = getCountyList();

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dryer Vent Cleaning Service Areas',
    itemListElement: counties.flatMap((county, countyIdx) => {
      const cities = getCitiesByCounty(county.slug);
      return cities.map((city, cityIdx) => ({
        '@type': 'ListItem',
        position: countyIdx * 100 + cityIdx + 1,
        url: `${SITE}/areas/${city.slug}`,
        name: `${city.name}, FL`,
      }));
    }),
  };

  return (
    <>
      <SchemaMarkup
        data={[
          itemList,
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Areas', url: '/areas' },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light py-16 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs text-gold font-semibold backdrop-blur mb-5">
            <MapPin size={14} /> Service Areas
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-5">
            Dryer Vent Cleaning Across <em className="not-italic text-fire-glow">Tampa Bay</em>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto">
            Airflow Dryer Vent Cleaning is a locally-owned, independent team — not a national franchise. We provide professional dryer vent and dryer duct cleaning to homes and businesses across Hillsborough, Pinellas, Pasco, Manatee, and Sarasota counties, within 50 miles of Tampa.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Intro */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-4xl">
          <p className="text-gray-700 leading-relaxed">
            Select your county to see every city we cover, or jump straight to your city&apos;s page for local context — ZIP codes, neighborhood detail, and climate factors that affect your dryer vent. Every service area is supported by the same Airflow crew, the same rotary brush equipment, and the same NFPA 211-aligned process. Same-day appointments are available year-round; demand peaks in January and September, so book early in those months.
          </p>
        </div>
      </section>

      {/* Counties */}
      {counties.map((county) => {
        const cities = getCitiesByCounty(county.slug);
        if (cities.length === 0) return null;
        return (
          <section key={county.slug} className="py-14 odd:bg-gray-50 even:bg-white">
            <div className="container-custom">
              <div className="max-w-3xl mb-8">
                <Link
                  href={`/areas/counties/${county.slug}`}
                  className="group inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-2"
                >
                  <MapPin size={14} /> {cities.length} {cities.length === 1 ? 'city' : 'cities'}
                </Link>
                <h2 className="font-display font-extrabold text-3xl text-navy mb-2">
                  <Link
                    href={`/areas/counties/${county.slug}`}
                    className="hover:text-fire transition-colors"
                  >
                    {county.displayName}
                  </Link>
                </h2>
                <p className="text-gray-600 leading-relaxed">{county.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-fire hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-fire to-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    <div className="flex items-center gap-2 text-fire text-xs font-display font-bold uppercase tracking-wider mb-3">
                      <MapPin size={12} /> {city.county} County
                    </div>
                    <h3 className="font-display font-bold text-lg text-navy mb-2">{city.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {city.intro.split('.')[0]}.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Pop. {city.population}</span>
                      <span className="text-fire text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        View service <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href={`/areas/counties/${county.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-display font-bold text-fire hover:text-fire-dark"
                >
                  All dryer vent cleaning in {county.name} County <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA
        headline="Your City on the List?\nBook Your Free Estimate."
        sub="Airflow Dryer Vent Cleaning serves every city above. Locally owned — not a franchise. Same-day appointments across Tampa Bay."
      />
    </>
  );
}
