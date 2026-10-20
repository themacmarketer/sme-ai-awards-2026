import type { EvidenceGrade, EvidenceState } from '@/lib/types';

const GRADE_STYLE: Record<EvidenceGrade, { ring: string; bg: string; text: string }> = {
  A: { ring: 'border-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-900' },
  B: { ring: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-900' },
  C: { ring: 'border-amber-400', bg: 'bg-amber-100', text: 'text-amber-950 font-semibold' },
};

const GRADE_STYLE_DARK: Record<EvidenceGrade, { ring: string; bg: string; text: string }> = {
  A: { ring: 'border-emerald-400/60', bg: 'bg-emerald-950/90', text: 'text-emerald-200 font-medium' },
  B: { ring: 'border-blue-400/60', bg: 'bg-blue-950/90', text: 'text-blue-200 font-medium' },
  C: { ring: 'border-amber-400/60', bg: 'bg-amber-950/90', text: 'text-amber-200 font-medium' },
};

export const GRADE_MEANING: Record<EvidenceGrade, string> = {
  A: 'Independently supported',
  B: 'Canonical source supported',
  C: 'Limited public evidence',
};

export const JARGON_TOOLTIPS = {
  A: 'Grade A (Independently supported): Corroborated by independent third-party sources (e.g. mainstream news, government records, or vendor whitepapers) outside the award citation.',
  B: 'Grade B (Canonical source supported): Established directly by the official IMDA & SBF award citation and company profiles, with no secondary external corroboration.',
  C: 'Grade C (Limited public evidence): Minimal public documentation or technical architecture is currently verifiable in public records.',
  T0: 'T0 (Canonical Source): Primary official citation published directly by IMDA and SBF on smesgodigital.gov.sg.',
  beyondT0: 'Beyond T0: Corroborating third-party evidence from external media, client case studies, or regulatory filings outside the award ceremony.',
  statedT0: 'Stated (T0-AWARDS): Outcome or architecture factually stated within the official IMDA/SBF award citation record.',
};

export function GradeBadge({
  grade,
  size = 'sm',
  onDark = false,
}: {
  grade: EvidenceGrade;
  size?: 'sm' | 'lg';
  onDark?: boolean;
}) {
  const s = onDark ? GRADE_STYLE_DARK[grade] : GRADE_STYLE[grade];
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 rounded-md border ${s.ring} ${s.bg} ${s.text} ${
        size === 'lg' ? 'px-2.5 py-1' : 'px-2 py-0.5'
      }`}
      title={JARGON_TOOLTIPS[grade]}
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

const EVIDENCE_TOOLTIP: Record<EvidenceState, string> = {
  stated: JARGON_TOOLTIPS.statedT0,
  corroborated: 'Corroborated: Validated by two or more independent public sources or third-party reports.',
  inferred: 'Inferred: Plausible technical mechanism derived from described workflow with a documented basis.',
};

export function EvidenceChip({ state }: { state: EvidenceState }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium cursor-help ${EVIDENCE_STYLE[state]}`}
      title={EVIDENCE_TOOLTIP[state]}
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
