import type { Winner } from '@/lib/types';

/**
 * Homepage screenshot of the winning company.
 * Deliberately small, dated, attributed and linked: it identifies the business,
 * and it does not claim to show the award-winning implementation.
 */
export function SiteShot({ w, size = 'full' }: { w: Winner; size?: 'full' | 'card' }) {
  const shot = w.screenshot;
  if (!shot) return null;

  const src = shot.src.startsWith('/sme-ai') ? shot.src : `/sme-ai${shot.src}`;

  if (size === 'card') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`Homepage of ${w.name}, captured ${shot.capturedAt}`}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full border-b border-rule object-cover object-top"
      />
    );
  }

  return (
    <figure className="border border-rule bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Homepage of ${w.name}, captured ${shot.capturedAt}`}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover object-top"
      />
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule px-4 py-3 text-xs text-muted">
        <span>
          {w.name}&apos;s homepage, captured {shot.capturedAt}. Shown for identification and
          comment; it may differ from the award-winning implementation.
        </span>
        <a
          href={shot.sourceUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="link-underline whitespace-nowrap"
        >
          Open live site ↗
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * Renders before/after pairs only where the record actually publishes both.
 * No value is calculated or interpolated.
 */
export function BeforeAfter({ w }: { w: Winner }) {
  const rows = w.metrics.filter((m) => m.baseline || m.after);
  if (!rows.length) return null;

  return (
    <div className="border border-rule bg-white">
      <div className="border-b border-rule px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink">
          Published before and after
        </p>
        <p className="mt-1 text-xs text-muted">
          Both values are published by the company. Nothing here is calculated.
        </p>
      </div>
      <div className="divide-y divide-rule">
        {rows.map((m, i) => (
          <div key={i} className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Before
              </p>
              <p className="mt-0.5 text-sm leading-snug text-muted">{m.baseline ?? 'Not published'}</p>
            </div>
            <div aria-hidden="true" className="hidden text-rule sm:block">
              <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                <path d="M0 5h24M20 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-blue">After</p>
              <p className="mt-0.5 text-sm font-medium leading-snug text-blue">{m.after}</p>
            </div>
            <p className="text-xs text-muted sm:col-span-3">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
