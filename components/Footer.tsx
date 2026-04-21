import Link from 'next/link';
import { services } from '@/lib/services';
import { getCountyList, getCitiesByCounty } from '@/lib/internal-links';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';

export default function Footer() {
  const counties = getCountyList();
  return (
    <footer className="bg-navy text-white/65 pt-16 pb-8">
      <div className="container-custom">
        {/* Top row: Brand + Services + Company (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
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
              <li>
                <Link href="/services/condo-dryer-vent-cleaning" className="text-sm hover:text-fire-glow transition-colors">
                  Condo Cleaning
                </Link>
              </li>
              <li>
                <Link href="/hoa-dryer-vent-cleaning" className="text-sm hover:text-fire-glow transition-colors">
                  HOA Services
                </Link>
              </li>
              <li>
                <Link href="/landlord-dryer-vent-cleaning" className="text-sm hover:text-fire-glow transition-colors">
                  For Landlords
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm hover:text-fire-glow">About Us</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-fire-glow">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-fire-glow">Blog</Link></li>
              <li><Link href="/local-vs-franchise-dryer-vent-cleaning" className="text-sm hover:text-fire-glow">Local vs Franchise</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-fire-glow">Contact</Link></li>
              <li><Link href="/services/dryer-vent-inspection" className="text-sm hover:text-fire-glow font-bold text-gold">Free Inspection →</Link></li>
              <li><Link href="/contact#quote" className="text-sm hover:text-fire-glow">Free Estimate →</Link></li>
            </ul>
          </div>
        </div>

        {/* Full-width county-organized Service Areas block (4 county columns) */}
        <div className="border-t border-white/10 pt-10 mb-10">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Service Areas</h4>
            <Link href="/areas" className="text-xs font-semibold text-fire-glow hover:text-white transition-colors">
              View all areas →
            </Link>
          </div>

          {(() => {
            const hillsborough = counties.find((c) => c.slug === 'hillsborough');
            const pinellas = counties.find((c) => c.slug === 'pinellas');
            const pasco = counties.find((c) => c.slug === 'pasco');
            const manatee = counties.find((c) => c.slug === 'manatee');
            const sarasota = counties.find((c) => c.slug === 'sarasota');

            const hillsboroughCities = getCitiesByCounty('hillsborough');
            const pinellasCities = getCitiesByCounty('pinellas');
            const pascoCities = getCitiesByCounty('pasco');
            const manateeCities = getCitiesByCounty('manatee');
            const sarasotaCities = getCitiesByCounty('sarasota');

            const renderCol = (
              key: string,
              headers: { slug: string; name: string }[],
              groups: { label: string; cities: { slug: string; name: string }[] }[],
            ) => (
              <div key={key}>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                  {headers.map((h, i) => (
                    <Link
                      key={h.slug}
                      href={`/areas/counties/${h.slug}`}
                      className="text-xs font-display font-bold uppercase tracking-wider text-gold hover:text-fire-glow transition-colors"
                    >
                      {h.name} County{i < headers.length - 1 ? ' ·' : ''}
                    </Link>
                  ))}
                </div>
                {groups.map((g) => (
                  <div key={g.label} className="mb-2">
                    {groups.length > 1 && (
                      <div className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/35 mb-1">
                        {g.label}
                      </div>
                    )}
                    <ul className="space-y-1">
                      {g.cities.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/areas/${c.slug}`} className="text-sm hover:text-fire-glow transition-colors">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                {renderCol(
                  'hillsborough',
                  hillsborough ? [{ slug: hillsborough.slug, name: hillsborough.name }] : [],
                  [{ label: 'Hillsborough', cities: hillsboroughCities }],
                )}
                {renderCol(
                  'pinellas',
                  pinellas ? [{ slug: pinellas.slug, name: pinellas.name }] : [],
                  [{ label: 'Pinellas', cities: pinellasCities }],
                )}
                {renderCol(
                  'pasco',
                  pasco ? [{ slug: pasco.slug, name: pasco.name }] : [],
                  [{ label: 'Pasco', cities: pascoCities }],
                )}
                {renderCol(
                  'manatee-sarasota',
                  [
                    ...(manatee ? [{ slug: manatee.slug, name: manatee.name }] : []),
                    ...(sarasota ? [{ slug: sarasota.slug, name: sarasota.name }] : []),
                  ],
                  [
                    { label: 'Manatee', cities: manateeCities },
                    { label: 'Sarasota', cities: sarasotaCities },
                  ],
                )}
              </div>
            );
          })()}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <span>© {new Date().getFullYear()} Airflow Dryer Vent Cleaning. All rights reserved.</span>
          <span>Licensed &amp; Insured · Serving Tampa Bay, Florida</span>
        </div>
      </div>
    </footer>
  );
}
