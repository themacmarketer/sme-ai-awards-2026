'use client';

import { useMemo, useState } from 'react';
import type { Winner } from '@/lib/types';
import { WinnerCard } from './WinnerCard';

const OUTCOMES = ['Time', 'Cost', 'Revenue', 'Quality', 'Capacity'] as const;

function uniq(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function Directory({ winners }: { winners: Winner[] }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<'all' | 'innovation' | 'adoption'>('all');
  const [sector, setSector] = useState('all');
  const [useCase, setUseCase] = useState('all');
  const [aiType, setAiType] = useState('all');
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [sort, setSort] = useState<'canonical' | 'coverage' | 'name'>('canonical');

  const sectors = useMemo(() => uniq(winners.map((w) => w.sector)), [winners]);
  const useCases = useMemo(() => uniq(winners.map((w) => w.useCase)), [winners]);
  const aiTypes = useMemo(() => uniq(winners.map((w) => w.aiType)), [winners]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const rows = winners.filter((w) => {
      if (category !== 'all' && w.category !== category) return false;
      if (sector !== 'all' && w.sector !== sector) return false;
      if (useCase !== 'all' && w.useCase !== useCase) return false;
      if (aiType !== 'all' && w.aiType !== aiType) return false;
      if (outcomes.length && !outcomes.every((o) => w.outcomes.includes(o as never))) return false;
      if (!needle) return true;
      const hay = [
        w.name,
        w.sector,
        w.useCase,
        w.aiType,
        w.headline,
        w.officialSolution,
        w.scqa.a,
        ...w.officialComponents,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
    if (sort === 'coverage') return [...rows].sort((a, b) => b.coverage - a.coverage);
    if (sort === 'name') return [...rows].sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }, [winners, q, category, sector, useCase, aiType, outcomes, sort]);

  const active =
    (q ? 1 : 0) +
    (category !== 'all' ? 1 : 0) +
    (sector !== 'all' ? 1 : 0) +
    (useCase !== 'all' ? 1 : 0) +
    (aiType !== 'all' ? 1 : 0) +
    outcomes.length;

  function reset() {
    setQ('');
    setCategory('all');
    setSector('all');
    setUseCase('all');
    setAiType('all');
    setOutcomes([]);
    setSort('canonical');
  }

  const selectCls =
    'w-full border border-rule bg-white px-2.5 py-2 text-sm text-ink focus:border-blue';

  return (
    <div>
      <div className="border border-rule bg-white/60 p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <label htmlFor="search" className="eyebrow block">
              Search
            </label>
            <input
              id="search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Company, sector, solution, technology…"
              className="mt-1.5 w-full border border-rule bg-white px-3 py-2 text-sm placeholder:text-muted/60 focus:border-blue"
            />
          </div>
          <div>
            <label htmlFor="sector" className="eyebrow block">
              Industry
            </label>
            <select id="sector" value={sector} onChange={(e) => setSector(e.target.value)} className={`mt-1.5 ${selectCls}`}>
              <option value="all">All industries</option>
              {sectors.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="usecase" className="eyebrow block">
              AI use case
            </label>
            <select id="usecase" value={useCase} onChange={(e) => setUseCase(e.target.value)} className={`mt-1.5 ${selectCls}`}>
              <option value="all">All use cases</option>
              {useCases.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="aitype" className="eyebrow block">
              Verified stack type
            </label>
            <select id="aitype" value={aiType} onChange={(e) => setAiType(e.target.value)} className={`mt-1.5 ${selectCls}`}>
              <option value="all">All stack types</option>
              {aiTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t border-rule pt-4 lg:flex-row lg:items-end lg:justify-between">
          <fieldset>
            <legend className="eyebrow">Award category</legend>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {[
                { k: 'all', l: 'All 30' },
                { k: 'innovation', l: 'Innovation' },
                { k: 'adoption', l: 'Adoption' },
              ].map((o) => (
                <button
                  key={o.k}
                  type="button"
                  onClick={() => setCategory(o.k as typeof category)}
                  aria-pressed={category === o.k}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    category === o.k
                      ? 'border-ink bg-navy text-white'
                      : 'border-rule bg-white text-ink/70 hover:border-blue hover:text-blue'
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Published outcome</legend>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {OUTCOMES.map((o) => {
                const on = outcomes.includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() =>
                      setOutcomes((prev) => (on ? prev.filter((x) => x !== o) : [...prev, o]))
                    }
                    aria-pressed={on}
                    className={`border px-3 py-1.5 text-xs transition-colors ${
                      on
                        ? 'border-blue bg-blue-soft text-blue'
                        : 'border-rule bg-white text-ink/70 hover:border-blue hover:text-blue'
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex items-end gap-2">
            <div>
              <label htmlFor="sort" className="eyebrow block">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className={`mt-1.5 ${selectCls}`}
              >
                <option value="canonical">Official order</option>
                <option value="coverage">Research coverage</option>
                <option value="name">Company name</option>
              </select>
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={active === 0 && sort === 'canonical'}
              className="border border-rule bg-white px-3 py-2 text-xs text-ink/70 transition-colors hover:border-blue hover:text-blue disabled:opacity-40"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'case study' : 'case studies'}
          {active > 0 ? ' matching' : ''}
        </p>
        {active > 0 && (
          <p className="text-xs text-muted">
            {active} active {active === 1 ? 'filter' : 'filters'}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 border border-dashed border-rule p-10 text-center">
          <p className="font-sans text-lg">No case studies match those filters.</p>
          <p className="mt-2 text-sm text-muted">
            Try a broader industry or clear the outcome filters.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 border border-ink bg-navy px-4 py-2 text-xs text-white"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <WinnerCard key={w.slug} w={w} />
          ))}
        </div>
      )}
    </div>
  );
}
