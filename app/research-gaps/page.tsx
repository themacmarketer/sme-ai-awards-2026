import type { Metadata } from 'next';
import Link from 'next/link';
import { winners, allSources, hasIndependent, namedVendors, meta, SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Research gaps — what remains unknown',
  description:
    'Documented research gaps for the 30 SME AI Impact Awards winners: missing independent corroboration, undisclosed vendors, absent baselines and unverified timelines.',
  alternates: { canonical: `${SITE.url}/research-gaps/` },
};

function GapGroup({
  id,
  title,
  count,
  note,
  children,
}: {
  id: string;
  title: string;
  count: number;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-ink pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-sans text-xl">
          {title}
          <span className="ml-2 text-xs font-medium text-muted">{count}</span>
        </h2>
      </div>
      <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted">{note}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function WinnerList({ items }: { items: { slug: string; name: string; note?: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((w) => (
        <li key={w.slug}>
          <Link
            href={`/winners/${w.slug}/`}
            className="inline-block border border-rule bg-white px-2.5 py-1 text-xs text-muted hover:border-blue hover:text-blue"
            title={w.note}
          >
            {w.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ResearchGapsPage() {
  const sources = allSources();
  const noIndependent = winners.filter((w) => !hasIndependent(w));
  const noVendor = winners.filter((w) => namedVendors(w).length === 0);
  const thinTimeline = winners.filter((w) => w.timeline.length < 2);
  const noBaseline = winners.filter((w) => w.metrics.every((m) => !m.baseline && !m.after));
  const noInference = winners.filter((w) => !w.inference);
  const unavailable = sources.filter((s) => s.status === 'unavailable');

  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Research gaps</p>
          <h1 className="mt-3 max-w-[24ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            What this record does not know
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            A case-study library that hides its gaps is a marketing document. These are the
            specific things this research could not establish, listed by category rather than
            smoothed over.
          </p>
        </div>
      </header>

      <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 space-y-10">
          <GapGroup
            id="corroboration"
            title="Winners without independent corroboration"
            count={noIndependent.length}
            note="These cases rest on the official award citation and, in most instances, the company's own website. No third-party source addressing the implementation was located."
          >
            <WinnerList items={noIndependent.map((w) => ({ slug: w.slug, name: w.name }))} />
          </GapGroup>

          <GapGroup
            id="vendors"
            title="Undisclosed technology vendors"
            count={noVendor.length}
            note="The case study describes what the system does, but no source names a model provider, platform or cloud host. No vendor has been guessed."
          >
            <WinnerList items={noVendor.map((w) => ({ slug: w.slug, name: w.name }))} />
          </GapGroup>

          <GapGroup
            id="baselines"
            title="Missing baseline metrics"
            count={noBaseline.length}
            note="The citations publish relative changes, such as a percentage reduction or a multiple, without the underlying before-and-after values. No improvement figure has been calculated from an assumed baseline."
          >
            <p className="max-w-prose border-l-2 border-amber pl-4 text-sm leading-relaxed text-muted">
              All {noBaseline.length} case studies fall into this category. Where a citation reports
              an absolute volume, such as manhours redirected or sites processed, that figure is
              shown as published. Where it reports only a percentage, only the percentage is shown.
            </p>
          </GapGroup>

          <GapGroup
            id="timelines"
            title="Unverified or thin implementation timelines"
            count={thinTimeline.length}
            note="Only the award announcement date is documented. The citation does not state when the implementation began, how long it took, or when the reported results were measured."
          >
            <WinnerList items={thinTimeline.map((w) => ({ slug: w.slug, name: w.name }))} />
          </GapGroup>

          <GapGroup
            id="detail"
            title="Insufficient detail for technical inference"
            count={noInference.length}
            note="For these cases the public record does not describe the workflow precisely enough to justify even a labelled inference. No inference section appears."
          >
            {noInference.length > 0 ? (
              <WinnerList items={noInference.map((w) => ({ slug: w.slug, name: w.name }))} />
            ) : (
              <p className="text-sm text-muted">
                Every case study had enough detail to support a labelled inference.
              </p>
            )}
          </GapGroup>

          <GapGroup
            id="links"
            title="Source link availability"
            count={unavailable.length}
            note="All cited URLs were requested during research. A non-success response is recorded rather than replaced with an unrelated page."
          >
            <p className="text-sm leading-relaxed text-muted">
              {unavailable.length === 0
                ? `${sources.length} of ${sources.length} cited sources were reachable at retrieval. Some sites block automated requests; those are recorded with their actual status rather than marked broken.`
                : `${unavailable.length} of ${sources.length} sources were unreachable and are marked accordingly in the case studies.`}
            </p>
          </GapGroup>

          <GapGroup
            id="method"
            title="Method limitations"
            count={4}
            note="These limits apply to the whole project."
          >
            <ul className="space-y-3 text-sm leading-relaxed text-ink/70">
              <li className="border-l-2 border-rule pl-4">
                The awards were announced on 13 October 2026. Research was completed five days
                later, so independent coverage of individual winners is sparse.
              </li>
              <li className="border-l-2 border-rule pl-4">
                General web search returned a high proportion of irrelevant results for
                small-company queries. Company sites were fetched directly where a domain could be
                identified, which biases coverage toward companies with findable websites.
              </li>
              <li className="border-l-2 border-rule pl-4">
                No winner was contacted. No company was invited to confirm, correct or expand its
                case study.
              </li>
              <li className="border-l-2 border-rule pl-4">
                Reported outcomes are company-reported and were verified by SBF site visits during
                the award process. This project did not independently audit any figure.
              </li>
            </ul>
          </GapGroup>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="border border-rule bg-white p-5">
            <p className="eyebrow">Summary</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted">Winners</dt>
                <dd className="font-sans text-lg tabular-nums">{meta.totalWinners}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted">With independent source</dt>
                <dd className="font-sans text-lg tabular-nums">
                  {winners.length - noIndependent.length}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted">Naming a vendor</dt>
                <dd className="font-sans text-lg tabular-nums">
                  {winners.length - noVendor.length}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted">With paired baselines</dt>
                <dd className="font-sans text-lg tabular-nums">
                  {winners.length - noBaseline.length}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-rule pt-3">
                <dt className="text-muted">Avg. coverage</dt>
                <dd className="font-sans text-lg tabular-nums">{meta.averageCoverage}%</dd>
              </div>
            </dl>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Absence of evidence is recorded as absence. It is not treated as evidence that a
            technology was not used.
          </p>
        </aside>
      </div>
    </>
  );
}
