'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'official', label: 'Record' },
  { id: 'scqa', label: 'Case study' },
  { id: 'outcomes', label: 'Results' },
  { id: 'stack', label: 'Stack' },
  { id: 'diagrams', label: 'Diagrams' },
  { id: 'inference', label: 'Inference' },
  { id: 'replication', label: 'Replication' },
  { id: 'gaps', label: 'Gaps' },
  { id: 'sources', label: 'Sources' },
];

export function SectionRail() {
  const [active, setActive] = useState<string>('official');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((doc.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="sticky top-16 z-30 -mx-5 mb-2 border-y border-rule bg-white/95 backdrop-blur-sm sm:-mx-8">
      <div className="shell flex items-center gap-3 py-2">
        <nav aria-label="Case study sections" className="scroll-x flex-1">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`inline-block whitespace-nowrap px-2 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                    active === s.id
                      ? 'bg-navy text-white'
                      : 'text-muted hover:bg-white hover:text-ink'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span
          className="hidden shrink-0 text-xs font-medium tabular-nums text-muted sm:block"
          aria-hidden="true"
        >
          {progress}%
        </span>
      </div>
      <div className="h-[2px] w-full bg-rule" aria-hidden="true">
        <div className="h-full bg-blue transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
