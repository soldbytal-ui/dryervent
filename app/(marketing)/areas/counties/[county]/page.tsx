import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services } from '@/lib/services';
import { faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { COUNTIES, getCountyBySlug, getCitiesByCounty } from '@/lib/internal-links';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export function generateStaticParams() {
  return COUNTIES.map((c) => ({ county: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ county: string }> }) {
  const { county: countySlug } = await params;
  const county = getCountyBySlug(countySlug);
  if (!county) return {};
  const cities = getCitiesByCounty(countySlug);
  const cityNames = cities.slice(0, 5).map((c) => c.name).join(', ');
  return buildMetadata({
    title: `Dryer Vent Cleaning in ${county.displayName} | Airflow Dryer Vent Cleaning`,
    description: `Locally-owned dryer vent and dryer duct cleaning across ${county.displayName}, serving ${cityNames}${cities.length > 5 ? ', and more' : ''}. Not a franchise. Licensed, insured, same-day service. Call (813) 744-1127.`,
    path: `/areas/counties/${county.slug}`,
  });
}

// County-specific local angles used in the intro copy
const COUNTY_ANGLES: Record<string, { angle: string; detail: string; faqNote: string }> = {
  hillsborough: {
    angle: 'Hillsborough County is the heart of our service footprint — Tampa, Brandon, Riverview, and the suburban growth ring account for the majority of our weekly jobs.',
    detail: 'Housing stock here spans every era, from pre-war bungalows in Seminole Heights and Hyde Park to 2020s builds in FishHawk and MiraBay. That mix means our crews arrive ready for rigid metal retrofits, long 30-foot vent runs in new construction, and salt-exposed coastal homes on Apollo Beach canals.',
    faqNote: 'Most Hillsborough jobs take 45–75 minutes, including Brandon, Riverview, and Tampa neighborhoods.',
  },
  pinellas: {
    angle: 'Pinellas County is a peninsula — Gulf on one side, Tampa Bay on the other — and every home in it sits within miles of salt air that corrodes metal vent components faster than inland housing.',
    detail: 'St. Petersburg and Clearwater anchor the county, but we also serve denser mid-Pinellas communities like Largo and Pinellas Park, plus coastal Dunedin. Vacation rentals and 55+ condos need semiannual cleaning here — twice the frequency of standard single-family homes.',
    faqNote: 'Pinellas homes in beach-adjacent ZIPs often need service every 6 months, not annually.',
  },
  pasco: {
    angle: 'Pasco County covers Tampa\'s northern suburbs — Wesley Chapel, Land O\' Lakes, Lutz — where master-planned communities built in the last 15–20 years are hitting their first deep-clean need right now.',
    detail: 'Uniform floor plans mean predictable vent-run layouts, typically 20–35 feet through interior walls to second-floor laundry rooms. We also handle equestrian-zoned Lutz and Odessa properties with detached laundry buildings that standard services skip.',
    faqNote: 'Wesley Chapel and Land O\' Lakes homes built 2005–2015 are now in the prime window for their first professional vent cleaning.',
  },
  manatee: {
    angle: 'Manatee County — anchored by Lakewood Ranch and downtown Bradenton — sits roughly 45 miles from our Tampa base, within our 50-mile service radius.',
    detail: 'Lakewood Ranch is one of the largest master-planned communities in the country, with 20,000+ homes and growing. Most were built in the last 15 years and have vent runs that have never been professionally cleaned. Coastal west-Bradenton and Cortez add salt-exposure challenges similar to Pinellas.',
    faqNote: 'Manatee service is by appointment — we book Bradenton jobs in half-day blocks to keep travel efficient.',
  },
  sarasota: {
    angle: 'Sarasota County — Sarasota, Siesta Key, Longboat Key — is the southern edge of our service reach at roughly 55 miles from Tampa, available by appointment for quality-focused clients.',
    detail: 'Luxury waterfront homes and snowbird seasonal properties dominate the market here. Vacant winter months allow moisture and pest intrusion; heavy use during resident months compacts lint fast. The typical recommendation is semiannual professional cleaning timed to seasonal occupancy.',
    faqNote: 'Sarasota service is scheduled as full-day appointments; minimum scope typically applies.',
  },
};

export default async function CountyHubPage({ params }: { params: Promise<{ county: string }> }) {
  const { county: countySlug } = await params;
  const county = getCountyBySlug(countySlug);
  if (!county) notFound();

  const cities = getCitiesByCounty(countySlug);
  const angle = COUNTY_ANGLES[countySlug] ?? COUNTY_ANGLES.hillsborough;
  const cityNames = cities.map((c) => c.name);
  const firstFour = cityNames.slice(0, 4).join(', ');

  const countyFaqs = [
    {
      q: `How long does dryer vent cleaning take in ${county.displayName}?`,
      a: `${angle.faqNote} Standard residential service is 45–75 minutes; larger homes, long vent runs, and commercial jobs can take longer. We provide a time estimate before we start.`,
    },
    {
      q: `How much does dryer vent cleaning cost in ${county.displayName}?`,
      a: `Residential dryer vent cleaning across ${county.displayName} typically ranges from $99 to $199 depending on vent length, accessibility, and condition. Quotes are free and fixed before any work begins — no hidden fees.`,
    },
    {
      q: `Which cities in ${county.displayName} do you serve?`,
      a: `We serve every city in ${county.displayName} that falls within our 50-mile Tampa service radius: ${cityNames.join(', ')}. If your city isn't listed, call us — we frequently add areas based on demand.`,
    },
    {
      q: `Are you a franchise in ${county.displayName}?`,
      a: `No. Airflow Dryer Vent Cleaning is locally owned and independent. We are not part of Dryer Vent Wizard, Dryer Vent Squad, or any other national franchise. Every job is handled by our own technicians.`,
    },
    {
      q: `Do you offer same-day service across ${county.displayName}?`,
      a: `Yes. Same-day and next-day appointments are available throughout ${county.displayName} depending on route density. Cities closer to our Tampa base (for Hillsborough and Pinellas jobs) see the fastest availability; Manatee and Sarasota are scheduled in dedicated time blocks.`,
    },
  ];

  const serviceSchemaBlock = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Dryer Vent Cleaning in ${county.displayName}`,
    serviceType: 'Dryer Vent Cleaning',
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: county.displayName,
      containedInPlace: { '@type': 'State', name: 'Florida' },
    },
    description: `Locally-owned dryer vent and dryer duct cleaning, repair, and installation across ${county.displayName}, Florida. Serving ${cityNames.join(', ')}.`,
    url: `${SITE}/areas/counties/${county.slug}`,
  };

  return (
    <>
      <SchemaMarkup
        data={[
          serviceSchemaBlock,
          faqSchema(countyFaqs),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Areas', url: '/areas' },
            { name: county.displayName, url: `/areas/counties/${county.slug}` },
          ]),
        ]}
      />

      <Hero
        badge={`Serving All of ${county.displayName}`}
        title={
          <>
            Dryer Vent Cleaning in <em className="not-italic text-fire-glow">{county.displayName}</em>
          </>
        }
        subtitle={`Locally-owned dryer vent and dryer duct cleaning across ${county.displayName}, Florida — ${firstFour}${cities.length > 4 ? ', and more' : ''}. Same-day appointments, NFPA 211-aligned process, and the same Airflow crew every visit.`}
      />

      <TrustBar />

      {/* County-specific intro */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <MapPin size={14} />
            {county.displayName.toUpperCase()}
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why {county.displayName} Homes Need Professional Vent Service
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">{angle.angle}</p>
          <p className="text-base text-gray-600 leading-relaxed">
            {angle.detail} Airflow Dryer Vent Cleaning is locally owned — not a national franchise — and every job across {county.displayName} is staffed by our own team.
          </p>
        </div>
      </section>

      {/* Cities grid */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Cities We Serve in {county.displayName}
            </h2>
            <p className="text-gray-600">
              Every city below links to a dedicated page with local ZIP codes, neighborhoods, and climate-specific vent considerations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
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
        </div>
      </section>

      {/* Services available in this county */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Services Available Across {county.displayName}
            </h2>
            <p className="text-gray-600">Every Airflow service — residential, commercial, repair, installation, inspection — is available throughout the county.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-fire hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="font-display font-bold text-lg text-navy mb-2">{s.shortName}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-fire text-sm">
                    {s.priceFrom ? `From $${s.priceFrom}` : 'Custom Quote'}
                  </span>
                  <ArrowRight size={16} className="text-fire group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy text-center mb-10">
            Why {county.displayName} Chooses Airflow
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'Same-Day Response',
                desc: `Same-day appointments across ${county.displayName} are standard, not an upsell.`,
              },
              {
                icon: ShieldCheck,
                title: 'Locally Owned',
                desc: 'Independent — not Dryer Vent Wizard, not a national franchise. Your neighbors, our crew.',
              },
              {
                icon: CheckCircle2,
                title: 'NFPA 211-Aligned Process',
                desc: 'Commercial rotary brushes, airflow verification, and a written report on every job.',
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-fire/10 rounded-2xl flex items-center justify-center">
                    <Icon className="text-fire" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Reviews max={3} />

      <FAQ faqs={countyFaqs} title={`Dryer Vent Cleaning FAQs — ${county.displayName}`} />

      <FinalCTA
        headline={`Locally-Owned Service\nAcross ${county.displayName}.`}
        sub={`Free Tampa Bay inspection across ${county.displayName}. Transparent per-foot pricing. Locally owned — not a franchise.`}
      />
    </>
  );
}
