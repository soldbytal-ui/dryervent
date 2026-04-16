'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

type FaqItem = { q: string; a: string };
type Props = { faqs: FaqItem[]; title?: string; subtitle?: string };

export default function FAQ({ faqs, title = 'Frequently Asked Questions', subtitle }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20" id="faq">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-fire font-display font-bold text-xs uppercase tracking-widest mb-3">
            ❓ COMMON QUESTIONS
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-xl mx-auto">{subtitle}</p>}
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left font-display font-semibold text-navy text-lg hover:text-fire transition-colors"
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full transition-all flex-shrink-0 ml-4 ${
                    open === i ? 'bg-fire text-white rotate-45' : 'bg-gray-100 text-navy'
                  }`}
                >
                  <Plus size={16} />
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '400px' : '0px' }}
              >
                <p className="text-gray-600 leading-relaxed pb-5 text-base">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
