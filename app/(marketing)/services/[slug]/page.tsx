import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services, getServiceBySlug } from '@/lib/services';
import { areas } from '@/lib/areas';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const titleSuffix = service.free
    ? 'No Cost · No Obligation'
    : service.priceFrom
    ? `From $${service.priceFrom}`
    : 'Custom Pricing';
  return buildMetadata({
    title: `${service.name} Tampa Bay | ${titleSuffix}`,
    description: `${service.intro.split('.').slice(0, 2).join('.')}.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <SchemaMarkup
        data={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.shortName, url: `/services/${service.slug}` },
          ]),
        ]}
      />

      <Hero
        badge={service.free ? `FREE · No Obligation · Tampa Bay` : `Professional ${service.shortName} · Tampa Bay`}
        title={
          <>
            <em className="not-italic text-fire-glow">{service.name}</em> in Tampa Bay
          </>
        }
        subtitle={service.intro}
        defaultService={service.slug.includes('commercial') ? 'commercial' : service.slug.includes('repair') ? 'repair' : service.slug.includes('installation') ? 'installation' : service.slug.includes('inspection') ? 'inspection' : 'cleaning'}
      />

      <TrustBar />

      {/* What's included */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-5xl grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
              WHAT&apos;S INCLUDED
            </div>
            <h2 className="font-display font-extrabold text-3xl text-navy mb-4">Everything You Get</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Typical Duration</div>
              <div className="font-display font-bold text-xl text-navy">{service.duration}</div>
            </div>
            {service.free ? (
              <div className="bg-orange-50 rounded-xl p-5 border border-fire/20">
                <div className="text-xs font-semibold text-fire uppercase tracking-wider mb-1">Cost</div>
                <div className="font-display font-extrabold text-3xl text-fire">FREE</div>
                <div className="text-sm text-gray-600 mt-1">No obligation · No upsell pressure · Honest assessment</div>
              </div>
            ) : service.priceFrom > 0 ? (
              <div className="bg-orange-50 rounded-xl p-5 border border-fire/20">
                <div className="text-xs font-semibold text-fire uppercase tracking-wider mb-1">Starting At</div>
                <div className="font-display font-bold text-3xl text-fire">${service.priceFrom}</div>
                <div className="text-sm text-gray-600 mt-1">Free estimate · No hidden fees</div>
              </div>
            ) : null}
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-navy mb-5">Service includes:</h3>
            <ul className="space-y-3">
              {service.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              KEY BENEFITS
            </div>
            <h2 className="font-display font-extrabold text-3xl text-navy">Why Choose Professional {service.shortName}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-display font-bold text-base text-navy mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              OUR PROCESS
            </div>
            <h2 className="font-display font-extrabold text-3xl text-navy">How It Works</h2>
          </div>
          <div className="space-y-5">
            {service.process.map((step, i) => (
              <div key={i} className="flex gap-5 p-5 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0 shadow-md shadow-fire/30">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-navy mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews max={3} />

      <FAQ faqs={service.faqs} title={`${service.shortName} — Frequently Asked Questions`} />

      {/* Service areas for this service */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-3">
            {service.shortName} Available Throughout Tampa Bay
          </h2>
          <p className="text-center text-gray-600 mb-8">Click your city to learn about service in your area</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {areas.map((a) => (
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

      {/* Related services */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">Other Services You May Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-fire hover:bg-white transition-all"
              >
                <h3 className="font-display font-semibold text-navy mb-2">{s.shortName}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.intro.slice(0, 100)}...</p>
                <span className="text-fire text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headline={service.free
          ? `Book Your FREE ${service.shortName}\nNo Cost. No Obligation.`
          : `Ready to Book ${service.shortName}?\nGet Your Free Estimate Today.`}
      />
    </>
  );
}
