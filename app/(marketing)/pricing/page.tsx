import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Phone,
  Search,
  Wrench,
  Building2,
  Home,
  Eye,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { STANDARD_PRICING } from '@/lib/area-content';
import { services } from '@/lib/services';
import {
  localBusinessSchema,
  faqSchema,
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import TrustBar from '@/components/TrustBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import LeadForm from '@/components/LeadForm';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export const metadata = buildMetadata({
  title: 'Dryer Vent Cleaning Cost Tampa | From $79 + Free Inspection',
  description:
    'Transparent dryer vent cleaning pricing in Tampa Bay. From $79 (first 10ft) + $10/ft. Free inspection, no obligation. Call (813) 744-1127.',
  path: '/pricing',
});

// ---------------------------------------------------------------------------
// Pricing rows (rendered as a real table). Mirrors STANDARD_PRICING but
// adds the additional row variants required for the full pricing page.
// ---------------------------------------------------------------------------
const PRICING_ROWS: { label: string; price: string; note: string; emphasis?: boolean }[] = [
  {
    label: 'Free Inspection',
    price: 'FREE',
    note: 'Camera scope, airflow test, written assessment, no obligation',
    emphasis: true,
  },
  {
    label: 'Standard Residential Cleaning',
    price: 'From $79',
    note: 'First 10 feet of vent run',
  },
  {
    label: 'Additional Length',
    price: '+$10 per foot',
    note: 'Beyond initial 10 feet',
  },
  {
    label: 'Typical Residential Total',
    price: '$119–$249',
    note: 'Most Tampa homes fall in this range',
  },
  {
    label: 'Condo / Townhouse',
    price: 'From $79',
    note: 'Most condo vents under 10 ft = base price',
  },
  {
    label: 'Second-Floor Laundry Access',
    price: '+$50',
    note: 'Additional safety setup',
  },
  {
    label: 'Multi-Structure (Pool House, etc.)',
    price: 'Reduced rate',
    note: 'Secondary structures same appointment',
  },
  {
    label: 'Bird Guard Installation',
    price: '$65–$125',
    note: 'Optional add-on',
  },
  {
    label: 'Wall Ductwork Repair',
    price: '$195–$595',
    note: 'Damaged duct replacement, priced by scope',
  },
  {
    label: 'Commercial Dryer Vent Cleaning',
    price: 'Custom quote',
    note: 'Based on scope + equipment needed',
  },
  {
    label: 'Air Duct Cleaning (whole-home HVAC)',
    price: 'From $89 per opening',
    note: 'Whole-home HVAC. Typical 8–15 openings = $712–$1,335 total.',
  },
];

// 12 FAQs — wrapped in FAQPage schema
const PRICING_FAQS = [
  {
    q: 'How much does dryer vent cleaning cost in Tampa Bay?',
    a: `Standard residential dryer vent cleaning in Tampa Bay starts at $79 for the first 10 feet of vent run, plus $10 per additional foot. Most homes fall in the $119–$249 range depending on length, floor level, and dryer duct condition. Condo and townhouse jobs are usually base price ($79). Wall ductwork repair, when needed, runs $195–$595 based on scope. Every Tampa Bay job starts with a FREE on-site inspection so the price you see is the price you pay — no surprise upsells, no "starting at" baits.`,
  },
  {
    q: 'Why is your pricing per-foot instead of flat-rate?',
    a: `Because dryer vents are not flat-rate jobs. A 6-foot condo run, a 22-foot two-story sidewall run, and a 38-foot detached-laundry roof run take very different time, equipment, and materials. Per-foot pricing is honest math: a base for the first 10 feet (covers setup, inspection, brushing, and exterior verification) and a small per-foot charge for additional dryer duct length. Flat rates either overcharge short runs or underbid long ones — and the underbids are where surprise fees and "scope changes" appear once the technician is on-site.`,
  },
  {
    q: 'Is the inspection really free?',
    a: `Yes. Genuinely free, no obligation. The Airflow team runs a camera scope through the accessible dryer duct path, measures airflow at the exterior termination with a calibrated anemometer, and gives you a written assessment with photos. If your dryer vent looks fine, we tell you so and leave. No trip fee, no diagnostic fee, no deposit. We offer this because most "quotes" in our industry happen blind over the phone — that is how households get oversold. Booking the free inspection means you see real data before spending a dollar.`,
  },
  {
    q: 'Do you charge more for 2-story homes?',
    a: `Slightly — there is a flat $50 access charge for second-floor laundry rooms. Two-story dryer ducts usually run vertically through interior walls and exit through a sidewall or roof, which requires longer brush extensions, ladder setup, and more time on-site. The $50 covers that additional safety-rigging work. Most two-story Tampa Bay jobs still finish in the $169–$249 total range. We disclose the access charge in writing during your free inspection — never as a surprise after the work begins.`,
  },
  {
    q: 'How long does dryer vent cleaning take?',
    a: `Most residential dryer vent cleanings take 45 to 75 minutes from arrival to completion. Condo jobs with short vent runs sometimes finish in 30 minutes. Two-story homes or long detached-laundry runs may take 90 minutes. Wall ductwork repair extends the visit by 1–3 hours depending on scope. The free inspection itself takes 20–30 minutes. If the dryer duct is in good shape, you spend less than half an hour with us — and pay nothing.`,
  },
  {
    q: 'Do you charge extra for condos or townhomes?',
    a: `No. Condos and townhouses are billed at our standard base rate of $79 because most condo dryer ducts are under 10 feet — straight runs from the laundry closet through an exterior wall. We service condos in downtown Tampa, St. Petersburg, Clearwater, Brandon, and across Tampa Bay regularly. If the building requires HOA scheduling coordination or after-hours access, we work around that at no extra charge. Multi-unit HOA buildings get bulk pricing — see our HOA dryer vent cleaning page for details.`,
  },
  {
    q: 'What happens if you find damage during cleaning?',
    a: `We stop, photograph the damage, show it to you, and give you a written repair quote on the spot. We never proceed with repair work without your explicit approval. Common findings include crushed flex hose behind the dryer, disconnected joints inside the wall cavity, missing or broken exterior dampers, and pierced ducts from drywall screws. Repairs run $195–$595 depending on scope. You can approve the repair, defer it, or get a second opinion — your call. We are not commissioned, so there is no incentive to push work you do not need.`,
  },
  {
    q: 'How often should I clean my dryer vent in Florida?',
    a: `The National Fire Protection Association recommends professional dryer vent cleaning at least once per year for most households. In Florida specifically, we recommend every 9–12 months because of the year-round air-conditioned humidity and heavy dryer usage — Tampa Bay homes run dryers 200+ days a year compared to colder climates. Larger families, homes with pets, or properties with long dryer duct runs (over 25 feet) should clean every 6 months. Free inspections are a low-friction way to confirm the right cadence for your specific home.`,
  },
  {
    q: 'Why do competitors refuse to give prices over the phone?',
    a: `Two reasons: (1) Flat-rate pricing on a per-foot job means giving you a number that is wrong half the time — so they avoid quoting until they are on-site and you have already invested time. (2) Many large operators are franchises that route calls through corporate centers; the "technician" is graded on revenue per visit, not honesty. The FTC requires national franchise brands to disclose "independently owned and operated franchises" — but the pricing model is set centrally, with quotas. Our technicians are not commissioned, our prices are published, and the inspection is free.`,
  },
  {
    q: 'Do you offer HOA bulk pricing?',
    a: `Yes. HOAs, condo associations, apartment complexes, and senior living facilities receive volume pricing — typically 15–25% off per-unit rates for buildings with 10+ units. We provide NFPA 211 compliance documentation, after-hours scheduling to minimize tenant disruption, and consolidated invoicing per the property manager. See our dedicated HOA dryer vent cleaning page or call ${PHONE_DISPLAY} for a property-specific quote. Most Tampa Bay HOAs we service are on annual or semi-annual maintenance contracts.`,
  },
  {
    q: 'Can you service vacation rentals?',
    a: `Yes. Short-term rental properties (Airbnb, VRBO, corporate housing) get priority scheduling because their dryer ducts see 3–5x normal residential usage — high turnover means heavy lint loads. We can coordinate access with property managers, between-guest cleaning windows, and provide receipts and inspection reports for your records. Pricing is the same per-foot model as standard residential. See our landlord dryer vent cleaning page for details on multi-property maintenance plans.`,
  },
  {
    q: 'Do you honor your quoted price or add surprise fees?',
    a: `We honor every quote. Once the free inspection is complete and you receive a written estimate, that is the price — no add-ons, no "we found something extra," no inflated invoice at the door. The only way the number changes is if you approve additional work (for example, a wall ductwork repair you authorize after seeing photos of the damage). This is a written commitment. If a technician ever quotes one number and bills another, the difference is on us. That is the difference between a published-price local operator and a corporate routing center with revenue quotas.`,
  },
  // PAA-targeted FAQs (Phase 8): match common Google "People Also Ask" phrasings for pricing-intent queries.
  {
    q: 'How much does it cost to clean a dryer vent?',
    a: `In Tampa Bay, professional dryer vent cleaning costs $79 for the first 10 feet of vent run plus $10 per additional foot. Most residential jobs total $79–$249 depending on length. Wall ductwork repair, when needed, is $195–$595 separately. On-site inspection is always free.`,
  },
  {
    q: 'Is dryer vent cleaning worth the cost?',
    a: `Yes, for most homes. Failure to clean is the leading cause of home dryer fires per the U.S. Fire Administration, a clogged vent can increase energy use by up to 30% per cycle, and restricted airflow shortens dryer lifespan. At $79–$249 once a year, the math is favorable even before accounting for fire risk.`,
  },
  {
    q: 'What is a fair price for dryer vent cleaning?',
    a: `A fair Tampa Bay price is in the $79–$249 range for standard residential cleaning, quoted transparently before the work starts. Quotes above $300 for a simple residential cleaning typically reflect either franchise commission structures or undisclosed add-ons. If a company refuses to publish pricing, that is usually a sign the number is going to flex based on their on-site assessment of your willingness to pay.`,
  },
];

// ---------------------------------------------------------------------------
// Schema builders specific to this page
// ---------------------------------------------------------------------------
const cleaningServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Dryer Vent Cleaning — Tampa Bay',
  serviceType: 'Dryer Vent Cleaning',
  description:
    'Transparent per-foot dryer vent cleaning in Tampa Bay. $79 for the first 10 feet of vent run, +$10 per additional foot. Includes pre/post airflow testing, full rotary-brush cleaning of the dryer duct, exterior termination inspection, written report, and 30-day satisfaction guarantee.',
  provider: { '@id': `${SITE}/#localbusiness` },
  areaServed: { '@type': 'State', name: 'Florida' },
  url: `${SITE}/pricing`,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '79',
    highPrice: '595',
    priceRange: '$79–$595',
    availability: 'https://schema.org/InStock',
  },
};

const inspectionService = services.find((s) => s.slug === 'dryer-vent-inspection');
const freeInspectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Free Dryer Vent Inspection',
  serviceType: 'Dryer Vent Inspection',
  description:
    inspectionService?.intro ??
    'A complimentary on-site evaluation of your dryer duct system — camera scope, airflow test, and written assessment — at no cost and no obligation.',
  provider: { '@id': `${SITE}/#localbusiness` },
  areaServed: { '@type': 'State', name: 'Florida' },
  url: `${SITE}/services/dryer-vent-inspection`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    eligibleQuantity: { '@type': 'QuantitativeValue', value: 1 },
  },
};

export default function PricingPage() {
  return (
    <>
      <SchemaMarkup
        data={[
          webPageSchema({
            path: '/pricing',
            name: 'Dryer Vent Cleaning Cost Tampa — Transparent Per-Foot Pricing',
            description:
              'Transparent dryer vent cleaning pricing in Tampa Bay. From $79 (first 10ft) + $10/ft. Free inspection, no obligation.',
          }),
          localBusinessSchema(),
          cleaningServiceSchema,
          freeInspectionSchema,
          faqSchema(PRICING_FAQS),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Pricing', url: '/pricing' },
          ]),
        ]}
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light py-16 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs text-gold font-semibold backdrop-blur mb-5">
            Transparent Pricing · Tampa Bay
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-4">
            Dryer Vent Cleaning Cost in Tampa Bay — Transparent Per-Foot Pricing
          </h1>
          <p className="text-lg text-white/80 mb-2">
            <strong className="text-gold">From $79 + FREE Inspection</strong> · No Obligation
          </p>
          <p className="text-sm text-white/70 max-w-2xl mx-auto mb-8">
            Most Tampa Bay competitors hide their pricing. We publish ours — and
            send a technician out for a free dryer duct inspection before a
            single dollar changes hands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-fire hover:bg-fire-dark text-white font-display font-bold px-7 py-4 rounded-xl shadow-lg shadow-fire/30 transition-all"
            >
              <Phone size={18} /> Call {PHONE_DISPLAY}
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-display font-bold px-7 py-4 rounded-xl backdrop-blur transition-all"
            >
              Book Free Inspection <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* INTRO PARAGRAPH — AI-extractable */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-3xl">
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong className="text-navy">
              Dryer vent cleaning in Tampa Bay costs $79 for the first 10 feet
              of vent run plus $10 per additional foot
            </strong>
            , with most homes landing between $119 and $249. Almost every
            competitor in our market refuses to publish pricing — they want
            you on a phone call where a sales script can convert before you
            comparison-shop. Airflow Dryer Vent Cleaning takes the opposite
            approach. The full price list is on this page, and every job
            starts with a <strong>free on-site inspection</strong> — camera
            scope, airflow test, written assessment, zero obligation. No trip
            fee. No diagnostic fee. If your dryer duct is in good shape, the
            Airflow team tells you so and leaves. We are locally owned in
            Tampa Bay, not a national franchise routing center, and our
            technicians are paid a fixed wage rather than commission — so the
            recommendation you get is honest by design.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* HOW OUR PRICING WORKS — 3 column visual */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              <DollarSign size={14} /> HOW OUR PRICING WORKS
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Three Simple Numbers. Nothing Else.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most Tampa Bay dryer vent cost models are designed to be
              confusing. Ours fits on a postcard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-white rounded-2xl p-7 border-2 border-gold shadow-xl text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Step 1
              </div>
              <div className="w-14 h-14 mx-auto mb-4 bg-gold/20 rounded-2xl flex items-center justify-center">
                <Search className="text-gold-dark" size={26} />
              </div>
              <h3 className="font-display font-extrabold text-lg text-navy mb-2">
                Free Inspection
              </h3>
              <div className="font-display font-black text-4xl text-fire mb-2">FREE</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Camera scope, airflow test, photos, written assessment. No
                obligation, no upsell pressure.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border-2 border-fire shadow-xl text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fire text-white text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Step 2
              </div>
              <div className="w-14 h-14 mx-auto mb-4 bg-fire/10 rounded-2xl flex items-center justify-center">
                <Home className="text-fire" size={26} />
              </div>
              <h3 className="font-display font-extrabold text-lg text-navy mb-2">
                First 10 Feet
              </h3>
              <div className="font-display font-black text-4xl text-fire mb-2">$79</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Covers the standard residential cleaning — most condos and
                short-run homes finish at this base price.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border-2 border-gray-200 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2"></div>
              <div className="w-14 h-14 mx-auto mb-4 bg-navy/10 rounded-2xl flex items-center justify-center">
                <Wrench className="text-navy" size={26} />
              </div>
              <h3 className="font-display font-extrabold text-lg text-navy mb-2">
                Each Additional Foot
              </h3>
              <div className="font-display font-black text-4xl text-fire mb-2">+$10</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Beyond the initial 10 feet of dryer duct. Long-run, two-story,
                or detached laundry homes scale here.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Example: a typical 18-foot two-story Tampa Bay dryer duct runs $79
            (first 10 ft) + $80 (8 additional ft) + $50 (second-floor access)
            = <strong className="text-navy">$209 total</strong>. We quote it
            in writing during your free inspection — you approve before any
            work begins.
          </p>
        </div>
      </section>

      {/* FULL PRICING TABLE */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
            <DollarSign size={14} /> FULL PRICE LIST
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
            Complete Tampa Bay Pricing
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            Every line item, in writing, before you call. The same prices
            apply across Tampa, St. Petersburg, Clearwater, Brandon, Wesley
            Chapel, and the rest of our 50-mile Tampa Bay service radius.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-5 py-4 text-sm font-display font-bold">Service</th>
                  <th className="px-5 py-4 text-sm font-display font-bold">Price</th>
                  <th className="px-5 py-4 text-sm font-display font-bold hidden md:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      row.emphasis
                        ? 'bg-orange-50'
                        : i % 2 === 0
                        ? 'bg-white'
                        : 'bg-gray-50'
                    }
                  >
                    <td className="px-5 py-4 text-sm text-gray-700 align-top font-medium">
                      {row.label}
                    </td>
                    <td className="px-5 py-4 text-sm font-display font-extrabold text-fire align-top whitespace-nowrap">
                      {row.price}
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-600 align-top hidden md:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="font-display font-bold text-navy">Cleaning your air ducts?</strong> Same transparent per-opening model — $89 per opening, free on-site assessment, NADCA-aligned protocols. Most Tampa Bay homes have 8–15 openings (typical total $712–$1,335). See{' '}
              <Link href="/services/air-duct-cleaning" className="text-fire font-semibold hover:underline">
                /services/air-duct-cleaning
              </Link>{' '}
              for the full per-opening breakdown.
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Final price quoted in writing before work begins. No hidden fees.
            See also:{' '}
            <Link
              href="/services/residential-dryer-vent-cleaning"
              className="text-fire font-semibold hover:underline"
            >
              residential cleaning
            </Link>
            ,{' '}
            <Link
              href="/services/dryer-vent-inspection"
              className="text-fire font-semibold hover:underline"
            >
              free inspection
            </Link>
            ,{' '}
            <Link
              href="/services/dryer-vent-repair"
              className="text-fire font-semibold hover:underline"
            >
              vent repair
            </Link>
            .
          </p>
        </div>
      </section>

      {/* WHY WE'RE TRANSPARENT */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-3xl">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              <Shield size={14} /> WHY WE PUBLISH PRICES
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-navy mb-4">
              Why We&apos;re Transparent — and Most National Brands Aren&apos;t
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              The dryer vent cleaning industry is dominated by the
              &ldquo;call for a quote&rdquo; tactic. You see a generic price
              like &ldquo;$99 special&rdquo; on a billboard, you call, and a
              corporate routing center dispatches a technician whose real
              quote — &ldquo;based on what they find on-site&rdquo; — lands
              somewhere between $300 and $900. National franchise brands
              (the kind required by the FTC to display
              &ldquo;independently owned and operated franchises&rdquo;
              disclosures, often part of the Neighborly family of brands)
              run on revenue-per-visit quotas. Their pricing is set centrally
              and the technicians are graded on average ticket size.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Airflow Dryer Vent Cleaning runs the opposite model. Prices
              are published. Inspections are free. Technicians are not
              commissioned. The free inspection removes the commitment from
              the buying decision — you get a written assessment with photos
              of your actual dryer duct before deciding whether to do
              anything at all. That is the entire point.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT AFFECTS COST */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
            <DollarSign size={14} /> COST FACTORS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-4">
            What Affects Dryer Vent Cleaning Cost
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-10">
            Five variables drive the final price for any Tampa Bay dryer
            vent or dryer duct job. We measure each during the free
            inspection so the written estimate reflects your specific home —
            not a generic flat rate.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-2">
                1. Vent Length
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The single largest cost driver. Condo runs are typically 4–8
                feet (base price). Single-story homes average 12–18 feet.
                Two-story and detached-laundry runs frequently exceed 25
                feet, which is the longest length most dryer manufacturers
                allow before requiring a booster fan.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-2">
                2. Floor Level
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Second-floor laundry rooms add a flat $50 access charge for
                the additional ladder rigging, longer brush extensions, and
                sidewall- or roof-termination work. Single-story and
                first-floor laundry layouts have no access surcharge.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-2">
                3. Vent Material (Rigid vs Flex Foil)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Rigid metal dryer ducts clean faster and cleaner. Flexible
                foil and plastic ducting (no longer code-compliant in most
                Florida jurisdictions) traps lint in its ridges, can collapse
                under brush pressure, and frequently needs replacement
                rather than cleaning. Replacing a section of flex with rigid
                metal falls under wall ductwork repair pricing
                ($195–$595 by scope).
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-2">
                4. Accessibility (Roof vs Sidewall Termination)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Sidewall terminations are straightforward — we clean from
                inside and verify airflow at the exterior hood. Roof
                terminations require ladder work and additional safety
                rigging, particularly on tile-roof Tampa Bay homes. If your
                roof termination is over 12 feet up or steeply pitched, the
                second-floor access charge typically applies.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-navy mb-2">
                5. Condition Severity
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A vent with a normal year of lint cleans in standard time.
                Vents that have not been cleaned in 5+ years, or vents with
                bird nests, dryer sheets compacted in the line, or partial
                duct collapse, may take longer. We disclose any
                condition-driven adjustment in writing during the free
                inspection — the price never changes after work begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED IN EVERY CLEANING */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-4">
            What&apos;s Included in Every Cleaning
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            Every competitor &ldquo;cleans.&rdquo; Few document. Fewer measure.
            Here is exactly what every standard residential dryer vent
            cleaning from the Airflow team includes — at no extra charge,
            because it is the job, not an upsell.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Pre-cleaning airflow measurement at the exterior termination (calibrated anemometer)',
              'Exterior termination + bird guard inspection',
              'Full-length rotary brush cleaning of the dryer duct',
              'Lint trap housing vacuum-out (the part most cleanings skip)',
              'Post-cleaning airflow verification — measured improvement, not guessed',
              'Written report with before/after photos',
              '30-day satisfaction guarantee',
              'Honest condition assessment — no upsell pressure',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-200"
              >
                <CheckCircle2 className="text-fire flex-shrink-0 mt-0.5" size={20} />
                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE INSPECTION DETAIL */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 md:p-10 text-white">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-widest mb-4">
              <Eye size={14} /> FREE — NO OBLIGATION
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-4">
              Free Inspection — What&apos;s Included
            </h2>
            <p className="text-white/85 leading-relaxed mb-6">
              The free inspection is the cornerstone of how we work. It
              removes the commitment from the buying decision — you see real
              data on your dryer duct before spending a dollar. Most
              competitors will not even quote without a paid trip charge.
              Ours is genuinely free.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                'Camera scope of accessible dryer duct path',
                'Airflow measurement at exterior termination',
                'Written assessment with photos',
                'Honest recommendation — including "your vent looks fine" if true',
                'Zero obligation, zero upsell pressure',
                'Same- or next-day appointments standard',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="text-gold flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-white/90 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 bg-fire hover:bg-fire-dark text-white font-display font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-fire/30 transition-all"
              >
                <Phone size={16} /> Book Free Inspection — {PHONE_DISPLAY}
              </a>
              <Link
                href="/services/dryer-vent-inspection"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-display font-bold px-6 py-3.5 rounded-xl transition-all"
              >
                Inspection Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TAMPA BAY PRICING FACTORS */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
            <Building2 size={14} /> LOCAL FACTORS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6">
            Tampa Bay Pricing Factors
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Tampa Bay dryer vent pricing differs from the US average for
              specific local reasons. Florida households run dryers
              year-round in heavily air-conditioned, humid interiors — the
              average Tampa Bay home cycles 200+ dryer loads per year
              compared to roughly 140 nationwide. That elevated usage
              accelerates lint accumulation and shortens the cleaning
              interval, which is why Tampa Bay homes typically need 9–12
              month cycles rather than the 12–18 month national average.
            </p>
            <p>
              Older housing stock matters too. Mid-century neighborhoods in{' '}
              <Link href="/areas/st-petersburg" className="text-fire font-semibold hover:underline">
                St. Petersburg
              </Link>
              , <Link href="/areas/dunedin" className="text-fire font-semibold hover:underline">Dunedin</Link>
              , and{' '}
              <Link href="/areas/carrollwood" className="text-fire font-semibold hover:underline">
                Carrollwood
              </Link>{' '}
              were often built before modern dryer duct codes existed —
              we frequently find legacy flex foil, undersized terminations,
              and runs that exceed manufacturer length limits. These homes
              tend toward the upper end of the residential pricing range
              because the dryer duct often needs both cleaning and partial
              repair to come up to current code.
            </p>
            <p>
              At the other end of the spectrum, the Tampa Bay new-construction
              boom — particularly{' '}
              <Link href="/areas/riverview" className="text-fire font-semibold hover:underline">
                Riverview
              </Link>
              ,{' '}
              <Link href="/areas/apollo-beach" className="text-fire font-semibold hover:underline">
                Apollo Beach
              </Link>
              , and{' '}
              <Link href="/areas/odessa" className="text-fire font-semibold hover:underline">
                Odessa
              </Link>{' '}
              — has produced a large cohort of homes with builder-grade flex
              foil ducting reaching the 7–10 year failure window. The flex
              collapses, traps lint, and underperforms airflow tests. These
              homes price standard for cleaning but frequently need a flex-to-rigid
              upgrade quoted under wall ductwork repair ($195–$595).
              We see this pattern weekly across Hillsborough County.
            </p>
            <p>
              Across the entire Tampa Bay metro, the pricing model is the
              same: $79 base, $10 per additional foot, $50 second-floor
              access, repair priced separately and only after written
              approval. Same prices in{' '}
              <Link href="/areas/tampa" className="text-fire font-semibold hover:underline">
                Tampa
              </Link>
              ,{' '}
              <Link href="/areas/clearwater" className="text-fire font-semibold hover:underline">
                Clearwater
              </Link>
              ,{' '}
              <Link href="/areas/brandon" className="text-fire font-semibold hover:underline">
                Brandon
              </Link>
              , and{' '}
              <Link href="/areas/wesley-chapel" className="text-fire font-semibold hover:underline">
                Wesley Chapel
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* COUNTER-POSITIONING + SIBLING LINKS */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-2 gap-5">
            <Link
              href="/local-vs-franchise-dryer-vent-cleaning"
              className="group bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white hover:shadow-xl transition-all"
            >
              <div className="inline-flex items-center gap-2 text-gold font-display font-bold text-xs uppercase tracking-widest mb-3">
                <AlertTriangle size={14} /> COMPARE
              </div>
              <h3 className="font-display font-extrabold text-xl mb-2">
                Local vs Franchise: Pricing Compared
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-3">
                See exactly how published-price local pricing stacks up
                against national franchise &ldquo;call for a quote&rdquo;
                pricing on the same Tampa Bay dryer duct.
              </p>
              <span className="inline-flex items-center gap-1 text-gold font-display font-bold text-sm group-hover:gap-2 transition-all">
                Read the comparison <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/services/condo-dryer-vent-cleaning"
              className="group bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-6 hover:shadow-xl transition-all"
            >
              <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
                <Building2 size={14} /> CONDO PRICING
              </div>
              <h3 className="font-display font-extrabold text-xl text-navy mb-2">
                Condo &amp; Townhouse Dryer Vent Cleaning
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Most Tampa Bay condos finish at base price. See how condo
                dryer duct cleaning works, HOA scheduling, and our
                short-run pricing model.
              </p>
              <span className="inline-flex items-center gap-1 text-fire font-display font-bold text-sm group-hover:gap-2 transition-all">
                Condo details <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/hoa-dryer-vent-cleaning"
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-fire hover:shadow-xl transition-all"
            >
              <h3 className="font-display font-extrabold text-lg text-navy mb-2">
                HOA &amp; Multi-Unit Pricing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Volume pricing for condo associations, apartment complexes,
                and senior living facilities. 15–25% off per-unit rates for
                10+ units.
              </p>
              <span className="inline-flex items-center gap-1 text-fire font-display font-bold text-sm group-hover:gap-2 transition-all">
                HOA pricing <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/landlord-dryer-vent-cleaning"
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-fire hover:shadow-xl transition-all"
            >
              <h3 className="font-display font-extrabold text-lg text-navy mb-2">
                Landlord &amp; Vacation Rental Pricing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Multi-property maintenance plans, between-guest scheduling,
                and inspection reports for landlord and short-term rental
                portfolios.
              </p>
              <span className="inline-flex items-center gap-1 text-fire font-display font-bold text-sm group-hover:gap-2 transition-all">
                Landlord pricing <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD FORM ANCHOR */}
      <section className="bg-gray-50 py-16" id="quote">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">
              Book Your Free Inspection
            </h2>
            <p className="text-gray-600">
              30 seconds to submit. We confirm your appointment within the
              hour. No obligation, no upsell pressure.
            </p>
          </div>
          <LeadForm defaultService="inspection" page="/pricing" />
        </div>
      </section>

      <FAQ
        faqs={PRICING_FAQS}
        title="Pricing FAQs"
        subtitle="Real questions from Tampa Bay homeowners about dryer vent and dryer duct pricing."
      />

      <FinalCTA
        headline={'Book Your FREE Inspection.\nNo Cost. No Obligation.'}
        sub={`Same-week appointments standard across Tampa Bay. Same-day in Hillsborough and Pinellas County. Call ${PHONE_DISPLAY} or book online.`}
      />
    </>
  );
}
