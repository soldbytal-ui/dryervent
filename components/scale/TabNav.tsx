'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin/scale', label: 'Dashboard', exact: true },
  { href: '/admin/scale/crm', label: 'CRM' },
  { href: '/admin/scale/campaigns', label: 'Campaigns' },
  { href: '/admin/scale/agents', label: 'Agents' },
  { href: '/admin/scale/brain', label: 'Agent Brain' },
  { href: '/admin/scale/settings', label: 'Settings' },
];

export default function TabNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };
  return (
    <nav className="bg-navy border-b border-white/10 sticky top-0 z-40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          <Link href="/admin/scale" className="font-display font-black text-white text-sm mr-6 tracking-tight">
            <span className="text-fire-glow">DVT</span> Scale
          </Link>
          {TABS.map((t) => {
            const active = isActive(t.href, t.exact);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={
                  'px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition ' +
                  (active
                    ? 'bg-fire text-white shadow-md shadow-fire/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5')
                }
              >
                {t.label}
              </Link>
            );
          })}
        </div>
        <Link
          href="/"
          className="text-xs text-white/60 hover:text-fire-glow font-display font-semibold transition"
        >
          ← Back to Site
        </Link>
      </div>
    </nav>
  );
}
