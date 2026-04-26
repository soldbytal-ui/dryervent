import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin, Phone, Wind, ShieldCheck, Clock, Camera, Search } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { localBusinessSchema, faqSchema, breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { getServiceBySlug } from '@/lib/services';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';
const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';

export const metadata = buildMetadata({
  title: 'Air Duct Cleaning Tampa | $89/Opening + Free Inspection | Airflow',
  description:
    'Professional air duct cleaning across Tampa Bay. NADCA-aligned process, $89 per opening, free assessment. Locally owned. Call (813) 744-1127.',
  path: '/services/air-duct-cleaning',
});

const FAQS = getServiceBySlug('air-duct-cleaning')?.faqs ?? [];

const TYPICAL_HOMES = [
  { label: 'Small condo / townhome (1–2 BR)', openings: '6–8 openings', total: '$534–$712' },
  { label: 'Average single-family (3 BR)', openings: '10–12 openings', total: '$890–$1,068' },
  { label: 'Larger home (4+ BR)', openings: '15–20 openings', total: '$1,335–$1,780' },
];

const INCLUDES = [
  'Free on-site assessment with opening count + photos',
  'HEPA-filtered negative-air containment setup',
  'Supply duct cleaning at every opening (mechanical agitation)',
  'Return duct cleaning at every return opening',
  'Main trunk line cleaning',
  'Air handler interior cleaning (coils, blower)',
  'Register and grille removal + wash',
  'Before/after photos at every opening',
  'Final airflow measurement + written assessment',
];

const PROCESS = [
  { title: 'Free Assessment', desc: 'Technician arrives, counts supply + return openings, scopes a sample run, photographs current dust load, and provides a per-opening quote on the spot.' },
  { title: 'Containment Setup', desc: 'HEPA-filtered negative-air machine connects to the main trunk; floors and surrounding areas protected before any work begins.' },
  { title: 'Mechanical Agitation', desc: 'Rotary brush system loosens compacted dust at every opening while the negative-air machine captures the debris.' },
  { title: 'Air Handler Cleaning', desc: 'Interior coils and blower assembly cleaned; visible mold or moisture issues photographed and flagged.' },
  { title: 'Reassembly + Verification', desc: 'Registers and grilles reinstalled, airflow measured at each opening, before/after photos delivered with written assessment.' },
];

const WHEN_TO_SCHEDULE = [
  'Post-renovation or new construction (drywall dust contamination)',
  'Recent home purchase (unknown history of previous owner\'s ducts)',
  'Allergies or asthma in household',
  'Visible dust streaks above supply vents',
  'Pet hair accumulation in returns',
  'After mold remediation or water damage events',
  'Musty smell when AC turns on',
  'It has been 5+ years since last professional cleaning',
];

const serviceSchemaBlock = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/services/air-duct-cleaning#service`,
  serviceType: 'Air Duct Cleaning',
  name: 'Air Duct Cleaning Tampa Bay',
  description:
    'Professional air duct cleaning across Tampa Bay following NADCA-aligned protocols. Per-opening pricing, free on-site assessment, HEPA-filtered negative-air containment.',
  provider: { '@id': `${SITE}/#localbusiness` },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 27.9506, longitude: -82.4572 },
    geoRadius: '80467',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '89',
    highPrice: '1780',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '89',
      priceCurrency: 'USD',
      unitText: 'per opening',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: '1',
        unitCode: 'C62',
      },
    },
  },
};

export default function AirDuctCleaningPage() {
  return (
    <>
      <SchemaMarkup
        data={[
          webPageSchema({
            path: '/services/air-duct-cleaning',
            name: 'Air Duct Cleaning in Tampa Bay',
            description:
              'Professional air duct cleaning across Tampa Bay. $89 per opening. NADCA-aligned process. Free on-site assessment.',
          }),
          localBusinessSchema(),
          serviceSchemaBlock,
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services/residential-dryer-vent-cleaning' },
            { name: 'Air Duct Cleaning', url: '/services/air-duct-cleaning' },
          ]),
        ]}
      />

      <Hero
        badge="Air Duct Cleaning · Tampa Bay · $89 per Opening"
        title={
          <>
            Air Duct Cleaning in <em className="not-italic text-fire-glow">Tampa Bay</em> — $89 Per Opening · Free Inspection
          </>
        }
        subtitle="Same trusted Tampa Bay team. Now cleaning your home's HVAC system end-to-end. NADCA-aligned process, HEPA-filtered negative-air containment, transparent per-opening pricing. Locally owned — not a franchise."
        defaultService="cleaning"
      />

      <TrustBar />

      {/* Hero / opening positioning */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Wind size={14} /> WHOLE-HOME HVAC DUCT CLEANING
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            From Dryer Vent Specialists to Whole-Home Airflow Experts
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Most franchise air duct services charge a flat $300–$700 with no clarity on what you&rsquo;re paying for. We charge $89 per opening — you see exactly what your home needs and what each opening costs to clean. Every job starts with a free on-site assessment so the price you see is the price you pay.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Air duct cleaning addresses your home&rsquo;s entire HVAC system: supply ducts, return ducts, main trunk lines, and the air handler interior. It&rsquo;s a different scope than dryer vent cleaning (which addresses only the single exhaust line from your dryer). Many Tampa Bay homes need both eventually — they&rsquo;re independent services with independent timing.
          </p>
        </div>
      </section>

      {/* Why air ducts need cleaning in Tampa Bay */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why Tampa Bay Air Ducts Need More Frequent Cleaning
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            NADCA recommends professional air duct cleaning every 3–5 years for typical households. Tampa Bay homes lean toward the 3-year end of that range because Florida pushes harder on every variable that drives HVAC duct accumulation:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-3 text-base text-gray-700"><CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} /><span><strong>Humidity 70–90%</strong> for most of the year creates condensation inside duct walls; mold and mildew growth becomes a real concern in homes with active leaks.</span></li>
            <li className="flex items-start gap-3 text-base text-gray-700"><CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} /><span><strong>11-month AC season</strong> means continuous airflow through the duct system; dust circulates and re-deposits constantly instead of resting between heating/cooling transitions.</span></li>
            <li className="flex items-start gap-3 text-base text-gray-700"><CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} /><span><strong>High pet density</strong> across Tampa Bay (one of the highest in the country) puts pet hair and dander into the return air path year-round.</span></li>
            <li className="flex items-start gap-3 text-base text-gray-700"><CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} /><span><strong>Coastal sand and pollen</strong> infiltrate through windows, doors, and even tight envelopes; the air handler filter catches some, but fine particulate makes it into the duct walls.</span></li>
            <li className="flex items-start gap-3 text-base text-gray-700"><CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} /><span><strong>New construction dust</strong> from Tampa Bay&rsquo;s active build-out (Riverview, Apollo Beach, Odessa, Lakewood Ranch) leaves drywall fines coating supply ducts for years.</span></li>
          </ul>
          <p className="text-base text-gray-600 leading-relaxed">
            The health and efficiency angles compound. Clogged HVAC ducts force the blower to work harder (higher electric bills, shorter compressor lifespan) and recirculate the dust that&rsquo;s already in the system through every cycle (worse indoor air quality for allergies and asthma).
          </p>
        </div>
      </section>

      {/* Transparent per-opening pricing */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            TRANSPARENT PRICING
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            $89 Per Opening — The Honest Math
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            Air duct cleaning is priced per opening because every home is different. An &ldquo;opening&rdquo; is each supply vent (the ones that blow conditioned air into rooms) plus each return vent (the larger grilles that pull air back to the air handler). The total cost scales with the actual number of openings in your home — not a flat fee that overcharges small condos and undercharges large homes.
          </p>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mb-6">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-5 py-3 text-sm font-display font-bold">Home size</th>
                  <th className="px-5 py-3 text-sm font-display font-bold">Typical openings</th>
                  <th className="px-5 py-3 text-sm font-display font-bold text-right">Total range</th>
                </tr>
              </thead>
              <tbody>
                {TYPICAL_HOMES.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 text-sm text-gray-700">{row.label}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{row.openings}</td>
                    <td className="px-5 py-3 text-sm font-display font-extrabold text-fire text-right whitespace-nowrap">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Why we publish per-opening pricing instead of a flat fee: every home actually has a different number of vents. A flat $499 fee either overcharges small condos or undercharges large homes. Per-opening is fairer for everyone — and the free assessment counts your home&rsquo;s actual openings before any quote is written.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-8">
            What&rsquo;s Included in Every Air Duct Cleaning
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {INCLUDES.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-200">
                <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={20} />
                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NADCA-aligned process */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <ShieldCheck size={14} /> NADCA-ALIGNED PROCESS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Following the National Air Duct Cleaners Association Methodology
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            We follow NADCA&rsquo;s published cleaning protocols — this isn&rsquo;t a 30-minute drive-by. Full HVAC duct cleaning takes 3–5 hours for an average Tampa Bay home. (We follow NADCA-recommended methodology; this is not a claim of NADCA certification.)
          </p>
          <div className="space-y-4">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="flex gap-5 p-5 bg-gray-50 rounded-xl border border-gray-200">
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

      {/* When homeowners need this */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            When Tampa Bay Homeowners Schedule Air Duct Cleaning
          </h2>
          <ul className="space-y-2.5">
            {WHEN_TO_SCHEDULE.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-gray-700">
                <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Schedule both services together */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-3xl">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              SAVE $50 — DRYER VENT + AIR DUCT
            </div>
            <h3 className="font-display font-extrabold text-2xl text-navy mb-4">
              Schedule Dryer Vent Cleaning + Air Duct Cleaning Together
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              Many Tampa Bay homeowners schedule both services in the same visit — same team, same equipment, one appointment. Airflow takes <strong>$50 off</strong> when you book{' '}
              <Link href="/services/residential-dryer-vent-cleaning" className="text-fire font-semibold hover:underline">dryer vent cleaning</Link>{' '}
              and air duct cleaning together. Ask when you book your free inspection.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Both services start with a free on-site assessment, both are quoted transparently before any work begins, and both are performed by the same locally-owned Airflow crew.
            </p>
          </div>
        </div>
      </section>

      {/* Free assessment */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Camera size={14} /> FREE ASSESSMENT
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Free Air Duct Assessment in Tampa Bay
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Same free-assessment model as our dryer vent inspection. Technician arrives, scopes a sample supply trunk run, spot-checks the returns, counts your home&rsquo;s actual openings, and writes a per-opening quote based on real scope — not a phone-quote guess. No trip fee, no diagnostic fee, no deposit, no pressure.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-fire hover:bg-fire-dark text-white font-display font-bold px-7 py-4 rounded-xl shadow-lg shadow-fire/30 transition-all"
          >
            <Phone size={18} /> Book Free Assessment · {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <FAQ faqs={FAQS} title="Air Duct Cleaning — Frequently Asked Questions" />

      {/* Related services + areas */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
            Related Services &amp; Service Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-base text-navy mb-4 flex items-center gap-2">
                <Wind size={16} className="text-fire" /> Related Services
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/services/dryer-vent-cleaning" className="text-sm text-gray-700 hover:text-fire transition-colors">Dryer Vent Cleaning</Link></li>
                <li><Link href="/services/dryer-vent-inspection" className="text-sm text-gray-700 hover:text-fire transition-colors">Free Dryer Vent Inspection</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-700 hover:text-fire transition-colors">Transparent Per-Foot Pricing</Link></li>
                <li><Link href="/local-vs-franchise-dryer-vent-cleaning" className="text-sm text-gray-700 hover:text-fire transition-colors">Local vs Franchise — Why It Matters</Link></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-base text-navy mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-fire" /> Top Tampa Bay Markets
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/areas/wesley-chapel" className="text-sm text-gray-700 hover:text-fire transition-colors">Wesley Chapel</Link></li>
                <li><Link href="/areas/south-tampa" className="text-sm text-gray-700 hover:text-fire transition-colors">South Tampa</Link></li>
                <li><Link href="/areas/westchase" className="text-sm text-gray-700 hover:text-fire transition-colors">Westchase</Link></li>
                <li><Link href="/areas/new-tampa" className="text-sm text-gray-700 hover:text-fire transition-colors">New Tampa</Link></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-base text-navy mb-4 flex items-center gap-2">
                <Search size={16} className="text-fire" /> Get Started
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/services/dryer-vent-inspection" className="text-sm text-gray-700 hover:text-fire transition-colors">Book a Free Inspection</Link></li>
                <li><Link href="/areas" className="text-sm text-gray-700 hover:text-fire transition-colors">Service Areas Across Tampa Bay</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-700 hover:text-fire transition-colors">Pricing Guide</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-700 hover:text-fire transition-colors">Contact / Lead Form</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-1">
            <Clock size={12} /> Same-day air duct assessments often available across Hillsborough and Pinellas counties.
          </p>
        </div>
      </section>

      <FinalCTA
        headline={'Free Air Duct Assessment in Tampa Bay.\n$89 Per Opening — No Surprises.'}
        sub="Same trusted local team. NADCA-aligned process. Transparent per-opening pricing. Call (813) 744-1127 or book online."
      />
    </>
  );
}
