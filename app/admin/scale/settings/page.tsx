'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCALE_MODELS } from '@/lib/scale-ai';

type GoogleStatus = {
  configured: boolean;
  connected: boolean;
  email: string | null;
  customerId: string | null;
  devTokenSet: boolean;
};

type MetaStatus = {
  configured: boolean;
  connected: boolean;
  email: string | null;
  adAccountId: string | null;
};

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading settings…</div>}>
      <SettingsInner />
    </Suspense>
  );
}

function SettingsInner() {
  const search = useSearchParams();
  const googleMsg = search.get('google') || search.get('google_error');
  const metaMsg = search.get('meta') || search.get('meta_error');

  const [google, setGoogle] = useState<GoogleStatus | null>(null);
  const [meta, setMeta] = useState<MetaStatus | null>(null);

  const [aiConfig, setAiConfig] = useState({
    provider: 'anthropic' as 'anthropic' | 'openrouter',
    model: 'claude-haiku-4-5-20251001',
    apiKey: '',
  });
  const [testResult, setTestResult] = useState<{ ok?: boolean; msg?: string } | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/scale/google/status').then((r) => r.json()).then(setGoogle);
    fetch('/api/admin/scale/meta/status').then((r) => r.json()).then(setMeta);
    try {
      const saved = localStorage.getItem('scale-model-config');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAiConfig((c) => ({ ...c, ...parsed }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  function saveAiConfig() {
    localStorage.setItem('scale-model-config', JSON.stringify(aiConfig));
  }

  async function testAi() {
    setTesting(true);
    setTestResult(null);
    const res = await fetch('/api/admin/scale/ai-test', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ provider: aiConfig.provider, model: aiConfig.model }),
    });
    const data = await res.json();
    if (data.error) {
      setTestResult({ ok: false, msg: data.error });
    } else if (data.text) {
      setTestResult({ ok: true, msg: `Response: ${data.text.trim()} · ${data.tokensUsed} tokens · $${(data.costUsd || 0).toFixed(5)}` });
    } else {
      setTestResult({ ok: false, msg: 'No text returned' });
    }
    setTesting(false);
  }

  async function disconnect(provider: 'google' | 'meta') {
    if (!confirm(`Disconnect ${provider}?`)) return;
    await fetch(`/api/admin/scale/ad-account/${provider}`, { method: 'DELETE' });
    fetch('/api/admin/scale/google/status').then((r) => r.json()).then(setGoogle);
    fetch('/api/admin/scale/meta/status').then((r) => r.json()).then(setMeta);
  }

  const modelsForProvider = SCALE_MODELS.filter((m) => m.provider === aiConfig.provider);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-black text-3xl text-navy">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">AI provider and ad platform connections.</p>
      </div>

      {/* AI Provider */}
      <section>
        <h2 className="font-display font-black text-xl text-navy mb-3">AI Provider</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {(['anthropic', 'openrouter'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setAiConfig((c) => ({ ...c, provider: p, model: SCALE_MODELS.find((m) => m.provider === p)!.id }))}
              className={`text-left p-4 rounded-2xl border-2 transition ${
                aiConfig.provider === p ? 'border-fire bg-orange-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="font-display font-bold text-navy">{p === 'anthropic' ? 'Anthropic Direct' : 'OpenRouter'}</div>
              <div className="text-xs text-gray-600 mt-1">
                {p === 'anthropic'
                  ? 'Requires ANTHROPIC_API_KEY env var'
                  : 'Unified gateway to many models; requires OPENROUTER_API_KEY'}
              </div>
            </button>
          ))}
          <div className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50">
            <div className="font-display font-bold text-navy opacity-60">OpenRouter Free</div>
            <div className="text-xs text-gray-500 mt-1">
              Select a <code className="bg-white px-1 rounded">:free</code> model in the dropdown — still requires an OpenRouter account.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
          <label className="block">
            <div className="text-xs font-display font-bold text-gray-500 uppercase mb-1">Model</div>
            <select
              value={aiConfig.model}
              onChange={(e) => setAiConfig((c) => ({ ...c, model: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              {modelsForProvider.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} · {m.tierCost}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <div className="text-xs font-display font-bold text-gray-500 uppercase mb-1">API key override (stored in localStorage only)</div>
            <input
              type="password"
              value={aiConfig.apiKey}
              onChange={(e) => setAiConfig((c) => ({ ...c, apiKey: e.target.value }))}
              placeholder="Leave blank to use server env var"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
            />
            <div className="text-xs text-gray-500 mt-1">
              Server calls use the env var. This field is for client-side records only.
            </div>
          </label>
          <div className="flex items-center gap-2">
            <button onClick={saveAiConfig} className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-display font-bold">
              Save config
            </button>
            <button
              onClick={testAi}
              disabled={testing}
              className="bg-fire text-white px-4 py-2 rounded-lg text-sm font-display font-bold disabled:opacity-50"
            >
              {testing ? 'Testing…' : 'Test connection'}
            </button>
          </div>
          {testResult && (
            <div className={`text-xs p-3 rounded-lg ${testResult.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {testResult.msg}
            </div>
          )}
        </div>
      </section>

      {/* Google Ads */}
      <section>
        <h2 className="font-display font-black text-xl text-navy mb-3">Google Ads</h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          {googleMsg && (
            <div
              className={`mb-3 p-3 rounded-lg text-xs ${
                googleMsg === 'connected' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {googleMsg === 'connected' ? 'Google Ads connected!' : `Google OAuth error: ${googleMsg}`}
            </div>
          )}
          {google ? (
            <>
              <dl className="text-sm space-y-1 mb-4">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Credentials</dt>
                  <dd className="font-bold">{google.configured ? '✓ Set' : '✗ Missing GOOGLE_ADS_CLIENT_ID / SECRET / DEVELOPER_TOKEN'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Dev token</dt>
                  <dd className="font-bold">{google.devTokenSet ? '✓ Set' : '✗ Missing GOOGLE_ADS_DEVELOPER_TOKEN'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Connection</dt>
                  <dd className="font-bold">
                    {google.connected
                      ? `${google.email || 'connected'}${google.customerId ? ` · ${google.customerId}` : ''}`
                      : 'Not connected'}
                  </dd>
                </div>
              </dl>
              <div className="flex gap-2">
                <a
                  href="/api/admin/scale/google/auth"
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-display font-bold ${
                    google.configured ? 'bg-fire text-white hover:bg-fire-dark' : 'bg-gray-200 text-gray-500 pointer-events-none'
                  }`}
                >
                  {google.connected ? 'Reconnect Google Ads' : 'Connect Google Ads'}
                </a>
                {google.connected && (
                  <button
                    onClick={() => disconnect('google')}
                    className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-display font-bold text-gray-700"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-gray-500">Loading…</div>
          )}
        </div>
      </section>

      {/* Meta Ads */}
      <section>
        <h2 className="font-display font-black text-xl text-navy mb-3">Meta Ads</h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          {metaMsg && (
            <div
              className={`mb-3 p-3 rounded-lg text-xs ${
                metaMsg === 'connected' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {metaMsg === 'connected' ? 'Meta Ads connected!' : `Meta OAuth error: ${metaMsg}`}
            </div>
          )}
          {meta ? (
            <>
              <dl className="text-sm space-y-1 mb-4">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Credentials</dt>
                  <dd className="font-bold">{meta.configured ? '✓ Set' : '✗ Missing META_APP_ID / META_APP_SECRET'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Connection</dt>
                  <dd className="font-bold">
                    {meta.connected
                      ? `${meta.email || 'connected'}${meta.adAccountId ? ` · ${meta.adAccountId}` : ''}`
                      : 'Not connected'}
                  </dd>
                </div>
              </dl>
              <div className="flex gap-2">
                <a
                  href="/api/admin/scale/meta/auth"
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-display font-bold ${
                    meta.configured ? 'bg-fire text-white hover:bg-fire-dark' : 'bg-gray-200 text-gray-500 pointer-events-none'
                  }`}
                >
                  {meta.connected ? 'Reconnect Meta Ads' : 'Connect Meta Ads'}
                </a>
                {meta.connected && (
                  <button
                    onClick={() => disconnect('meta')}
                    className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-display font-bold text-gray-700"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-gray-500">Loading…</div>
          )}
        </div>
      </section>

      {/* Env reference */}
      <section>
        <h2 className="font-display font-black text-xl text-navy mb-3">Required env vars</h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto">{`# AI (one or both)
ANTHROPIC_API_KEY=
OPENROUTER_API_KEY=

# Google Ads
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
GOOGLE_ADS_CUSTOMER_ID=

# Meta Ads
META_APP_ID=
META_APP_SECRET=
META_AD_ACCOUNT_ID=`}</pre>
          <p className="text-xs text-gray-500 mt-3">
            Set these in Vercel → Project → Settings → Environment Variables. Redeploy to apply.
          </p>
        </div>
      </section>
    </div>
  );
}
