'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { services } from '@/lib/services';
import { areas } from '@/lib/areas';

const CHANNELS = [
  { key: 'google-search', label: 'Google Search', desc: 'High-intent keyword targeting for services + areas.', accent: 'bg-blue-500' },
  { key: 'google-lsa', label: 'Local Services Ads', desc: 'Google-verified local leads, pay-per-lead.', accent: 'bg-emerald-500' },
  { key: 'google-display', label: 'Google Display', desc: 'Retargeting banners across the Google network.', accent: 'bg-purple-500' },
  { key: 'meta-lead-gen', label: 'Meta Lead Gen', desc: 'Facebook + Instagram lead forms.', accent: 'bg-sky-500' },
  { key: 'nextdoor', label: 'Nextdoor', desc: 'Neighborhood-targeted local advertising.', accent: 'bg-teal-500' },
  { key: 'custom', label: 'Custom Campaign', desc: 'Free-form brief for any channel.', accent: 'bg-fire' },
] as const;

const STEPS = ['Channel', 'Targeting', 'Details', 'Creative', 'Review', 'Push'];

type Config = {
  channel: string;
  services: string[];
  areas: string[];
  budget: number;
  ageMin: number;
  ageMax: number;
  neighborhoods: string;
  brief: string;
  landingUrl: string;
  schedule: string;
  template: string;
  imageBase64: string;
};

const DEFAULT: Config = {
  channel: '',
  services: [],
  areas: [],
  budget: 50,
  ageMin: 28,
  ageMax: 65,
  neighborhoods: '',
  brief: '',
  landingUrl: '',
  schedule: 'weekdays-7-7',
  template: 'minimal',
  imageBase64: '',
};

export default function CampaignsPage() {
  return (
    <Suspense fallback={<div>Loading wizard…</div>}>
      <CampaignsWizard />
    </Suspense>
  );
}

function CampaignsWizard() {
  const searchParams = useSearchParams();
  const preType = searchParams.get('type') || '';

  const [step, setStep] = useState(preType ? 1 : 0);
  const [config, setConfig] = useState<Config>({ ...DEFAULT, channel: preType });
  const [generated, setGenerated] = useState<{
    variantA: { ok: boolean; data?: unknown; raw?: string; error?: string; tokensUsed?: number; costUsd?: number };
    variantB: { ok: boolean; data?: unknown; raw?: string; error?: string; tokensUsed?: number; costUsd?: number };
  } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showVariant, setShowVariant] = useState<'A' | 'B'>('A');
  const [pushResult, setPushResult] = useState<{ ok: boolean; error?: string } | null>(null);
  const [pushing, setPushing] = useState(false);

  const update = (patch: Partial<Config>) => setConfig((c) => ({ ...c, ...patch }));
  const hasVisual = ['meta-lead-gen', 'nextdoor', 'google-display'].includes(config.channel);
  const channelSupportsPush = ['google-search', 'meta-lead-gen'].includes(config.channel);

  async function generate() {
    setGenerating(true);
    setGenerated(null);
    const body = {
      channel: config.channel,
      services: config.services,
      areas: config.areas,
      demographics:
        config.channel === 'meta-lead-gen'
          ? { ageMin: config.ageMin, ageMax: config.ageMax, homeownerStatus: true }
          : undefined,
      neighborhoods: config.neighborhoods ? config.neighborhoods.split(',').map((s) => s.trim()) : undefined,
      brief: config.brief || undefined,
      budget: config.budget,
      landingUrl: config.landingUrl || undefined,
      creative: hasVisual ? { template: config.template, imageBase64: config.imageBase64 } : undefined,
    };
    const res = await fetch('/api/admin/scale/campaigns/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setGenerated(data);
    setGenerating(false);
  }

  async function push() {
    if (!generated || !channelSupportsPush) return;
    setPushing(true);
    const endpoint = config.channel === 'google-search' ? '/api/admin/scale/google/push' : '/api/admin/scale/meta/push';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(showVariant === 'A' ? generated.variantA.data : generated.variantB.data),
    });
    const data = await res.json();
    setPushResult(data);
    setPushing(false);
  }

  function next() {
    if (step === 3 && !hasVisual) {
      setStep(4);
    } else {
      setStep(Math.min(5, step + 1));
    }
  }
  function back() {
    if (step === 4 && !hasVisual) setStep(2);
    else setStep(Math.max(0, step - 1));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-black text-3xl text-navy">Campaigns</h1>
        <p className="text-sm text-gray-600 mt-1">AI-generated ad campaigns across every channel.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold ${
                i < step
                  ? 'bg-fire text-white'
                  : i === step
                    ? 'bg-navy text-white shadow-md shadow-navy/30'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs font-display font-bold ${i <= step ? 'text-navy' : 'text-gray-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-fire' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {step === 0 && <Step1 config={config} update={update} />}
        {step === 1 && <Step2 config={config} update={update} />}
        {step === 2 && <Step3 config={config} update={update} />}
        {step === 3 && hasVisual && <Step4 config={config} update={update} />}
        {step === 4 && (
          <Step5
            config={config}
            generated={generated}
            generating={generating}
            showVariant={showVariant}
            setShowVariant={setShowVariant}
            generate={generate}
          />
        )}
        {step === 5 && (
          <Step6
            channelSupportsPush={channelSupportsPush}
            channel={config.channel}
            pushResult={pushResult}
            pushing={pushing}
            push={push}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          disabled={step === 0}
          onClick={back}
          className="px-5 py-2 rounded-lg text-sm font-display font-bold text-gray-600 bg-white border border-gray-200 disabled:opacity-30"
        >
          ← Back
        </button>
        {step < 5 ? (
          <button
            disabled={step === 0 && !config.channel}
            onClick={next}
            className="bg-fire text-white px-5 py-2 rounded-lg text-sm font-display font-bold hover:bg-fire-dark disabled:opacity-50"
          >
            Next →
          </button>
        ) : (
          <div className="text-sm text-gray-500">End of wizard</div>
        )}
      </div>
    </div>
  );
}

function Step1({ config, update }: { config: Config; update: (p: Partial<Config>) => void }) {
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-navy mb-1">Choose a channel</h2>
      <p className="text-sm text-gray-600 mb-5">Pick where you want to run this campaign.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CHANNELS.map((c) => (
          <button
            key={c.key}
            onClick={() => update({ channel: c.key })}
            className={`text-left p-4 rounded-2xl border-2 transition ${
              config.channel === c.key ? 'border-fire bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg ${c.accent} mb-2`} />
            <div className="font-display font-bold text-navy">{c.label}</div>
            <div className="text-xs text-gray-600 mt-1">{c.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ config, update }: { config: Config; update: (p: Partial<Config>) => void }) {
  const toggle = (key: 'services' | 'areas', slug: string) => {
    const cur = config[key];
    update({ [key]: cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug] });
  };

  const showSA = config.channel === 'google-search';
  const showMeta = config.channel === 'meta-lead-gen';
  const showND = config.channel === 'nextdoor';
  const showLSA = config.channel === 'google-lsa';
  const showDisplay = config.channel === 'google-display';
  const showCustom = config.channel === 'custom';

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-navy mb-1">Targeting</h2>
      <p className="text-sm text-gray-600 mb-5">Select who this campaign will reach.</p>

      {(showSA || showLSA || showDisplay) && (
        <>
          <div className="mb-5">
            <label className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider block mb-2">Services</label>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => toggle('services', s.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    config.services.includes(s.slug)
                      ? 'bg-fire text-white border-fire'
                      : 'bg-white text-navy border-gray-200'
                  }`}
                >
                  {s.shortName}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider block mb-2">Service areas</label>
            <div className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => toggle('areas', a.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    config.areas.includes(a.slug) ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-gray-200'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
            {showSA && config.services.length > 0 && config.areas.length > 0 && (
              <div className="mt-3 text-xs text-gray-600">
                Will generate <strong>{config.services.length * config.areas.length}</strong> ad groups (service × area).
              </div>
            )}
          </div>
        </>
      )}

      {showMeta && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider block mb-2">Services to promote</label>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => toggle('services', s.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    config.services.includes(s.slug) ? 'bg-fire text-white border-fire' : 'bg-white text-navy border-gray-200'
                  }`}
                >
                  {s.shortName}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              <div className="text-xs font-display font-bold text-gray-500 uppercase mb-1">Age min</div>
              <input
                type="number"
                value={config.ageMin}
                onChange={(e) => update({ ageMin: parseInt(e.target.value) || 25 })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </label>
            <label className="text-sm">
              <div className="text-xs font-display font-bold text-gray-500 uppercase mb-1">Age max</div>
              <input
                type="number"
                value={config.ageMax}
                onChange={(e) => update({ ageMax: parseInt(e.target.value) || 65 })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </label>
          </div>
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-lg">
            Meta audience: homeowners, age {config.ageMin}-{config.ageMax}, Hillsborough + Pinellas + Pasco counties, interests include home improvement and family safety.
          </div>
        </div>
      )}

      {showND && (
        <div>
          <label className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider block mb-2">
            Neighborhoods (comma-separated)
          </label>
          <textarea
            value={config.neighborhoods}
            onChange={(e) => update({ neighborhoods: e.target.value })}
            placeholder="Hyde Park, Davis Islands, Seminole Heights"
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>
      )}

      {showCustom && (
        <div>
          <label className="text-xs font-display font-bold text-gray-500 uppercase tracking-wider block mb-2">Brief</label>
          <textarea
            value={config.brief}
            onChange={(e) => update({ brief: e.target.value })}
            placeholder="Describe the campaign you want…"
            rows={8}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>
      )}
    </div>
  );
}

function Step3({ config, update }: { config: Config; update: (p: Partial<Config>) => void }) {
  const suggested =
    config.services[0] && !config.landingUrl
      ? `/services/${config.services[0]}`
      : config.areas[0] && !config.landingUrl
        ? `/areas/${config.areas[0]}`
        : '/';
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-navy mb-1">Channel details</h2>
      <p className="text-sm text-gray-600 mb-5">Budget, schedule, and landing page.</p>

      <div className="space-y-5">
        <label className="block">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-display font-bold text-gray-500 uppercase">Daily budget</span>
            <span className="font-display font-bold text-fire">${config.budget}/day</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={config.budget}
            onChange={(e) => update({ budget: parseInt(e.target.value) })}
            className="w-full"
          />
        </label>

        <label className="block">
          <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">Ad schedule</div>
          <select
            value={config.schedule}
            onChange={(e) => update({ schedule: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="weekdays-7-7">Weekdays 7am–7pm (recommended)</option>
            <option value="all-hours">All hours, 7 days</option>
            <option value="weekdays-only">Weekdays only, all hours</option>
            <option value="weekends">Weekends only</option>
          </select>
        </label>

        <label className="block">
          <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">Landing page URL</div>
          <input
            type="text"
            placeholder={suggested}
            value={config.landingUrl}
            onChange={(e) => update({ landingUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
          <div className="text-xs text-gray-500 mt-1">Suggested: {suggested}</div>
        </label>
      </div>
    </div>
  );
}

function Step4({ config, update }: { config: Config; update: (p: Partial<Config>) => void }) {
  const templates = ['minimal', 'bold', 'split', 'gradient', 'frame', 'clean'] as const;
  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => update({ imageBase64: reader.result as string });
    reader.readAsDataURL(f);
  }
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-navy mb-1">Creative</h2>
      <p className="text-sm text-gray-600 mb-5">Pick template and image.</p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-5">
        {templates.map((t) => (
          <button
            key={t}
            onClick={() => update({ template: t })}
            className={`px-3 py-2 rounded-lg text-xs font-display font-bold border ${
              config.template === t ? 'border-fire bg-orange-50 text-fire' : 'border-gray-200 text-navy'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        <div className="text-xs font-display font-bold text-gray-500 uppercase mb-2">Image</div>
        <input type="file" accept="image/*" onChange={onFile} className="text-sm" />
        {config.imageBase64 && (
          <img src={config.imageBase64} alt="preview" className="mt-3 rounded-lg max-h-48" />
        )}
      </div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="ml-2 text-xs text-fire hover:text-fire-dark font-semibold"
    >
      {ok ? '✓ copied' : 'copy'}
    </button>
  );
}

type VariantResult = {
  ok: boolean;
  data?: unknown;
  raw?: string;
  error?: string;
  tokensUsed?: number;
  costUsd?: number;
};

function Step5({
  config,
  generated,
  generating,
  showVariant,
  setShowVariant,
  generate,
}: {
  config: Config;
  generated: { variantA: VariantResult; variantB: VariantResult } | null;
  generating: boolean;
  showVariant: 'A' | 'B';
  setShowVariant: (v: 'A' | 'B') => void;
  generate: () => void;
}) {
  const variant = generated ? (showVariant === 'A' ? generated.variantA : generated.variantB) : null;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-xl text-navy">Review</h2>
          <p className="text-sm text-gray-600">AI generates 2 variants — benefit-focused (A) vs urgency (B).</p>
        </div>
        <button
          onClick={generate}
          disabled={generating}
          className="bg-fire text-white px-5 py-2 rounded-lg text-sm font-display font-bold hover:bg-fire-dark disabled:opacity-50"
        >
          {generating ? 'Generating…' : generated ? 'Regenerate' : 'Generate campaigns'}
        </button>
      </div>

      {!generated && !generating && (
        <div className="text-center py-16 text-gray-500">
          Click <strong>Generate campaigns</strong> to have AI build both A/B variants using the Agent Brain rules.
        </div>
      )}

      {generating && (
        <div className="text-center py-16 text-gray-500">Calling AI provider with Brain rules and channel spec…</div>
      )}

      {generated && (
        <div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowVariant('A')}
              className={`px-4 py-2 rounded-lg text-sm font-display font-bold ${
                showVariant === 'A' ? 'bg-navy text-white' : 'bg-gray-100 text-navy'
              }`}
            >
              Variant A — Benefit
            </button>
            <button
              onClick={() => setShowVariant('B')}
              className={`px-4 py-2 rounded-lg text-sm font-display font-bold ${
                showVariant === 'B' ? 'bg-navy text-white' : 'bg-gray-100 text-navy'
              }`}
            >
              Variant B — Urgency
            </button>
          </div>

          {!variant!.ok && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
              <div className="font-display font-bold text-red-800 mb-1">Generation error</div>
              <div className="text-sm text-red-700">{variant!.error || 'Parse failed'}</div>
              {variant!.raw && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer">Raw response</summary>
                  <pre className="mt-2 whitespace-pre-wrap max-h-60 overflow-auto">{variant!.raw}</pre>
                </details>
              )}
            </div>
          )}

          {variant!.ok && variant!.data ? (
            <>
              <div className="text-xs text-gray-500 mb-2 flex items-center gap-3">
                <span>Tokens: {variant!.tokensUsed || 0}</span>
                <span>Cost: ${(variant!.costUsd || 0).toFixed(4)}</span>
                <CopyBtn text={JSON.stringify(variant!.data, null, 2)} />
              </div>
              <pre className="bg-navy text-white rounded-xl p-4 text-xs overflow-auto max-h-[500px]">
                {JSON.stringify(variant!.data, null, 2)}
              </pre>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(variant!.data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `campaign-${config.channel}-${showVariant}.json`;
                    a.click();
                  }}
                  className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-display font-bold"
                >
                  Export JSON
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Step6({
  channelSupportsPush,
  channel,
  pushResult,
  pushing,
  push,
}: {
  channelSupportsPush: boolean;
  channel: string;
  pushResult: { ok: boolean; error?: string } | null;
  pushing: boolean;
  push: () => void;
}) {
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-navy mb-1">Push to ads</h2>
      <p className="text-sm text-gray-600 mb-5">Send the generated campaign to the ad platform. All campaigns push as PAUSED.</p>

      {!channelSupportsPush ? (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
          Push is only supported for <strong>Google Search</strong> and <strong>Meta Lead Gen</strong>. For {channel}, export the JSON and set up manually.
        </div>
      ) : (
        <>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mb-4 text-sm text-orange-900">
            <strong>Safety:</strong> This pushes the campaign in <strong>paused</strong> state. Nothing will run until you review and enable it in the ad platform.
          </div>
          <button
            onClick={push}
            disabled={pushing}
            className="bg-navy text-white px-6 py-3 rounded-lg font-display font-bold hover:bg-navy-mid disabled:opacity-50"
          >
            {pushing ? 'Pushing…' : `Push to ${channel === 'google-search' ? 'Google Ads' : 'Meta Ads'}`}
          </button>

          {pushResult && (
            <div className={`mt-4 p-4 rounded-xl ${pushResult.ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="font-display font-bold mb-1">{pushResult.ok ? 'Pushed!' : 'Push blocked'}</div>
              <div className="text-sm">{pushResult.error || 'Campaign is now in your ad platform, paused.'}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
