import { Star } from 'lucide-react';
import { reviews as allReviews } from '@/lib/reviews';

type Props = { city?: string; max?: number };

export default function Reviews({ city, max = 3 }: Props) {
  const filtered = city
    ? allReviews.filter((r) => r.city.toLowerCase() === city.toLowerCase()).concat(
        allReviews.filter((r) => r.city.toLowerCase() !== city.toLowerCase())
      )
    : allReviews;

  const display = filtered.slice(0, max);

  return (
    <section className="bg-navy text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(232,69,14,0.08), transparent 60%)',
      }} />
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold font-display font-bold text-xs uppercase tracking-widest mb-3">
            ⭐ CUSTOMER REVIEWS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-3">
            Trusted by 847+ Tampa Bay Homeowners
          </h2>
          <p className="text-white/65 max-w-xl mx-auto">Real reviews from real customers across the Tampa Bay area.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {display.map((r, i) => (
            <div
              key={i}
              className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 backdrop-blur hover:bg-white/[0.10] transition-all hover:-translate-y-1"
            >
              <div className="flex gap-0.5 text-gold mb-3">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-white/85 italic leading-relaxed mb-5 text-sm">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-fire to-gold rounded-full flex items-center justify-center font-display font-bold text-white text-sm">
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-white/50">{r.city}, FL</div>
                  <div className="text-[0.65rem] text-white/40 mt-0.5">via {r.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
