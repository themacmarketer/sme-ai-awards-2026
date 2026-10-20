import type { Metadata } from 'next';
import Link from 'next/link';
import { IntakeForm } from '@/components/IntakeForm';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Submit an SME AI Case Study — 10-Dimension Self-Audit',
  description:
    'Submit a Singapore SME AI implementation to our evidence-graded showcase library. Run a 10-dimension self-audit of your deployment against our research rubric.',
  alternates: { canonical: `${SITE.url}/submit/` },
};

export default function SubmitPage() {
  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-muted mb-4">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-ink">Directory</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">Submit Case Study</li>
            </ol>
          </nav>

          <span className="eyebrow">Intake &amp; Verification Pipeline</span>
          <h1 className="mt-3 max-w-[24ch] font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Submit an SME AI Implementation
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
            The SME AI Impact Showcase has expanded into an open, evidence-graded library of Singapore SME implementations. Every submitted case is audited across our standard ten evidence dimensions, giving you an immediate technical self-audit while qualifying your organisation for publication in our monthly research batches.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-rule bg-slate-soft/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-navy block">01 · Built-in Self-Audit</span>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Completing this form evaluates your AI workflow against national benchmark standards for baseline metrics, governance, and architecture.
              </p>
            </div>
            <div className="rounded-lg border border-rule bg-slate-soft/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-navy block">02 · T1-SUBMITTED Advantage</span>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Direct submissions with verified telemetry can achieve Grade A and up to 100% research coverage — exceeding what public awards publish.
              </p>
            </div>
            <div className="rounded-lg border border-rule bg-slate-soft/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-navy block">03 · Inclusion Threshold</span>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Requires at least 6 months of live production tenure, paired before/after metrics, and verified technical documentation.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="shell py-12">
        <div className="max-w-4xl mx-auto">
          <IntakeForm />
        </div>
      </main>

      {/* Methodology reference bar */}
      <aside className="border-t border-rule bg-white-alt py-10">
        <div className="shell flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Want to review our verification standards first?</p>
            <p className="text-xs text-muted mt-0.5">
              Read our full inclusion criteria, evidence tiers, and conflict-of-interest policies.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about#inclusion"
              className="rounded border border-rule bg-white px-3.5 py-1.5 text-xs font-medium text-ink hover:border-blue hover:text-blue"
            >
              Inclusion Criteria
            </Link>
            <Link
              href="/about#coi"
              className="rounded border border-rule bg-white px-3.5 py-1.5 text-xs font-medium text-ink hover:border-blue hover:text-blue"
            >
              Conflict of Interest Policy
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
