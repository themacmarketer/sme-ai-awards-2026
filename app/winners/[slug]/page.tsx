import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWinner, neighbours, winners, CATEGORY_LABEL, GRADE_LABEL, SITE, formatDate, wordCount } from '@/lib/data';
import { CategoryTag, CoverageBar, EvidenceFingerprint, GradeBadge } from '@/components/Evidence';
import { SectionRail } from '@/components/SectionRail';
import { BeforeAfter, SiteShot } from '@/components/Media';
import { MetricsTable, StackTable } from '@/components/Tables';
import { SourceList, Citations, SourceCount } from '@/components/Sources';
import { WorkflowDiagram } from '@/components/WorkflowDiagram';
import { ShareAffordances } from '@/components/ShareAffordances';
import { WinnerCard } from '@/components/WinnerCard';

export function generateStaticParams() {
  return winners.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWinner(slug);
  if (!w) return { title: 'Case study not found' };
  const title = `${w.name} — ${w.useCase} case study`;
  const description = `${w.headline} Evidence grade ${w.confidence}. Sector: ${w.sector}. ${CATEGORY_LABEL[w.category]} winner, SME AI Impact Awards 2026.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/winners/${w.slug}/` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE.url}/winners/${w.slug}/`,
      images: [
        {
          url: `${SITE.url}/og/${w.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${w.name} — ${w.useCase} case study, evidence grade ${w.confidence}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE.url}/og/${w.slug}.png`],
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

export default async function WinnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWinner(slug);
  if (!w) notFound();

  const { prev, next } = neighbours(slug);
  const m = w.metrics[0];
  const scqaWords = wordCount(`${w.scqa.s} ${w.scqa.c} ${w.scqa.q} ${w.scqa.a}`);

  const relatedWinners = winners
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
    author: { '@type': 'Organization', name: 'SME AI Impact Showcase' },
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
        name: w.name,
        item: `${SITE.url}/winners/${w.slug}/`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />

      {/* Header */}
      <header className="border-b border-rule bg-white">
        <div className="shell py-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-ink">Directory</Link></li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/#directory`} className="hover:text-ink">
                  {CATEGORY_LABEL[w.category]}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">{w.name}</li>
            </ol>
          </nav>

          <div className="mt-5 flex flex-wrap items-center gap-2">
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

          <div className="mt-7 grid gap-6 border-t border-rule pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="eyebrow">Principal published result</p>
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
                Ten evidence dimensions, not an AI maturity score
              </p>
              <div className="mt-2">
                <EvidenceFingerprint dims={w.coverageDimensions} showLabel={false} />
              </div>
            </div>
            <div>
              <p className="eyebrow">Sources</p>
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
              <span>Live site, not an official page of this showcase.</span>
            </p>
          )}

          <ShareAffordances
            name={w.name}
            slug={w.slug}
            headline={w.headline}
            useCase={w.useCase}
            researchedAt={w.researchedAt}
            canonicalUrl={`${SITE.url}/winners/${w.slug}/`}
          />
        </div>
      </header>

      <SectionRail />

      <div className="shell grid gap-12 pb-12 pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-14">
          {/* Official record */}
          <section id="official" className="scroll-mt-28">
            <SectionHead n="01" title="The official record" note="Award citation, verbatim in substance" />
            {w.screenshot && (
              <div className="mb-6">
                <SiteShot w={w} />
              </div>
            )}
            <p className="max-w-prose text-base leading-7 text-muted">{w.officialProfile}</p>

            <h3 className="mt-7 font-sans text-lg">Published key challenges</h3>
            <ul className="mt-2 space-y-2.5">
              {w.officialChallenges.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-7 font-sans text-lg">
              {w.officialSolution}
            </h3>
            <ul className="mt-2 space-y-2.5">
              {w.officialComponents.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SCQA */}
          <section id="scqa" className="scroll-mt-28">
            <SectionHead n="02" title="SCQA case study" note={`${scqaWords} words`} />
            <div className="space-y-7">
              {(
                [
                  ['S', 'Situation', w.scqa.s],
                  ['C', 'Complication', w.scqa.c],
                  ['Q', 'Question', w.scqa.q],
                  ['A', 'Answer', w.scqa.a],
                ] as const
              ).map(([letter, label, text]) => (
                <div key={letter} className="grid gap-2 sm:grid-cols-[76px_1fr] sm:gap-5">
                  <div className="flex items-baseline gap-2 sm:block">
                    <span className="font-sans text-2xl leading-none text-blue/40">{letter}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted sm:mt-1 sm:block">
                      {label}
                    </span>
                  </div>
                  <div>
                    {letter === 'Q' ? (
                      <p className="border-l-2 border-blue pl-4 font-sans text-lg leading-relaxed text-ink">
                        {text}
                      </p>
                    ) : (
                      <p className="text-base leading-7 text-muted">{text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-blue/25 bg-blue-soft p-5">
              <p className="eyebrow text-blue">Implementation takeaway</p>
              <p className="mt-2 font-sans text-lg leading-relaxed text-blue">{w.takeaway}</p>
            </div>
          </section>

          {/* Outcomes */}
          <section id="outcomes" className="scroll-mt-28">
            <SectionHead n="03" title="Verified business results" note="Company-reported" />
            {w.metrics.some((m) => m.baseline || m.after) && (
              <div className="mb-6">
                <BeforeAfter w={w} />
              </div>
            )}
            <MetricsTable w={w} />
          </section>

          {/* Stack */}
          <section id="stack" className="scroll-mt-28">
            <SectionHead n="04" title="Technology stack" note="Evidence status per layer" />
            <StackTable w={w} />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              A layer marked <span className="text-xs font-medium uppercase">inferred</span> includes a
              documented basis. Layers without a named vendor are left unnamed rather than filled
              with a plausible product.
            </p>
          </section>

          {/* Diagrams */}
          <section id="diagrams" className="scroll-mt-28">
            <SectionHead n="05" title="Implementation diagrams" note="Documented vs illustrative" />
            <div className="space-y-6">
              <WorkflowDiagram diagram={w.documentedWorkflow} variant="documented" />
              <WorkflowDiagram diagram={w.illustrativeWorkflow} variant="illustrative" />
            </div>
          </section>

          {/* Inference */}
          <section id="inference" className="scroll-mt-28">
            <SectionHead n="06" title="Unconfirmed — technical inference" note={w.inference ? 'Labelled' : 'Not attempted'} />
            {w.inference ? (
              <div className="border border-amber/30 bg-amber-soft/60 p-5">
                <dl className="space-y-4 text-[0.9375rem] leading-relaxed">
                  {(
                    [
                      ['Known', w.inference.known],
                      ['Inference', w.inference.inferred],
                      ['Basis', w.inference.basis],
                      ['Alternatives', w.inference.alternatives],
                      ['Unverified', w.inference.unverified],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-amber-700">{k}</dt>
                      <dd className="text-ink/85">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <p className="max-w-prose text-sm leading-relaxed text-ink/70">
                No public technical details were identified beyond the official award description.
                This case is not supported well enough to justify a technical inference, so none is
                offered.
              </p>
            )}
          </section>

          {/* Replication */}
          <section id="replication" className="scroll-mt-28">
            <SectionHead n="07" title="How another SME could build something similar" note="Advisory, not the winner's method" />
            <p className="max-w-prose text-sm leading-relaxed text-muted">
              This section is guidance for other companies. It is not a description of what{' '}
              {w.name} did, and it is not endorsed by them.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow">Suitable for</h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                  {w.replication.suitability.map((s, i) => <li key={i}>· {s}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow">Minimum requirements</h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                  {w.replication.requirements.map((s, i) => <li key={i}>· {s}</li>)}
                </ul>
              </div>
            </div>

            <h3 className="mt-8 font-sans text-lg">Three implementation paths</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {w.replication.levels.map((l) => (
                <div key={l.level} className="border border-rule bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue">{l.level}</p>
                  <p className="mt-1 font-sans text-base font-semibold">{l.title}</p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{l.description}</p>
                  <p className="mt-2 border-t border-rule pt-2 text-xs leading-relaxed text-muted">
                    Use when: {l.when}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow">Suggested sequence</h3>
                <ol className="mt-2 space-y-2 text-sm leading-relaxed text-ink/85">
                  {w.replication.steps.map((s, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-xs font-medium text-muted">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="eyebrow">Tools and alternatives</h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                    {w.replication.tools.map((s, i) => <li key={i}>· {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow">Risks and PDPA considerations</h3>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink/85">
                    {w.replication.risks.map((s, i) => <li key={i}>· {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow">KPIs to track</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {w.replication.kpis.map((s, i) => (
                      <li key={i} className="border border-rule bg-white px-2 py-1 text-xs text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-rule pt-6">
              <p className="text-sm leading-relaxed text-ink/80">
                <a
                  href="https://bestcourses.sg/services/training-workshops/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium text-blue hover:text-ink"
                >
                  BestCourses.sg runs hands-on workshops that take Singapore SMEs through builds like this.
                </a>
              </p>
            </div>
          </section>

          {/* Gaps */}
          <section id="gaps" className="scroll-mt-28">
            <SectionHead n="08" title="Research gaps" note="What remains unknown" />
            <ul className="space-y-2.5">
              {w.gaps.map((g, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border border-rule bg-white p-4">
              <p className="text-sm font-medium text-ink">
                Are you this company? Submit documentation to upgrade your evidence grade.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                If you have published technical documentation, vendor whitepapers, or third-party audits,{' '}
                <a
                  href={`mailto:research@bestcourses.sg?subject=Evidence%20Upgrade%20Documentation%20for%20${encodeURIComponent(w.name)}`}
                  className="link-underline font-medium text-blue"
                >
                  submit documentation to our research desk
                </a>
                . We update evidence grades upon verification.
              </p>
            </div>
          </section>

          {/* Sources */}
          <section id="sources" className="scroll-mt-28">
            <SectionHead n="09" title="Sources" note={`${w.sources.length} records`} />
            <SourceList sources={w.sources} />
          </section>

          {/* Dates */}
          <section className="border-t border-rule pt-5 text-xs text-muted">
            <p>
              Researched {formatDate(w.researchedAt)} · Updated {formatDate(w.updatedAt)} · Award
              citation retrieved {formatDate(w.sources[0]?.retrieved ?? w.researchedAt)}.
            </p>
            <p className="mt-2 max-w-prose leading-relaxed">
              {w.name} is a winner of the SME AI Impact Awards 2026, organised by IMDA and SBF.
              This case study is independent analysis and is not an official company publication.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="border border-rule bg-white p-5">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted">Sector</dt>
                <dd>{w.sector}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Category</dt>
                <dd>{CATEGORY_LABEL[w.category]}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Named solution</dt>
                <dd>{w.officialSolution}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Stack type</dt>
                <dd>{w.aiType}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Published outcomes</dt>
                <dd>{w.outcomes.join(', ')}</dd>
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
              <Link href={`/winners/${prev.slug}/`} className="block border-b border-rule p-4 hover:bg-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Previous</span>
                <span className="mt-1 block text-sm">{prev.name}</span>
              </Link>
            )}
            {next && (
              <Link href={`/winners/${next.slug}/`} className="block p-4 hover:bg-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Next</span>
                <span className="mt-1 block text-sm">{next.name}</span>
              </Link>
            )}
          </nav>
        </aside>
      </div>

      {/* Related cases */}
      <section className="border-t border-rule bg-slate-soft/30 py-12">
        <div className="shell">
          <div className="mb-6">
            <p className="eyebrow">Related case studies</p>
            <h2 className="mt-1 font-sans text-2xl font-semibold">Similar technology and sector implementations</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedWinners.map((rw) => (
              <WinnerCard key={rw.slug} w={rw} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
