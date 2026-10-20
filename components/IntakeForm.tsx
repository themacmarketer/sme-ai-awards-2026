'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface FormData {
  submitterName: string;
  submitterEmail: string;
  submitterRole: string;
  submitterPhone: string;
  companyName: string;
  companyUrl: string;
  sector: string;
  staffSize: string;
  isAlumni: boolean;
  consentType: 'full' | 'anonymised';

  // The 10 Evidence Dimensions
  dimContext: string; // 1. Company & industry context
  dimChallenges: string; // 2. Challenges & baseline
  dimSolution: string; // 3. Named AI solution
  dimComponents: string; // 4. Architectural components
  dimVendors: string; // 5. Tech stack & models
  dimWorkflow: string; // 6. Documented workflow
  dimOutcomes: string; // 7. Quantified outcomes
  dimCorroboration: string; // 8. Verification artifacts & links
  dimGovernance: string; // 9. Governance & human-in-the-loop
  dimTenure: string; // 10. Live production tenure
}

const INITIAL_FORM: FormData = {
  submitterName: '',
  submitterEmail: '',
  submitterRole: '',
  submitterPhone: '',
  companyName: '',
  companyUrl: '',
  sector: 'Wholesale & Retail Trade',
  staffSize: '10–49',
  isAlumni: false,
  consentType: 'full',

  dimContext: '',
  dimChallenges: '',
  dimSolution: '',
  dimComponents: '',
  dimVendors: '',
  dimWorkflow: '',
  dimOutcomes: '',
  dimCorroboration: '',
  dimGovernance: '',
  dimTenure: '6–12 months live in production',
};

export function IntakeForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Live Score Calculator based on filled dimensions
  const scoreBreakdown = useMemo(() => {
    const checks = [
      { name: '1. Company Context', valid: form.dimContext.trim().length > 20 },
      { name: '2. Pre-AI Challenges & Baseline', valid: form.dimChallenges.trim().length > 20 },
      { name: '3. Named AI Solution', valid: form.dimSolution.trim().length > 3 },
      { name: '4. Architectural Components', valid: form.dimComponents.trim().length > 20 },
      { name: '5. Technology Stack & Models', valid: form.dimVendors.trim().length > 10 },
      { name: '6. Documented Workflow', valid: form.dimWorkflow.trim().length > 25 },
      { name: '7. Quantified Outcomes (Paired)', valid: form.dimOutcomes.trim().length > 15 },
      { name: '8. Verification Artifacts & Telemetry', valid: form.dimCorroboration.trim().length > 10 },
      { name: '9. Governance & Human Controls', valid: form.dimGovernance.trim().length > 15 },
      { name: '10. Live Tenure (>= 6 Months)', valid: !!form.dimTenure && form.dimTenure !== 'less than 6 months' },
    ];

    const passedCount = checks.filter((c) => c.valid).length;
    const coveragePct = Math.round((passedCount / 10) * 100);

    let projectedGrade: 'A' | 'B' | 'C' = 'C';
    if (coveragePct >= 80 && checks[7].valid) {
      projectedGrade = 'A';
    } else if (coveragePct >= 50) {
      projectedGrade = 'B';
    }

    return {
      checks,
      passedCount,
      coveragePct,
      projectedGrade,
    };
  }, [form]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/sme-ai/api/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          scoreBreakdown,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted({ id: data.submissionId });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-800">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-bold text-emerald-950">Self-Audit &amp; Submission Received</h2>
        <p className="mt-2 text-sm text-emerald-900 max-w-lg mx-auto">
          Thank you, <strong>{form.submitterName}</strong>. Your implementation record for <strong>{form.companyName}</strong> has been logged under reference code: <code className="bg-white/80 px-2 py-0.5 rounded font-mono font-bold text-ink">{submitted.id}</code>.
        </p>

        <div className="mt-6 max-w-md mx-auto rounded-lg border border-emerald-200 bg-white p-5 text-left">
          <p className="eyebrow text-emerald-900">Provisional Self-Audit Result</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-navy">{scoreBreakdown.coveragePct}%</span>
            <span className="rounded bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900">
              Projected Grade {scoreBreakdown.projectedGrade}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">
            {scoreBreakdown.passedCount} of 10 evidence dimensions satisfied. Our editorial team will review the supplied technical artifacts and contact you within 5 business days.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-navy/90"
          >
            Return to Showcase Directory
          </Link>
          <Link
            href="/about#inclusion"
            className="rounded-lg border border-rule bg-white px-5 py-2.5 text-xs font-medium text-ink hover:border-blue hover:text-blue"
          >
            Review Verification Process
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <div className="rounded-lg border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900">
          {error}
        </div>
      )}

      {/* Floating Evidence Readiness Sticky Card */}
      <div className="rounded-xl border border-blue/30 bg-blue-soft/50 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="eyebrow text-blue">Live Evidence Readiness</span>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-bold tabular-nums text-navy">{scoreBreakdown.coveragePct}%</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                {scoreBreakdown.passedCount} / 10 dimensions satisfied
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-md border border-rule bg-white px-3 py-1.5 text-right">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted block">Projected Grade</span>
              <span className="text-sm font-bold text-navy">Grade {scoreBreakdown.projectedGrade}</span>
            </div>
            <div className="hidden md:block text-xs text-muted max-w-[200px]">
              {scoreBreakdown.coveragePct >= 70
                ? 'High readiness: eligible for peer review batch.'
                : 'Fill in details below to increase documentation coverage.'}
            </div>
          </div>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-rule/70">
          <div
            className="h-full bg-blue transition-all duration-300 rounded-full"
            style={{ width: `${scoreBreakdown.coveragePct}%` }}
          />
        </div>
      </div>

      {/* Section A: Submitter & Company Context */}
      <section className="rounded-xl border border-rule bg-white p-6 shadow-sm sm:p-8">
        <div className="border-b border-rule pb-3">
          <span className="eyebrow">Section 1</span>
          <h2 className="mt-1 text-xl font-bold">Submitter &amp; Organisation Details</h2>
          <p className="mt-1 text-xs text-muted">
            Singapore registered entity details. Submissions may be published under full name or anonymised upon request.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Submitter Name *
            </label>
            <input
              type="text"
              required
              value={form.submitterName}
              onChange={(e) => setForm({ ...form, submitterName: e.target.value })}
              placeholder="e.g. Rachel Tan"
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Role / Title *
            </label>
            <input
              type="text"
              required
              value={form.submitterRole}
              onChange={(e) => setForm({ ...form, submitterRole: e.target.value })}
              placeholder="e.g. Managing Director / Head of Ops"
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={form.submitterEmail}
              onChange={(e) => setForm({ ...form, submitterEmail: e.target.value })}
              placeholder="rachel@company.com.sg"
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              value={form.submitterPhone}
              onChange={(e) => setForm({ ...form, submitterPhone: e.target.value })}
              placeholder="+65 9123 4567"
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Company Registered Name *
            </label>
            <input
              type="text"
              required
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              placeholder="e.g. Harvest Logistics Pte Ltd"
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Company Website URL
            </label>
            <input
              type="url"
              value={form.companyUrl}
              onChange={(e) => setForm({ ...form, companyUrl: e.target.value })}
              placeholder="https://harvestlogistics.com.sg"
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Industry Sector
            </label>
            <select
              value={form.sector}
              onChange={(e) => setForm({ ...form, sector: e.target.value })}
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            >
              {[
                'Wholesale & Retail Trade',
                'Logistics & Supply Chain',
                'Precision Engineering & Manufacturing',
                'Marine & Offshore',
                'Professional & Corporate Services',
                'Food & Beverage / Food Tech',
                'Construction & Built Environment',
                'Healthcare & Social Enterprise',
                'Financial Services & Fintech',
                'Other SME Sector',
              ].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
              Staff Size
            </label>
            <select
              value={form.staffSize}
              onChange={(e) => setForm({ ...form, staffSize: e.target.value })}
              className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
            >
              {['1–9 staff (Micro)', '10–49 staff (Small)', '50–199 staff (Medium)'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 border-t border-rule pt-4 flex flex-col gap-3">
          <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={form.isAlumni}
              onChange={(e) => setForm({ ...form, isAlumni: e.target.checked })}
              className="rounded border-rule text-blue focus:ring-blue"
            />
            <span>This implementation originated from or was built by an alumnus of BestCourses / Maple Commerce training programs.</span>
          </label>

          <div className="mt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Publication Disclosure Consent *
            </label>
            <div className="flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="consent"
                  checked={form.consentType === 'full'}
                  onChange={() => setForm({ ...form, consentType: 'full' })}
                />
                <span><strong>Full naming:</strong> Company name and URL publicly credited upon approval.</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="consent"
                  checked={form.consentType === 'anonymised'}
                  onChange={() => setForm({ ...form, consentType: 'anonymised' })}
                />
                <span><strong>Anonymised:</strong> Published as &ldquo;A [Size]-staff [Sector] firm&rdquo; (-0.5 identity penalty on rubric).</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: The 10 Evidence Dimensions */}
      <section className="rounded-xl border border-rule bg-white p-6 shadow-sm sm:p-8 space-y-8">
        <div className="border-b border-rule pb-3">
          <span className="eyebrow">Section 2</span>
          <h2 className="mt-1 text-xl font-bold">The Ten Evidence Dimensions (Self-Audit)</h2>
          <p className="mt-1 text-xs text-muted">
            The evidence grading system is the brand. Complete each dimension to establish verifiable research depth.
          </p>
        </div>

        {/* Dimension 1 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              1. Company &amp; Industry Context
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[0].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[0].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">Describe what your company does, its customer base, and daily operational scale.</p>
          <textarea
            rows={2}
            value={form.dimContext}
            onChange={(e) => setForm({ ...form, dimContext: e.target.value })}
            placeholder="e.g. We are an offshore marine electrical supplier with 28 staff operating across Loyang and Jurong, processing ~150 urgent ship replenishment requests per day."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 2 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              2. Pre-AI Challenges &amp; Baseline Metrics
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[1].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[1].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">What specific operational friction existed before AI? Include exact pre-AI time or cost baseline.</p>
          <textarea
            rows={2}
            value={form.dimChallenges}
            onChange={(e) => setForm({ ...form, dimChallenges: e.target.value })}
            placeholder="e.g. Coordinators spent 3 hours every morning manually transcribing handwritten WhatsApp chits into our ERP, leading to an 8% item mismatch error rate."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 3 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              3. Named AI Solution *
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[2].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[2].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">What is the specific internal project or product name given to this AI system?</p>
          <input
            type="text"
            required
            value={form.dimSolution}
            onChange={(e) => setForm({ ...form, dimSolution: e.target.value })}
            placeholder="e.g. OrderParser AI / TenderScout Agent"
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 4 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              4. Solution Architectural Components
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[3].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[3].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">List the key components: e.g. OCR/Vision intake, vector index, validation ledger, ERP webhook bridge.</p>
          <textarea
            rows={2}
            value={form.dimComponents}
            onChange={(e) => setForm({ ...form, dimComponents: e.target.value })}
            placeholder="e.g. 1) Vision document parser, 2) SKU semantic catalog search, 3) Human exception review queue, 4) SQL ERP posting robot."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 5 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              5. Technology Vendors, Foundation Models &amp; Infrastructure
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[4].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[4].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">Which specific foundation models, databases, orchestration platforms, or on-prem servers are used?</p>
          <input
            type="text"
            value={form.dimVendors}
            onChange={(e) => setForm({ ...form, dimVendors: e.target.value })}
            placeholder="e.g. Claude 3.5 Sonnet Vision, Qdrant Vector DB, n8n on AWS Singapore, Autocount ERP."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 6 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              6. Documented End-to-End Workflow
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[5].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[5].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">Trace the step-by-step path from raw business input to completed output.</p>
          <textarea
            rows={3}
            value={form.dimWorkflow}
            onChange={(e) => setForm({ ...form, dimWorkflow: e.target.value })}
            placeholder="e.g. Customer sends PO WhatsApp -> Webhook pushes PDF/image to n8n -> Claude extracts line items -> Qdrant vector matches ERP SKUs -> If match >90%, auto-staged in ERP; if <90%, routed to coordinator dashboard."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 7 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              7. Quantified Business Outcomes (Paired Baselines)
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[6].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[6].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">State your verified before vs. after figures. (e.g. Intake time reduced from 3 hours to 20 minutes; error rate down from 8% to 0.5%).</p>
          <textarea
            rows={2}
            value={form.dimOutcomes}
            onChange={(e) => setForm({ ...form, dimOutcomes: e.target.value })}
            placeholder="e.g. Intake clearing time down from 3 hours to 25 minutes. Monthly processing capacity increased by 240% without additional headcount."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 8 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              8. Verification Artifacts &amp; Telemetry Links (T1-SUBMITTED)
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[7].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[7].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">Link to Google Drive / Dropbox / Loom video or describe system logs available for editorial verification.</p>
          <input
            type="text"
            value={form.dimCorroboration}
            onChange={(e) => setForm({ ...form, dimCorroboration: e.target.value })}
            placeholder="e.g. Google Drive link to system screenshots, sample masked logs, and ERP batch report."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 9 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              9. Governance, PDPA &amp; Human-in-the-Loop Controls
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[8].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[8].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">How are hallucinations, sensitive client data, and final approval handled by human staff?</p>
          <textarea
            rows={2}
            value={form.dimGovernance}
            onChange={(e) => setForm({ ...form, dimGovernance: e.target.value })}
            placeholder="e.g. Zero-retention enterprise API agreement; high-value orders above $5,000 always require manual supervisor signature before ERP commit."
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          />
        </div>

        {/* Dimension 10 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-ink">
              10. Live Operational Tenure *
            </label>
            <span className={`text-[0.7rem] font-semibold ${scoreBreakdown.checks[9].valid ? 'text-emerald-700' : 'text-muted'}`}>
              {scoreBreakdown.checks[9].valid ? '✓ Passed (+10%)' : 'Needs detail'}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">Our inclusion criteria requires at least 6 months of live production operation with measurable impact.</p>
          <select
            value={form.dimTenure}
            onChange={(e) => setForm({ ...form, dimTenure: e.target.value })}
            className="mt-1.5 w-full rounded border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          >
            <option value="6–12 months live in production">6–12 months live in production (Meets criteria)</option>
            <option value="12–24 months live in production">12–24 months live in production (Meets criteria)</option>
            <option value="More than 2 years live in production">More than 2 years live in production (Meets criteria)</option>
            <option value="less than 6 months">Less than 6 months (Pilot / In development)</option>
          </select>
        </div>
      </section>

      {/* Submission CTA */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-rule pt-6">
        <div>
          <p className="text-xs text-muted">
            By submitting, you certify that supplied operational figures are accurate and that you have authority to submit this audit.
          </p>
          <p className="text-[0.7rem] text-muted mt-0.5">
            Published entries are released in monthly cohorts. Review our <Link href="/about#inclusion" className="text-blue underline">Methodology &amp; Verification Tiers</Link>.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-navy px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy/90 disabled:opacity-50 shrink-0"
        >
          {submitting ? 'Submitting Self-Audit…' : 'Submit Case Study for Review →'}
        </button>
      </div>
    </form>
  );
}
