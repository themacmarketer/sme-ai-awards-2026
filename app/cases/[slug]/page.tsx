import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCase,
  caseNeighbours,
  practitionerCases,
  communityCases,
  allCases,
  CATEGORY_LABEL,
  GRADE_LABEL,
  COHORT_LABEL,
  SITE,
  formatDate,
  wordCount,
  caseUrl,
} from '@/lib/data';
import { CategoryTag, CoverageBar, EvidenceFingerprint, GradeBadge, ProvenanceBadge } from '@/components/Evidence';
import { SectionRail } from '@/components/SectionRail';
import { MetricsTable, StackTable } from '@/components/Tables';
import { SourceList, Citations, SourceCount } from '@/components/Sources';
import { WorkflowDiagram } from '@/components/WorkflowDiagram';
import { ShareAffordances } from '@/components/ShareAffordances';
import { WinnerCard } from '@/components/WinnerCard';

export function generateStaticParams() {
  const nonAwardCases = [...practitionerCases, ...communityCases];
  return nonAwardCases.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getCase(slug);
  if (!w) return { title: 'Case study not found' };

  const cohortName = w.cohort ? COHORT_LABEL[w.cohort] : 'Case Study';
  const title = `${w.name} — ${w.useCase} (${cohortName})`;
  const description = `${w.headline} Evidence grade ${w.confidence} (${w.coverage}% research coverage). ${
    w.disclosedImplementer ? `Implementation delivered by ${w.disclosedImplementer}.` : ''
  }`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/cases/${w.slug}/` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE.url}/cases/${w.slug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function SectionHead({
  n,
  title,
  note,
}: {
  n: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-5 border-b border-ink pb-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-sans text-xl sm:text-2xl">
          <span className="mr-2 text-xs font-medium align-middle text-muted">{n}</span>
          {title}
        </h2>
        {note && <span className="text-xs font-semibold uppercase tracking-wider text-muted">{note}</span>}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getCase(slug);
  if (!w) notFound();

  const isPractitioner = w.cohort === 'practitioner' || w.provenance === 'maple-commerce';
  const isCommunity = w.cohort === 'community' || w.provenance === 'community-submission';
  const { prev, next } = caseNeighbours(slug);
  const m = w.metrics[0];
  const scqaWords = wordCount(`${w.scqa.s} ${w.scqa.c} ${w.scqa.q} ${w.scqa.a}`);

  const relatedCases = allCases
    .filter((other) => other.slug !== w.slug)
    .sort((a, b) => {
      const aScore = (a.aiType === w.aiType ? 3 : 0) + (a.sector === w.sector ? 2 : 0) + (a.category === w.category ? 1 : 0);
      const bScore = (b.aiType === w.aiType ? 3 : 0) + (b.sector === w.sector ? 2 : 0) + (b.category === w.category ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${w.name}: ${w.headline}`,
    description: w.scqa.s,
    datePublished: w.researchedAt,
    dateModified: w.updatedAt,
    inLanguage: 'en-SG',
    isAccessibleForFree: true,
    about: {
      '@type': 'Organization',
      name: w.name,
      ...(w.companyUrl ? { url: w.companyUrl } : {}),
    },
    author: {
      '@type': 'Organization',
      name: isPractitioner ? 'Maple Commerce' : 'SME AI Impact Showcase',
    },
    publisher: { '@type': 'Organization', name: 'SME AI Impact Showcase' },
    citation: w.sources.map((s) => s.url),
  };

  const crumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Directory', item: SITE.url + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: isPractitioner ? 'Practitioner Cases' : 'Community Cases',
        item: `${SITE.url}/#directory`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: w.name,
        item: `${SITE.url}/cases/${w.slug}/`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />

      {/* Mandatory Conflict of Interest Banner for Practitioner Cases */}
      {isPractitioner && (
        <aside className="border-b border-purple-300 bg-purple-50/90 py-3 text-sm text-purple-950" aria-label="Conflict of interest disclosure">
          <div className="shell flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs font-bold text-white" aria-hidden="true">!</span>
              <p className="font-medium">
                <strong>Implementer Disclosure:</strong> Implementation delivered by Maple Commerce. This case is written by the implementer; the conflict of interest is disclosed.
              </p>
            </div>
            <Link
              href="/about#coi"
              className="text-xs font-semibold text-purple-900 underline underline-offset-4 hover:text-purple-700"
            >
              Read our Conflict of Interest Policy →
            </Link>
          </div>
        </aside>
      )}

      {/* Header */}
      <header className="border-b border-rule bg-white">
        <div className="shell py-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-ink">Directory</Link></li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#directory" className="hover:text-ink">
                  {w.cohort ? COHORT_LABEL[w.cohort] : 'Cases'}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">{w.name}</li>
            </ol>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <ProvenanceBadge cohort={w.cohort} provenance={w.provenance} size="md" />
            <CategoryTag category={w.category} />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {w.sector}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              · {w.useCase}
            </span>
          </div>

          <h1 className="mt-3 max-w-[26ch] font-sans text-3xl leading-tight tracking-tight sm:text-4xl">
            {w.name}
          </h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">{w.headline}</p>

          {w.clientConsent === 'anonymised' && (
            <div className="mt-4 max-w-prose rounded border border-amber-300 bg-amber-50/80 p-3 text-xs text-amber-950">
              <span className="font-bold">Anonymised Submission Notice:</span> The client name has been anonymised under written NDA consent. In accordance with our Methodology, this record receives a 0.5-point penalty on the Identity evidence dimension to keep coverage scoring honest.
            </div>
          )}

          <div className="mt-7 grid gap-6 border-t border-rule pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="eyebrow">Principal measured result</p>
              <p className="mt-1 font-sans text-2xl font-semibold text-blue">{m.value}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted">{m.label}</p>
            </div>
            <div>
              <p className="eyebrow">Evidence grade</p>
              <div className="mt-1.5"><GradeBadge grade={w.confidence} size="lg" /></div>
              <p className="mt-1.5 text-xs leading-snug text-muted">{GRADE_LABEL[w.confidence]}</p>
            </div>
            <div>
              <p className="eyebrow">Research coverage</p>
              <div className="mt-2"><CoverageBar value={w.coverage} /></div>
              <p className="mt-1.5 text-xs leading-snug text-muted">
                10-dimension rubric ({w.coverage}/100)
              </p>
              <div className="mt-2">
                <EvidenceFingerprint dims={w.coverageDimensions} showLabel={false} />
              </div>
            </div>
            <div>
              <p className="eyebrow">Verified sources</p>
              <p className="mt-1 font-sans text-2xl font-semibold tabular-nums">{w.sources.length}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted"><SourceCount w={w} /></p>
            </div>
          </div>

          {w.companyUrl && (
            <p className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
              <a
                href={w.companyUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 border border-rule bg-white px-3 py-1.5 text-xs text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Open {w.companyUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
              </a>
              <span>Client organisation website.</span>
            </p>
          )}

          <ShareAffordances
            name={w.name}
            slug={w.slug}
            headline={w.headline}
            useCase={w.useCase}
            researchedAt={w.researchedAt}
            canonicalUrl={`${SITE.url}/cases/${w.slug}/`}
          />
        </div>
      </header>

      <SectionRail />

      <div className="shell grid gap-12 pb-12 pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-14">
          {/* Section 01: Implementation Background & Record */}
          <section id="official" className="scroll-mt-28">
            <SectionHead
              n="01"
              title="Verified implementation record"
              note={isPractitioner ? 'Direct Implementer Telemetry (T1-SUBMITTED)' : 'Community Submitted & Verified'}
            />
            <p className="max-w-prose text-base leading-7 text-muted">{w.officialProfile}</p>

            <h3 className="mt-7 font-sans text-lg">Operational challenges addressed</h3>
            <ul className="mt-2 space-y-2.5">
              {w.officialChallenges.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-lg border border-rule bg-slate-soft/40 p-5">
              <p className="eyebrow">Production solution</p>
              <p className="mt-1 text-base font-semibold">{w.officialSolution}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">Key Architectural Components</p>
              <ul className="mt-2 space-y-1.5">
                {w.officialComponents.map((c, i) => (
                  <li key={i} className="flex gap-2 text-xs leading-relaxed text-ink/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue/70" aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 02: Narrative Analysis (SCQA) */}
          <section id="scqa" className="scroll-mt-28">
            <SectionHead n="02" title="Narrative breakdown" note={`SCQA framework · ${scqaWords} words`} />
            <div className="space-y-6">
              <div className="border-l-2 border-slate-300 pl-4">
                <p className="eyebrow">Situation</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{w.scqa.s}</p>
              </div>
              <div className="border-l-2 border-amber-400 pl-4">
                <p className="eyebrow">Complication</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{w.scqa.c}</p>
              </div>
              <div className="border-l-2 border-blue pl-4">
                <p className="eyebrow">Core Question</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-ink">{w.scqa.q}</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4">
                <p className="eyebrow">Answer / Implementation</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{w.scqa.a}</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-rule bg-white p-5 shadow-sm">
              <p className="eyebrow">Core takeaway for other SMEs</p>
              <p className="mt-1 text-base font-semibold leading-snug">{w.takeaway}</p>
            </div>
          </section>

          {/* Section 03: Measured Outcomes */}
          <section id="outcomes" className="scroll-mt-28">
            <SectionHead n="03" title="Measured outcomes" note="Paired before-and-after baselines" />
            <p className="mb-4 text-xs text-muted">
              Every outcome metric includes the pre-AI operational baseline, the post-rollout measurement, and the verification attribution tier.
            </p>
            <MetricsTable w={w} />
          </section>

          {/* Section 04: Technical Stack & Architecture */}
          <section id="stack" className="scroll-mt-28">
            <SectionHead n="04" title="Documented technology stack" note="Production components & models" />
            <p className="mb-4 text-xs text-muted">
              Unlike the award cohort where tech vendors were largely unpublished, practitioner cases publish complete model choices, orchestration frameworks, and hosting architectures.
            </p>
            <StackTable w={w} />
          </section>

          {/* Section 05: Documented Workflow Diagram */}
          <section id="workflow" className="scroll-mt-28">
            <SectionHead n="05" title="Production system workflow" note="Verified data pipeline" />
            <WorkflowDiagram diagram={w.documentedWorkflow} variant="documented" />
          </section>

          {/* Section 06: Replication Blueprint */}
          <section id="replication" className="scroll-mt-28">
            <SectionHead n="06" title="How another SME could build this" note="Implementation playbook" />
            <div className="space-y-6">
              <div>
                <h3 className="font-sans text-base font-semibold">Suitability criteria</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink/80">
                  {w.replication.suitability.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue font-bold">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-sans text-base font-semibold">Step-by-step rollout plan</h3>
                <ol className="mt-2 space-y-2 text-sm text-ink/80">
                  {w.replication.steps.map((st, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">{i + 1}</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-sans text-base font-semibold">Staged maturity tiers</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {w.replication.levels.map((lvl) => (
                    <div key={lvl.level} className="rounded border border-rule bg-white p-4">
                      <p className="eyebrow">{lvl.level}</p>
                      <p className="mt-1 font-semibold text-sm">{lvl.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{lvl.description}</p>
                      <p className="mt-3 border-t border-rule pt-2 text-[0.7rem] text-muted">
                        <span className="font-semibold">When to use:</span> {lvl.when}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-blue/20 bg-blue-soft/50 p-5">
              <p className="text-sm font-medium text-ink">
                BestCourses.sg runs hands-on workshops that take Singapore SMEs through builds like this.
              </p>
              <Link
                href="/course/"
                className="mt-2 inline-block text-xs font-semibold text-blue underline underline-offset-4 hover:text-blue/80"
              >
                Learn more about our practical SME AI training programmes →
              </Link>
            </div>
          </section>

          {/* Section 07: Sources & Verification */}
          <section id="sources" className="scroll-mt-28">
            <SectionHead n="07" title="Sources & telemetry verification" note="Evidence ledger" />

            {isPractitioner && (
              <div className="mb-6 rounded-lg border border-purple-200 bg-purple-50/80 p-4 text-xs text-purple-950">
                <p className="font-bold">Conflict of Interest &amp; Telemetry Notice:</p>
                <p className="mt-1 leading-relaxed">
                  Implementation delivered by Maple Commerce. This case is written by the implementer; the conflict of interest is disclosed. Telemetry and architecture records are verified directly against production logs and client-reviewed documentation under our Tier 1 (T1-SUBMITTED) methodology. Outcome figures remain classified as &ldquo;Company-reported&rdquo; in strict adherence to our conservative attribution rules.
                </p>
              </div>
            )}

            <SourceList sources={w.sources} />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="border border-rule bg-white p-5">
            <p className="eyebrow">Case metadata</p>
            <dl className="mt-3 space-y-3 text-xs">
              <div>
                <dt className="text-muted">Collection</dt>
                <dd className="font-semibold">{w.cohort ? COHORT_LABEL[w.cohort] : 'General'}</dd>
              </div>
              <div>
                <dt className="text-muted">Provenance</dt>
                <dd className="font-semibold">{w.provenance}</dd>
              </div>
              {w.disclosedImplementer && (
                <div>
                  <dt className="text-muted">Implementer</dt>
                  <dd className="font-semibold text-purple-900">{w.disclosedImplementer}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted">Industry Sector</dt>
                <dd>{w.sector}</dd>
              </div>
              <div>
                <dt className="text-muted">AI Use Case</dt>
                <dd>{w.useCase}</dd>
              </div>
              <div>
                <dt className="text-muted">Stack Architecture</dt>
                <dd>{w.aiType}</dd>
              </div>
              <div>
                <dt className="text-muted">Published Outcomes</dt>
                <dd>{w.outcomes.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-muted">Researched / Updated</dt>
                <dd>{formatDate(w.updatedAt)}</dd>
              </div>
            </dl>
          </div>

          <div className="border border-rule bg-white p-5">
            <p className="eyebrow">Cited claims</p>
            <ul className="mt-3 space-y-3">
              {w.claims.slice(0, 4).map((c) => (
                <li key={c.id} className="text-xs leading-relaxed text-muted">
                  {c.text}
                  <Citations ids={c.sourceIds} sources={w.sources} />
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Case study navigation" className="border border-rule bg-white">
            {prev && (
              <Link href={caseUrl(prev)} className="block border-b border-rule p-4 hover:bg-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Previous Case</span>
                <span className="mt-1 block text-sm font-medium">{prev.name}</span>
              </Link>
            )}
            {next && (
              <Link href={caseUrl(next)} className="block p-4 hover:bg-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Next Case</span>
                <span className="mt-1 block text-sm font-medium">{next.name}</span>
              </Link>
            )}
          </nav>
        </aside>
      </div>

      {/* Related cases */}
      <section className="border-t border-rule bg-slate-soft/30 py-12">
        <div className="shell">
          <div className="mb-6">
            <p className="eyebrow">Related implementations</p>
            <h2 className="mt-1 font-sans text-2xl font-semibold">Similar technology and sector implementations across all cohorts</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCases.map((rw) => (
              <WinnerCard key={rw.slug} w={rw} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
