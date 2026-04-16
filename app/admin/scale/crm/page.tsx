'use client';

import { useEffect, useState, useCallback } from 'react';
import LeadDetailPanel, { type Lead } from '@/components/scale/LeadDetailPanel';
import CrmBoard from '@/components/scale/CrmBoard';
import { Badge } from '@/components/scale/Card';

function tone(s: string): 'blue' | 'yellow' | 'purple' | 'teal' | 'green' | 'gray' {
  return ({ new: 'blue', contacted: 'yellow', quoted: 'purple', booked: 'teal', complete: 'green', won: 'green', lost: 'gray' } as const)[
    s as 'new'
  ] || 'gray';
}

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [view, setView] = useState<'board' | 'table'>('board');
  const [loading, setLoading] = useState(true);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set('status', statusFilter);
    if (search) params.set('q', search);
    fetch(`/api/admin/scale/leads?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setLeads(d.leads || []);
        setLoading(false);
      });
  }, [statusFilter, search]);

  useEffect(() => {
    // Seed on first load if empty
    fetch('/api/admin/scale/leads?')
      .then((r) => r.json())
      .then((d) => {
        if (!d.leads || d.leads.length === 0) {
          fetch('/api/admin/scale/leads/seed', { method: 'POST' }).then(() => load());
        } else {
          load();
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-3xl text-navy">CRM</h1>
          <p className="text-sm text-gray-600 mt-1">{leads.length} leads in pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === 'board' ? 'table' : 'board')}
            className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-display font-bold"
          >
            {view === 'board' ? 'Table view' : 'Board view'}
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-fire text-white px-4 py-2 rounded-lg text-sm font-display font-bold hover:bg-fire-dark"
          >
            + Add Lead
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input
          placeholder="Search name, phone, email, zip…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quoted">Quoted</option>
          <option value="booked">Booked</option>
          <option value="complete">Complete</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading…</div>
      ) : view === 'board' ? (
        <CrmBoard leads={leads} onOpen={setDetailId} onRefresh={load} />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase font-display font-bold text-gray-600 tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">City</th>
                  <th className="text-left px-4 py-3">Service</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Source</th>
                  <th className="text-left px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setDetailId(l.id)}
                    className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-semibold">{l.name}</td>
                    <td className="px-4 py-3">{l.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{l.email || '—'}</td>
                    <td className="px-4 py-3">{l.city || '—'}</td>
                    <td className="px-4 py-3">{l.service}</td>
                    <td className="px-4 py-3">
                      <Badge tone={tone(l.status)}>{l.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{l.source || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-12">
                      No leads match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <LeadDetailPanel leadId={detailId} onClose={() => setDetailId(null)} onUpdate={load} />

      {showAdd && <AddLeadModal onClose={() => setShowAdd(false)} onCreated={load} />}
    </div>
  );
}

function AddLeadModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    await fetch('/api/admin/scale/leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    onCreated();
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl pointer-events-auto">
          <h2 className="font-display font-black text-xl text-navy mb-4">Add lead</h2>
          <form onSubmit={submit} className="space-y-3">
            <input name="name" required placeholder="Full name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <input name="phone" required placeholder="Phone" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <input name="email" placeholder="Email (optional)" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <div className="grid grid-cols-2 gap-2">
              <input name="zip" required placeholder="ZIP" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              <input name="city" placeholder="City" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
            <select name="service" defaultValue="cleaning" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
              <option value="cleaning">Dryer Vent Cleaning</option>
              <option value="repair">Vent Repair</option>
              <option value="installation">New Installation</option>
              <option value="inspection">Vent Inspection</option>
              <option value="commercial">Commercial</option>
            </select>
            <textarea name="notes" placeholder="Notes" rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            <div className="flex gap-2 justify-end pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-display font-bold text-gray-600">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-fire text-white px-4 py-2 rounded-lg text-sm font-display font-bold hover:bg-fire-dark disabled:opacity-50"
              >
                {submitting ? 'Adding…' : 'Add lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
