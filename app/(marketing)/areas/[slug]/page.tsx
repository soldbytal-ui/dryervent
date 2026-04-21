import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, ShieldCheck, CheckCircle2, Landmark, DollarSign } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { areas, getAreaBySlug } from '@/lib/areas';
import { services } from '@/lib/services';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { getAreaContent, STANDARD_PRICING } from '@/lib/area-content';
import { getNearbyAreas, getCountyBySlug } from '@/lib/internal-links';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  const content = getAreaContent(slug);
  const base = buildMetadata({
    title: content?.metaTitle ?? `Dryer Vent & Duct Cleaning ${area.name}, FL | Same-Day Service`,
    description:
      content?.metaDescription ??
      `Locally-owned dryer vent and dryer duct cleaning in ${area.name}, Florida. Prevent fires, cut energy bills, dry clothes faster. Licensed, insured, same-day appointments. Free estimate — call (813) 744-1127.`,
    path: `/areas/${area.slug}`,
  });
  if (area.placeholder) {
    return { ...base, robots: { index: false, follow: true } };
  }
  return base;
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const content = getAreaContent(slug);
  const nearby = getNearbyAreas(slug, 4);
  const countySlug = area.county.toLowerCase().replace(/[^a-z]/g, '');
  const county = getCountyBySlug(countySlug);

  const faqs = content?.cityFaqs ?? [
    {
      q: `How much does dryer vent cleaning cost in ${area.name}?`,
      a: `Residential dryer vent cleaning in ${area.name} starts at $79 for the first 10 feet of vent run, plus $10 per additional foot. Most ${area.name} jobs land in the $79–$249 range depending on vent length and any wall ductwork repair needs. We provide a free estimate before any work begins, with no hidden fees.`,
    },
    {
      q: `How often should ${area.name} homeowners clean their dryer vents?`,
      a: `${area.intro.split('.').slice(1).join('.').trim() || `Most ${area.name} homes need annual professional dryer vent cleaning. Households with pets, large families, or high dryer usage should clean every 6 months.`}`,
    },
    {
      q: `Do you offer same-day service in ${area.name}?`,
      a: `Yes. Same-day and next-day appointments are available for ${area.name} residents and businesses. Call us in the morning and we can usually come out the same afternoon.`,
    },
    {
      q: `Why is dryer vent cleaning especially important in ${area.name}?`,
      a: area.why,
    },
    {
      q: `What ZIP codes do you serve in ${area.name}?`,
      a: `We serve all of ${area.name} including ZIP codes ${area.zip.slice(0, 8).join(', ')}${area.zip.length > 8 ? ', and surrounding areas.' : '.'}`,
    },
  ];

  const serviceOfferSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Dryer Vent & Duct Cleaning in ${area.name}, FL`,
    serviceType: 'Dryer Vent Cleaning',
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: { '@type': 'City', name: area.name, containedInPlace: { '@type': 'AdministrativeArea', name: `${area.county} County` } },
    url: `${SITE}/areas/${area.slug}`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '79',
      highPrice: '595',
      priceRange: '$79–$595',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <SchemaMarkup
        data={[
          localBusinessSchema(area),
          serviceOfferSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Areas', url: '/areas' },
            ...(county ? [{ name: county.displayName, url: `/areas/counties/${county.slug}` }] : []),
            { name: area.name, url: `/areas/${area.slug}` },
          ]),
        ]}
      />

      <Hero
        badge={`Locally-Owned Dryer Vent & Duct Cleaning · ${area.name}, FL`}
        title={
          <>
            Dryer Vent Cleaning in <em className="not-italic text-fire-glow">{area.name}</em>, FL
          </>
        }
        subtitle={
          content?.heroSubtitle ??
          `Trusted by ${area.population.replace('+', '')} residents and businesses in ${area.name}. Same-day appointments. Licensed, insured, locally owned — not a franchise.`
        }
        city={area.name}
      />

      <TrustBar />

      {area.placeholder && (
        <section className="bg-orange-50 border-y border-fire/20 py-4">
          <div className="container-custom max-w-4xl text-center">
            <p className="text-sm text-navy">
              <strong className="font-display font-bold">Full service information coming soon.</strong>{' '}
              We actively serve {area.name}, {area.county} County — call <a href={`tel:+18137441127`} className="text-fire font-semibold underline">(813) 744-1127</a> for a free estimate while this page is being expanded.
            </p>
          </div>
        </section>
      )}

      {/* Local intro — definition-style for AI search */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <MapPin size={14} />
            SERVING {area.name.toUpperCase()}, {area.county.toUpperCase()} COUNTY
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Dryer Vent &amp; Duct Cleaning in {area.name}, Florida
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">{content?.longIntro ?? area.intro}</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Population</div>
              <div className="font-display font-bold text-2xl text-navy">{area.population}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">County</div>
              <div className="font-display font-bold text-2xl text-navy">{area.county}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Response Time</div>
              <div className="font-display font-bold text-2xl text-navy">Same-Day</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why vents clog faster here */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why Dryer Vents Clog Faster in {area.name}
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-8">{content?.whyClogHere ?? area.why}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-4 flex items-center gap-2"><MapPin size={18} className="text-fire" /> Local drivers</h3>
              <ul className="space-y-2.5">
                {area.drivers.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} />
                    <span className="capitalize">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            {area.landmarks.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-xl text-navy mb-4 flex items-center gap-2"><Landmark size={18} className="text-fire" /> Serving homes near</h3>
                <ul className="space-y-2.5">
                  {area.landmarks.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-sm text-gray-700">
                      <Landmark className="text-fire flex-shrink-0 mt-0.5" size={16} />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6">
            {area.name} Neighborhoods We Serve
          </h2>
          {content?.neighborhoodDetail ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.neighborhoodDetail.map((n) => (
                <div key={n.name} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-navy text-base">{n.name}</h3>
                    <span className="text-xs font-semibold text-fire bg-orange-50 px-2 py-0.5 rounded-full">ZIP {n.zip}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{n.detail}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {area.neighborhoods.map((n) => (
                <span key={n} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-fire-dark rounded-full text-sm font-medium">
                  <MapPin size={12} /> {n}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-6">
            Serving ZIP codes: {area.zip.join(', ')}.
          </p>
        </div>
      </section>

      {/* What's included */}
      {content && (
        <section className="bg-gray-50 py-16">
          <div className="container-custom max-w-5xl">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
              What a Professional Dryer Vent Cleaning in {area.name} Includes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.includesList.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-200">
                  <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-6 leading-relaxed">{content.responseNote}</p>
          </div>
        </section>
      )}

      {/* Services in this area */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Dryer Vent &amp; Duct Services in {area.name}
            </h2>
            <p className="text-gray-600">Complete solutions for every dryer vent and dryer duct need across {area.name}.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-fire hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="font-display font-bold text-lg text-navy mb-2">{s.shortName} in {area.name}</h3>
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

      {/* Pricing transparency */}
      {content && (
        <section className="bg-gray-50 py-16">
          <div className="container-custom max-w-4xl">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
              <DollarSign size={14} /> TRANSPARENT PRICING
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6">
              Dryer Vent Cleaning Prices in {area.name}
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">{content.pricingNotes}</p>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="px-5 py-3 text-sm font-display font-bold">Service</th>
                    <th className="px-5 py-3 text-sm font-display font-bold">Price</th>
                    <th className="px-5 py-3 text-sm font-display font-bold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {STANDARD_PRICING.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-5 py-3 text-sm text-gray-700 align-top font-medium">{row.label}</td>
                      <td className="px-5 py-3 text-sm font-display font-extrabold text-fire align-top whitespace-nowrap">{row.range}</td>
                      <td className="px-5 py-3 text-xs text-gray-600 align-top hidden md:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Final price quoted before work begins. No hidden fees. Call <a href="tel:+18137441127" className="text-fire font-semibold">(813) 744-1127</a> for a {area.name}-specific estimate.
            </p>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy text-center mb-12">
            Why {area.name} Chooses Airflow Dryer Vent Cleaning
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Same-Day Response', desc: `Most ${area.name} appointments happen the same day you call.` },
              { icon: ShieldCheck, title: 'Locally Owned', desc: 'Independent Tampa Bay team — not a national franchise. Your neighbors, our crew.' },
              { icon: CheckCircle2, title: 'NFPA 211-Aligned Process', desc: 'Commercial rotary brushes, airflow verification, and a written report on every job — following NFPA 211 guidelines.' },
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

      {/* Testimonial section intentionally hidden until real reviews exist.
          Data lives in lib/area-content.ts AreaContent.testimonial — sample
          content only, never rendered. Re-enable this block (and add a
          `verified: true` gate) once each city has verified Google / BBB
          reviews with explicit customer permission. */}

      {/* Counter-positioning callout */}
      {content?.counterPositioning && (
        <section className="bg-white py-14">
          <div className="container-custom max-w-3xl">
            <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8">
              <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
                <ShieldCheck size={14} /> LOCALLY OWNED — NOT A FRANCHISE
              </div>
              <h3 className="font-display font-extrabold text-2xl text-navy mb-4">
                Why {area.name} Homeowners Choose Independent Over Franchise
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">{content.counterPositioning}</p>
            </div>
          </div>
        </section>
      )}

      <Reviews city={area.name} max={3} />

      <FAQ faqs={faqs} title={`Dryer Vent Cleaning FAQs — ${area.name}`} />

      {/* Nearby areas — internal linking for SEO */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-3">
            Nearby Cities We Also Serve
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            Part of {county?.displayName ?? `${area.county} County`} — <Link href={`/areas/counties/${county?.slug ?? countySlug}`} className="text-fire font-semibold hover:underline">view the full county hub</Link>.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/areas/${n.slug}`}
                className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-fire hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 text-fire text-xs font-display font-bold uppercase tracking-wider mb-1">
                  <MapPin size={12} /> {n.county} County
                </div>
                <div className="font-display font-bold text-navy">{n.name}</div>
                <div className="text-xs text-gray-500 mt-1">Dryer vent cleaning →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headline={`Locally-Owned Dryer Vent Service\nin ${area.name}.`}
        sub={`Free on-site inspection in ${area.name}. Transparent per-foot pricing. Locally owned — not a franchise. Call (813) 744-1127.`}
      />
    </>
  );
}
