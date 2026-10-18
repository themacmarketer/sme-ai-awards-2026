import Link from 'next/link';
import type { Winner } from '@/lib/types';
import { CategoryTag, EvidenceFingerprint, GradeBadge } from './Evidence';
import { primaryMetric } from '@/lib/data';
import { SiteShot } from './Media';

export function WinnerCard({ w }: { w: Winner }) {
  const m = primaryMetric(w);
  return (
    <article className="card-hover group relative flex flex-col overflow-hidden rounded-xl border border-rule bg-white shadow-sm">
      <SiteShot w={w} size="card" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryTag category={w.category} />
          <span className="text-xs font-medium text-muted">{w.sector}</span>
        </div>

        <h3 className="mt-3 text-xl font-bold leading-snug">
          <Link href={`/winners/${w.slug}/`} className="after:absolute after:inset-0">
            {w.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-ink/70">{w.headline}</p>

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
