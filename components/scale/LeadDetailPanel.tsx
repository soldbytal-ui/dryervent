'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/scale/Card';

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  zip: string;
  city?: string | null;
  service: string;
  status: string;
  notes?: string | null;
  nextFollowUp?: string | null;
  assignedTo?: string | null;
  quotedAmount?: string | number | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  page?: string | null;
  referrer?: string | null;
  createdAt: string;
  updatedAt?: string;
};

const STATUSES = ['new', 'contacted', 'quoted', 'booked', 'complete', 'won', 'lost'];

function tone(s: string): 'blue' | 'yellow' | 'purple' | 'teal' | 'green' | 'gray' {
  return ({ new: 'blue', contacted: 'yellow', quoted: 'purple', booked: 'teal', complete: 'green', won: 'green', lost: 'gray' } as const)[
    s as 'new'
  ] || 'gray';
}

export default function LeadDetailPanel({
  leadId,
  onClose,
  onUpdate,
}: {
  leadId: string | null;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);
  const [noteDraft, setNoteDraft] = useState('');

  useEffect(() => {
    if (!leadId) return;
    setLead(null);
    fetch(`/api/admin/scale/leads/${leadId}`)
      .then((r) => r.json())
      .then((d) => setLead(d.lead));
  }, [leadId]);

  if (!leadId) return null;

  async function patch(update: Partial<Lead>) {
    if (!lead) return;
    setSaving(true);
    const res = await fetch(`/api/admin/scale/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(update),
    });
    const d = await res.json();
    if (d.lead) setLead(d.lead);
    onUpdate();
    setSaving(false);
  }

  async function addNote() {
    if (!noteDraft.trim() || !lead) return;
    const stamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const next = (lead.notes ? lead.notes + '\n\n' : '') + `[${stamp}] ${noteDraft.trim()}`;
    await patch({ notes: next });
    setNoteDraft('');
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 uppercase font-display font-bold tracking-wider">Lead detail</div>
            <h2 className="font-display font-black text-2xl text-navy">
              {lead?.name || 'Loading…'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            ✕
          </button>
        </div>

        {lead ? (
          <div className="p-6 space-y-6">
            {/* Status + Quick actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge tone={tone(lead.status)}>{lead.status}</Badge>
              <select
                value={lead.status}
                onChange={(e) => patch({ status: e.target.value })}
                disabled={saving}
                className="text-xs bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 font-semibold"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    Move to: {s}
                  </option>
                ))}
              </select>
              {saving && <span className="text-xs text-gray-500">saving…</span>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${lead.phone}`}
                className="bg-fire hover:bg-fire-dark text-white text-center py-2 rounded-lg font-display font-bold text-sm"
              >
                📞 Call
              </a>
              <a
                href={`sms:${lead.phone}`}
                className="bg-navy hover:bg-navy-mid text-white text-center py-2 rounded-lg font-display font-bold text-sm"
              >
                💬 SMS
              </a>
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="col-span-2 bg-gray-100 hover:bg-gray-200 text-navy text-center py-2 rounded-lg font-display font-bold text-sm"
                >
                  ✉ Email {lead.email}
                </a>
              )}
            </div>

            {/* Contact */}
            <section>
              <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">Contact</h3>
              <dl className="text-sm space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Phone</dt>
                  <dd className="font-semibold">{lead.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-semibold">{lead.email || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">ZIP</dt>
                  <dd className="font-semibold">{lead.zip}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">City</dt>
                  <dd className="font-semibold">{lead.city || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Service</dt>
                  <dd className="font-semibold">{lead.service}</dd>
                </div>
              </dl>
            </section>

            {/* Quoted amount (when quoted) */}
            {(lead.status === 'quoted' || lead.status === 'booked' || lead.status === 'won') && (
              <section>
                <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">Quote</h3>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={lead.quotedAmount ? String(lead.quotedAmount) : ''}
                  placeholder="Quoted amount"
                  onBlur={(e) => patch({ quotedAmount: e.target.value as unknown as number })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </section>
            )}

            {/* Follow-up */}
            <section>
              <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">Next follow-up</h3>
              <input
                type="datetime-local"
                defaultValue={lead.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().slice(0, 16) : ''}
                onBlur={(e) => patch({ nextFollowUp: e.target.value as unknown as string })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </section>

            {/* Assigned to */}
            <section>
              <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">Assigned to</h3>
              <input
                type="text"
                defaultValue={lead.assignedTo || ''}
                placeholder="Owner"
                onBlur={(e) => patch({ assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </section>

            {/* Attribution */}
            <section>
              <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">Attribution</h3>
              <dl className="text-xs space-y-1 text-gray-600">
                <div className="flex justify-between"><dt>Source</dt><dd>{lead.source || '—'}</dd></div>
                <div className="flex justify-between"><dt>Medium</dt><dd>{lead.medium || '—'}</dd></div>
                <div className="flex justify-between"><dt>Campaign</dt><dd>{lead.campaign || '—'}</dd></div>
                <div className="flex justify-between"><dt>Landing page</dt><dd className="truncate max-w-[60%]">{lead.page || '—'}</dd></div>
                <div className="flex justify-between"><dt>Referrer</dt><dd className="truncate max-w-[60%]">{lead.referrer || '—'}</dd></div>
              </dl>
            </section>

            {/* Activity / notes */}
            <section>
              <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">Activity</h3>
              <div className="flex gap-2 mb-3">
                <input
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNote()}
                  placeholder="Log a note or activity…"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <button
                  onClick={addNote}
                  className="bg-navy text-white px-4 rounded-lg text-sm font-display font-bold"
                >
                  Add
                </button>
              </div>
              <div className="text-xs text-gray-600 whitespace-pre-wrap bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                {lead.notes || 'No activity yet.'}
              </div>
            </section>

            <section className="text-xs text-gray-500 pt-4 border-t border-gray-100">
              Created {new Date(lead.createdAt).toLocaleString()}
            </section>
          </div>
        ) : (
          <div className="p-6 text-gray-500">Loading…</div>
        )}
      </div>
    </>
  );
}
