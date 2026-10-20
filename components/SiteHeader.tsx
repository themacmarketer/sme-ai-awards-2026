'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/', label: 'Directory' },
  { href: '/playbook', label: 'Playbook' },
  { href: '/course', label: '5-Day Course' },
  { href: '/insights', label: 'Insights' },
  { href: '/compare', label: 'Compare' },
  { href: '/research-gaps', label: 'Research gaps' },
  { href: '/about', label: 'Methodology' },
  { href: '/submit', label: 'Submit Case' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white/95 backdrop-blur-sm">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="Home">
          <span className="text-lg font-bold leading-none tracking-tight text-navy">
            SME AI Impact
          </span>
          <span className="hidden text-xs font-medium text-muted sm:inline">
            Showcase 2026
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-soft text-blue'
                  : 'text-muted hover:bg-slate-soft hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-rule text-ink md:hidden hover:bg-slate-soft"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" fill="none">
            {open ? (
              <path d="M1 1l16 10M17 1L1 11" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-rule bg-white md:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block rounded-md px-3 py-2.5 text-sm ${
                    isActive(item.href)
                      ? 'bg-blue-soft font-medium text-blue'
                      : 'text-ink hover:bg-slate-soft'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
