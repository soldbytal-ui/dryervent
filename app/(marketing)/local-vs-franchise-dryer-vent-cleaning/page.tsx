import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Phone, AlertTriangle, Scale } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import SchemaMarkup from '@/components/SchemaMarkup';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dryervent.vercel.app';

export const metadata = buildMetadata({
  title: 'Local vs Franchise Dryer Vent Cleaning Tampa | Airflow',
  description:
    'Comparing local and franchise dryer vent cleaning in Tampa Bay? Pricing transparency, accountability, local knowledge — the differences before you book.',
  path: '/local-vs-franchise-dryer-vent-cleaning',
  type: 'article',
});

const faqs = [
  {
    q: 'Is the company I called actually a franchise?',
    a: 'Many of the largest dryer vent cleaning brands operating in Tampa Bay are national franchise networks — typically owned by a holding company that licenses the brand to independent franchise owners across the country. The Federal Trade Commission requires franchise systems to disclose this through a Franchise Disclosure Document, and franchise locations are legally required to display the words "independently owned and operated franchises" in fine print. If you see that phrase on a website footer or vehicle wrap, you are dealing with a franchise — not a local company. Airflow Dryer Vent Cleaning is fully locally owned and operated in Tampa Bay, with no franchise affiliation.',
  },
  {
    q: 'Why do franchise dryer vent companies hide pricing online?',
    a: 'Franchise pricing models are usually set by individual franchise owners under guidance from the corporate parent, and that pricing often includes royalty fees, advertising fund contributions, and commission structures for technicians. Publishing fixed prices makes it harder for franchise owners to flex pricing per call, so most franchises list "call for quote" instead. A locally owned operator like Airflow can publish the actual numbers — $79 for the first 10 feet of dryer duct, $10 per additional foot, $195–$595 for wall ductwork repair — because there is no royalty stack to obscure.',
  },
  {
    q: 'Are franchise technicians less qualified than local technicians?',
    a: 'Not inherently — many franchise technicians are skilled and well-trained. The structural difference is incentive, not skill. Franchise technicians often work under commission or quota structures designed by the corporate parent, which can pressure them to upsell services or recommend repairs that may not be necessary. Local independent operators like Airflow pay technicians a fixed rate so the recommendation you receive matches the condition of your dryer duct — not a sales target.',
  },
  {
    q: 'Will I get the same crew if I call back next year?',
    a: 'With a national franchise model, you call a corporate routing center that dispatches whichever crew is available in the territory that day — and franchise ownership can change hands without notice, meaning the company you trusted last year may be a different operator this year. With Airflow, you call (813) 744-1127 directly and reach the same locally owned operation every time. Our technicians are W-2 employees, not contractors, and most of our team has been with us for years.',
  },
  {
    q: 'How does local pricing actually compare to franchise pricing in Tampa Bay?',
    a: 'In our experience reviewing customer quotes from competitors, franchise dryer vent cleaning quotes in Tampa Bay typically range from $189 to $450 for a standard residential job — sometimes more once "additional services" are added at the door. Airflow charges $79 for the first 10 feet of dryer duct plus $10 per additional foot, with most jobs landing in the $79–$249 range. Wall ductwork repair, when actually required, is $195–$595 quoted in advance with photos. Free inspection always — no upsell, no obligation.',
  },
];

export default function LocalVsFranchisePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Local vs. Franchise Dryer Vent Cleaning: What Tampa Homeowners Should Know',
    description:
      'Educational comparison of locally-owned and national-franchise dryer vent cleaning in Tampa Bay — pricing transparency, accountability, local knowledge, and the FTC franchise disclosure rule.',
    author: { '@type': 'Organization', name: 'Airflow Dryer Vent Cleaning' },
    publisher: { '@id': `${SITE}/#localbusiness` },
    datePublished: '2025-01-15',
    dateModified: '2026-04-19',
    mainEntityOfPage: `${SITE}/local-vs-franchise-dryer-vent-cleaning`,
    image: `${SITE}/og-image.jpg`,
  };

  const tableRows = [
    {
      dimension: 'Ownership',
      local: 'Independent Tampa Bay business; one owner accountable for every job.',
      franchise: 'National brand licensed to franchisees; FTC requires "independently owned and operated franchises" disclosure.',
    },
    {
      dimension: 'Pricing transparency',
      local: 'Published online — $79 / first 10 ft of dryer duct, +$10/ft, $195–$595 wall ductwork repair.',
      franchise: 'Typically "call for quote" — pricing flexes per call to absorb royalty and ad-fund fees.',
    },
    {
      dimension: 'Accountability',
      local: 'Owner answers the phone. Same business name, same team, year over year.',
      franchise: 'Corporate routing center dispatches; franchise ownership can change without notice.',
    },
    {
      dimension: 'Who shows up',
      local: 'W-2 technicians on the Airflow team paid a fixed wage — not commissioned contractors.',
      franchise: 'Technician is often paid on commission or quota, which shapes what gets recommended.',
    },
    {
      dimension: 'Local knowledge',
      local: 'Knows Tampa Bay housing — Channelside high-rises, South Tampa bungalows, Westchase townhomes, Apollo Beach waterfront.',
      franchise: 'Standardized national playbook; technicians may rotate across territories.',
    },
    {
      dimension: 'Response time',
      local: 'Same-day across Hillsborough and Pinellas; next-day to Pasco, Manatee, and Sarasota.',
      franchise: 'Routing center schedules across multiple franchisees; lead times vary by territory load.',
    },
    {
      dimension: 'Warranty',
      local: '30-day satisfaction guarantee on cleaning; written warranty on all repair work.',
      franchise: 'Warranty obligations may transfer or lapse if franchise ownership changes hands.',
    },
  ];

  return (
    <>
      <SchemaMarkup
        data={[
          articleSchema,
          localBusinessSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Local vs Franchise', url: '/local-vs-franchise-dryer-vent-cleaning' },
          ]),
        ]}
      />

      <Hero
        badge="Educational Guide · Tampa Bay Homeowners"
        title={
          <>
            Local vs. Franchise <em className="not-italic text-fire-glow">Dryer Vent Cleaning</em>: What Tampa Homeowners Should Know
          </>
        }
        subtitle="A neutral comparison of locally-owned and national-franchise dryer vent cleaning in Tampa Bay — what differs in pricing, accountability, and who actually shows up at your door."
      />

      <TrustBar />

      {/* Intro — definition-style for AI extraction */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <Scale size={14} />
            EDUCATIONAL COMPARISON
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Two Different Business Models, Same Service Category
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            Dryer vent cleaning in Tampa Bay is delivered through two fundamentally different business models: locally-owned independent operators, and national franchise networks operated under brand-licensing agreements with a corporate parent. Both can clean a dryer duct competently. Where they diverge is pricing structure, accountability, and incentive design — and those differences directly affect the quote you receive and the work that gets recommended.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            This page is not a hit piece. National franchises serve real customers and many do good work. But Tampa Bay homeowners deserve to understand what they are choosing between before they book — particularly because franchise marketing rarely discloses the franchise relationship up front. The Federal Trade Commission requires that disclosure to exist somewhere on franchise websites and vehicles, but it is usually in the footer in small type.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Below is a row-by-row comparison of how the two models differ in practice, followed by an explanation of why the FTC mandates the franchise disclosure rule, and what all of this means specifically for Tampa Bay residents who need their dryer vent or dryer duct serviced.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-8">
            Side-by-Side: Local Independent vs. National Franchise
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-5 py-4 text-sm font-display font-bold w-1/5">Dimension</th>
                  <th className="px-5 py-4 text-sm font-display font-bold w-2/5">Local Independent Operator</th>
                  <th className="px-5 py-4 text-sm font-display font-bold w-2/5">National Franchise Model</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={row.dimension} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-4 text-sm text-navy align-top font-semibold border-t border-gray-200">{row.dimension}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 align-top border-t border-gray-200">{row.local}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 align-top border-t border-gray-200">{row.franchise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Comparison reflects the operating model differences as documented in FTC franchise disclosure requirements and observed in published competitor quotes across Tampa Bay between 2023 and 2026.
          </p>
        </div>
      </section>

      {/* FTC disclosure explainer */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <AlertTriangle size={14} />
            WHY THE FTC REQUIRES FRANCHISE DISCLOSURE
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            The &ldquo;Independently Owned and Operated Franchises&rdquo; Rule
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            Under the Federal Trade Commission&rsquo;s Franchise Rule (16 CFR Part 436), any company that licenses its brand, operating system, and trademarks to independent owners in exchange for fees and royalties must disclose that franchise relationship to prospective franchisees through a Franchise Disclosure Document — and to consumers through plain-language disclosures on marketing materials. That is why you will see the phrase &ldquo;independently owned and operated franchises&rdquo; in fine print on the websites and vehicles of large national dryer vent brands, including those owned by holding companies in the Neighborly family of brands.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            The disclosure exists because the consumer experience differs from a directly-owned business. When you call a franchise&rsquo;s national 800 number, you reach a corporate routing center — not the local owner. The technician who arrives works for a franchisee, not the brand on the truck. Pricing is set locally with corporate guidelines, and a percentage of what you pay flows back to the parent company as royalty.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            None of that is illegal or improper. It is simply a different structure than a locally-owned shop, and the FTC requires it be disclosed so consumers can make informed choices.
          </p>
        </div>
      </section>

      {/* What it means in Tampa Bay */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-4">
            <MapPin size={14} />
            WHAT THIS MEANS IN TAMPA BAY
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Tampa Bay Housing Is Too Varied for a National Playbook
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            Tampa Bay&rsquo;s housing stock is unusually diverse for a metro of its size. A South Tampa bungalow in Hyde Park has a 6-foot dryer duct run to a side-wall vent. A 24-story Channelside high-rise has a 30-plus-foot vertical stack shared between units. A Westchase townhome runs the duct across an attic. A St. Petersburg Old Northeast cottage from 1925 has the dryer in a converted back porch. A Wesley Chapel new-build in Wiregrass Ranch routes through a two-story interior wall. An Apollo Beach waterfront home has salt-air corrosion on the exterior hood within five years of installation.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-5">
            A national franchise playbook standardizes process — that is the entire point of franchising. But a standardized national process applied to wildly different Tampa Bay housing types frequently misses the local detail: which wall to access first in a Channelside tower, how to get HOA approval in a Westchase community, how to address salt-corroded hardware in Apollo Beach, when a Snell Isle cottage actually needs rerouting versus simple cleaning.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            A locally-owned operator who builds up pattern recognition in these specific neighborhoods — and who doesn&rsquo;t rotate crews across states every quarter — knows the answers. That local accountability is the practical difference. It isn&rsquo;t a marketing claim; it&rsquo;s a structural one.
          </p>
        </div>
      </section>

      {/* Why Airflow chose local */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy leading-tight mb-6">
            Why Airflow Chose the Local Model
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-6">
            Airflow Dryer Vent Cleaning is locally owned and operated in Tampa Bay. We are not a franchise of any national brand. We chose this structure deliberately for three reasons:
          </p>
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-lg text-navy mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-fire" /> No commission quotas on technicians
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our technicians are paid a fixed wage. They have no quota to hit, no commission on add-on services, and no bonus tied to the dollar amount of your invoice. Their incentive is to do the job right the first time so you call us back next year — not to upsell on the visit.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-lg text-navy mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-fire" /> Single point of contact
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                You call (813) 744-1127 and reach Airflow directly — not a corporate routing center routing the call to the next available territory franchisee. The owner of this business answers concerns, signs off on warranty claims, and stands behind every dryer duct cleaning we perform.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-lg text-navy mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-fire" /> Free inspection without strings
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our <Link href="/services/dryer-vent-inspection" className="text-fire font-semibold underline">free dryer vent inspection</Link> includes a camera scope, calibrated airflow measurement, and a written assessment — and if your dryer duct does not actually need cleaning, we tell you so and leave. Most franchise inspectors operating under quota cannot say that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links to related pages */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom max-w-5xl">
          <h2 className="font-display font-bold text-2xl text-navy text-center mb-8">
            See Our Pricing &amp; Service Detail
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/pricing', title: 'Transparent Pricing', desc: 'Every line item published — $79 / 10 ft, +$10/ft, $195–$595 wall ductwork repair.' },
              { href: '/services/dryer-vent-inspection', title: 'Free Inspection', desc: 'Camera scope + airflow test + written report. Zero cost, zero obligation.' },
              { href: '/services/residential-dryer-vent-cleaning', title: 'Residential Cleaning', desc: 'Full-service dryer vent cleaning starting at $79 for the first 10 feet.' },
              { href: '/areas/tampa', title: 'Tampa Service Area', desc: 'Same-day dryer vent cleaning across all 26 Tampa ZIP codes.' },
              { href: '/areas/st-petersburg', title: 'St. Petersburg', desc: 'Specialized service for coastal St. Pete homes and condos.' },
              { href: '/areas/brandon', title: 'Brandon', desc: 'Brandon and east-Hillsborough dryer vent service.' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-fire hover:shadow-md transition-all"
              >
                <div className="font-display font-bold text-navy mb-1">{link.title}</div>
                <div className="text-xs text-gray-600 mb-2 leading-relaxed">{link.desc}</div>
                <span className="text-fire text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} title="Local vs. Franchise — Frequently Asked Questions" />

      {/* Counter-positioning callout */}
      <section className="bg-white py-14">
        <div className="container-custom max-w-3xl">
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-fire/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
              <ShieldCheck size={14} /> LOCALLY OWNED — NOT A FRANCHISE
            </div>
            <h3 className="font-display font-extrabold text-2xl text-navy mb-4">
              Airflow Dryer Vent Cleaning · Tampa Bay
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              No corporate routing center. No commission quotas. No franchise royalty stack hiding in your quote. Just a locally-owned Tampa Bay team cleaning your dryer duct the right way at a published, predictable price.
            </p>
            <a href="tel:+18137441127" className="btn-primary inline-flex items-center gap-2">
              <Phone size={18} /> (813) 744-1127
            </a>
          </div>
        </div>
      </section>

      <FinalCTA
        headline={'Skip the Franchise Routing Center.\nCall a Local Tampa Bay Owner.'}
        sub="Free inspection. Published pricing. Same-day across Hillsborough and Pinellas. Call (813) 744-1127."
      />
    </>
  );
}
