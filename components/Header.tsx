'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Flame, ChevronDown, ChevronRight } from 'lucide-react';
import { getCountyList, getCitiesByCounty, COUNTIES } from '@/lib/internal-links';

const PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+18137441127';
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '(813) 744-1127';

function AreasMenu() {
  const [open, setOpen] = useState(false);
  const [activeCounty, setActiveCounty] = useState<string | null>(COUNTIES[0]?.slug ?? null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const counties = getCountyList();
  const cities = activeCounty ? getCitiesByCounty(activeCounty) : [];
  const activeCountyObj = counties.find((c) => c.slug === activeCounty);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }, []);

  const closeAll = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeAll();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAll();
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, closeAll]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            openMenu();
          }
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className="text-gray-600 hover:text-fire font-medium text-sm inline-flex items-center gap-1"
      >
        Areas Served
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full pt-2"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div
            className="flex bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            role="menu"
          >
            {/* Level 1 — counties */}
            <ul className="py-2 min-w-[230px] border-r border-gray-100" role="none">
              {counties.map((c) => {
                const isActive = activeCounty === c.slug;
                return (
                  <li key={c.slug} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={isActive}
                      onMouseEnter={() => setActiveCounty(c.slug)}
                      onFocus={() => setActiveCounty(c.slug)}
                      onClick={() => setActiveCounty(c.slug)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight' || e.key === 'Enter') {
                          e.preventDefault();
                          setActiveCounty(c.slug);
                        }
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-3 transition-colors ${
                        isActive
                          ? 'bg-orange-50 text-fire'
                          : 'text-gray-600 hover:text-fire hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{c.displayName}</span>
                      <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
              <li className="mt-2 pt-2 border-t border-gray-100" role="none">
                <Link
                  href="/areas"
                  role="menuitem"
                  onClick={closeAll}
                  className="block px-4 py-2 text-sm font-semibold text-navy hover:text-fire hover:bg-gray-50"
                >
                  View all areas →
                </Link>
              </li>
            </ul>

            {/* Level 2 — cities */}
            <ul className="py-2 min-w-[220px]" role="menu">
              {cities.length === 0 ? (
                <li className="px-4 py-2 text-sm text-gray-400" role="none">
                  No cities listed.
                </li>
              ) : (
                cities.map((city) => (
                  <li key={city.slug} role="none">
                    <Link
                      href={`/areas/${city.slug}`}
                      role="menuitem"
                      onClick={closeAll}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-fire hover:bg-gray-50"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))
              )}
              {activeCountyObj && (
                <li className="mt-2 pt-2 border-t border-gray-100" role="none">
                  <Link
                    href={`/areas/counties/${activeCountyObj.slug}`}
                    role="menuitem"
                    onClick={closeAll}
                    className="block px-4 py-2 text-sm font-semibold text-fire hover:bg-gray-50"
                  >
                    All {activeCountyObj.name} County →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

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
            <AreasMenu />
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
