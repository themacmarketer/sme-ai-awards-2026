import type { EvidenceGrade, EvidenceState } from '@/lib/types';

const GRADE_STYLE: Record<EvidenceGrade, { ring: string; bg: string; text: string }> = {
  A: { ring: 'border-blue/40', bg: 'bg-blue-soft', text: 'text-emerald-700' },
  B: { ring: 'border-blue/30', bg: 'bg-blue-soft', text: 'text-blue' },
  C: { ring: 'border-amber/40', bg: 'bg-amber-soft', text: 'text-amber-700' },
};

const GRADE_MEANING: Record<EvidenceGrade, string> = {
  A: 'Independently supported',
  B: 'Canonical source supported',
  C: 'Limited public evidence',
};

export function GradeBadge({
  grade,
  size = 'sm',
}: {
  grade: EvidenceGrade;
  size?: 'sm' | 'lg';
}) {
  const s = GRADE_STYLE[grade];
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 rounded-md border ${s.ring} ${s.bg} ${s.text} ${
        size === 'lg' ? 'px-2.5 py-1' : 'px-2 py-0.5'
      }`}
      title={`Evidence ${GRADE_MEANING[grade]}. A grade measures available evidence, not the quality of the implementation.`}
    >
      <span className={`text-xs font-bold ${size === 'lg' ? 'text-sm' : ''}`}>
        {grade}
      </span>
      <span className={`text-xs font-medium ${size === 'lg' ? '' : 'text-[0.7rem]'}`}>
        {GRADE_MEANING[grade]}
      </span>
    </span>
  );
}

const EVIDENCE_STYLE: Record<EvidenceState, string> = {
  stated: 'border-rule bg-slate-soft text-slate',
  corroborated: 'border-blue/30 bg-blue-soft text-emerald-700',
  inferred: 'border-amber/30 bg-amber-soft text-amber-700',
};

const EVIDENCE_LABEL: Record<EvidenceState, string> = {
  stated: 'Stated',
  corroborated: 'Corroborated',
  inferred: 'Inferred',
};

export function EvidenceChip({ state }: { state: EvidenceState }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium ${EVIDENCE_STYLE[state]}`}
    >
      {EVIDENCE_LABEL[state]}
    </span>
  );
}

export function CoverageBar({ value, label = true }: { value: number; label?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-2 w-24 overflow-hidden rounded-full bg-rule"
        role="img"
        aria-label={`Research coverage ${value} per cent`}
      >
        <div className="h-full rounded-full bg-blue transition-all" style={{ width: `${value}%` }} />
      </div>
      {label && (
        <span className="text-xs font-medium tabular-nums text-muted">{value}% coverage</span>
      )}
    </div>
  );
}

export function CategoryTag({ category }: { category: 'innovation' | 'adoption' }) {
  const label = category === 'innovation' ? 'Innovation Excellence' : 'Adoption Excellence';
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        category === 'innovation'
          ? 'border-blue/30 bg-blue-soft text-emerald-700'
          : 'border-blue/30 bg-blue-soft text-blue'
      }`}
    >
      {label}
    </span>
  );
}

/**
 * Ten-cell fingerprint of which evidence dimensions are present.
 * Full cell = present, half-tone = partial, outline = absent.
 * Purely derived from the coverage record; nothing is inferred here.
 */
export function EvidenceFingerprint({
  dims,
  showLabel = true,
}: {
  dims?: Record<string, number>;
  showLabel?: boolean;
}) {
  const entries = Object.entries(dims ?? {});
  if (!entries.length) return null;

  const present = entries.filter(([, v]) => v >= 1).length;
  const partial = entries.filter(([, v]) => v > 0 && v < 1).length;
  const missing = entries.filter(([, v]) => v === 0).map(([k]) => k);

  const summary = `${present} of ${entries.length} evidence dimensions present${
    missing.length ? `; not published: ${missing.join(', ')}` : ''
  }`;

  return (
    <div className="flex items-center gap-2" role="img" aria-label={summary} title={summary}>
      <div className="flex gap-[3px]">
        {entries.map(([label, v]) => (
          <span
            key={label}
            className={`h-2.5 w-3 rounded-sm ${
              v >= 1
                ? 'bg-blue'
                : v > 0
                ? 'bg-blue/40'
                : 'bg-rule'
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted">
          {present}/{entries.length} evidence
          {partial > 0 ? ` +${partial} partial` : ''}
        </span>
      )}
    </div>
  );
}
