import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, totalSources, SITE, winners } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Open dataset & data dictionary — SME AI Impact Awards 2026',
  description:
    'Download the complete structured dataset of Singapore SME AI Impact Awards 2026 winners in CSV and JSON formats. Includes full data dictionary, evidence grades, and CC BY 4.0 open licence.',
  alternates: { canonical: `${SITE.url}/data/` },
};

const DATA_DICTIONARY = [
  { field: 'id', type: 'integer', description: 'Numeric index of the record ordered canonically by category and listing.' },
  { field: 'cohort', type: 'string', description: 'Collection cohort: "award-2026" (sealed 30 award winners), "practitioner" (Maple Commerce deployments), or "community" (verified non-award SME submissions).' },
  { field: 'provenance', type: 'string', description: 'Origin tier: "official-award" (IMDA & SBF citation), "maple-commerce" (implementer-built), or "community-submission".' },
  { field: 'disclosed_implementer', type: 'string', description: 'Named implementer entity where conflict of interest is disclosed (e.g. "Maple Commerce"), or empty.' },
  { field: 'name', type: 'string', description: 'Official registered entity name as cited in the IMDA/SBF award announcement or client submission.' },
  { field: 'slug', type: 'string', description: 'Unique URL slug used for permalink routing on this showcase.' },
  { field: 'category', type: 'string', description: 'Award category: "innovation" (developed proprietary AI) or "adoption" (adopted ready-to-use COTS solution).' },
  { field: 'sector', type: 'string', description: 'Industry classification (e.g. Business Services, Manufacturing, Logistics, F&B).' },
  { field: 'useCase', type: 'string', description: 'Functional application domain (e.g. Workflow automation, Document processing, Computer vision).' },
  { field: 'aiType', type: 'string', description: 'Primary technical architecture archetype (e.g. LLM application, Agentic workflow, Computer vision).' },
  { field: 'headline', type: 'string', description: 'One-line summary of implementation and primary business outcome.' },
  { field: 'confidence_grade', type: 'string', description: 'Assigned evidence grade: A (independently supported), B (canonical source supported), or C (limited public evidence).' },
  { field: 'coverage_pct', type: 'integer', description: 'Research coverage score (0–100%) across 10 structured evidence dimensions.' },
  { field: 'official_solution', type: 'string', description: 'Named AI solution or platform from the official award citation.' },
  { field: 'primary_metric_label', type: 'string', description: 'Description of the headline published performance metric.' },
  { field: 'primary_metric_value', type: 'string', description: 'Published quantified outcome value (e.g. "80% reduction", "2.5 hours/day saved").' },
  { field: 'all_metrics_count', type: 'integer', description: 'Total number of documented metrics for the winner in the dataset.' },
  { field: 'stack_layers_count', type: 'integer', description: 'Number of discrete technical stack layers documented in the case study.' },
  { field: 'named_vendors', type: 'string', description: 'Semicolon-separated list of disclosed third-party software/cloud vendors, or "None named".' },
  { field: 'sources_count', type: 'integer', description: 'Total number of cited references and public documentation sources.' },
  { field: 'sources_beyond_t0', type: 'integer', description: 'Number of independent third-party sources (news, client profiles, partner case studies) outside the canonical award citation.' },
  { field: 'company_url', type: 'string', description: 'Verified official website URL of the winning company.' },
  { field: 'researched_at', type: 'string (ISO)', description: 'Timestamp of initial research extraction and baseline verification.' },
  { field: 'updated_at', type: 'string (ISO)', description: 'Timestamp of latest evidence verification or citation upgrade.' },
];

export default function DataPage() {
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Singapore SME AI Impact Awards 2026 Dataset',
    description:
      'Structured evidence-graded dataset of the 30 winners of the Singapore SME AI Impact Awards 2026 and practitioner implementations, organised by IMDA and SBF. Includes technical architecture, reported business metrics, evidence grades, and citations.',
    url: `${SITE.url}/data/`,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Person',
      name: 'Ivan Wong',
      url: 'https://bestcourses.sg/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BestCourses.sg',
      url: 'https://bestcourses.sg',
    },
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${SITE.url}/data/sme-ai-winners-2026.csv`,
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${SITE.url}/data/sme-ai-winners-2026.json`,
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${SITE.url}/data/sme-ai-all-cases.csv`,
      },
    ],
    temporalCoverage: '2026',
    spatialCoverage: 'Singapore',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />

      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Open Research Asset</p>
          <h1 className="mt-3 max-w-[26ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            Structured dataset &amp; data dictionary
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            The full dataset powering this showcase is published openly in CSV and JSON formats for
            researchers, journalists, and enterprise practitioners. This dataset is ungated and free
            to download.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/sme-ai/data/sme-ai-all-cases.csv"
              download="sme-ai-all-cases.csv"
              className="inline-flex items-center gap-2 border border-ink bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-blue hover:bg-blue"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full Library CSV (All Cohorts)
            </a>
            <a
              href="/sme-ai/data/sme-ai-winners-2026.csv"
              download="sme-ai-winners-2026.csv"
              className="inline-flex items-center gap-2 border border-rule bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Award Winners CSV (30 records)
            </a>
            <a
              href="/sme-ai/data/sme-ai-all-cases.json"
              download="sme-ai-all-cases.json"
              className="inline-flex items-center gap-2 border border-rule bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full JSON (All Cohorts)
            </a>
          </div>
        </div>
      </header>

      <div className="shell py-12 space-y-12">
        {/* Dataset metadata cards */}
        <section>
          <h2 className="font-sans text-2xl">Dataset summary</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-rule bg-white p-4">
              <p className="eyebrow">Records</p>
              <p className="mt-1 font-sans text-3xl font-bold text-ink">{meta.totalWinners}</p>
              <p className="mt-1 text-xs text-muted">15 Innovation + 15 Adoption</p>
            </div>
            <div className="border border-rule bg-white p-4">
              <p className="eyebrow">Sources cited</p>
              <p className="mt-1 font-sans text-3xl font-bold text-blue">{totalSources()}</p>
              <p className="mt-1 text-xs text-muted">Across 4 evidentiary tiers (T0–T3)</p>
            </div>
            <div className="border border-rule bg-white p-4">
              <p className="eyebrow">Coverage benchmark</p>
              <p className="mt-1 font-sans text-3xl font-bold text-ink">{meta.averageCoverage}%</p>
              <p className="mt-1 text-xs text-muted">Average across 10 evaluation dimensions</p>
            </div>
            <div className="border border-rule bg-white p-4">
              <p className="eyebrow">Licence</p>
              <p className="mt-1 font-sans text-lg font-bold text-emerald-800">CC BY 4.0</p>
              <p className="mt-1 text-xs text-muted">Open attribution licence</p>
            </div>
          </div>
        </section>

        {/* Data dictionary table */}
        <section>
          <div className="mb-4">
            <h2 className="font-sans text-2xl">Data dictionary</h2>
            <p className="mt-1 text-sm text-muted">
              Definition and typing for each field in the CSV export.
            </p>
          </div>

          <div className="scroll-x">
            <table className="data-table min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%]">Field name</th>
                  <th scope="col" className="w-[18%]">Type</th>
                  <th scope="col">Definition &amp; usage</th>
                </tr>
              </thead>
              <tbody>
                {DATA_DICTIONARY.map((row) => (
                  <tr key={row.field}>
                    <td className="font-mono text-xs font-semibold text-blue">{row.field}</td>
                    <td className="font-mono text-xs text-muted">{row.type}</td>
                    <td className="text-sm leading-relaxed text-ink/80">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Licence Note */}
        <section className="border border-rule bg-white p-6 sm:p-8">
          <h2 className="font-sans text-xl font-semibold">Licence and attribution note</h2>
          <div className="mt-3 max-w-prose space-y-3 text-sm leading-relaxed text-ink/80">
            <p>
              This dataset is licensed under the{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-blue"
              >
                Creative Commons Attribution 4.0 International (CC BY 4.0)
              </a>{' '}
              licence. You are free to share, copy, redistribute, and adapt the material in any
              medium or format for any purpose, including commercial applications, provided you give
              appropriate credit.
            </p>
            <p className="border-l-2 border-blue pl-4 italic text-ink">
              Recommended citation: Wong, I. (2026). Singapore SME AI Impact Awards 2026 Dataset.
              BestCourses.sg. Available at: https://bestcourses.sg/sme-ai/data/
            </p>
            <p className="text-xs text-muted">
              Note: Company names, award citations, and trademarked terms remain the intellectual
              property of their respective owners and the award organisers (IMDA &amp; SBF).
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="border border-ink bg-navy px-5 py-2.5 text-sm text-white hover:border-blue hover:bg-blue"
          >
            Explore the case studies
          </Link>
          <Link
            href="/insights"
            className="border border-rule bg-white px-5 py-2.5 text-sm hover:border-blue hover:text-blue"
          >
            View insights &amp; charts
          </Link>
        </div>
      </div>
    </>
  );
}
