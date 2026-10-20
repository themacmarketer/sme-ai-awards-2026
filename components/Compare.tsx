'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Winner } from '@/lib/types';
import { CategoryTag, GradeBadge, ProvenanceBadge } from './Evidence';
import { caseUrl, allCases as defaultCases } from '@/lib/data';

export function Compare({ winners }: { winners?: Winner[] }) {
  const cases = winners ?? defaultCases;

  const [selected, setSelected] = useState<string[]>([
    cases[0]?.slug,
    cases[15]?.slug,
  ].filter(Boolean) as string[]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Restore selection from URL query parameters on initial client load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const a = params.get('a');
    const b = params.get('b');
    const c = params.get('c');
    const validSlugs = new Set(cases.map((w) => w.slug));

    const restored: string[] = [];
    if (a && validSlugs.has(a)) restored.push(a);
    if (b && validSlugs.has(b)) restored.push(b);
    if (c && validSlugs.has(c)) restored.push(c);

    if (restored.length > 0) {
      setSelected(restored);
    }
  }, [cases]);

  // Synchronize URL query parameters with selection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (selected[0]) params.set('a', selected[0]);
    if (selected[1]) params.set('b', selected[1]);
    if (selected[2]) params.set('c', selected[2]);
    const qs = params.toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [selected]);

  const chosen = useMemo(
    () => selected.map((s) => cases.find((w) => w.slug === s)).filter(Boolean) as Winner[],
    [selected, cases]
  );

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  }

  async function handleCopyShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  }

  const rows: { label: string; render: (w: Winner) => React.ReactNode }[] = [
    {
      label: 'Collection & Provenance',
      render: (w) => <ProvenanceBadge cohort={w.cohort} provenance={w.provenance} />,
    },
    {
      label: 'Industry',
      render: (w) => w.sector,
    },
    {
      label: 'Category',
      render: (w) => <CategoryTag category={w.category} />,
    },
    {
      label: 'Business problem',
      render: (w) => w.officialChallenges[0] ?? '—',
    },
    {
      label: 'AI solution',
      render: (w) => w.officialSolution,
    },
    {
      label: 'Solution type',
      render: (w) => w.aiType,
    },
    {
      label: 'Technology layers described',
      render: (w) => `${w.stack.length}`,
    },
    {
      label: 'Named vendors',
      render: (w) =>
        w.stack.some((s) => s.vendor)
          ? [...new Set(w.stack.map((s) => s.vendor).filter(Boolean))].join('; ')
          : 'None named',
    },
    {
      label: 'Published outcomes',
      render: (w) => (
        <ul className="space-y-1.5">
          {w.metrics.map((m, i) => (
            <li key={i}>
              <span className="font-medium">{m.value}</span>
              <span className="block text-xs text-muted">{m.label}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Evidence grade',
      render: (w) => <GradeBadge grade={w.confidence} />,
    },
    {
      label: 'Research coverage',
      render: (w) => `${w.coverage}%`,
    },
    {
      label: 'Replication entry point',
      render: (w) => (
        <span>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue">
            {w.replication.levels[0].level}
          </span>
          <span className="mt-0.5 block">{w.replication.levels[0].title}</span>
          <span className="mt-1 block text-xs text-muted">{w.replication.levels[0].when}</span>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="border border-rule bg-white/60 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">Select two or three case studies to compare</p>
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-1.5 border border-rule bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          >
            <svg className="h-3.5 w-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>{copiedLink ? 'Share link copied!' : 'Share this comparison'}</span>
          </button>
        </div>
        <div className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto p-1">
          {cases.map((w) => {
            const on = selected.includes(w.slug);
            const order = selected.indexOf(w.slug) + 1;
            const isPractitioner = w.cohort === 'practitioner' || w.provenance === 'maple-commerce';

            return (
              <label
                key={w.slug}
                className={`flex cursor-pointer items-center gap-2.5 border px-2.5 py-2 text-sm transition-colors ${
                  on ? 'border-blue bg-blue-soft' : 'border-rule bg-white hover:border-ink/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(w.slug)}
                  className="h-3.5 w-3.5 accent-[#1F4B43]"
                />
                <span className="min-w-0 flex-1 truncate font-medium">{w.name}</span>
                {isPractitioner && (
                  <span className="text-[0.65rem] font-semibold text-purple-800 bg-purple-100 rounded px-1.5 py-0.5">
                    Practitioner
                  </span>
                )}
                {on && (
                  <span className="text-xs font-bold text-blue shrink-0" aria-hidden="true">
                    #{order}
                  </span>
                )}
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted" aria-live="polite">
          {chosen.length} selected. Selecting a fourth replaces the earliest choice.
        </p>
      </div>

      {chosen.length < 2 ? (
        <div className="mt-6 border border-dashed border-rule p-10 text-center">
          <p className="font-sans text-lg">Select at least two case studies.</p>
        </div>
      ) : (
        <div className="scroll-x mt-6">
          <table className="data-table min-w-[720px]">
            <caption className="sr-only">
              Side-by-side comparison of selected case studies. The table compares documented
              attributes; it does not rank company performance.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[20%]">Attribute</th>
                {chosen.map((w) => {
                  const href = caseUrl(w);
                  return (
                    <th key={w.slug} scope="col" className="w-1/4 align-bottom">
                      <div className="mb-2">
                        <ProvenanceBadge cohort={w.cohort} provenance={w.provenance} />
                      </div>
                      <Link href={href} className="link-underline font-sans text-base normal-case tracking-normal">
                        {w.name}
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="border-b border-rule px-3 py-3 text-left align-top text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-muted">
                    {r.label}
                  </th>
                  {chosen.map((w) => (
                    <td key={w.slug} className="border-b border-rule px-3 py-3 align-top">
                      {r.render(w)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 max-w-prose text-xs leading-relaxed text-muted">
        This table compares documented attributes only. It does not rank companies, and a lower
        research coverage score does not indicate a weaker implementation.
      </p>
    </div>
  );
}
