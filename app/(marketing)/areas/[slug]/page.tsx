import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
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

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: `Dryer Vent Cleaning ${area.name}, FL | Same-Day Service | Dry Vent Tampa`,
    description: `Professional dryer vent cleaning in ${area.name}, Florida. Prevent fires, reduce energy bills, dry clothes faster. Licensed, insured, same-day appointments. Call now for free estimate.`,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const areaFaqs = [
    {
      q: `How much does dryer vent cleaning cost in ${area.name}?`,
      a: `Residential dryer vent cleaning in ${area.name} typically ranges from $99 to $199 depending on vent length, accessibility, and condition. We provide a free estimate before any work begins, with no hidden fees.`,
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

  return (
    <>
      <SchemaMarkup
        data={[
          localBusinessSchema(area),
          faqSchema(areaFaqs),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Areas', url: '/areas/tampa' },
            { name: area.name, url: `/areas/${area.slug}` },
          ]),
        ]}
      />

      <Hero
        badge={`#1 Dryer Vent Cleaning in ${area.name}, FL`}
        title={
          <>
            Dryer Vent Cleaning in <em className="not-italic text-fire-glow">{area.name}</em>, Florida
          </>
        }
        subtitle={`Trusted by ${area.population.replace('+', '')} residents and businesses in ${area.name}. Same-day appointments. Licensed, insured, and committed to keeping your home safe.`}
        city={area.name}
      />

      <TrustBar />

      {/* Local intro — definition-style for AI search */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <MapPin size={14} />
            SERVING {area.name.toUpperCase()}, {area.county.toUpperCase()} COUNTY
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why {area.name} Homes Need Professional Dryer Vent Cleaning
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">{area.intro}</p>
          <p className="text-base text-gray-600 leading-relaxed mb-8">{area.why}</p>

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

          {/* Local context — neighborhoods + drivers */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-4">Neighborhoods We Serve in {area.name}</h3>
              <div className="flex flex-wrap gap-2">
                {area.neighborhoods.map((n) => (
                  <span key={n} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-fire-dark rounded-full text-sm font-medium">
                    <MapPin size={12} /> {n}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-4">Why {area.name} Is Different</h3>
              <ul className="space-y-2.5">
                {area.drivers.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} />
                    <span className="capitalize">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this area */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Dryer Vent Services in {area.name}
            </h2>
            <p className="text-gray-600">Complete solutions for every dryer vent need across {area.name}.</p>
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

      {/* Why us */}
      <section className="bg-white py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy text-center mb-12">
            Why {area.name} Chooses Dry Vent Tampa
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Same-Day Service', desc: `Most ${area.name} appointments happen the same day you call. We respect your time.` },
              { icon: ShieldCheck, title: 'Licensed & Insured', desc: 'Florida-licensed and fully insured. Documentation available on request.' },
              { icon: CheckCircle2, title: '100% Guarantee', desc: 'If you\'re not fully satisfied, we make it right or your money back.' },
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

      <Reviews city={area.name} max={3} />

      <FAQ faqs={areaFaqs} title={`Dryer Vent Cleaning FAQs — ${area.name}`} />

      {/* Nearby areas — internal linking for SEO */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
            We Also Serve Nearby Areas
          </h2>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {areas.filter((a) => a.slug !== area.slug).map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-navy hover:border-fire hover:text-fire transition-all"
              >
                <MapPin size={12} /> {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headline={`Tampa Bay's Most Trusted Dryer Vent Service\nin ${area.name}.`}
        sub={`Join thousands of ${area.name} homeowners who trust Dry Vent Tampa to keep their families safe.`}
      />
    </>
  );
}
