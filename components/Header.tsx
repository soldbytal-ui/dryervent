import Link from 'next/link';
import { Phone, Flame } from 'lucide-react';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';

export default function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white/85 text-sm py-2">
        <div className="container-custom flex flex-wrap justify-between items-center gap-2">
          <div>
            📞 <a href={`tel:${PHONE}`} className="text-gold font-semibold">{PHONE_DISPLAY}</a>
            <span className="hidden sm:inline"> · Mon–Sat 7AM–7PM</span>
          </div>
          <div className="hidden md:block">
            <span className="bg-fire text-white px-3 py-0.5 rounded-full text-xs font-semibold mr-2">SAME-DAY</span>
            Serving All Tampa Bay
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white py-4 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-custom flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3" aria-label="Airflow Dryer Vent Cleaning Home">
            <div className="w-12 h-12 bg-fire rounded-xl flex items-center justify-center shadow-lg shadow-fire/30">
              <Flame className="text-white" size={26} strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-extrabold text-xl text-navy leading-tight">
                Airflow <span className="text-fire">Dryer Vent</span>
              </div>
              <div className="text-[0.65rem] text-gray-400 font-semibold uppercase tracking-widest">
                Locally Owned · Licensed · Insured
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/services/residential-dryer-vent-cleaning" className="text-gray-600 hover:text-fire font-medium text-sm">Services</Link>
            <Link href="/areas/tampa" className="text-gray-600 hover:text-fire font-medium text-sm">Areas</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-fire font-medium text-sm">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-fire font-medium text-sm">About</Link>
            <Link href="/blog" className="text-gray-600 hover:text-fire font-medium text-sm">Blog</Link>
            <Link href="/contact" className="text-gray-600 hover:text-fire font-medium text-sm">Contact</Link>
          </nav>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-fire hover:bg-fire-dark text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-fire/25 hover:shadow-lg hover:shadow-fire/35 transition-all"
            data-conversion="phone-click"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>
    </>
  );
}
