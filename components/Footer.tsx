import Link from 'next/link';
import { areas } from '@/lib/areas';
import { services } from '@/lib/services';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/65 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          <div>
            <div className="font-display font-extrabold text-2xl text-white">
              Airflow <span className="text-fire-glow">Dryer Vent</span>
            </div>
            <p className="text-sm leading-relaxed mt-4 max-w-xs">
              Tampa Bay&apos;s locally-owned dryer vent and dryer duct cleaning service. Not a franchise — your home, your neighborhood, our team. Licensed, insured, and committed to keeping Florida homes safe from dryer fires.
            </p>
            <div className="mt-5">
              <a href={`tel:${PHONE}`} className="text-gold font-bold text-lg">{PHONE_DISPLAY}</a>
              <p className="text-xs mt-1">Mon–Sat 7AM–7PM</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm hover:text-fire-glow transition-colors">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Areas Served</h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
              {areas.slice(0, 12).map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="text-sm hover:text-fire-glow transition-colors">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm hover:text-fire-glow">About Us</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-fire-glow">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-fire-glow">Blog</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-fire-glow">Contact</Link></li>
              <li><Link href="/contact#quote" className="text-sm hover:text-fire-glow font-bold text-gold">Free Estimate →</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <span>© {new Date().getFullYear()} Airflow Dryer Vent Cleaning. All rights reserved.</span>
          <span>Licensed &amp; Insured · Serving Tampa Bay, Florida</span>
        </div>
      </div>
    </footer>
  );
}
