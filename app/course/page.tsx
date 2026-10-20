import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import { CourseForm } from '@/components/CourseForm';

export const metadata: Metadata = {
  title: 'What 30 Verified AI Implementations Teach Singapore SMEs | 5-Day Email Course',
  description:
    'A 5-day email masterclass breaking down the operating architectures, economics, and grant alignment of 30 verified Singapore SME AI implementations.',
  alternates: { canonical: `${SITE.url}/course/` },
};

export default function CoursePage() {
  return (
    <>
      <header className="border-b border-rule bg-slate-50 py-12 sm:py-16">
        <div className="shell text-center">
          <p className="eyebrow text-blue-700">Free 5-Day Email Masterclass · BestCourses.sg Research</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-sans text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            What 30 Verified AI Implementations Teach Singapore SMEs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A 5-day briefing based on the inaugural SME AI Impact Awards 2026 dataset, organised by IMDA and SBF. One lesson per morning, each breaking down an operating architecture and linking back to the verified case record.
          </p>
        </div>
      </header>

      <main className="shell mx-auto max-w-4xl py-12">
        <div className="space-y-4 text-base leading-relaxed text-ink/80">
          <p>
            In April 2026, IMDA and SBF announced 30 winners from 290 nominations across 21 industry sectors. The winners represent two distinct categories: Adoption Excellence (companies using AI to transform operations) and Innovation Excellence (companies developing proprietary AI tools).
          </p>
          <p>
            Across all 30 implementations, the data reveals clear structural patterns about what works, what fails, and how Singapore SMEs actually extract value from AI without burning capital. This course delivers those findings directly to your inbox across five mornings.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            The 5-Day Syllabus
          </h2>

          <div className="mt-6 space-y-5">
            {/* Day 1 */}
            <div className="rounded-lg border border-rule bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Day 1
                </span>
                <h3 className="font-sans text-lg font-bold text-ink">
                  The Queue Automation Architecture
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                Why the vast majority of successful SME implementations do not start with conversational chatbots. We unpack the classic intake-extraction-validation pattern: capturing unstructured requests, structuring them into databases, and inserting human approval before production commits.
              </p>
              <p className="mt-3 text-xs text-blue-700">
                <strong>Case studies analyzed:</strong>{' '}
                <Link href="/winners/you-tiao-man" className="underline hover:text-ink">You Tiao Man</Link> (83% invoice processing speedup),{' '}
                <Link href="/winners/supreme-components-international" className="underline hover:text-ink">Supreme Components International</Link> (Atlas RFQ platform),{' '}
                <Link href="/winners/accountingbpo" className="underline hover:text-ink">Accountingbpo</Link> (Yi.Suite).
              </p>
            </div>

            {/* Day 2 */}
            <div className="rounded-lg border border-rule bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Day 2
                </span>
                <h3 className="font-sans text-lg font-bold text-ink">
                  The Repeated Setup Trap &amp; Buy-vs-Build Economics
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                If every AI project requires engineering teams to rebuild retrieval, evaluation, and monitoring from scratch, consultancy and implementation economics collapse. We study how separating business rules from application code accelerates operational updates by 80x.
              </p>
              <p className="mt-3 text-xs text-blue-700">
                <strong>Case studies analyzed:</strong>{' '}
                <Link href="/winners/kyanon-digital" className="underline hover:text-ink">Kyanon Digital</Link> (WisdomMind enterprise AI platform),{' '}
                <Link href="/winners/best-marketing-agency" className="underline hover:text-ink">Best Marketing Agency</Link> (Big Beast OS).
              </p>
            </div>

            {/* Day 3 */}
            <div className="rounded-lg border border-rule bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Day 3
                </span>
                <h3 className="font-sans text-lg font-bold text-ink">
                  What the Numbers Tell Us: Time Saved vs Revenue Growth
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                An empirical look at the outcomes: 87.6% of Singapore adopting enterprises cite productivity/process improvement as their primary benefit, while only 44% report direct cost reduction. We break down why time reclamation is the most defensible metric and how to measure true payback cycles.
              </p>
              <p className="mt-3 text-xs text-blue-700">
                <strong>Case studies analyzed:</strong>{' '}
                <Link href="/winners/blue-aqua-international" className="underline hover:text-ink">Blue Aqua International</Link> (30% feeding efficiency, 4–7 days early anomaly warning),{' '}
                <Link href="/winners/agape-cp-holdings" className="underline hover:text-ink">Agape CP Holdings</Link> (Contact Centre QA),{' '}
                <Link href="/winners/goodstuph" className="underline hover:text-ink">GOODSTUPH</Link> (AI.YAH Creative System).
              </p>
            </div>

            {/* Day 4 */}
            <div className="rounded-lg border border-rule bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Day 4
                </span>
                <h3 className="font-sans text-lg font-bold text-ink">
                  Governance, PDPA &amp; Operational Risk Controls
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                How winners manage risk in production. We review real-time sentiment analysis controls, data residency boundaries for Singapore client files, and automated regression testing before models or prompt logic reach end users.
              </p>
              <p className="mt-3 text-xs text-blue-700">
                <strong>Case studies analyzed:</strong>{' '}
                <Link href="/winners/iapps-health-group" className="underline hover:text-ink">iAPPS Health Group</Link> (1docAI healthcare governance),{' '}
                <Link href="/winners/getgo-technologies" className="underline hover:text-ink">GetGo Technologies</Link> (Project Desmond fleet damage vision).
              </p>
            </div>

            {/* Day 5 */}
            <div className="rounded-lg border border-rule bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="rounded bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Day 5
                </span>
                <h3 className="font-sans text-lg font-bold text-ink">
                  The Singapore Funding Playbook: Matching Projects to EDG &amp; PSG
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                A practical decision framework for funding. When to apply for off-the-shelf packages under the Productivity Solutions Grant (PSG) or GenAI Sandbox trials, versus when to scope a custom capability development proposal under the Enterprise Development Grant (EDG).
              </p>
              <p className="mt-3 text-xs text-blue-700">
                <strong>Includes:</strong> Grant qualification checklist and common reasons for EnterpriseSG / IMDA application delays.
              </p>
            </div>
          </div>
        </section>

        {/* Course Form */}
        <section className="mt-14">
          <CourseForm />
        </section>

        <p className="mt-8 text-center text-xs text-muted">
          Looking for the full compiled replication guides instead?{' '}
          <Link href="/playbook" className="underline hover:text-ink">
            Download the complete 42-page SME AI Implementation Playbook →
          </Link>
        </p>
      </main>
    </>
  );
}
