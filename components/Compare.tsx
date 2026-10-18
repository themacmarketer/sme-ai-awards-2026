'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Winner } from '@/lib/types';
import { CategoryTag, GradeBadge } from './Evidence';

export function Compare({ winners }: { winners: Winner[] }) {
  const [selected, setSelected] = useState<string[]>([
    winners[0]?.slug,
    winners[15]?.slug,
  ].filter(Boolean) as string[]);

  const chosen = useMemo(
    () => selected.map((s) => winners.find((w) => w.slug === s)).filter(Boolean) as Winner[],
    [selected, winners]
  );

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  }

  const rows: { label: string; render: (w: Winner) => React.ReactNode }[] = [
    {
      label: 'Industry',
      render: (w) => w.sector,
    },
    {
      label: 'Award category',
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
        <p className="eyebrow">Select two or three case studies</p>
        <div className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {winners.map((w) => {
            const on = selected.includes(w.slug);
            const order = selected.indexOf(w.slug) + 1;
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
                <span className="min-w-0 flex-1 truncate">{w.name}</span>
                {on && (
                  <span className="text-xs font-medium text-blue" aria-hidden="true">
                    {order}
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
                {chosen.map((w) => (
                  <th key={w.slug} scope="col" className="w-1/4 align-bottom">
                    <Link href={`/winners/${w.slug}/`} className="link-underline font-sans text-base normal-case tracking-normal">
                      {w.name}
                    </Link>
                  </th>
                ))}
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
