'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type Props = {
  defaultCity?: string;
  defaultService?: string;
  page?: string;
};

export default function LeadForm({ defaultCity, defaultService, page }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Capture UTM/referrer
    const params = new URLSearchParams(window.location.search);
    const payload = {
      ...data,
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
      page: page || window.location.pathname,
      referrer: document.referrer || undefined,
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Submission failed');
      }
      setStatus('success');
      form.reset();

      // Fire conversion events
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead',
          event_label: data.service || 'cleaning',
          value: 1,
        });
        const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
        const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
        if (adsId && adsLabel) {
          (window as any).gtag('event', 'conversion', {
            send_to: `${adsId}/${adsLabel}`,
          });
        }
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please call us instead.');
    }
  }

  function handlePhoneInput(e: React.FormEvent<HTMLInputElement>) {
    let val = e.currentTarget.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    if (val.length > 6) val = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
    else if (val.length > 3) val = `(${val.slice(0, 3)}) ${val.slice(3)}`;
    else if (val.length > 0) val = `(${val}`;
    e.currentTarget.value = val;
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl relative" id="quote">
      <div className="absolute -inset-1 bg-gradient-to-br from-fire via-gold to-fire rounded-2xl opacity-70 -z-10 blur-sm" />

      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-600" size={36} />
          </div>
          <h3 className="font-display font-bold text-2xl text-navy mb-2">Got it!</h3>
          <p className="text-gray-600 mb-1">We&apos;ll call you within the hour to confirm your free estimate.</p>
          <p className="text-sm text-gray-500">Need it sooner? Call <a href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`} className="text-fire font-bold">{process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127'}</a></p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="font-display font-extrabold text-2xl text-navy">Get Your Free Estimate</h3>
            <p className="text-sm text-gray-600 mt-1">No obligation · Takes 30 seconds</p>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-fire font-semibold px-3 py-1 rounded-full text-xs mt-2">
              <span className="w-1.5 h-1.5 bg-fire rounded-full animate-pulse" />
              Same-day appointments available
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
              <input
                id="name"
                name="name"
                required
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-fire focus:ring-2 focus:ring-fire/20 outline-none transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  onInput={handlePhoneInput}
                  placeholder="(813) 744-1127"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-fire focus:ring-2 focus:ring-fire/20 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-xs font-semibold text-gray-600 mb-1">ZIP *</label>
                <input
                  id="zip"
                  name="zip"
                  required
                  maxLength={5}
                  pattern="[0-9]{5}"
                  placeholder="33602"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-fire focus:ring-2 focus:ring-fire/20 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">Email (optional)</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-fire focus:ring-2 focus:ring-fire/20 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-xs font-semibold text-gray-600 mb-1">Service Needed</label>
              <select
                id="service"
                name="service"
                defaultValue={defaultService || 'cleaning'}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-fire focus:ring-2 focus:ring-fire/20 outline-none transition cursor-pointer"
              >
                <option value="cleaning">Dryer Vent Cleaning</option>
                <option value="inspection">Vent Inspection</option>
                <option value="repair">Vent Repair</option>
                <option value="installation">New Installation</option>
                <option value="commercial">Commercial Service</option>
              </select>
            </div>
            {defaultCity && <input type="hidden" name="city" value={defaultCity} />}

            {status === 'error' && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-fire hover:bg-fire-dark disabled:opacity-60 text-white font-display font-bold py-4 rounded-xl shadow-lg shadow-fire/30 transition-all hover:-translate-y-0.5"
            >
              {status === 'submitting' ? 'Sending...' : '🔥 Get My Free Estimate →'}
            </button>
            <p className="text-center text-xs text-gray-400">🔒 Your info is safe. We never spam or share data.</p>
          </form>
        </>
      )}
    </div>
  );
}
