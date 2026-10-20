import Link from 'next/link';
import { Directory } from '@/components/Directory';
import { GradeBadge } from '@/components/Evidence';
import { WinnerCard } from '@/components/WinnerCard';
import { meta, winners, allCases, totalSources, getWinner, formatDate } from '@/lib/data';

const FEATURED = ['greenphyto', 'ong-ong-group', 'you-tiao-man'];

export default function HomePage() {
  const featured = FEATURED.map((s) => getWinner(s)).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule">
        <div className="shell grid gap-10 py-16 md:grid-cols-[1.55fr_1fr] md:items-end md:py-24">
          <div>
            <p className="eyebrow">SME AI Impact Awards 2026 · IMDA &amp; SBF</p>
            <h1 className="mt-4 max-w-[20ch] text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              30 Singapore SMEs. Real AI implementations.
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              A case-study library of every winner of Singapore&apos;s inaugural SME AI Impact
              Awards. Each entry sets out the business problem, the AI solution, the published
              results, and how much of the technology stack is actually documented.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#directory"
                className="rounded-lg bg-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue/90"
              >
                Browse directory &amp; cohorts
              </a>
              <Link
                href="/about"
                className="rounded-lg border border-rule bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                How this was researched
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            {[
              { k: 'Verified winners', v: String(meta.totalWinners) },
              { k: 'Nominations / Sectors', v: `${meta.awardScale?.nominations ?? 290} / ${meta.awardScale?.sectors ?? 21}` },
              { k: 'Sources cited', v: String(totalSources()) },
              { k: 'Avg. research coverage', v: `${meta.averageCoverage}%` },
            ].map((s) => (
              <div key={s.k}>
                <dd className="text-3xl font-bold tabular-nums text-navy">{s.v}</dd>
                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
                  {s.k}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Award context */}
      <section className="border-b border-rule bg-white-alt">
        <div className="shell grid gap-8 py-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">The award</p>
            <h2 className="mt-2 text-2xl font-bold">Inaugural, and deliberately specific</h2>
          </div>
          <div className="prose-editorial max-w-prose">
            <p>
              The SME AI Impact Awards are jointly organised by the Infocomm Media Development
              Authority (IMDA) and the Singapore Business Federation (SBF), under the National AI
              Impact Programme and in support of Singapore&apos;s National AI Strategy. The
              inaugural edition drew <strong>290 nominations across 21 sectors</strong>, recognising
              30 standout SMEs across two categories: 15 for developing proprietary AI solutions,
              and 15 for adopting ready-to-use ones.
            </p>
            <p>
              According to IMDA&apos;s Singapore Digital Economy Report 2025, Singapore SME AI adoption
              reached <strong>23.4% in 2025</strong> (surging from 14.5% in 2024), with 87.6% of
              AI-adopting enterprises reporting productivity/process improvements and 44% reporting cost
              reductions. While adoption is accelerating nationwide, the 30 award winners represent the
              vanguard with substantive operating tenure (at least six months of live use with positive
              business impact) verified through on-site audits conducted by SBF.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="shell py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rule pb-3">
          <h2 className="text-2xl font-bold">Featured case studies</h2>
          <p className="text-sm text-muted">Three different evidence situations</p>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((w) => w && <WinnerCard key={w.slug} w={w} />)}
        </div>
      </section>

      {/* How to read */}
      <section className="border-y border-rule bg-navy text-white">
        <div className="shell grid gap-10 py-16 md:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow text-white/50">How to read this record</p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              A grade measures evidence, not achievement
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Most of these companies are small. They do not publish architecture diagrams, model
              choices or accuracy benchmarks. That is a limit on public evidence, not a judgement
              on the implementation.
            </p>
          </div>
          <div className="space-y-5">
            {(
              [
                ['A', 'An independent source addresses the implementation, beyond the award citation.'],
                ['B', 'The official citation alone establishes the problem, the solution and the outcomes.'],
                ['C', 'The official record is too thin to support a full technical explanation.'],
              ] as const
            ).map(([g, d]) => (
              <div key={g} className="flex items-start gap-4 border-t border-white/15 pt-4">
                <span className="mt-0.5 shrink-0">
                  <GradeBadge grade={g} onDark />
                </span>
                <p className="text-sm leading-relaxed text-white/75">{d}</p>
              </div>
            ))}
            <p className="border-t border-white/15 pt-4 text-sm leading-relaxed text-white/60">
              Research coverage is a separate score. It measures how many of ten evidence
              dimensions are present, and it is never presented as an AI maturity rating.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond the Awards Section */}
      <section className="border-b border-rule bg-slate-soft/40 py-16">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="eyebrow">Library Expansion</span>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Beyond the awards: A permanent library of cohorts</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                The 30 winners of the inaugural SME AI Impact Awards are sealed as a permanent historical cohort — nothing will ever be added to or removed from the winner directory. To continue mapping the reality of Singapore enterprise AI, the showcase has expanded into a library of cohorts, all evaluated under the exact same ten-dimension evidence methodology:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-rule bg-white p-4">
                  <span className="inline-block rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[0.7rem] font-semibold text-teal-900">
                    Community Cases
                  </span>
                  <h3 className="mt-2 text-sm font-bold">Non-Award SME Submissions</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Open to Singapore SMEs with 6+ months of live production AI and documented outcomes, verified against primary artifacts.
                  </p>
                  <Link href="/submit" className="mt-3 inline-block text-xs font-semibold text-blue hover:underline">
                    Submit your implementation →
                  </Link>
                </div>

                <div className="rounded-lg border border-rule bg-white p-4">
                  <span className="inline-block rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[0.7rem] font-semibold text-purple-900">
                    Practitioner Cases
                  </span>
                  <h3 className="mt-2 text-sm font-bold">Maple Commerce Deployments</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Built by Ivan Wong / Maple Commerce. Fully disclosed conflict of interest with complete architecture schematics and paired baselines.
                  </p>
                  <Link href="/about#coi" className="mt-3 inline-block text-xs font-semibold text-purple-900 hover:underline">
                    Read conflict policy →
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-rule bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <p className="eyebrow">Rigorous Consistency</p>
                <h3 className="mt-1 text-lg font-bold">The evidence grading is the brand</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                  We hold our own practitioner cases and community submissions to the exact same strict criteria as the award winners: 6+ months production tenure, quantified before/after outcomes, named stack components, and human governance.
                </p>
                <div className="mt-4 rounded border border-rule bg-slate-soft/50 p-3 text-xs text-muted">
                  <span className="font-semibold text-ink">Inclusion bar:</span> Requires primary technical documentation (T1-SUBMITTED) to qualify. Unverified PR announcements or beta demos are rejected.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rule flex flex-wrap gap-3">
                <Link
                  href="/submit"
                  className="rounded-lg bg-blue px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue/90"
                >
                  Run 10-Dimension Self-Audit
                </Link>
                <Link
                  href="/about#inclusion"
                  className="rounded-lg border border-rule px-4 py-2 text-xs font-medium text-ink hover:border-blue hover:text-blue"
                >
                  Review Inclusion Criteria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section id="directory" className="shell scroll-mt-20 py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rule pb-3">
          <div>
            <h2 className="text-2xl font-bold">Directory &amp; Cohorts</h2>
            <p className="mt-1 text-sm text-muted">
              Explore 30 sealed award winners, Maple Commerce practitioner deployments, and community cases.
            </p>
          </div>
          <p className="text-xs text-muted">
            Search and filters apply immediately
          </p>
        </div>
        <div className="mt-6">
          <Directory winners={allCases} />
        </div>
      </section>

      {/* Closing note */}
      <section className="shell pb-6">
        <div className="rounded-xl border border-rule bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
            <div>
              <h2 className="text-xl font-bold">What the record does not contain</h2>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                Model providers, accuracy benchmarks, implementation costs and rollout dates are
                mostly unpublished. The research-gaps page lists what is missing for each winner,
                rather than filling those gaps with plausible detail.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/research-gaps"
                className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
              >
                See research gaps
              </Link>
              <Link
                href="/insights"
                className="rounded-lg border border-rule bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Read the analysis
              </Link>
            </div>
          </div>
          <p className="mt-6 border-t border-rule pt-4 text-xs text-muted">
            Canonical source retrieved {formatDate(meta.extractedAt)}. Research completed{' '}
            {formatDate(meta.researchedAt)}.
          </p>
        </div>
      </section>
    </>
  );
}
