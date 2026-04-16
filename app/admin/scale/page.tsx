import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Card, MetricCard, SectionHeading, Badge } from '@/components/scale/Card';
import { googleAdsConfigured, getGoogleAccount } from '@/lib/scale-google-ads';
import { metaAdsConfigured, getMetaAccount } from '@/lib/scale-meta-ads';

export const revalidate = 30;

async function loadDashboardData() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const [total, thisWeek, unworked, wonCount, recentLeads, brainCount, agentsCount] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.lead.count({ where: { status: 'new' } }),
      prisma.lead.count({ where: { status: 'won' } }),
      prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.brainRule.count({ where: { active: true } }),
      prisma.agent.count({ where: { status: 'active' } }),
    ]);
    const conversionRate = total > 0 ? Math.round((wonCount / total) * 1000) / 10 : 0;
    return { total, thisWeek, unworked, conversionRate, recentLeads, brainCount, agentsCount };
  } catch {
    return { total: 0, thisWeek: 0, unworked: 0, conversionRate: 0, recentLeads: [], brainCount: 0, agentsCount: 0 };
  }
}

const QUICK_ACTIONS = [
  { href: '/admin/scale/campaigns?type=google-search', label: 'Google Search', desc: 'Service × area campaigns', accent: 'bg-blue-500' },
  { href: '/admin/scale/campaigns?type=google-lsa', label: 'Local Services Ads', desc: 'Pay per verified lead', accent: 'bg-emerald-500' },
  { href: '/admin/scale/campaigns?type=meta-lead-gen', label: 'Meta Lead Gen', desc: 'Facebook + Instagram', accent: 'bg-sky-500' },
  { href: '/admin/scale/campaigns?type=nextdoor', label: 'Nextdoor', desc: 'Neighborhood targeting', accent: 'bg-teal-500' },
  { href: '/admin/scale/campaigns?type=google-display', label: 'Seasonal Promo', desc: 'Retargeting display', accent: 'bg-purple-500' },
  { href: '/admin/scale/campaigns?type=custom', label: 'Custom Campaign', desc: 'Free-form brief', accent: 'bg-fire' },
];

function statusTone(s: string) {
  return (
    { new: 'blue', contacted: 'yellow', quoted: 'purple', booked: 'teal', complete: 'green', won: 'green', lost: 'gray' } as const
  )[s as 'new'] || 'gray';
}

export default async function ScaleDashboard() {
  const data = await loadDashboardData();
  const [googleAcct, metaAcct] = await Promise.all([
    getGoogleAccount().catch(() => null),
    getMetaAccount().catch(() => null),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display font-black text-3xl text-navy">Scale Control Room</h1>
        <p className="text-sm text-gray-600 mt-1">AI ad ops, CRM, and agent orchestration for Dry Vent Tampa.</p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <MetricCard label="Total Leads" value={data.total} accent="fire" />
        <MetricCard label="Leads This Week" value={data.thisWeek} accent="gold" sublabel="last 7 days" />
        <MetricCard label="New (Unworked)" value={data.unworked} accent="blue" sublabel="status = new" />
        <MetricCard label="Conversion Rate" value={`${data.conversionRate}%`} accent="green" sublabel="won ÷ total" />
      </div>

      {/* Quick actions */}
      <section>
        <SectionHeading title="Quick Actions" sub="Start a new campaign in under 30 seconds." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-fire hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <div className={`w-10 h-10 rounded-lg ${a.accent} mb-3`} />
              <div className="font-display font-bold text-navy">{a.label}</div>
              <div className="text-xs text-gray-600 mt-1">{a.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent leads */}
      <section>
        <SectionHeading title="Recent Leads" sub="Last 10 submissions." />
        <Card dark={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase font-display font-bold text-gray-600 tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">City</th>
                  <th className="text-left px-4 py-3">Service</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {data.recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-12">
                      No leads yet. Leads from the public site will appear here.
                    </td>
                  </tr>
                ) : (
                  data.recentLeads.map((l) => (
                    <tr key={l.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{l.name}</td>
                      <td className="px-4 py-3">{l.phone}</td>
                      <td className="px-4 py-3">{l.city || '—'}</td>
                      <td className="px-4 py-3">{l.service}</td>
                      <td className="px-4 py-3">
                        <Badge tone={statusTone(l.status)}>{l.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-right">
            <Link href="/admin/scale/crm" className="text-fire text-sm font-display font-bold">
              View full CRM →
            </Link>
          </div>
        </Card>
      </section>

      {/* Split row */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="text-xs font-display font-bold text-white/60 uppercase tracking-wider mb-3">
            Agent Brain
          </div>
          <div className="font-display font-black text-3xl text-gold mb-2">{data.brainCount} active rules</div>
          <div className="text-sm text-white/70 mb-4">
            Active agents: {data.agentsCount}. Agents use the Brain as their operating rulebook on every task.
          </div>
          <Link href="/admin/scale/brain" className="text-fire-glow text-sm font-display font-bold">
            Edit rules →
          </Link>
        </Card>

        <Card className="p-6">
          <div className="text-xs font-display font-bold text-white/60 uppercase tracking-wider mb-3">
            Connections
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-white/80">Google Ads</span>
              <span className={googleAcct ? 'text-emerald-400 font-bold' : 'text-white/40'}>
                {googleAcct
                  ? `Connected${googleAcct.email ? ` · ${googleAcct.email}` : ''}`
                  : googleAdsConfigured()
                    ? 'Ready to connect'
                    : 'Not configured'}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-white/80">Meta Ads</span>
              <span className={metaAcct ? 'text-emerald-400 font-bold' : 'text-white/40'}>
                {metaAcct
                  ? `Connected${metaAcct.email ? ` · ${metaAcct.email}` : ''}`
                  : metaAdsConfigured()
                    ? 'Ready to connect'
                    : 'Not configured'}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-white/80">AI Provider</span>
              <span className={process.env.ANTHROPIC_API_KEY ? 'text-emerald-400 font-bold' : 'text-white/40'}>
                {process.env.ANTHROPIC_API_KEY
                  ? 'Anthropic Direct'
                  : process.env.OPENROUTER_API_KEY
                    ? 'OpenRouter'
                    : 'Not configured'}
              </span>
            </li>
          </ul>
          <div className="mt-4">
            <Link href="/admin/scale/settings" className="text-fire-glow text-sm font-display font-bold">
              Manage connections →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
