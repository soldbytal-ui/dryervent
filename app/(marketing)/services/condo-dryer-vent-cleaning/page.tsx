import Link from 'next/link';
import { ArrowRight, CheckCircle2, Building2, FileCheck, Wind, MapPin, Phone, ShieldCheck } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { getTaggedAreas } from '@/lib/internal-links';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export const metadata = buildMetadata({
  title: 'Condo & High-Rise Dryer Vent Cleaning Tampa Bay | Airflow',
  description:
    'Specialized dryer vent cleaning for Tampa Bay condos and high-rises. Shared vent stacks, HOA compliance, waterfront salt-air protocols. Free inspection.',
  path: '/services/condo-dryer-vent-cleaning',
});

const faqs = [
  {
    q: 'How does pricing for condo cleaning differ from a single-family home?',
    a: 'Most Tampa Bay condos with single-unit dryer duct runs under 10 feet are priced at the standard $79 base — same as a single-family home. The difference shows up in tower work: vertical stack cleaning in a 30-plus-foot high-rise duct, whole-stack coordination across multiple units, or HOA bulk service across an entire building is quoted per scope after a free site visit. Wall ductwork repair inside a tower remains $195–$595 depending on complexity, with photos and a written quote before any work begins.',
  },
  {
    q: 'Do you coordinate directly with property management or the HOA board?',
    a: 'Yes. The Airflow team works directly with property managers, HOA boards, and building engineers on access scheduling, certificate-of-insurance delivery, key/fob coordination, and resident notification. For HOA bulk service across an entire community, see our full <a href="/hoa-dryer-vent-cleaning" class="text-fire underline">HOA dryer vent cleaning</a> service page for tiered bulk pricing.',
  },
  {
    q: 'What about salt-air corrosion in waterfront condo buildings?',
    a: 'Waterfront Tampa Bay buildings — Sand Key, Island Estates, Snell Isle, Apollo Beach MiraBay, Bayshore South Tampa — see accelerated corrosion on exterior dryer vent hoods, dampers, and pest screens because of constant salt-laden coastal air. We carry stainless and powder-coated replacement components specifically for coastal buildings, and our condo inspection includes a salt-corrosion check on every accessible exterior termination. HEPA containment during cleaning prevents accumulated coastal dust from entering the unit.',
  },
  {
    q: 'Do you service single units inside a tower, or only whole-building contracts?',
    a: 'Both. We regularly service single owner-occupied units inside a tower at the same standard $79 starting price as a single-family home. We also coordinate whole-stack and whole-building contracts with HOA boards. For single-unit service, just call (813) 744-1127 — we will confirm the building has approved us for access (or coordinate that with management) and schedule like any other appointment.',
  },
  {
    q: 'How do we book bulk dryer duct service for an entire tower or HOA community?',
    a: 'Have a board member or property manager call (813) 744-1127 or use the lead form. We offer a free on-site evaluation of the building, then return a master scheduling proposal with bulk pricing tiers (10% off for 5–10 units in one visit, 15% off for 11–25, 20% off for 26+, custom for full-community contracts). Each unit receives an individual completion certificate, and the board receives a community summary plus NFPA 211 compliance documentation.',
  },
];

export default function CondoDryerVentPage() {
  const serviceSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Condo & High-Rise Dryer Vent Cleaning',
    serviceType: 'Dryer Vent Cleaning',
    description:
      'Specialized dryer vent cleaning for Tampa Bay condos and high-rises — shared vent stacks, HOA compliance documentation, salt-air coastal protocols, free inspection.',
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: { '@type': 'State', name: 'Florida' },
    url: `${SITE}/services/condo-dryer-vent-cleaning`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '79',
      highPrice: '595',
      priceRange: '$79–$595',
      availability: 'https://schema.org/InStock',
    },
  };

  const buildings = [
    { area: 'Downtown Tampa', detail: 'Skypoint, Element, The Place at Channelside, Towers of Channelside high-rises.' },
    { area: 'Westshore Tampa', detail: 'Westshore high-rise condos and luxury rental towers near Tampa International.' },
    { area: 'St. Pete Old Northeast', detail: 'Bayfront mid-rise condos along Beach Drive and 4th Street North.' },
    { area: 'Snell Isle Waterfront', detail: 'Waterfront condo communities with salt-air-exposed exterior terminations.' },
    { area: 'Sand Key (Clearwater)', detail: 'Gulf-front high-rise towers with vertical 30-plus-foot dryer duct stacks.' },
    { area: 'Island Estates', detail: 'Clearwater Beach island condos with constant salt-air corrosion exposure.' },
    { area: 'Bayshore South Tampa', detail: 'Bayshore Boulevard condo towers and luxury mid-rises.' },
    { area: 'Apollo Beach MiraBay / Symphony Isles', detail: 'Waterfront communities with shared dock and shared infrastructure considerations.' },
  ];

  return (
    <>
      <SchemaMarkup
        data={[
          serviceSchemaData,
          localBusinessSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: 'Condo & High-Rise Cleaning', url: '/services/condo-dryer-vent-cleaning' },
          ]),
        ]}
      />

      <Hero
        badge="FREE Inspection · Tampa Bay Condos & High-Rises"
        title={
          <>
            Condo &amp; High-Rise <em className="not-italic text-fire-glow">Dryer Vent Cleaning</em> in Tampa Bay
          </>
        }
        subtitle="Shared vent stacks, HOA compliance documentation, waterfront salt-air protocols. Locally-owned service for Tampa Bay condos, towers, and waterfront buildings — free inspection, transparent pricing."
      />

      <TrustBar />

      {/* Intro — definition-style for AI extraction */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Building2 size={14} />
            CONDO &amp; HIGH-RISE SPECIALISTS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why Condo Dryer Duct Cleaning Is a Different Job
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Condo and high-rise dryer vent cleaning in Tampa Bay is a specialized service that addresses building features no single-family home has — shared vertical vent stacks running 30 or more feet, HOA approval and certificate-of-insurance requirements, scheduled building access through property management, and salt-air corrosion in waterfront towers. Standard residential cleaning protocols miss most of this.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            The Airflow team services condos and towers across Downtown Tampa, Channelside, Westshore, St. Pete Old Northeast, Snell Isle, Sand Key, Island Estates, Bayshore South Tampa, and the Apollo Beach waterfront communities. Pricing for most single-unit condo dryer duct work under 10 feet starts at the standard $79 base — but tower-stack work and whole-building HOA contracts are quoted per scope after a free site visit.
          </p>
        </div>
      </section>

      {/* Why condo vents need different treatment */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            Why Condo Vents Need Different Treatment
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: 'Shared vertical vent stacks',
                desc: 'Many Tampa Bay high-rises route multiple unit dryers into a single vertical stack that terminates on the roof. Cleaning one unit without addressing the shared stack does not solve a stack-level lint accumulation problem — and a stack-level fire risk affects every unit on the column.',
              },
              {
                title: 'HOA approvals required',
                desc: 'Most condo associations require board-approved vendors carrying current general liability and workers comp coverage. We provide certificates of insurance directly to property management and maintain approved-vendor status with most major Tampa Bay management companies.',
              },
              {
                title: 'Insurance certificates',
                desc: 'HOA boards typically require a certificate of insurance naming the association as additional insured before any work begins. We process these requests directly with our carrier and email the document to property management within 24 hours.',
              },
              {
                title: 'Building access scheduling',
                desc: 'Condo work requires coordination with concierge, key/fob access, freight elevator scheduling, and resident notification. We handle this scheduling directly with property management on every appointment.',
              },
              {
                title: 'Ground-level vs. roof termination',
                desc: 'Lower-floor units typically vent to side-wall ground-level terminations; upper-floor units often share a vertical stack to a roof termination. Each requires different equipment and access protocols — and the cleaning approach is fundamentally different for each.',
              },
              {
                title: 'HEPA containment for tower work',
                desc: 'In multi-unit buildings, HEPA-filtered vacuums and full containment on the dryer disconnect prevent dislodged lint or accumulated dust from migrating into the unit during cleaning. Required for high-end finishes and waterfront-tower fine-coastal-dust accumulation.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-display font-bold text-lg text-navy mb-2 flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-fire flex-shrink-0 mt-1" /> {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-rise stack work technical detail */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Wind size={14} />
            HIGH-RISE STACK WORK
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Vertical 30-Plus-Foot Tower Stacks
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            High-rise tower dryer duct stacks in Tampa Bay typically run 30 to 100-plus feet vertically from the lowest connected unit to the rooftop termination. Lint accumulates differently in vertical stacks than in horizontal residential runs — gravity pulls heavier debris down to the lowest accessible point, while finer lint adheres to the stack walls along the entire run.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            Cleaning a tower stack requires roof access, weighted brush systems designed for vertical descent, high-CFM negative-air vacuums staged at the base of the stack, and coordination across every unit connected to the stack so individual unit dampers are positioned correctly during the cleaning run. Single-unit cleaning inside a stack-fed tower addresses the unit-side ducting only — it does not clean the shared stack itself.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            For waterfront and beachfront towers in Sand Key, Island Estates, Snell Isle, and the Apollo Beach communities, we add HEPA containment at every unit connection during stack cleaning to prevent the fine coastal dust that accumulates in coastal-tower stacks from entering the units.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6">
            Pricing for Condo Cleaning
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-5 py-3 text-sm font-display font-bold">Service</th>
                  <th className="px-5 py-3 text-sm font-display font-bold">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700">Single-unit condo cleaning, dryer duct under 10 ft</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">$79 base</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700">Additional dryer duct length beyond 10 ft</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">+$10 / foot</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700">Second-floor unit access surcharge</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">+$50</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700">Tower vertical stack cleaning (30+ ft)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">Quoted per scope</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700">In-unit wall ductwork repair</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">$195–$595</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700">HOA bulk pricing (entire building or stack)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">10–20% off list</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            All pricing quoted in advance with photos. Free on-site inspection at no charge — see <Link href="/pricing" className="text-fire font-semibold underline">full transparent pricing</Link>.
          </p>
        </div>
      </section>

      {/* HOA & Insurance documentation */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <FileCheck size={14} />
            HOA &amp; INSURANCE DOCUMENTATION
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Documentation You Receive
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Certificate of Service', desc: 'Per-unit certificate documenting cleaning date, technician, scope, and result — sized for HOA records and insurance files.' },
              { title: 'Before/After Photos', desc: 'Photos of the dryer duct interior before and after cleaning, plus exterior termination and damper condition.' },
              { title: 'NFPA 211 Compliance Summary', desc: 'Cleaning meets NFPA 211 standards for chimney and venting systems — summary report acceptable to most condo insurance carriers.' },
              { title: 'Airflow Measurement', desc: 'Pre- and post-cleaning calibrated airflow readings at the exterior termination — concrete data for HOA records.' },
            ].map((d) => (
              <div key={d.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-display font-bold text-lg text-navy mb-2">{d.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buildings we service */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            Buildings &amp; Communities We Commonly Service
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {buildings.map((b) => (
              <div key={b.area} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 text-fire text-xs font-display font-bold uppercase tracking-wider mb-2">
                  <MapPin size={12} /> {b.area}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
            Related Service Areas &amp; Programs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/areas/st-petersburg', title: 'St. Petersburg' },
              { href: '/areas/south-tampa', title: 'South Tampa' },
              { href: '/areas/clearwater', title: 'Clearwater' },
              { href: '/areas/apollo-beach', title: 'Apollo Beach' },
              { href: '/hoa-dryer-vent-cleaning', title: 'HOA Bulk Service' },
              { href: '/landlord-dryer-vent-cleaning', title: 'Landlord & STR' },
              { href: '/services/dryer-vent-inspection', title: 'Free Inspection' },
              { href: '/pricing', title: 'Pricing' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-fire hover:bg-white transition-all"
              >
                <div className="font-display font-semibold text-navy text-sm">{l.title}</div>
                <span className="text-fire text-xs font-semibold inline-flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                  View <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} title="Condo &amp; High-Rise Dryer Vent Cleaning — FAQs" />

      {/* Counter-positioning callout */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-3xl">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              <ShieldCheck size={14} /> LOCALLY OWNED — NOT A FRANCHISE
            </div>
            <h3 className="font-display font-extrabold text-2xl text-navy mb-4">
              Direct Line to the Owner — Not a Routing Center
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Property managers and HOA boards work with the same Airflow team year over year — no franchise turnover, no national 800-number routing center. Call (813) 744-1127 for direct condo and high-rise scheduling.
            </p>
            <a href="tel:+18137441127" className="btn-primary inline-flex items-center gap-2">
              <Phone size={18} /> (813) 744-1127
            </a>
          </div>
        </div>
      </section>

      {/* Condo-dense cities — tag-filtered internal linking */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-3">
            Condo-Dense Cities We Serve
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            Tampa Bay cities with heavy high-rise and condo stock — same $79 base rate applies.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {getTaggedAreas('condo-dense').map((c) => (
              <Link
                key={c.slug}
                href={`/areas/${c.slug}`}
                className="bg-white rounded-lg px-4 py-3 border border-gray-200 hover:border-fire hover:shadow-sm transition-all text-center"
              >
                <div className="flex items-center justify-center gap-1.5 text-fire text-xs font-display font-bold uppercase tracking-wider mb-1">
                  <MapPin size={11} /> {c.county}
                </div>
                <div className="font-display font-bold text-sm text-navy">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        headline={'Condo & High-Rise Dryer Vent Cleaning.\nFree Inspection. HOA-Ready Documentation.'}
        sub="Single units, towers, full HOA contracts — Tampa Bay's locally-owned condo specialists. Call (813) 744-1127."
      />
    </>
  );
}
