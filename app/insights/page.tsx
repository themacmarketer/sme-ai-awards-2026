import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CategorySplit,
  CoverageHistogram,
  EvidenceBars,
  HorizontalBars,
} from '@/components/InsightsCharts';
import { winners, meta, facetCounts, outcomeCounts, gradeCounts, SITE } from '@/lib/data';
import { SectorUseCaseMatrix } from '@/components/Matrix';
import { ResearchEmailCapture } from '@/components/ResearchEmailCapture';

export const metadata: Metadata = {
  title: 'Insights — patterns across 30 AI implementations',
  description:
    'Aggregate analysis of the 30 SME AI Impact Awards 2026 winners: sectors, AI use cases, documented technology layers, published benefits and evidence distribution.',
  alternates: { canonical: `${SITE.url}/insights/` },
};

function ChartBlock({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="border border-rule bg-white">
      <figcaption className="border-b border-rule px-5 py-3">
        <p className="font-sans text-base font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{note}</p>
      </figcaption>
      <div className="px-3 py-4">{children}</div>
    </figure>
  );
}

export default function InsightsPage() {
  const sectors = facetCounts('sector');
  const useCases = facetCounts('useCase');
  const aiTypes = facetCounts('aiType');
  const outcomes = outcomeCounts();
  const grades = gradeCounts();

  const layerCounts = new Map<string, number>();
  winners.forEach((w) =>
    w.stack.forEach((s) => layerCounts.set(s.layer, (layerCounts.get(s.layer) ?? 0) + 1))
  );
  const layers = [...layerCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  const vendorCounts = new Map<string, number>();
  winners.forEach((w) =>
    w.stack.forEach((s) => {
      if (s.vendor) {
        s.vendor.split(/,\s*/).forEach((v) => {
          const clean = v.replace(/\s*\(.*?\)/g, '').trim();
          if (clean) vendorCounts.set(clean, (vendorCounts.get(clean) ?? 0) + 1);
        });
      }
    })
  );
  const vendors = [...vendorCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  const buckets = [
    { name: '60–69', lo: 60, hi: 69 },
    { name: '70–79', lo: 70, hi: 79 },
    { name: '80–89', lo: 80, hi: 89 },
    { name: '90–100', lo: 90, hi: 100 },
  ].map((b) => ({
    name: b.name,
    value: winners.filter((w) => w.coverage >= b.lo && w.coverage <= b.hi).length,
  }));

  const documentedVendors = winners.filter((w) => w.stack.some((s) => s.vendor)).length;
  const noVendor = winners.length - documentedVendors;

  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Aggregate analysis</p>
          <h1 className="mt-3 max-w-[24ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            What 30 verified implementations have in common
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            Every figure on this page is computed from the structured dataset behind the case
            studies. Nothing is estimated or drawn from outside the record.
          </p>
          <p className="mt-3 max-w-prose border-l-2 border-amber pl-4 text-sm leading-relaxed text-muted">
            These are award winners, selected for demonstrated business impact. They are not a
            representative sample of Singapore SMEs, and the distributions below should not be read
            as national adoption statistics.
          </p>
        </div>
      </header>

      <div className="shell py-12">
        {/* National Context & Adoption Benchmarks */}
        <section className="mb-10 rounded-xl border border-rule bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-4">
            <div>
              <p className="eyebrow">Macro benchmark context</p>
              <h2 className="mt-1 font-sans text-xl font-bold text-ink sm:text-2xl">
                Singapore Enterprise AI Landscape
              </h2>
            </div>
            <span className="text-xs text-muted">
              Source: IMDA Singapore Digital Economy Report 2025 &amp; The Straits Times
            </span>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-rule/80 bg-white-alt p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Award competition scale
              </span>
              <p className="mt-2 font-sans text-3xl font-bold tabular-nums text-navy">
                290 <span className="text-lg font-normal text-muted">/ 21</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                <strong>290 nominations</strong> across <strong>21 sectors</strong> submitted for the inaugural 2026 awards; 30 selected (10.3% acceptance).
              </p>
            </div>

            <div className="rounded-lg border border-rule/80 bg-white-alt p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                SME national AI adoption
              </span>
              <p className="mt-2 font-sans text-3xl font-bold tabular-nums text-blue">
                23.4%
              </p>
              <p className="mt-1 text-xs text-muted">
                Up from <strong>14.5% in 2024</strong>. Almost 1 in 4 Singapore SMEs now deploy AI tools across their daily business operations.
              </p>
            </div>

            <div className="rounded-lg border border-rule/80 bg-white-alt p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Productivity gain rate
              </span>
              <p className="mt-2 font-sans text-3xl font-bold tabular-nums text-navy">
                87.6%
              </p>
              <p className="mt-1 text-xs text-muted">
                Of Singapore AI-adopting enterprises report productivity/process improvement as a primary benefit, validating the gallery&apos;s heavy time/capacity focus.
              </p>
            </div>

            <div className="rounded-lg border border-rule/80 bg-white-alt p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Cost reduction rate
              </span>
              <p className="mt-2 font-sans text-3xl font-bold tabular-nums text-navy">
                44.0%
              </p>
              <p className="mt-1 text-xs text-muted">
                Of adopting enterprises achieve cost reduction or resource optimisation — contextualising operational wins like Blue Aqua&apos;s 30% feed efficiency.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-amber/30 bg-amber/5 p-4 text-xs leading-relaxed text-ink/80">
            <strong className="font-semibold text-amber-900">Distinction note:</strong> The 87.6% productivity and 44% cost reduction figures describe all AI-adopting enterprises surveyed in IMDA&apos;s national digital economy study, providing an economy-wide reference point. The 30 award winners in this showcase were chosen from 290 nominations for verified operational tenure and quantified outcomes.
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <ChartBlock
              title="Winners by sector"
              note="Sectors as published in the award citations. Seventeen sectors appear across the thirty winners; media and creative is the largest group."
            >
              <HorizontalBars data={sectors.map(([name, value]) => ({ name, value }))} height={440} />
            </ChartBlock>
          </div>

          <div className="space-y-4">
            <ChartBlock title="Innovation versus adoption" note="15 winners in each category, by design.">
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <CategorySplit
                  data={meta.categories.map((c) => ({
                    name: c.key === 'innovation' ? 'Innovation' : 'Adoption',
                    value: c.count,
                  }))}
                />
                <ul className="space-y-3 pr-2 text-sm">
                  {meta.categories.map((c) => (
                    <li key={c.key}>
                      <span className="font-sans text-2xl font-semibold tabular-nums">{c.count}</span>
                      <span className="ml-2 text-xs text-muted">
                        {c.key === 'innovation' ? 'Innovation Excellence' : 'Adoption Excellence'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ChartBlock>

            <ChartBlock
              title="Research evidence distribution"
              note="A grade measures available evidence, not the quality of the implementation."
            >
              <EvidenceBars
                data={grades.map((g) => ({
                  name:
                    g.grade === 'A'
                      ? 'A — Independent'
                      : g.grade === 'B'
                      ? 'B — Canonical source'
                      : 'C — Limited',
                  value: g.count,
                }))}
              />
            </ChartBlock>
          </div>

          <ChartBlock
            title="AI use cases by business function"
            note="Assigned from the described workflow, not from marketing language."
          >
            <HorizontalBars
              data={useCases.map(([name, value]) => ({ name, value }))}
              height={330}
              color="#2B3A42"
            />
          </ChartBlock>

          <ChartBlock
            title="Verified stack types"
            note="The dominant technical approach in each implementation, as described in the record."
          >
            <HorizontalBars
              data={aiTypes.map(([name, value]) => ({ name, value }))}
              height={330}
              color="#4F6F66"
            />
          </ChartBlock>

          <ChartBlock
            title="Published benefit types"
            note="A winner can report more than one type of benefit, so counts exceed 30."
          >
            <HorizontalBars
              data={outcomes.map(([name, value]) => ({ name, value }))}
              height={220}
              color="#1F4B43"
            />
          </ChartBlock>

          <ChartBlock
            title="Documented technology layers"
            note="How often each layer appears in a case-study stack table."
          >
            <HorizontalBars data={layers} height={300} color="#4F6F66" />
          </ChartBlock>

          <ChartBlock
            title="Named vendors in the record"
            note="Counts of case studies that name a vendor at any layer. Absence is not evidence of absence."
          >
            {vendors.length > 0 ? (
              <HorizontalBars data={vendors} height={260} color="#8A4B2F" />
            ) : (
              <p className="px-2 py-8 text-sm text-muted">No vendors named.</p>
            )}
          </ChartBlock>

          <ChartBlock
            title="Research coverage distribution"
            note="Ten evidence dimensions per case study, expressed as a percentage."
          >
            <CoverageHistogram data={buckets} />
          </ChartBlock>
        </div>

        <div className="mt-4">
          <SectorUseCaseMatrix winners={winners} />
        </div>

        {/* Reading the numbers */}
        <section className="mt-14 grid gap-8 border-t border-ink pt-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-sans text-2xl">Reading the numbers</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Three patterns hold across the set, and one caveat matters more than the patterns.
            </p>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-ink/70">
            <p>
              <strong className="font-semibold">Documentation is the exception.</strong>{' '}
              {documentedVendors} of {winners.length} case studies name at least one technology
              vendor. {noVendor} describe what the system does without naming what it runs on. The
              award citation rewards business outcomes, so the technical record is thin by design
              rather than by omission.
            </p>
            <p>
              <strong className="font-semibold">Most winners automate a queue.</strong> The
              recurring shape is an intake of unstructured work, an extraction step, a structured
              record, and a human approving exceptions. Invoices, orders, enquiries, footage and
              documents account for the majority of the set.
            </p>
            <p>
              <strong className="font-semibold">Time is the most reported benefit.</strong> Time
              saved appears in almost every citation, followed by cost and capacity. Revenue growth
              is claimed less often, and usually by companies selling the capability rather than
              only using it.
            </p>
            <p className="border-l-2 border-amber pl-4 text-muted">
              Caveat: the percentages and multiples in these citations are company-reported. No
              independent audit of the figures was published, and this showcase does not recalculate
              them.
            </p>
          </div>
        </section>

        <ResearchEmailCapture />

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="border border-ink bg-navy px-5 py-2.5 text-sm text-white hover:border-blue hover:bg-blue"
          >
            Browse all 30 case studies
          </Link>
          <Link
            href="/research-gaps"
            className="border border-rule bg-white px-5 py-2.5 text-sm hover:border-blue hover:text-blue"
          >
            See what is missing
          </Link>
        </div>
      </div>
    </>
  );
}
