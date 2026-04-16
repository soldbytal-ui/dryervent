'use client';

import { useEffect, useState, useCallback } from 'react';
import { Badge } from '@/components/scale/Card';

type TaskLite = {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
};

type AgentLite = {
  id: string;
  name: string;
  role: string;
  model: string;
  provider: string;
  budgetMonthly: string | number;
  budgetSpent: string | number;
  heartbeatHours: number;
  lastHeartbeat: string | null;
  tools: string[];
  autoApprove: boolean;
  status: string;
  reportsToId: string | null;
  tasks: TaskLite[];
  _count: { tasks: number };
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'chart' | 'grid'>('chart');
  const [selected, setSelected] = useState<string | null>(null);
  const [firing, setFiring] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch('/api/admin/scale/agents')
      .then((r) => r.json())
      .then((d) => {
        setAgents(d.agents || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function fireHeartbeat(id: string) {
    setFiring(id);
    await fetch(`/api/admin/scale/agents/heartbeat?agentId=${id}`, { method: 'POST' });
    setFiring(null);
    load();
  }

  const totalActive = agents.filter((a) => a.status === 'active').length;
  const totalTasks = agents.reduce((s, a) => s + a._count.tasks, 0);
  const inProgress = agents.reduce((s, a) => s + a.tasks.filter((t) => t.status === 'in_progress').length, 0);
  const totalSpend = agents.reduce((s, a) => s + parseFloat(String(a.budgetSpent)), 0);

  const ceo = agents.find((a) => !a.reportsToId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-3xl text-navy">Agents</h1>
          <p className="text-sm text-gray-600 mt-1">AI agents operating the platform.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView(view === 'chart' ? 'grid' : 'chart')}
            className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-display font-bold"
          >
            {view === 'chart' ? 'Grid view' : 'Org chart'}
          </button>
          <button
            onClick={() => fetch('/api/admin/scale/agents/heartbeat?force=1', { method: 'POST' }).then(load)}
            className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-display font-bold"
          >
            Fire all heartbeats
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0B1D33] text-white p-5 rounded-2xl">
          <div className="text-xs font-display font-bold text-white/60 uppercase">Active</div>
          <div className="font-display font-black text-3xl text-fire-glow">{totalActive}</div>
        </div>
        <div className="bg-[#0B1D33] text-white p-5 rounded-2xl">
          <div className="text-xs font-display font-bold text-white/60 uppercase">Total tasks</div>
          <div className="font-display font-black text-3xl text-gold">{totalTasks}</div>
        </div>
        <div className="bg-[#0B1D33] text-white p-5 rounded-2xl">
          <div className="text-xs font-display font-bold text-white/60 uppercase">In progress</div>
          <div className="font-display font-black text-3xl text-sky-400">{inProgress}</div>
        </div>
        <div className="bg-[#0B1D33] text-white p-5 rounded-2xl">
          <div className="text-xs font-display font-bold text-white/60 uppercase">Spend (month)</div>
          <div className="font-display font-black text-3xl text-emerald-400">${totalSpend.toFixed(2)}</div>
        </div>
      </div>

      {loading && <div className="text-center py-12 text-gray-500">Loading…</div>}

      {!loading && view === 'chart' && ceo && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <AgentCard agent={ceo} onOpen={setSelected} onFire={fireHeartbeat} firing={firing === ceo.id} />
          <div className="mt-6 pl-8 border-l-2 border-dashed border-fire/40 space-y-3">
            {agents
              .filter((a) => a.reportsToId === ceo.id)
              .map((a) => (
                <AgentCard key={a.id} agent={a} onOpen={setSelected} onFire={fireHeartbeat} firing={firing === a.id} />
              ))}
          </div>
        </div>
      )}

      {!loading && view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} onOpen={setSelected} onFire={fireHeartbeat} firing={firing === a.id} />
          ))}
        </div>
      )}

      {/* Task queue */}
      <section>
        <h2 className="font-display font-black text-xl text-navy mb-3">Task queue</h2>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase font-display font-bold text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Task</th>
                <th className="text-left px-4 py-3">Agent</th>
                <th className="text-left px-4 py-3">Priority</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {agents.flatMap((a) =>
                a.tasks.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">{t.title}</td>
                    <td className="px-4 py-3 text-gray-600">{a.name}</td>
                    <td className="px-4 py-3">
                      <Badge tone={t.priority === 'high' ? 'red' : t.priority === 'medium' ? 'yellow' : 'gray'}>{t.priority}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={t.status === 'needs_approval' ? 'fire' : t.status === 'in_progress' ? 'blue' : 'gray'}>{t.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                )),
              )}
              {agents.every((a) => a.tasks.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-8">
                    No open tasks. Fire a heartbeat to have an agent generate work.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected && <AgentDetail agentId={selected} onClose={() => setSelected(null)} onChanged={load} />}
    </div>
  );
}

function AgentCard({
  agent,
  onOpen,
  onFire,
  firing,
}: {
  agent: AgentLite;
  onOpen: (id: string) => void;
  onFire: (id: string) => void;
  firing: boolean;
}) {
  const spent = parseFloat(String(agent.budgetSpent));
  const budget = parseFloat(String(agent.budgetMonthly));
  const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-4 hover:border-fire transition">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-display font-bold text-navy">{agent.name}</div>
          <div className="text-xs text-gray-500">{agent.model}</div>
        </div>
        <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-emerald-400' : 'bg-gray-300'}`} />
      </div>
      <div className="text-xs text-gray-600 mb-3 line-clamp-2">{agent.role}</div>

      <div className="text-xs text-gray-500 mb-1">Budget</div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
        <div className="h-full bg-fire" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-gray-500 mb-3">
        ${spent.toFixed(2)} / ${budget.toFixed(0)} · {agent.heartbeatHours}h heartbeat
      </div>

      <div className="text-xs text-gray-500 mb-3">
        {agent._count.tasks} task{agent._count.tasks !== 1 ? 's' : ''} total ·{' '}
        {agent.lastHeartbeat
          ? `last ran ${new Date(agent.lastHeartbeat).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric' })}`
          : 'never run'}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onOpen(agent.id)}
          className="flex-1 bg-navy text-white text-xs py-2 rounded-lg font-display font-bold hover:bg-navy-mid"
        >
          Open
        </button>
        <button
          onClick={() => onFire(agent.id)}
          disabled={firing}
          className="flex-1 bg-fire text-white text-xs py-2 rounded-lg font-display font-bold hover:bg-fire-dark disabled:opacity-50"
        >
          {firing ? 'Firing…' : 'Heartbeat'}
        </button>
      </div>
    </div>
  );
}

type AgentDetailData = {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  model: string;
  heartbeatHours: number;
  lastHeartbeat: string | null;
  budgetMonthly: string | number;
  budgetSpent: string | number;
  tools: string[];
  autoApprove: boolean;
  status: string;
  tasks: (TaskLite & { description: string; output: string | null })[];
  audits: { id: string; actionType: string; createdAt: string; tokensUsed: number | null; costUsd: string | null }[];
};

function AgentDetail({
  agentId,
  onClose,
  onChanged,
}: {
  agentId: string;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [agent, setAgent] = useState<AgentDetailData | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  useEffect(() => {
    fetch(`/api/admin/scale/agents/${agentId}`).then((r) => r.json()).then((d) => setAgent(d.agent));
  }, [agentId]);

  async function assign() {
    if (!newTaskTitle.trim() || !agent) return;
    await fetch(`/api/admin/scale/agents/${agent.id}/tasks`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: newTaskTitle, description: newTaskDesc, priority: 'medium' }),
    });
    setNewTaskTitle('');
    setNewTaskDesc('');
    const d = await fetch(`/api/admin/scale/agents/${agent.id}`).then((r) => r.json());
    setAgent(d.agent);
    onChanged();
  }

  const spent = agent ? parseFloat(String(agent.budgetSpent)) : 0;
  const budget = agent ? parseFloat(String(agent.budgetMonthly)) : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-black text-2xl text-navy">{agent?.name || 'Loading…'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500">
            ✕
          </button>
        </div>
        {agent && (
          <div className="p-6 space-y-6">
            <div className="text-sm text-gray-700">{agent.role}</div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">System prompt</div>
              <div className="text-xs text-gray-700 whitespace-pre-wrap max-h-40 overflow-auto">
                {agent.systemPrompt}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500">Model</div>
                <div className="font-bold">{agent.model}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Heartbeat</div>
                <div className="font-bold">every {agent.heartbeatHours}h</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Budget</div>
                <div className="font-bold">
                  ${spent.toFixed(2)} / ${budget.toFixed(0)}
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-fire" style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Tools</div>
                <div className="font-bold text-xs">{agent.tools.join(', ') || '—'}</div>
              </div>
            </div>

            <section>
              <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">Assign task</div>
              <div className="space-y-2">
                <input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <textarea
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <button
                  onClick={assign}
                  className="bg-fire text-white px-4 py-2 rounded-lg text-sm font-display font-bold hover:bg-fire-dark"
                >
                  Assign
                </button>
              </div>
            </section>

            <section>
              <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">Tasks</div>
              <div className="space-y-2">
                {agent.tasks.length === 0 ? (
                  <div className="text-xs text-gray-500">No tasks yet.</div>
                ) : (
                  agent.tasks.map((t) => (
                    <div key={t.id} className="bg-gray-50 rounded-lg p-3 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-navy">{t.title}</span>
                        <Badge tone={t.status === 'completed' ? 'green' : t.status === 'in_progress' ? 'blue' : 'gray'}>{t.status}</Badge>
                      </div>
                      <div className="text-gray-600 mb-1">{t.description.slice(0, 200)}</div>
                      {t.output && <div className="text-emerald-700 border-l-2 border-emerald-400 pl-2 mt-1">{t.output.slice(0, 200)}</div>}
                    </div>
                  ))
                )}
              </div>
            </section>

            <section>
              <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">Audit log</div>
              <div className="space-y-1 text-xs text-gray-600">
                {agent.audits.length === 0 ? (
                  <div>No activity logged yet.</div>
                ) : (
                  agent.audits.map((a) => (
                    <div key={a.id} className="flex justify-between">
                      <span>
                        {a.actionType} · {a.tokensUsed || 0} tokens
                      </span>
                      <span>{new Date(a.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
