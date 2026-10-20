import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, totalSources, SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Changelog & Audit Log — SME AI Impact Showcase',
  description:
    'Complete transparent audit trail of updates, corrections, evidence grade adjustments, and newly corroborated sources across the 30 case studies.',
  alternates: { canonical: `${SITE.url}/changelog/` },
};

interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  summary: string;
  changes: {
    type: 'grade' | 'source' | 'correction' | 'feature' | 'data';
    text: string;
    target?: string;
  }[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-10-20',
    version: '1.2.0',
    title: 'Public Open Dataset, Press Assets, and Rigor Enhancements',
    summary:
      'Released the complete 30-winner tabular dataset under CC BY 4.0, media pack with pre-computed findings, researcher credentials, and WCAG AAA contrast updates.',
    changes: [
      {
        type: 'data',
        text: 'Published open dataset in CSV and JSON formats with comprehensive data dictionary and Schema.org Dataset markup at /sme-ai/data/.',
        target: '/data',
      },
      {
        type: 'feature',
        text: 'Published Press & Media Pack with 5 pre-computed editorial stories and downloadable high-res charts at /sme-ai/press/.',
        target: '/press',
      },
      {
        type: 'feature',
        text: 'Added embeddable winner badge generator at /sme-ai/badge/ for verified recipient websites.',
        target: '/badge',
      },
      {
        type: 'feature',
        text: 'Enabled shareable URL parameter encoding (?a=slug&b=slug) on side-by-side comparison page.',
        target: '/compare',
      },
      {
        type: 'correction',
        text: 'Audited and adjusted Grade C pill color tokens to exceed WCAG AAA contrast standards against dark container bands.',
      },
    ],
  },
  {
    date: '2026-10-19',
    version: '1.1.0',
    title: 'Independent Corroboration Updates from The Straits Times',
    summary:
      'Incorporated secondary investigative reporting from The Straits Times covering SME AI Impact Awards winners announced at SMEs Go Digital Day.',
    changes: [
      {
        type: 'source',
        text: 'Added T3 independent press corroboration for Blue Aqua International: documented +30% shrimp feeding efficiency, 4–7 days advance anomaly warning, and 1.5-year operational tenure.',
        target: '/winners/blue-aqua-international/',
      },
      {
        type: 'source',
        text: 'Added call-center sentiment analysis operational metrics for Agape Connecting People.',
        target: '/winners/agape-connecting-people/',
      },
      {
        type: 'data',
        text: 'Added national adoption benchmark data from IMDA Singapore Digital Economy Report 2025 (23.4% national SME AI adoption vs 14.5% in 2024).',
      },
    ],
  },
  {
    date: '2026-10-18',
    version: '1.0.1',
    title: '12 Grade A Designations and Coverage Scoring Verification',
    summary:
      'Completed multi-source corroboration audit, establishing Grade A verification for 12 winners with third-party public documentation.',
    changes: [
      {
        type: 'grade',
        text: 'Designated 12 winners as Grade A (independently corroborated) based on verified external sources outside the official award citation.',
      },
      {
        type: 'data',
        text: 'Finalized 10-dimension research coverage scoring algorithm (average benchmark across all 30 winners: 94%).',
      },
      {
        type: 'feature',
        text: 'Generated illustrated workflow architectures and replication guidance for all 30 case studies.',
      },
    ],
  },
  {
    date: '2026-10-16',
    version: '1.0.0',
    title: 'Initial Canonical Extraction from IMDA & SBF Official Announcement',
    summary:
      'Extracted baseline record of all 30 inaugural SME AI Impact Awards recipients from official citations published on smesgodigital.gov.sg.',
    changes: [
      {
        type: 'data',
        text: 'Hydrated full DOM data for 15 Innovation Excellence and 15 Adoption Excellence recipients.',
      },
      {
        type: 'feature',
        text: 'Established T0–T3 evidence hierarchy and SCQA case study structure.',
      },
      {
        type: 'correction',
        text: 'Verified 100% resolution of 30 distinct registered SME entities without missing fields.',
      },
    ],
  },
];

const BADGE_MAP: Record<string, { label: string; cls: string }> = {
  grade: { label: 'Grade Update', cls: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
  source: { label: 'New Source', cls: 'border-blue-300 bg-blue-50 text-blue-900' },
  correction: { label: 'Correction', cls: 'border-amber-300 bg-amber-50 text-amber-900' },
  feature: { label: 'Platform Feature', cls: 'border-purple-300 bg-purple-50 text-purple-900' },
  data: { label: 'Dataset', cls: 'border-rule bg-slate-soft text-slate' },
};

export default function ChangelogPage() {
  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Audit Trail</p>
          <h1 className="mt-3 max-w-[26ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            Changelog &amp; evidence record
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            Every grade revision, newly discovered third-party source, data correction, and platform
            update is logged here transparently with timestamps.
          </p>
        </div>
      </header>

      <div className="shell py-12 space-y-12">
        <div className="space-y-12">
          {CHANGELOG.map((entry) => (
            <article key={entry.version} className="border border-rule bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-blue">v{entry.version}</span>
                  <span className="text-xs text-muted">·</span>
                  <time className="font-mono text-xs text-muted">{entry.date}</time>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Audit logged
                </span>
              </div>

              <h2 className="mt-4 font-sans text-xl font-bold text-ink sm:text-2xl">{entry.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{entry.summary}</p>

              <div className="mt-6 space-y-3">
                <p className="eyebrow">Logged actions</p>
                <ul className="space-y-2.5">
                  {entry.changes.map((c, i) => {
                    const badge = BADGE_MAP[c.type];
                    return (
                      <li key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 text-sm text-ink/85">
                        <span className={`inline-block w-fit px-2 py-0.5 text-[0.7rem] font-bold uppercase rounded border ${badge.cls}`}>
                          {badge.label}
                        </span>
                        <span>
                          {c.text}{' '}
                          {c.target && (
                            <Link href={c.target} className="link-underline font-medium text-blue ml-1">
                              View →
                            </Link>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <section className="border border-rule bg-white p-6 sm:p-8">
          <h2 className="font-sans text-xl font-semibold">Submitting corrections</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted max-w-prose">
            If you represent an award-winning company or have identified factual errors in our
            citations, please email{' '}
            <a href="mailto:research@bestcourses.sg?subject=Showcase%20Correction%20Submission" className="link-underline text-blue font-medium">
              research@bestcourses.sg
            </a>
            . Provide the winner slug, specific contradiction, and supporting URL/documentation. All
            verified corrections are applied within 48 hours and documented in this audit log.
          </p>
        </section>
      </div>
    </>
  );
}
