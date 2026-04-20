import Link from 'next/link';
import { ArrowRight, CheckCircle2, Home, FileCheck, Camera, ClipboardList, Phone, ShieldCheck, MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export const metadata = buildMetadata({
  title: 'Landlord & Property Manager Dryer Vent Cleaning Tampa Bay',
  description:
    'Property management dryer vent cleaning across Tampa Bay. Multi-unit pricing, turnover service, Airbnb/STR compliance documentation. Free inspection.',
  path: '/landlord-dryer-vent-cleaning',
});

const faqs = [
  {
    q: 'How do you handle tenant-occupied units versus vacant units?',
    a: 'For occupied units, we coordinate appointment windows directly with the tenant after the landlord provides notice per Florida statute. We arrive on time, work quickly (most jobs finish in 45 to 75 minutes), and leave the unit cleaner than when we arrived. For vacant units between tenants, we can often schedule same-day or next-day — particularly useful in turnover windows where the landlord wants the dryer duct cleaned before the next tenant or guest arrives. Both scenarios are priced at the standard $79 baseline plus $10 per additional foot.',
  },
  {
    q: 'What documentation do I receive after each cleaning?',
    a: 'Every landlord visit ends with a per-unit certificate of service documenting the property address, cleaning date, technician, dryer duct scope, airflow measurement, and any flagged issues. You also receive before/after photos of the interior dryer duct and exterior termination. For vacation rental and Airbnb operators, this package is what most insurance carriers and platform-liability policies ask for after a dryer-related incident. Documentation is delivered by email within 24 hours.',
  },
  {
    q: 'Is there multi-property pricing?',
    a: 'Yes. Five or more units cleaned in a single visit receives 10% off list pricing. Portfolio landlords with 10-plus units across Tampa Bay can structure annual or biannual maintenance contracts with stronger pricing quoted per portfolio. Baseline remains $79 for the first 10 feet of dryer duct plus $10 per additional foot. Wall ductwork repair, when actually needed, is $195–$595 quoted in advance with photos.',
  },
  {
    q: 'How does vacation rental and Airbnb compliance documentation work?',
    a: 'Short-term rental operators in Clearwater Beach, Siesta Key, Sand Key, Island Estates, and downtown Tampa face increasing insurance carrier and platform-liability scrutiny around dryer fire risk. Our STR package includes NFPA 211 compliance documentation, calibrated airflow measurement, and photo records per cleaning cycle — sized for both carrier review and platform dispute response. Many serious STR operators schedule cleaning every 6 months due to guest-volume dryer use.',
  },
  {
    q: 'How fast can you turn around a between-bookings cleaning?',
    a: 'Fast is the entire point. Same-day appointments are standard across Hillsborough and Pinellas for between-bookings turnover service — particularly useful when check-out and check-in are less than 24 hours apart. Call (813) 744-1127 in the morning and we can usually have a technician on site the same afternoon. For Airbnb and VRBO operators with back-to-back bookings, we also hold recurring standing appointments that lock in pricing and response windows.',
  },
];

export default function LandlordDryerVentPage() {
  const serviceSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Landlord & Property Manager Dryer Vent Cleaning',
    serviceType: 'Dryer Vent Cleaning',
    description:
      'Dryer vent cleaning for Tampa Bay landlords, property managers, and short-term rental operators — multi-unit pricing, turnover service, Airbnb/STR compliance documentation, free inspection.',
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: { '@type': 'State', name: 'Florida' },
    url: `${SITE}/landlord-dryer-vent-cleaning`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '71',
      highPrice: '595',
      priceRange: '$71–$595',
      availability: 'https://schema.org/InStock',
    },
  };

  const markets = [
    { name: 'Clearwater Beach + Sand Key + Island Estates', detail: 'Gulf-front vacation rental inventory — high dryer volume, salt-air corrosion on exterior hardware, guest-turnover cleaning cycle.' },
    { name: 'Siesta Key + Longboat Key', detail: 'Snowbird seasonal rentals and vacation homes in Sarasota County — quarterly maintenance cycle works well.' },
    { name: 'Downtown Tampa rental towers', detail: 'Channelside, Element, Skypoint, Westshore — unit-by-unit turnover work coordinated with property management.' },
    { name: 'St. Petersburg tourism rentals', detail: 'Downtown St. Pete, Old Northeast, Snell Isle short-term rentals with high guest volume.' },
    { name: 'Bradenton + Lakewood Ranch portfolios', detail: 'Single-family rental portfolios across Manatee County — strong fit for annual maintenance contracts.' },
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
            { name: 'Landlord Dryer Vent Cleaning', url: '/landlord-dryer-vent-cleaning' },
          ]),
        ]}
      />

      <Hero
        badge="Landlords · Property Managers · STR Operators"
        title={
          <>
            Landlord &amp; Property Manager <em className="not-italic text-fire-glow">Dryer Vent Cleaning</em> Services
          </>
        }
        subtitle="Multi-unit pricing, turnover service, Airbnb and STR compliance documentation. Locally-owned Tampa Bay dryer duct service for rental portfolios and vacation rentals — free inspection."
      />

      <TrustBar />

      {/* Intro — rental liability framing */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Home size={14} />
            LANDLORD &amp; STR SERVICE
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why Rental Property Dryer Duct Work Is Different
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Landlord dryer vent cleaning is a documented maintenance program that mitigates the dryer-fire liability exposure unique to rental properties — where the owner carries legal responsibility for safe operation but does not control how many loads a tenant or vacation guest runs per day. According to the U.S. Fire Administration, failure to clean is the leading factor in dryer fires, and rental carrier policies increasingly require documented annual cleaning as a condition of coverage.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            Short-term rental operators face additional layers — platform liability policies (Airbnb, VRBO), guest-safety claims, and rental-insurance carrier requirements that expect documented cleaning every 6 months in high-volume vacation rentals. The documentation matters as much as the cleaning itself, because in a liability dispute the written record is what protects the property owner.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            The Airflow team runs a dedicated landlord program across Tampa Bay — multi-unit pricing, tenant-notice coordination, STR turnover service, and a documentation package sized for carriers and platforms.
          </p>
        </div>
      </section>

      {/* Why landlords need different service */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            Why Landlords Need Different Service
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Between-tenant turnover cleaning', desc: 'Cleaning the dryer duct during tenant turnover is the highest-leverage moment — unit is vacant, access is easy, documentation anchors the move-in condition record.' },
              { title: 'Vacation rental certification', desc: 'Clearwater Beach, Siesta Key, Sarasota, and Gulf-front STR operators increasingly need documented cleaning on a 6-month cycle for platform and carrier requirements.' },
              { title: 'STR compliance documentation', desc: 'Per-cleaning certificate of service sized for Airbnb/VRBO dispute response, platform-liability policies, and guest-safety claim records.' },
              { title: 'Multi-unit pricing structure', desc: 'Five or more units in a single visit: 10% off list. Portfolio landlords with 10-plus units: annual maintenance contracts with stronger pricing.' },
              { title: 'Flexible scheduling', desc: 'Occupied-unit appointments scheduled with tenant; vacant-unit work available same-day or next-day; STR turnover windows coordinated around bookings.' },
              { title: 'Portfolio-level data', desc: 'Landlords with multiple properties receive aggregate lint-accumulation data across the portfolio — useful for risk modeling and capital-expense planning.' },
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

      {/* Vacation rental / Airbnb compliance */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Camera size={14} />
            VACATION RENTAL &amp; AIRBNB COMPLIANCE
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            STR Documentation Package
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Short-term rental operators across Tampa Bay — especially in Clearwater Beach, Sand Key, Island Estates, Siesta Key, and downtown Tampa — face a distinct compliance picture. Insurance carriers, platform-liability policies, and guest-safety dispute processes all favor documented maintenance. Our STR cleaning package is sized for that picture:
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Insurance carrier requirements', desc: 'NFPA 211 compliance summary sized for carrier underwriting review and renewal conversations.' },
              { title: 'NFPA 211 documentation', desc: 'Certificate of service documenting cleaning date, dryer duct scope, rotary brush methodology, and airflow verification.' },
              { title: 'Photo + airflow records', desc: 'Before/after interior dryer duct photos plus calibrated airflow measurements — concrete records for guest-safety dispute response.' },
              { title: 'Certificate per booking cycle', desc: 'High-volume STR operators can schedule cleaning every 6 months with standing appointment windows and per-cycle documentation.' },
            ].map((d) => (
              <div key={d.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-display font-bold text-lg text-navy mb-2">{d.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6">
            Pricing for Landlords &amp; Property Managers
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
                  <td className="px-5 py-4 text-sm text-gray-700">Single-unit cleaning (first 10 ft of dryer duct)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">$79 base</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700">Additional dryer duct length beyond 10 ft</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">+$10 / foot</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700">5+ units in one visit (multi-unit discount)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">10% off</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700">Turnover-only fast service (between bookings)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">Same-day avail.</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-5 py-4 text-sm text-gray-700">Annual maintenance contract (10+ units portfolio)</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">Custom</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-5 py-4 text-sm text-gray-700">Wall ductwork repair</td>
                  <td className="px-5 py-4 text-sm font-display font-extrabold text-fire whitespace-nowrap">$195–$595</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Free inspection always included. See <Link href="/pricing" className="text-fire font-semibold underline">full transparent pricing</Link>.
          </p>
        </div>
      </section>

      {/* Documentation section */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <FileCheck size={14} />
            DOCUMENTATION YOU GET
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Every Cleaning, Every Unit
          </h2>
          <ul className="space-y-3">
            {[
              'Per-unit certificate of service (property address, cleaning date, technician, dryer duct scope)',
              'Before/after photos of interior dryer duct and exterior termination',
              'Calibrated airflow measurements (pre- and post-cleaning)',
              'Lint accumulation rate tracked over time across the portfolio — useful for risk modeling',
              'NFPA 211 compliance summary sized for insurance carrier review',
              'STR operators: per-booking-cycle documentation delivered by email within 24 hours',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={18} />
                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Markets we serve heavily */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            Markets We Serve Heavily
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {markets.map((m) => (
              <div key={m.name} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 text-fire text-xs font-display font-bold uppercase tracking-wider mb-2">
                  <MapPin size={12} /> {m.name}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <ClipboardList size={14} />
            HOW IT WORKS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Three Ways Landlords Book With Us
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-5 p-5 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0">1</div>
              <div>
                <div className="font-display font-bold text-lg text-navy mb-1">One-off cleaning at a single address</div>
                <p className="text-sm text-gray-700">Call (813) 744-1127 with the property address, unit type, and access details. Same-day and next-day appointments across Hillsborough and Pinellas.</p>
              </div>
            </li>
            <li className="flex gap-5 p-5 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0">2</div>
              <div>
                <div className="font-display font-bold text-lg text-navy mb-1">Multi-unit block scheduling</div>
                <p className="text-sm text-gray-700">5 or more units in one visit: 10% off list. Send us the address list and we route-optimize the schedule for a single-day completion.</p>
              </div>
            </li>
            <li className="flex gap-5 p-5 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-fire to-fire-glow text-white rounded-full flex items-center justify-center font-display font-extrabold text-xl flex-shrink-0">3</div>
              <div>
                <div className="font-display font-bold text-lg text-navy mb-1">Annual maintenance contract</div>
                <p className="text-sm text-gray-700">Portfolio landlords and STR operators with 10-plus units: annual or biannual contract with standing appointment windows and per-visit documentation.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
            Related Services &amp; Service Areas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/pricing', title: 'Pricing' },
              { href: '/services/condo-dryer-vent-cleaning', title: 'Condo & High-Rise' },
              { href: '/services/residential-dryer-vent-cleaning', title: 'Residential Cleaning' },
              { href: '/hoa-dryer-vent-cleaning', title: 'HOA Bulk Service' },
              { href: '/areas/clearwater', title: 'Clearwater' },
              { href: '/areas/sarasota', title: 'Sarasota' },
              { href: '/areas/st-petersburg', title: 'St. Petersburg' },
              { href: '/areas/tampa', title: 'Tampa' },
              { href: '/areas/bradenton', title: 'Bradenton' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-fire hover:shadow-md transition-all"
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

      <FAQ faqs={faqs} title="Landlord &amp; Property Manager Dryer Vent Cleaning — FAQs" />

      {/* Counter-positioning callout */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-3xl">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              <ShieldCheck size={14} /> LOCALLY OWNED — NOT A FRANCHISE
            </div>
            <h3 className="font-display font-extrabold text-2xl text-navy mb-4">
              Portfolio Landlords Deserve a Direct Line
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              No corporate routing center. No franchise handoff that changes the account manager every renewal. Airflow Dryer Vent Cleaning is locally owned in Tampa Bay — portfolio landlords and STR operators work with the same Airflow team year over year.
            </p>
            <a href="tel:+18137441127" className="btn-primary inline-flex items-center gap-2">
              <Phone size={18} /> (813) 744-1127
            </a>
          </div>
        </div>
      </section>

      <FinalCTA
        headline={'Landlord & Property Manager Dryer Vent Service.\nMulti-Unit Pricing. Fast Turnover.'}
        sub="From single-property landlords to Gulf-front STR portfolios — Tampa Bay's locally-owned dryer duct specialists. Call (813) 744-1127."
      />
    </>
  );
}
