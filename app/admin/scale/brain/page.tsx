'use client';

import { useEffect, useState, useCallback } from 'react';
import { BRAIN_CATEGORIES } from '@/lib/scale-brain';

type Rule = {
  id: string;
  category: string;
  text: string;
  active: boolean;
  createdAt: string;
};

export default function BrainPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [prompt, setPrompt] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(BRAIN_CATEGORIES[0]);
  const [newRuleText, setNewRuleText] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatting, setChatting] = useState(false);

  const load = useCallback(() => {
    fetch('/api/admin/scale/brain')
      .then((r) => r.json())
      .then((d) => {
        setRules(d.rules || []);
        setPrompt(d.prompt || '');
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const categoryCounts = BRAIN_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = rules.filter((r) => r.category === cat).length;
    return acc;
  }, {});

  const rulesInCat = rules.filter((r) => r.category === activeCategory);

  async function toggleRule(r: Rule) {
    await fetch(`/api/admin/scale/brain/${r.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ active: !r.active }),
    });
    load();
  }

  async function updateRule(r: Rule, text: string) {
    await fetch(`/api/admin/scale/brain/${r.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    load();
  }

  async function deleteRule(r: Rule) {
    if (!confirm('Delete this rule?')) return;
    await fetch(`/api/admin/scale/brain/${r.id}`, { method: 'DELETE' });
    load();
  }

  async function addRule() {
    if (!newRuleText.trim()) return;
    await fetch('/api/admin/scale/brain', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ category: activeCategory, text: newRuleText, active: true }),
    });
    setNewRuleText('');
    load();
  }

  async function sendChat() {
    if (!chatInput.trim()) return;
    const nextChat = [...chat, { role: 'user' as const, content: chatInput }];
    setChat(nextChat);
    setChatInput('');
    setChatting(true);
    const res = await fetch('/api/admin/scale/brain/test', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: nextChat }),
    });
    const data = await res.json();
    if (data.text) {
      setChat((c) => [...c, { role: 'assistant', content: data.text }]);
    } else {
      setChat((c) => [...c, { role: 'assistant', content: `Error: ${data.error || 'no response'}` }]);
    }
    setChatting(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-3xl text-navy">Agent Brain</h1>
        <p className="text-sm text-gray-600 mt-1">
          {rules.filter((r) => r.active).length} active rules · applied to every AI call in the system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_360px] gap-5">
        {/* Sidebar */}
        <div className="space-y-1">
          {BRAIN_CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-display font-semibold transition ${
                  active ? 'bg-navy text-white shadow-md' : 'bg-white text-navy hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="truncate">{cat}</span>
                  <span className={active ? 'text-white/60' : 'text-gray-400'}>{categoryCounts[cat] || 0}</span>
                </div>
              </button>
            );
          })}
          <button
            onClick={() => setShowPrompt(true)}
            className="w-full mt-4 bg-fire text-white py-2 rounded-lg text-sm font-display font-bold"
          >
            Preview prompt
          </button>
        </div>

        {/* Rules list */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-display font-bold text-lg text-navy mb-3">{activeCategory}</h3>
          <div className="space-y-2">
            {rulesInCat.length === 0 ? (
              <div className="text-sm text-gray-500 text-center py-8">No rules in this category. Add one below.</div>
            ) : (
              rulesInCat.map((r) => (
                <div
                  key={r.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    r.active ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <button
                    onClick={() => toggleRule(r)}
                    className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                      r.active ? 'bg-fire border-fire' : 'border-gray-300'
                    }`}
                  >
                    {r.active && <span className="text-white text-xs">✓</span>}
                  </button>
                  <textarea
                    defaultValue={r.text}
                    onBlur={(e) => e.target.value !== r.text && updateRule(r, e.target.value)}
                    rows={Math.min(4, Math.max(1, Math.ceil(r.text.length / 60)))}
                    className="flex-1 bg-white text-sm px-2 py-1 rounded border border-gray-200"
                  />
                  <button onClick={() => deleteRule(r)} className="text-xs text-red-500 hover:text-red-700">
                    delete
                  </button>
                </div>
              ))
            )}

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <textarea
                value={newRuleText}
                onChange={(e) => setNewRuleText(e.target.value)}
                placeholder="Add a rule to this category…"
                rows={2}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <button onClick={addRule} className="bg-fire text-white px-4 rounded-lg text-sm font-display font-bold">
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Test chat */}
        <div className="bg-[#0B1D33] text-white rounded-2xl p-5 flex flex-col h-[600px]">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center justify-between">
            Test agent
            <button
              onClick={() => setChat([])}
              className="text-xs text-white/40 hover:text-white/70"
            >
              clear
            </button>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 mb-3 text-sm">
            {chat.length === 0 ? (
              <div className="text-white/40 text-center mt-20">
                Send a message to test how the agent responds with the current Brain rules.
              </div>
            ) : (
              chat.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl ${
                    m.role === 'user' ? 'bg-white/10 ml-8' : 'bg-fire/20 mr-8 border border-fire/30'
                  }`}
                >
                  <div className="text-xs text-white/50 mb-1 uppercase font-bold">{m.role}</div>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              ))
            )}
            {chatting && <div className="text-white/40 text-xs">thinking…</div>}
          </div>
          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChat()}
              placeholder="Try: 'Write a Google headline about dryer fires'"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
            <button
              onClick={sendChat}
              disabled={chatting || !chatInput.trim()}
              className="bg-fire text-white px-4 rounded-lg text-sm font-display font-bold disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {showPrompt && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowPrompt(false)} />
          <div className="fixed inset-x-4 top-10 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[720px] bg-white rounded-2xl z-50 flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-display font-black text-xl text-navy">Assembled prompt</h3>
              <button onClick={() => setShowPrompt(false)} className="text-gray-500">
                ✕
              </button>
            </div>
            <pre className="flex-1 overflow-auto p-6 text-xs whitespace-pre-wrap bg-gray-50">{prompt}</pre>
            <div className="px-6 py-3 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(prompt);
                }}
                className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-display font-bold"
              >
                Copy prompt
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
