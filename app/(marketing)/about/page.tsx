import { buildMetadata } from '@/lib/seo';
import { ShieldCheck, Award, Users, Clock } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import TrustBar from '@/components/TrustBar';

export const metadata = buildMetadata({
  title: 'About Dry Vent Tampa | Florida\'s Trusted Dryer Vent Experts',
  description: 'Learn about Dry Vent Tampa — Florida\'s most trusted dryer vent cleaning company. Licensed, insured, 11+ years serving Tampa Bay with 847+ five-star reviews.',
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
            Tampa Bay's Most <em className="not-italic text-fire-glow">Trusted</em> Dryer Vent Company
          </h1>
          <p className="text-xl text-white/75 leading-relaxed">
            Since 2015, we've cleaned over 15,000 dryer vents across Tampa Bay — protecting homes, saving energy, and giving Florida families peace of mind.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="bg-white py-20">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display font-extrabold text-3xl text-navy mb-5">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Dry Vent Tampa was founded on a simple mission: protect Florida families from one of the most preventable home disasters — dryer fires. After witnessing how many Tampa Bay homes were operating with dangerously clogged vents, our founder assembled a team of certified professionals dedicated to doing dryer vent cleaning the right way.
            </p>
            <p className="text-gray-700 leading-relaxed mb-10">
              Today, we're the go-to choice for homeowners, property managers, HOAs, and commercial property owners across the Tampa Bay metropolitan area. We use commercial-grade equipment, follow NFPA 211 standards, and stand behind every job with a satisfaction guarantee.
            </p>

            <h2 className="font-display font-extrabold text-3xl text-navy mb-5">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-5 not-prose mb-10">
              {[
                { icon: ShieldCheck, title: 'Licensed & Insured', desc: 'Fully licensed and insured in Florida. Documentation provided on request.' },
                { icon: Award, title: 'Certified Technicians', desc: 'Every tech is background-checked and trained to NFPA 211 standards.' },
                { icon: Users, title: '847+ Five-Star Reviews', desc: 'Consistently rated 4.9/5 across Google, Yelp, and Facebook.' },
                { icon: Clock, title: 'Same-Day Service', desc: 'Call in the morning, cleaned by afternoon. Most jobs done in under an hour.' },
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
              Every Dry Vent Tampa technician follows the same 5-point protocol on every job: full system inspection, containment setup, rotary brush cleaning, airflow verification, and written documentation. You get photos, measurements, and a clear report showing exactly what we did.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you aren't completely satisfied, we'll come back at no charge until you are. That's our guarantee, and it's backed by 11 years of doing right by our customers across Tampa Bay.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
