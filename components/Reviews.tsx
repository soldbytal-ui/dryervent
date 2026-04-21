import { Star, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

type Props = { city?: string; max?: number };

// Note: `city` and `max` props are accepted for API compatibility with existing
// call sites (area pages pass them). They're currently unused because we're not
// displaying customer reviews until real Google/BBB reviews have been collected.
// Once real reviews exist, re-wire this component to fetch + filter them — and
// re-add aggregateRating to lib/schema.ts at the same time.
//
// This component replaces the previous "Trusted by 847+ Tampa Bay Homeowners"
// block, which displayed unverified review counts and placeholder testimonials.

export default function Reviews(_props: Props) {
  void _props;
  const signals = [
    {
      icon: ShieldCheck,
      title: 'Locally Owned & Operated',
      desc: 'Not a national franchise. Your neighbors run this business — one team, one phone, one set of hands on every job.',
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Pricing Published On-Site',
      desc: 'From $79 for the first 10 feet plus $10 per additional foot. No phone-quote dance. No surprise fees.',
    },
    {
      icon: Star,
      title: 'Free Camera-Scope Inspection',
      desc: 'Camera scope, airflow test, written assessment — at no cost, with no obligation. Book at (813) 744-1127.',
    },
    {
      icon: Flame,
      title: 'Licensed & Insured in Florida',
      desc: 'Florida contractor license on file. Insurance certificates available on request for HOA and commercial work.',
    },
  ];

  return (
    <section className="bg-navy text-white py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(232,69,14,0.08), transparent 60%)',
        }}
      />
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold font-display font-bold text-xs uppercase tracking-widest mb-3">
            WHY HOMEOWNERS CHOOSE AIRFLOW
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-3">
            The Airflow Difference
          </h2>
          <p className="text-white/65 max-w-xl mx-auto">
            New to Tampa Bay&apos;s dryer vent scene — built on transparency, not on review counts we can&apos;t verify.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 backdrop-blur hover:bg-white/[0.10] transition-all hover:-translate-y-1"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-fire to-gold rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-white/40 mt-10 max-w-2xl mx-auto">
          Customer review snapshots from Google Business Profile will appear here as we collect them.
          Be one of our first Tampa Bay reviews — we&apos;ll earn it.
        </p>
      </div>
    </section>
  );
}
