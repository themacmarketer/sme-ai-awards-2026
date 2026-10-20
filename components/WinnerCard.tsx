import Link from 'next/link';
import type { Winner } from '@/lib/types';
import { CategoryTag, EvidenceFingerprint, GradeBadge, ProvenanceBadge } from './Evidence';
import { primaryMetric, caseUrl } from '@/lib/data';
import { SiteShot } from './Media';

export function WinnerCard({ w }: { w: Winner }) {
  const m = primaryMetric(w);
  const href = caseUrl(w);
  const isPractitioner = w.cohort === 'practitioner' || w.provenance === 'maple-commerce';

  return (
    <article className="card-hover group relative flex flex-col overflow-hidden rounded-xl border border-rule bg-white shadow-sm">
      <SiteShot w={w} size="card" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryTag category={w.category} />
            <span className="text-xs font-medium text-muted">{w.sector}</span>
          </div>
          <ProvenanceBadge cohort={w.cohort} provenance={w.provenance} />
        </div>

        <h3 className="mt-3 text-xl font-bold leading-snug">
          <Link href={href} className="after:absolute after:inset-0">
            {w.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ink/70">{w.headline}</p>

        {isPractitioner && (
          <div className="mt-2.5 rounded border border-purple-200/80 bg-purple-50/70 px-2.5 py-1.5 text-[0.7rem] leading-snug text-purple-950">
            <span className="font-semibold">Disclosure:</span> Implementation delivered by Maple Commerce. This case is written by the implementer; the conflict of interest is disclosed.
          </div>
        )}

        <dl className="mt-4 border-t border-rule pt-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{m.label}</dt>
          <dd className="mt-0.5 text-lg font-bold text-blue">{m.value}</dd>
        </dl>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted">{w.useCase}</span>
            <GradeBadge grade={w.confidence} />
          </div>
          <div className="mt-2">
            <EvidenceFingerprint dims={w.coverageDimensions} />
          </div>
        </div>
      </div>
    </article>
  );
}
