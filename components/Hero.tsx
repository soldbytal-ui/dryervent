import { Star, Phone, Calendar, ShieldCheck, Award } from 'lucide-react';
import LeadForm from './LeadForm';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';

type Props = {
  badge?: string;
  title: React.ReactNode;
  subtitle: string;
  city?: string;
  defaultService?: string;
};

export default function Hero({ badge, title, subtitle, city, defaultService }: Props) {
  return (
    <section className="bg-gradient-to-br from-navy via-navy-mid to-navy-light relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32">
      {/* Background atmospherics */}
      <div className="absolute inset-0 opacity-100" style={{
        background: 'radial-gradient(ellipse at 70% 20%, rgba(232,69,14,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(232,69,14,0.07) 0%, transparent 50%)',
      }} />

      {/* Diagonal cut at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
      }} />

      <div className="container-custom grid lg:grid-cols-[1fr_440px] gap-12 items-center relative z-10">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs text-gold font-semibold backdrop-blur mb-5 animate-fade-in">
              <Star size={14} fill="currentColor" />
              {badge}
            </div>
          )}

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mb-5 animate-fade-up">
            {title}
          </h1>

          <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '0.15s' }}>
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <a href="#quote" className="btn-primary">
              <Calendar size={18} />
              Get Free Estimate
            </a>
            <a href={`tel:${PHONE}`} className="btn-secondary">
              <Phone size={18} />
              Call Now
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-8 animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <ShieldCheck size={18} className="text-green-400" />
              Same-Day Service
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <ShieldCheck size={18} className="text-green-400" />
              Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
              <Award size={18} className="text-green-400" />
              Free On-Site Inspection
            </div>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <LeadForm defaultCity={city} />
        </div>
      </div>
    </section>
  );
}
