import type { Source, Winner } from '@/lib/types';
import { formatDate } from '@/lib/data';
import { JARGON_TOOLTIPS } from '@/components/Evidence';

const TIER_NOTE: Record<Source['tier'], string> = {
  T0: 'Canonical awards source',
  T1: 'Direct primary source',
  'T1-SUBMITTED': 'Primary verified telemetry & direct submission',
  T2: 'Named implementation partner',
  T3: 'Independent or supplementary',
};

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ol className="space-y-4">
      {sources.map((s, i) => (
        <li key={s.id} id={`src-${s.id}`} className="scroll-mt-24 border-l-2 border-rule pl-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs font-medium tabular-nums text-muted">[{i + 1}]</span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-medium text-[0.9375rem]"
            >
              {s.title}
            </a>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {s.publisher}
            {s.published ? ` · ${formatDate(s.published)}` : ''} · Retrieved{' '}
            {formatDate(s.retrieved)} ·{' '}
            <abbr
              title={s.tier === 'T0' ? JARGON_TOOLTIPS.T0 : `Tier ${s.tier}: ${TIER_NOTE[s.tier]}`}
              className="cursor-help text-xs font-medium uppercase tracking-wide underline decoration-dotted underline-offset-2"
            >
              {s.tier}
            </abbr>{' '}
            — {TIER_NOTE[s.tier]}
          </p>
          {s.status !== 'valid' && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
              Link status: {s.status}
            </p>
          )}
          {s.note && <p className="mt-1.5 text-xs leading-relaxed text-ink/70">{s.note}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Superscript citation markers resolved against the winner's numbered source list. */
export function Citations({ ids, sources }: { ids: string[]; sources: Source[] }) {
  const numbers = ids
    .map((id) => {
      const idx = sources.findIndex((s) => s.id === id);
      return idx >= 0 ? idx + 1 : null;
    })
    .filter((n): n is number => n !== null);

  if (!numbers.length) return null;

  return (
    <sup className="ml-0.5 text-xs font-medium text-blue">
      {numbers.map((n, i) => (
        <span key={n}>
          {i > 0 && ','}
          <a href={`#src-${sources[n - 1].id}`} className="hover:underline">
            {n}
          </a>
        </span>
      ))}
    </sup>
  );
}

export function SourceCount({ w }: { w: Winner }) {
  const independent = w.sources.filter((s) => s.tier !== 'T0').length;
  return (
    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
      {w.sources.length} sources ·{' '}
      <abbr
        title={JARGON_TOOLTIPS.beyondT0}
        className="cursor-help underline decoration-dotted underline-offset-2"
      >
        {independent} beyond T0
      </abbr>
    </span>
  );
}
