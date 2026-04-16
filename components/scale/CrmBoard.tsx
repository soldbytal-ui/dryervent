'use client';

import { useState } from 'react';
import type { Lead } from './LeadDetailPanel';

const COLUMNS = [
  { key: 'new', label: 'New', color: 'border-blue-400', dot: 'bg-blue-400' },
  { key: 'contacted', label: 'Contacted', color: 'border-yellow-400', dot: 'bg-yellow-400' },
  { key: 'quoted', label: 'Quoted', color: 'border-purple-400', dot: 'bg-purple-400' },
  { key: 'booked', label: 'Booked', color: 'border-teal-400', dot: 'bg-teal-400' },
  { key: 'complete', label: 'Complete', color: 'border-emerald-400', dot: 'bg-emerald-400' },
  { key: 'lost', label: 'Lost', color: 'border-gray-400', dot: 'bg-gray-400' },
];

function daysAgo(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

export default function CrmBoard({
  leads,
  onOpen,
  onRefresh,
}: {
  leads: Lead[];
  onOpen: (id: string) => void;
  onRefresh: () => void;
}) {
  const [dragId, setDragId] = useState<string | null>(null);

  const byStatus: Record<string, Lead[]> = {};
  for (const c of COLUMNS) byStatus[c.key] = [];
  for (const l of leads) {
    const col = byStatus[l.status] ? l.status : 'new';
    byStatus[col].push(l);
  }

  async function moveTo(status: string) {
    if (!dragId) return;
    await fetch(`/api/admin/scale/leads/${dragId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setDragId(null);
    onRefresh();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto">
      {COLUMNS.map((col) => (
        <div
          key={col.key}
          className={`bg-white rounded-2xl border-t-4 ${col.color} border-x border-b border-gray-200 min-h-[400px]`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => moveTo(col.key)}
        >
          <div className="px-3 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${col.dot}`} />
              <span className="font-display font-bold text-sm text-navy">{col.label}</span>
            </div>
            <span className="text-xs text-gray-500 font-semibold">{byStatus[col.key].length}</span>
          </div>
          <div className="p-2 space-y-2">
            {byStatus[col.key].map((lead) => (
              <div
                key={lead.id}
                draggable
                onDragStart={() => setDragId(lead.id)}
                onClick={() => onOpen(lead.id)}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-3 cursor-pointer hover:border-fire hover:shadow-md transition"
              >
                <div className="font-display font-bold text-sm text-navy truncate">{lead.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{lead.phone}</div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-gray-600">{lead.city || '—'}</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{lead.service}</span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1.5">
                  {daysAgo(lead.createdAt)}d ago
                </div>
              </div>
            ))}
            {byStatus[col.key].length === 0 && (
              <div className="text-center text-xs text-gray-400 py-6">Drop here</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
