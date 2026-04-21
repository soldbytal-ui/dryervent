import { buildMetadata } from '@/lib/seo';
import { ShieldCheck, Award, Users, Clock } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import TrustBar from '@/components/TrustBar';

export const metadata = buildMetadata({
  title: 'About Airflow Dryer Vent Cleaning | Locally Owned Tampa Bay',
  description: 'Airflow Dryer Vent Cleaning is a locally-owned, independent Tampa Bay dryer vent cleaning service. Free inspection, transparent per-foot pricing, licensed and insured in Florida. Not a franchise.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.12) 0%, transparent 60%)',
        }} />
        <div className="container-custom relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs text-gold font-semibold backdrop-blur mb-5">
            About Us
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight mb-5">
            Tampa Bay&apos;s <em className="not-italic text-fire-glow">Locally-Owned</em> Dryer Vent Company
          </h1>
          <p className="text-xl text-white/75 leading-relaxed">
            A locally-owned, independent Tampa Bay dryer vent cleaning service — built on transparent per-foot pricing, free camera-scope inspections, and the kind of accountability only a small team on a single phone line can offer.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="bg-white py-20">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display font-extrabold text-3xl text-navy mb-5">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Airflow Dryer Vent Cleaning was founded on a simple mission: protect Florida families from one of the most preventable home disasters — dryer fires. The Airflow team is a crew of trained Tampa Bay technicians doing dryer vent and dryer duct cleaning the right way. We are locally owned and independent — not a national franchise. Every job is handled by our own team, not rotating contractors.
            </p>
            <p className="text-gray-700 leading-relaxed mb-10">
              We serve homeowners, property managers, HOAs, and commercial property owners across the Tampa Bay metropolitan area. We use commercial-grade rotary brush systems, follow NFPA 211 guidelines, and stand behind every job with a satisfaction guarantee.
            </p>

            <h2 className="font-display font-extrabold text-3xl text-navy mb-5">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-5 not-prose mb-10">
              {[
                { icon: ShieldCheck, title: 'Licensed & Insured', desc: 'Fully licensed and insured in the State of Florida. Documentation provided on request.' },
                { icon: Award, title: 'Free On-Site Inspection', desc: 'Camera scope, airflow test, and a written assessment at no cost, with no obligation to book cleaning.' },
                { icon: Users, title: 'Transparent Pricing', desc: 'From $79 for the first 10 feet plus $10 per additional foot. Published on-site — no phone-quote dance.' },
                { icon: Clock, title: 'Same-Day Service', desc: 'Call in the morning, often cleaned by afternoon across Hillsborough and Pinellas.' },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-fire" size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-navy mb-1">{b.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="font-display font-extrabold text-3xl text-navy mb-5">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Every Airflow technician follows the same 5-point protocol on every job: free on-site inspection with camera scope, containment setup, rotary brush cleaning, airflow verification, and written documentation. You get photos, measurements, and a clear report showing exactly what we did.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you aren&apos;t completely satisfied, we&apos;ll come back at no charge until you are. Our guarantee is simple: the price we publish is the price you pay, the inspection is always free, and the work is done right or it&apos;s redone.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
