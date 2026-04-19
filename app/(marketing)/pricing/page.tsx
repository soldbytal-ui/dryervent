import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';
import TrustBar from '@/components/TrustBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export const metadata = buildMetadata({
  title: 'Dryer Vent Cleaning Prices Tampa Bay | Transparent Pricing',
  description: 'Airflow Dryer Vent Cleaning pricing: Residential cleaning from $79 (first 10 feet) + $10 per additional foot. Wall ductwork repair $195–$595. No hidden fees, free estimates, transparent per-foot model across all of Tampa Bay.',
  path: '/pricing',
});

const pricingFaqs = [
  {
    q: 'Are there any hidden fees?',
    a: 'No. We provide a clear quote before starting any work. The price you agree to is the price you pay.',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'No. Estimates are free, whether you call us or request one online. We only charge if you decide to proceed with the service.',
  },
  {
    q: 'What\'s included in the base price?',
    a: 'The base price includes full vent line cleaning, exterior hood cleaning, lint trap area cleaning, airflow verification, before/after photos, and a written safety report.',
  },
  {
    q: 'When is more than the base price required?',
    a: 'Pricing increases for unusually long vent runs (over 25 feet), vents routed through attics or crawl spaces, commercial buildings, or properties requiring repair work on top of cleaning.',
  },
  {
    q: 'Do you accept credit cards?',
    a: 'Yes. We accept all major credit cards, debit cards, and digital payments (Apple Pay, Google Pay). We also accept cash and checks.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.12) 0%, transparent 60%)',
        }} />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs text-gold font-semibold backdrop-blur mb-5">
            Transparent Pricing
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
            Fair Prices. No Surprises.
          </h1>
          <p className="text-lg text-white/75">Free estimates on every job. The price we quote is the price you pay.</p>
        </div>
      </section>

      <TrustBar />

      <section className="bg-white py-16">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const featured = s.slug === 'residential-dryer-vent-cleaning';
              return (
                <div
                  key={s.slug}
                  className={`relative rounded-2xl p-7 border-2 ${
                    featured
                      ? 'border-fire bg-gradient-to-br from-orange-50 to-white shadow-xl'
                      : 'border-gray-200 bg-white hover:border-fire transition-all'
                  }`}
                >
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fire text-white text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <h3 className="font-display font-extrabold text-xl text-navy mb-2">{s.shortName}</h3>
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">{s.intro.split('.')[0]}.</p>

                  <div className="mb-5 pb-5 border-b border-gray-200">
                    {s.priceFrom > 0 ? (
                      <>
                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Starting at</div>
                        <div className="font-display font-extrabold text-4xl text-fire">${s.priceFrom}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Pricing</div>
                        <div className="font-display font-extrabold text-2xl text-fire">Custom Quote</div>
                      </>
                    )}
                    <div className="text-xs text-gray-500 mt-1">{s.duration}</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {s.includes.slice(0, 5).map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${s.slug}`}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-bold text-sm transition-all ${
                      featured
                        ? 'bg-fire hover:bg-fire-dark text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-navy'
                    }`}
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-500 mt-10 max-w-2xl mx-auto">
            Final pricing depends on vent length, accessibility, and condition. Free estimates are always provided before work begins. No hidden fees — the quote you receive is the price you pay.
          </p>
        </div>
      </section>

      <FAQ faqs={pricingFaqs} title="Pricing FAQs" />

      <FinalCTA />
    </>
  );
}
