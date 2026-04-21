import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, FileCheck, ClipboardList, Phone, ShieldCheck, MapPin } from 'lucide-react';
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
  title: 'HOA Dryer Vent Cleaning Tampa Bay | Bulk Pricing | Airflow',
  description:
    'HOA bulk dryer vent cleaning across Tampa Bay. Whole-community scheduling, compliance documentation, bulk pricing. Westchase, FishHawk, Lakewood Ranch & more.',
  path: '/hoa-dryer-vent-cleaning',
});

const faqs = [
  {
    q: 'How do bulk discounts work for HOA dryer vent cleaning?',
    a: 'Discounts apply when multiple homes are scheduled in a single block. Five to ten homes booked in one visit receives 10% off list pricing. Eleven to twenty-five homes receives 15% off. Twenty-six or more homes receives 20% off. Full-community contracts (annual or biennial cycles across the whole community) are quoted custom — typically the strongest pricing available because routing efficiency is at its peak. Baseline list pricing remains $79 for the first 10 feet of dryer duct plus $10 per additional foot, with free inspection always included.',
  },
  {
    q: 'Do residents pay individually or does the HOA pay collectively?',
    a: 'Both models work. Some HOAs fund cleaning collectively from reserves or the operating budget as a uniform fire-risk mitigation program — typically the strongest insurance position. Others coordinate the bulk schedule and pricing centrally but invoice residents individually. We can structure billing either way and produce the documentation each model requires (single community invoice plus per-unit certificates, or per-unit invoices with a community summary).',
  },
  {
    q: 'Can you provide certificates of compliance for our insurance carrier?',
    a: 'Yes. Every HOA project ends with a community compliance package — per-unit certificates of service documenting cleaning date, dryer duct scope, and result, plus a community summary report meeting NFPA 211 documentation standards. This package is what most condo and HOA insurance carriers ask for after a dryer-related incident or during annual renewal. The certificate names the HOA so the board controls the records.',
  },
  {
    q: 'How do you schedule cleaning across dozens of homes?',
    a: 'We assign a single point-of-contact to the HOA board or property manager and run master scheduling: confirmed appointment windows by street and address, a printable resident notification template the board can distribute, and on-the-day route optimization so multiple crews work concurrently. Most communities of 50-plus homes complete in 3 to 7 business days depending on access, with after-hours and weekend windows available where the board prefers.',
  },
  {
    q: 'What happens if a unit needs wall ductwork repair during the bulk visit?',
    a: 'If our crew identifies wall ductwork damage during the cleaning visit, we document it with photos, quote the repair to the homeowner directly ($195–$595 depending on scope), and schedule it separately. Bulk discount continues to apply on the cleaning portion. The HOA receives a community summary noting how many units required additional repair so the board has aggregate data for risk modeling.',
  },
];

export default function HOADryerVentPage() {
  const serviceSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'HOA Dryer Vent Cleaning',
    serviceType: 'Dryer Vent Cleaning',
    description:
      'HOA bulk dryer vent cleaning across Tampa Bay — whole-community scheduling, NFPA 211 compliance documentation, tiered bulk pricing for Westchase, FishHawk Ranch, Lakewood Ranch, Wesley Chapel, Tampa Palms, and more.',
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: { '@type': 'State', name: 'Florida' },
    url: `${SITE}/hoa-dryer-vent-cleaning`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '63',
      highPrice: '595',
      priceRange: '$63–$595',
      availability: 'https://schema.org/InStock',
    },
  };

  const communities = [
    { name: 'Westchase', detail: 'Master-planned Westchase community in West Hillsborough — uniform townhome and single-family vent specs.' },
    { name: 'FishHawk Ranch (Valrico)', detail: 'Large master-planned community with multiple village-level HOAs across Valrico.' },
    { name: 'Lakewood Ranch (Bradenton)', detail: 'One of the largest master-planned communities in the U.S. — multi-village HOA structure across Manatee County.' },
    { name: 'Kings Point (Sun City Center)', detail: '55-plus active-adult community with dense vent-cleaning frequency due to high resident-day dryer use.' },
    { name: 'Wesley Chapel master-planned', detail: 'Seven Oaks, Meadow Pointe, Wiregrass Ranch — Pasco County master-planned communities with uniform construction.' },
    { name: 'Tampa Palms (New Tampa)', detail: 'Tampa Palms North and South village HOAs in New Tampa — tree-canopy lint accumulation.' },
    { name: 'Cheval (Lutz)', detail: 'Gated golf community in Lutz with uniform builder-spec vent runs.' },
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
            { name: 'HOA Dryer Vent Cleaning', url: '/hoa-dryer-vent-cleaning' },
          ]),
        ]}
      />

      <Hero
        badge="HOA Bulk Service · Tampa Bay"
        title={
          <>
            HOA <em className="not-italic text-fire-glow">Dryer Vent Cleaning</em> Services in Tampa Bay
          </>
        }
        subtitle="Whole-community scheduling, NFPA 211 compliance documentation, tiered bulk pricing. Locally-owned dryer vent service for Westchase, FishHawk Ranch, Lakewood Ranch, Wesley Chapel, and Tampa Bay HOAs."
      />

      <TrustBar />

      {/* Intro — fire liability framing */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Users size={14} />
            HOA BULK SERVICE
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why HOA Boards Coordinate Community-Wide Dryer Duct Cleaning
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            HOA dryer vent cleaning is a coordinated community-wide program that mitigates collective fire risk across an entire homeowners association — typically organized by the board because individual homeowners frequently defer the work. The U.S. Fire Administration identifies failure to clean as the leading factor in dryer fires, and HOA boards carry fiduciary duty to mitigate known property risks across the community. A documented, uniform cleaning program also strengthens the community&rsquo;s standing with its insurance carrier.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            Master-planned Tampa Bay communities have a structural advantage that makes bulk dryer duct service unusually efficient: the homes were built to uniform specifications, which means vent runs, terminations, and hardware are predictable across the community. A crew that has cleaned ten homes in Westchase or FishHawk Ranch already knows the eleventh. That predictability is what enables 10&ndash;20% bulk pricing while still using full commercial-grade rotary brush equipment on every unit.
          </p>
        </div>
      </section>

      {/* Why HOAs choose bulk */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            Why HOAs Choose Bulk Dryer Vent Service
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: 'Collective fire-risk mitigation',
                desc: 'Cleaning every unit in a community simultaneously eliminates the weak-link problem — a single uncleaned dryer duct can ignite and spread to attached neighbors before the unit owner knows there is a problem.',
              },
              {
                title: 'Insurance compliance documentation',
                desc: 'Most condo, townhome, and HOA-master insurance policies favor — and some require — documented annual or biennial vent maintenance. Our community compliance package is sized for carrier review.',
              },
              {
                title: 'Predictable construction = predictable pricing',
                desc: 'Master-planned communities have uniform vent specs across hundreds or thousands of homes. That uniformity is what enables bulk pricing without compromising the cleaning standard on any individual unit.',
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-display font-bold text-lg text-navy mb-2">{b.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service model */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <ClipboardList size={14} />
            OUR HOA SERVICE MODEL
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            How We Run an HOA Project
          </h2>
          <ul className="space-y-4">
            {[
              {
                title: 'Single point-of-contact for the board',
                desc: 'One Airflow account manager owns the project from kickoff through compliance package delivery. The board gets one phone number, one email, one calendar.',
              },
              {
                title: 'Master scheduling across multiple homes',
                desc: 'Confirmed appointment windows by street and address, a printable resident notification template the board can distribute, and route-optimized crew sequencing.',
              },
              {
                title: 'Individual unit reports + community summary',
                desc: 'Each homeowner receives a per-unit certificate and photos. The board receives a master summary showing every address, completion date, scope, and any flagged issues.',
              },
              {
                title: 'Certificate of compliance for the carrier',
                desc: 'Community-level certificate of compliance documenting NFPA 211 standard adherence, sized for insurance review and renewal.',
              },
              {
                title: 'Free on-site inspection at no charge to the board',
                desc: 'Before any contract, we walk the community at no charge with a board representative or property manager to scope the project, confirm dryer duct routing patterns across home types, and model bulk pricing.',
              },
            ].map((s) => (
              <li key={s.title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-5 border border-gray-200">
                <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="font-display font-bold text-navy mb-1">{s.title}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bulk pricing tiers */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6">
            HOA Bulk Pricing Tiers
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Discounts apply to baseline list pricing of $79 for the first 10 feet of dryer duct plus $10 per additional foot. Free inspection is always included regardless of community size.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-5 py-3 text-sm font-display font-bold">Block Size (homes / visit)</th>
                  <th className="px-5 py-3 text-sm font-display font-bold">Discount Off List</th>
                  <th className="px-5 py-3 text-sm font-display font-bold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700 font-medium">5–10 homes</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire">10% off</td>
                  <td className="px-5 py-4 text-xs text-gray-600 hidden md:table-cell">Single-day or single-block scheduling</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700 font-medium">11–25 homes</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire">15% off</td>
                  <td className="px-5 py-4 text-xs text-gray-600 hidden md:table-cell">Multi-crew, route-optimized</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700 font-medium">26+ homes</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire">20% off</td>
                  <td className="px-5 py-4 text-xs text-gray-600 hidden md:table-cell">Multi-day, dedicated account manager</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700 font-medium">Full-community contract (annual)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire">Custom</td>
                  <td className="px-5 py-4 text-xs text-gray-600 hidden md:table-cell">Strongest pricing — quoted per community</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Wall ductwork repair, when actually required on individual units, remains $195–$595 quoted in advance with photos. See <Link href="/pricing" className="text-fire font-semibold underline">full pricing</Link>.
          </p>
        </div>
      </section>

      {/* Communities we serve */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            HOA Communities We Commonly Serve
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {communities.map((c) => (
              <div key={c.name} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 text-fire text-xs font-display font-bold uppercase tracking-wider mb-2">
                  <MapPin size={12} /> {c.name}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get a quote */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <FileCheck size={14} />
            HOW TO GET A QUOTE
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Three Steps to a Community Proposal
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-5 p-5 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0">1</div>
              <div>
                <div className="font-display font-bold text-lg text-navy mb-1">Call (813) 744-1127 or use the lead form</div>
                <p className="text-sm text-gray-700">A board member or property manager makes initial contact — we set up a 15-minute call to understand the community size, home types, and goals.</p>
              </div>
            </li>
            <li className="flex gap-5 p-5 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0">2</div>
              <div>
                <div className="font-display font-bold text-lg text-navy mb-1">Free on-site walk</div>
                <p className="text-sm text-gray-700">We meet the board representative or property manager on site at no charge, scope a representative sample of dryer duct routing across home types, and confirm bulk pricing model.</p>
              </div>
            </li>
            <li className="flex gap-5 p-5 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0">3</div>
              <div>
                <div className="font-display font-bold text-lg text-navy mb-1">Written proposal to the board</div>
                <p className="text-sm text-gray-700">Master schedule, per-unit pricing, bulk discount tier, compliance documentation package — sized for board review at the next meeting.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
            Related Communities &amp; Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/areas/westchase', title: 'Westchase' },
              { href: '/areas/valrico', title: 'Valrico (FishHawk Ranch)' },
              { href: '/areas/wesley-chapel', title: 'Wesley Chapel' },
              { href: '/areas/sun-city-center', title: 'Sun City Center' },
              { href: '/areas/bradenton', title: 'Bradenton (Lakewood Ranch)' },
              { href: '/areas/new-tampa', title: 'New Tampa (Tampa Palms)' },
              { href: '/areas/lutz', title: 'Lutz (Cheval)' },
              { href: '/services/condo-dryer-vent-cleaning', title: 'Condo & High-Rise' },
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

      <FAQ faqs={faqs} title="HOA Dryer Vent Cleaning — FAQs" />

      {/* Counter-positioning callout */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-3xl">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              <ShieldCheck size={14} /> LOCALLY OWNED — NOT A FRANCHISE
            </div>
            <h3 className="font-display font-extrabold text-2xl text-navy mb-4">
              Your Board Works With the Same Team Year Over Year
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              No corporate routing center taking the call, no franchise turnover changing the contact every renewal. Airflow Dryer Vent Cleaning is locally owned in Tampa Bay — direct line to the owner, same team year over year.
            </p>
            <a href="tel:+18137441127" className="btn-primary inline-flex items-center gap-2">
              <Phone size={18} /> (813) 744-1127
            </a>
          </div>
        </div>
      </section>

      {/* Master-planned cities — tag-filtered internal linking */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-3">
            Master-Planned Communities We Serve
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            Tampa Bay HOA communities where we regularly run bulk-scheduled dryer vent service.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {getTaggedAreas('master-planned').map((c) => (
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
        headline={'HOA Dryer Vent Service.\nBulk Pricing. Compliance Documentation.'}
        sub="From Westchase to Lakewood Ranch — Tampa Bay's locally-owned HOA dryer duct specialists. Call (813) 744-1127."
      />
    </>
  );
}
