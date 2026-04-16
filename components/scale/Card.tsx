import type { ReactNode } from 'react';

export function Card({
  children,
  dark = true,
  className = '',
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const base = dark
    ? 'bg-[#0B1D33] text-white border border-white/10'
    : 'bg-white text-navy border border-gray-200';
  return <div className={`rounded-2xl shadow-lg ${base} ${className}`}>{children}</div>;
}

export function MetricCard({
  label,
  value,
  sublabel,
  accent = 'fire',
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: 'fire' | 'gold' | 'green' | 'blue';
}) {
  const accents: Record<string, string> = {
    fire: 'text-fire-glow',
    gold: 'text-gold',
    green: 'text-emerald-400',
    blue: 'text-sky-400',
  };
  return (
    <Card className="p-6">
      <div className="text-xs font-display font-bold text-white/60 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className={`font-display font-black text-4xl ${accents[accent]}`}>{value}</div>
      {sublabel && <div className="text-xs text-white/50 mt-1">{sublabel}</div>}
    </Card>
  );
}

export function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-display font-black text-2xl text-navy">{title}</h2>
      {sub && <p className="text-sm text-gray-600 mt-1">{sub}</p>}
    </div>
  );
}

export function Badge({
  children,
  tone = 'gray',
}: {
  children: ReactNode;
  tone?: 'gray' | 'blue' | 'yellow' | 'purple' | 'teal' | 'green' | 'red' | 'fire';
}) {
  const tones: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    teal: 'bg-teal-100 text-teal-800',
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-red-100 text-red-800',
    fire: 'bg-orange-100 text-fire',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-display font-bold uppercase tracking-wider ${tones[tone]}`}>
      {children}
    </span>
  );
}
