const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';

type Props = { headline?: string; sub?: string };

export default function FinalCTA({
  headline = 'Protect Your Home Today.\nBook Your Free Estimate.',
  sub = 'Join 15,000+ Tampa Bay homeowners who trust Airflow Dryer Vent Cleaning to keep their families safe.',
}: Props) {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-light py-20 relative overflow-hidden text-center">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(232,69,14,0.16), transparent 70%)',
      }} />
      <div className="container-custom relative z-10">
        <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4 whitespace-pre-line">
          {headline}
        </h2>
        <p className="text-white/70 text-lg mb-9 max-w-xl mx-auto">{sub}</p>
        <a href="#quote" className="btn-primary text-lg px-10 py-5">
          🔥 Get My Free Estimate Now
        </a>
        <p className="text-white/60 mt-5 text-sm">
          or call us directly: <a href={`tel:${PHONE}`} className="text-gold font-bold text-lg ml-1">{PHONE_DISPLAY}</a>
        </p>
      </div>
    </section>
  );
}
