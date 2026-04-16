import { Phone } from 'lucide-react';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18135551234';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 555-1234';

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-navy p-3 shadow-2xl md:hidden">
      <a
        href={`tel:${PHONE}`}
        className="flex items-center justify-center gap-2 bg-fire hover:bg-fire-dark text-white font-display font-bold py-3.5 rounded-full animate-pulse-slow"
        data-conversion="phone-click-mobile"
      >
        <Phone size={18} />
        Call Now — {PHONE_DISPLAY}
      </a>
    </div>
  );
}
