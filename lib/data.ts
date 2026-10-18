import dataset from '@/data/winners.json';
import type { Dataset, Winner, Source } from './types';

export const data = dataset as unknown as Dataset;
export const winners: Winner[] = data.winners;
export const meta = data.meta;

export const SITE = {
  name: 'SME AI Impact Showcase',
  short: 'SME AI Impact Showcase',
  description:
    'An evidence-graded case-study library of the 30 winners of the Singapore SME AI Impact Awards 2026, organised by IMDA and SBF.',
  url: 'https://sme-ai-awards-2026.vercel.app',
  awardLine: 'Winner, SME AI Impact Awards 2026 (IMDA & SBF)',
};

export function getWinner(slug: string): Winner | undefined {
  return winners.find((w) => w.slug === slug);
}

export function neighbours(slug: string) {
  const i = winners.findIndex((w) => w.slug === slug);
  return {
    prev: i > 0 ? winners[i - 1] : null,
    next: i >= 0 && i < winners.length - 1 ? winners[i + 1] : null,
  };
}

export const CATEGORY_LABEL: Record<Winner['category'], string> = {
  innovation: 'Innovation Excellence',
  adoption: 'Adoption Excellence',
};

export const GRADE_LABEL: Record<Winner['confidence'], string> = {
  A: 'Grade A — Independently supported',
  B: 'Grade B — Canonical source supported',
  C: 'Grade C — Limited public evidence',
};

export const GRADE_SHORT: Record<Winner['confidence'], string> = {
  A: 'Independently supported',
  B: 'Canonical source supported',
  C: 'Limited public evidence',
};

/** Primary metric: the first published metric, used on cards and headers. */
export function primaryMetric(w: Winner) {
  return w.metrics[0];
}

export function totalSources(): number {
  return new Set(winners.flatMap((w) => w.sources.map((s) => s.id))).size;
}

export function allSources(): Source[] {
  const map = new Map<string, Source>();
  winners.forEach((w) => w.sources.forEach((s) => map.set(s.id, s)));
  return [...map.values()].sort((a, b) => a.id.localeCompare(b.id));
}

export function facetCounts(key: 'sector' | 'useCase' | 'aiType' | 'category') {
  const counts = new Map<string, number>();
  winners.forEach((w) => {
    const v = key === 'category' ? CATEGORY_LABEL[w.category] : (w[key] as string);
    counts.set(v, (counts.get(v) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function outcomeCounts() {
  const counts = new Map<string, number>();
  winners.forEach((w) => w.outcomes.forEach((o) => counts.set(o, (counts.get(o) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function gradeCounts() {
  return (['A', 'B', 'C'] as const).map((g) => ({
    grade: g,
    count: winners.filter((w) => w.confidence === g).length,
  }));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

const EXTERNAL_T1 = new Set(['T1-SFA-BLUEAQUA', 'T1-PRN-INAUGURAL', 'T1-BT-LAUNCH']);

/** True when a source from a party other than the winner supports the record. */
export function hasIndependent(w: Winner): boolean {
  return w.sources.some(
    (s) => s.tier === 'T3' || s.tier === 'T2' || (s.tier === 'T1' && EXTERNAL_T1.has(s.id))
  );
}

export function namedVendors(w: Winner): string[] {
  return [...new Set(w.stack.map((s) => s.vendor).filter(Boolean) as string[])];
}
