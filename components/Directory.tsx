'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Winner, Cohort } from '@/lib/types';
import { allCases as defaultCases } from '@/lib/data';
import { WinnerCard } from './WinnerCard';

const OUTCOMES = ['Time', 'Cost', 'Revenue', 'Quality', 'Capacity'] as const;

function uniq(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function Directory({ winners }: { winners?: Winner[] }) {
  const cases = winners ?? defaultCases;

  const [q, setQ] = useState('');
  const [cohort, setCohort] = useState<'all' | Cohort>('all');
  const [category, setCategory] = useState<'all' | 'innovation' | 'adoption'>('all');
  const [sector, setSector] = useState('all');
  const [useCase, setUseCase] = useState('all');
  const [aiType, setAiType] = useState('all');
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [sort, setSort] = useState<'canonical' | 'coverage' | 'name'>('canonical');

  const cohortCounts = useMemo(() => {
    return {
      all: cases.length,
      'award-2026': cases.filter((w) => (w.cohort || 'award-2026') === 'award-2026').length,
      practitioner: cases.filter((w) => w.cohort === 'practitioner').length,
      community: cases.filter((w) => w.cohort === 'community').length,
    };
  }, [cases]);

  const sectors = useMemo(() => uniq(cases.map((w) => w.sector)), [cases]);
  const useCases = useMemo(() => uniq(cases.map((w) => w.useCase)), [cases]);
  const aiTypes = useMemo(() => uniq(cases.map((w) => w.aiType)), [cases]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const rows = cases.filter((w) => {
      const itemCohort = w.cohort || 'award-2026';
      if (cohort !== 'all' && itemCohort !== cohort) return false;
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
        itemCohort,
        w.disclosedImplementer || '',
        ...w.officialComponents,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
    if (sort === 'coverage') return [...rows].sort((a, b) => b.coverage - a.coverage);
    if (sort === 'name') return [...rows].sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }, [cases, q, cohort, category, sector, useCase, aiType, outcomes, sort]);

  const active =
    (q ? 1 : 0) +
    (cohort !== 'all' ? 1 : 0) +
    (category !== 'all' ? 1 : 0) +
    (sector !== 'all' ? 1 : 0) +
    (useCase !== 'all' ? 1 : 0) +
    (aiType !== 'all' ? 1 : 0) +
    outcomes.length;

  function reset() {
    setQ('');
    setCohort('all');
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
      {/* Beyond the Awards Callout Banner */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-purple-50/40 p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full bg-navy px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                Library Expansion
              </span>
              <span className="text-xs font-semibold text-ink">Beyond the Awards</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
              The 30 winners of the SME AI Impact Awards 2026 remain a sealed, frozen historical cohort. The showcase now includes verified non-award implementations and Maple Commerce practitioner cases, all evaluated under the exact same 10-dimension evidence methodology.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/about#cohorts"
              className="rounded-lg border border-rule bg-white px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-blue hover:text-blue"
            >
              Methodology &amp; Tiers
            </Link>
            <Link
              href="/submit"
              className="rounded-lg bg-blue px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue/90"
            >
              Submit an SME Case →
            </Link>
          </div>
        </div>
      </div>

      <div className="border border-rule bg-white/60 p-4 sm:p-5">
        {/* Collection Filter Tabs */}
        <div className="mb-5 border-b border-rule pb-4">
          <label className="eyebrow block mb-2">Collection Cohort</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All Collections (${cohortCounts.all})` },
              { id: 'award-2026', label: `Award Cohort 2026 (${cohortCounts['award-2026']})` },
              { id: 'practitioner', label: `Practitioner Cases (${cohortCounts.practitioner})` },
              { id: 'community', label: `Community Submissions (${cohortCounts.community})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCohort(tab.id as typeof cohort)}
                aria-pressed={cohort === tab.id}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  cohort === tab.id
                    ? 'border-navy bg-navy text-white shadow-sm'
                    : 'border-rule bg-white text-ink/70 hover:border-blue hover:text-blue'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr]">
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
            <legend className="eyebrow">Award / Implementation Category</legend>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {[
                { k: 'all', l: 'All Categories' },
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
                <option value="canonical">Default order</option>
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
            Try switching collection tabs, selecting a broader industry, or clearing filters.
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
