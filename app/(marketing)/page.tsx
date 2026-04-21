import Link from 'next/link';
import { ArrowRight, Wrench, Building2, Search, Settings2, Home as HomeIcon } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import DangerSection from '@/components/DangerSection';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';
import { faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Dryer Vent & Duct Cleaning Tampa Bay | Locally-Owned, Same-Day',
  description:
    'Locally-owned dryer vent and dryer duct cleaning across Tampa Bay. Prevent fires, cut energy bills, dry clothes faster. Licensed, insured, same-day service. Not a franchise. Call (813) 744-1127.',
  path: '/',
});

const homepageFaqs = [
  {
    q: 'How often should I have my dryer vent cleaned in Tampa?',
    a: 'The National Fire Protection Association recommends professional cleaning at least once per year. In Tampa\'s humid climate, with frequent dryer use year-round, annual cleaning is the minimum. Larger households or homes with pets should clean every 6 months.',
  },
  {
    q: 'How much does dryer vent cleaning cost in Tampa Bay?',
    a: 'Residential dryer vent cleaning in Tampa Bay starts at $79 for the first 10 feet of vent run, plus $10 per additional foot. Most jobs land in the $79–$249 range depending on length. Wall ductwork repair, when needed, runs $195–$595. Free on-site inspection is included at no cost and no obligation.',
  },
  {
    q: 'What are the warning signs my dryer vent needs cleaning?',
    a: 'Common warning signs include: clothes taking more than one cycle to dry, the dryer or laundry room feeling unusually hot, a burning smell during operation, visible lint around the dryer hose or exterior vent, and the exterior vent flap not opening when the dryer runs.',
  },
  {
    q: 'Do you offer same-day dryer vent cleaning service?',
    a: 'Yes. Same-day and next-day appointments are available throughout the Tampa Bay area depending on schedule and location. Call us in the morning and we can usually come out the same afternoon.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve the entire Tampa Bay metropolitan area including Tampa, St. Petersburg, Clearwater, Brandon, Riverview, Wesley Chapel, New Tampa, Carrollwood, Westchase, South Tampa, Lutz, Land O\' Lakes, Plant City, Apollo Beach, and Valrico.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Airflow Dryer Vent Cleaning is fully licensed and insured in the State of Florida. Documentation is available on request and is included in all commercial service contracts.',
  },
];

const serviceIcons: Record<string, any> = {
  'residential-dryer-vent-cleaning': HomeIcon,
  'commercial-dryer-vent-cleaning': Building2,
  'dryer-vent-repair': Wrench,
  'dryer-vent-installation': Settings2,
  'dryer-vent-inspection': Search,
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup
        data={[
          faqSchema(homepageFaqs),
          breadcrumbSchema([{ name: 'Home', url: '/' }]),
        ]}
      />

      <Hero
        badge="FREE Inspection · No Obligation · Locally Owned"
        title={
          <>
            Tampa Bay&apos;s #1 <em className="not-italic text-fire-glow">Dryer Vent Cleaning</em> Service
          </>
        }
        subtitle="Free dryer vent inspection — camera scope + airflow test + written assessment, no cost and no pressure. Cleaning starts at $79 (first 10 ft) + $10 per additional foot. Locally owned, not a franchise."
      />

      {/* Free inspection callout strip */}
      <section className="bg-orange-50 border-y border-fire/15 py-4">
        <div className="container-custom flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
          <span className="bg-fire text-white px-3 py-0.5 rounded-full text-xs font-display font-bold uppercase tracking-wider">FREE INSPECTION</span>
          <span className="text-sm text-navy font-medium">No obligation. Camera scope + airflow test + written assessment.</span>
          <a href="tel:+18137441127" className="text-sm font-display font-bold text-fire hover:text-fire-dark">Call (813) 744-1127 →</a>
        </div>
      </section>

      <TrustBar />

      <DangerSection />

      {/* Services grid */}
      <section className="bg-gray-50 py-20" id="services">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              🛠️ OUR SERVICES
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Professional Dryer Vent Services
            </h2>
            <p className="text-gray-600">Comprehensive solutions for residential and commercial properties across Tampa Bay.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] || HomeIcon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-fire hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-fire to-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <div className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-white" size={26} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-fire text-sm">
                      {s.priceFrom ? `Starting at $${s.priceFrom}` : 'Custom Pricing'}
                    </span>
                    <ArrowRight size={16} className="text-fire group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20" id="process">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              ✅ SIMPLE PROCESS
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy">How It Works — 4 Easy Steps</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-9 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-fire via-gold to-fire opacity-30" />
            {[
              { n: 1, t: 'Book Online or Call', d: 'Fill out our quick form or call us. We\'ll confirm a time that works for you — often same day.' },
              { n: 2, t: 'We Inspect Your Vent', d: 'Our technician inspects your entire vent line with a camera scope and airflow test, identifying blockages, damage, or hazards.' },
              { n: 3, t: 'Professional Cleaning', d: 'Using commercial-grade rotary brush systems and high-CFM vacuums, we clear the full length of your dryer duct — bends, vertical runs, exterior hood.' },
              { n: 4, t: 'Verify & Report', d: 'We verify airflow, provide a before/after report, and give you maintenance recommendations.' },
            ].map((s) => (
              <div key={s.n} className="text-center relative">
                <div className="w-18 h-18 mx-auto mb-5 rounded-full bg-gradient-to-br from-fire to-fire-glow text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-fire/30" style={{ width: 72, height: 72 }}>
                  {s.n}
                </div>
                <h3 className="font-display font-bold text-base text-navy mb-2">{s.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews max={3} />

      {/* Areas served */}
      <section className="bg-gray-50 py-20" id="areas">
        <div className="container-custom">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              📍 SERVICE AREAS
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Serving All of Tampa Bay
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We proudly serve residential and commercial clients across the Tampa Bay metropolitan area.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-navy hover:border-fire hover:text-fire hover:bg-orange-50 transition-all"
              >
                📍 {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={homepageFaqs} />

      <FinalCTA />
    </>
  );
}
