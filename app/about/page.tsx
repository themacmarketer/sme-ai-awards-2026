import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, winners, totalSources, formatDate, allSources } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Methodology and independence',
  description:
    'How this showcase was researched: canonical source, evidence hierarchy, evidence status definitions, grading criteria, research coverage scoring and how inference is handled.',
  alternates: { canonical: '/about/' },
};

const DIMENSIONS = [
  ['Company and industry context', 'A published company profile and sector are available.'],
  ['Business challenges', 'The citation names three specific challenges rather than a general claim.'],
  ['Named AI solution', 'The solution has a name that can be traced.'],
  ['Solution components', 'At least three described components.'],
  ['Named technology vendors', 'A vendor is named at any stack layer.'],
  ['Documented workflow', 'The described components support a workflow diagram of five or more nodes.'],
  ['Quantified outcomes', 'Three published metrics.'],
  ['Independent corroboration', 'A source from a party other than the winner addresses the implementation.'],
  ['Governance and controls', 'The citation describes a review, approval or safety control.'],
  ['Implementation timeline', 'Two or more dated events can be established.'],
];

export default function AboutPage() {
  const sources = allSources();
  const tiers = ['T0', 'T1', 'T2', 'T3'] as const;

  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Methodology</p>
          <h1 className="mt-3 max-w-[26ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            How this record was built
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            This showcase is an independent research project. It is not an official publication of
            IMDA, SBF, or any winning company, and it carries no endorsement from them.
          </p>
        </div>
      </header>

      <div className="shell grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <p className="eyebrow">Contents</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {[
              ['#scope', 'Award scope'],
              ['#source', 'Canonical source'],
              ['#extraction', 'Extraction method'],
              ['#hierarchy', 'Evidence hierarchy'],
              ['#status', 'Evidence status'],
              ['#grades', 'Winner grading'],
              ['#coverage', 'Coverage scoring'],
              ['#inference', 'Inference handling'],
              ['#limits', 'Research limits'],
              ['#corrections', 'Corrections'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-ink">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-12">
          <section id="scope" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Award scope</h2>
            <div className="prose-editorial mt-3 max-w-prose">
              <p>
                The SME AI Impact Awards 2026 are the inaugural edition, jointly organised by the
                Infocomm Media Development Authority (IMDA) and the Singapore Business Federation
                (SBF). The awards sit under the National AI Impact Programme and support
                Singapore&apos;s National AI Strategy.
              </p>
              <p>
                The organisers recognised 30 SMEs across two categories: Innovation Excellence,
                for companies that developed proprietary AI solutions, and Adoption Excellence, for
                companies that adopted ready-to-use solutions. Winners were announced at SMEs Go
                Digital Day on 13 October 2026. Eligibility required at least six months of live use
                with positive business impact, and shortlisted companies received a site visit
                conducted by SBF to verify their claims.
              </p>
              <p>
                This project covers all 30 winners. It does not cover shortlisted companies that
                did not win, and it makes no claim about them.
              </p>
            </div>
          </section>

          <section id="source" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Canonical source</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/70">
              The primary authority for the winner list, categories and award citations is the
              official awards page:
            </p>
            <p className="mt-2">
              <a
                href={meta.canonicalSource}
                className="link-underline break-all font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {meta.canonicalSource}
              </a>
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border border-rule bg-white p-3">
                <dt className="eyebrow">Retrieved</dt>
                <dd className="mt-1 text-sm">{formatDate(meta.extractedAt)}</dd>
              </div>
              <div className="border border-rule bg-white p-3">
                <dt className="eyebrow">Page last updated</dt>
                <dd className="mt-1 text-sm">16 October 2026</dd>
              </div>
              <div className="border border-rule bg-white p-3">
                <dt className="eyebrow">Winners published</dt>
                <dd className="mt-1 text-sm">{meta.totalWinners}</dd>
              </div>
            </dl>
          </section>

          <section id="extraction" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Extraction method</h2>
            <div className="prose-editorial mt-3 max-w-prose">
              <p>
                The awards page renders its winner profiles client-side, so a plain HTTP request
                does not return the full record. The page was therefore rendered in a headless
                Chromium browser and the hydrated DOM was queried directly.
              </p>
              <p>
                Each winner panel was read through stable CSS classes: company name, one-line impact
                statement, sector, company profile, three headline metrics, three key challenges,
                the named AI solution and its components. Category membership was derived from the
                two winner lists in the DOM: records 1 to 15 belong to Innovation Excellence, and
                records 16 to 30 to Adoption Excellence.
              </p>
              <p>
                The full page text was also captured as a cross-check. Validation confirmed 30
                distinct companies, 15 in each category, with three challenges, three metrics and at
                least three solution components for every record. No duplicates or missing fields
                were found.
              </p>
              <p>
                The awards page does not publish individual winner URLs. Case-study permalinks in
                this showcase are generated from company names. They are not official URLs.
              </p>
            </div>
          </section>

          <section id="hierarchy" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Evidence hierarchy</h2>
            <div className="scroll-x mt-3">
              <table className="data-table min-w-[520px]">
                <thead>
                  <tr>
                    <th scope="col" className="w-[80px]">Tier</th>
                    <th scope="col">Source type</th>
                    <th scope="col" className="w-[90px]">Used</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="border-b border-rule px-3 py-3 text-left text-xs font-medium">T0</th>
                    <td className="border-b border-rule px-3 py-3">Official awards page: winner list, categories, citations.</td>
                    <td className="border-b border-rule px-3 py-3">All 30</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border-b border-rule px-3 py-3 text-left text-xs font-medium">T1</th>
                    <td className="border-b border-rule px-3 py-3">Company sites, official newsrooms, government publications, organiser releases.</td>
                    <td className="border-b border-rule px-3 py-3">{sources.filter((s) => s.tier === 'T1').length} records</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border-b border-rule px-3 py-3 text-left text-xs font-medium">T2</th>
                    <td className="border-b border-rule px-3 py-3">Named implementation partners, vendor case studies.</td>
                    <td className="border-b border-rule px-3 py-3">{sources.filter((s) => s.tier === 'T2').length} records</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border-b border-rule px-3 py-3 text-left text-xs font-medium">T3</th>
                    <td className="border-b border-rule px-3 py-3">Independent press, trade publications, third-party reports.</td>
                    <td className="border-b border-rule px-3 py-3">{sources.filter((s) => s.tier === 'T3').length} records</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
              {totalSources()} distinct sources are cited across the showcase. A source published by
              the winning company is a primary source about that company, but it is not independent
              corroboration, and it is never counted as such.
            </p>
          </section>

          <section id="status" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Evidence status</h2>
            <div className="mt-3 space-y-3">
              {[
                ['Stated', 'A source explicitly names the technology or practice in connection with the implementation.'],
                ['Corroborated', 'Two or more sources support the claim, at least one of which is not the winning company.'],
                ['Inferred', 'A plausible mechanism derived from the described workflow. Always paired with a written basis.'],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 border-l-2 border-rule pl-4 sm:grid-cols-[120px_1fr] sm:gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink">{k}</p>
                  <p className="text-sm leading-relaxed text-ink/70">{v}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="grades" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Winner grading</h2>
            <div className="mt-3 space-y-4">
              {[
                ['A', 'Independently supported', 'At least one source from a party other than the winner addresses the implementation itself, not merely the company.'],
                ['B', 'Canonical source supported', 'The official citation alone establishes the business challenge, the AI solution and the reported outcomes.'],
                ['C', 'Limited public evidence', 'The official record is too thin to support a full case study.'],
              ].map(([g, label, desc]) => (
                <div key={g} className="border border-rule bg-white p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-blue">
                    Grade {g} — {label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-prose border-l-2 border-amber pl-4 text-sm leading-relaxed text-muted">
              A grade measures available evidence, not the quality of a company&apos;s AI
              implementation. A Grade B company may run a better system than a Grade A company. It
              has simply published less about it.
            </p>
          </section>

          <section id="coverage" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Research coverage scoring</h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/70">
              Coverage is computed from the structured record, not assigned by impression. Ten
              dimensions are scored, each worth one point where present and half a point where
              partial. The total is expressed as a percentage.
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {DIMENSIONS.map(([k, v], i) => (
                <li key={k} className="border border-rule bg-white p-3">
                  <p className="text-xs font-medium text-muted">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-1 text-sm font-medium">{k}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{v}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
              Coverage is displayed separately from the evidence grade and is never presented as an
              AI maturity rating. The average across the set is {meta.averageCoverage}%.
            </p>
          </section>

          <section id="inference" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">How inference is handled</h2>
            <div className="prose-editorial mt-3 max-w-prose">
              <p>
                Inference appears only in a labelled section titled &quot;Unconfirmed — technical
                inference&quot;. Every inference states the known evidence, the inferred mechanism,
                why the mechanism is plausible, the feasible alternatives, and what remains
                unverified.
              </p>
              <p>
                No commercial vendor is inferred without evidence. No performance metric, cost saving
                or adoption timeline is inferred at all. Where no technical detail exists beyond the
                award citation, the case says so and offers no inference.
              </p>
              <p>
                Two diagrams appear on each case study. The documented diagram contains only
                components the evidence supports. The illustrative diagram is a reference build for
                other SMEs and is labelled as such.
              </p>
            </div>
          </section>

          <section id="limits" className="scroll-mt-20">
            <h2 className="font-sans text-2xl">Research limits</h2>
            <div className="prose-editorial mt-3 max-w-prose">
              <p>
                The awards were announced five days before this research was completed. Independent
                press coverage of individual winners is sparse, and general web search returned a
                high proportion of irrelevant results for small-company queries. Where a company had
                no discoverable public material, the case study rests on the official citation and
                says so.
              </p>
              <p>
                No winner was contacted for this project. No company was asked to confirm or correct
                its case study. Figures are reported as published, and company-reported statistics
                are labelled as such throughout.
              </p>
            </div>
          </section>

          <section id="corrections" className="scroll-mt-20 border-t border-ink pt-8">
            <h2 className="font-sans text-2xl">Corrections and attribution</h2>
            <div className="prose-editorial mt-3 max-w-prose">
              <p>
                Company names, award citations and reported figures belong to the winning companies
                and to IMDA and SBF. This project reproduces the substance of the award citations to
                support verification, and publishes original analysis around them.
              </p>
              <p>
                No IMDA, SBF, or company logos are used. No affiliation, endorsement or sponsorship
                is implied. Homepage screenshots are captured at a fixed viewport for identification
                and comment, dated on the page, linked to the live site, and never presented as the
                award-winning implementation. The award attribution line used throughout is:
              </p>
            </div>
            <p className="mt-3 border-l-2 border-blue pl-4 font-sans text-lg">
              Winner, SME AI Impact Awards 2026 (IMDA &amp; SBF)
            </p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
              To report an error, identify the case study and the specific claim, and cite the
              source that contradicts it. Corrections are applied to the dataset and the affected
              case study, with the update date changed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/research-gaps"
                className="border border-ink bg-navy px-4 py-2 text-sm text-white hover:border-blue hover:bg-blue"
              >
                Research gaps
              </Link>
              <Link
                href="/"
                className="border border-rule bg-white px-4 py-2 text-sm hover:border-blue hover:text-blue"
              >
                Back to the directory
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
