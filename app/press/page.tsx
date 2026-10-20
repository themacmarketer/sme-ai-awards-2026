import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { meta, totalSources, SITE, winners } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Press & Media Pack — SME AI Impact Awards 2026 Showcase',
  description:
    'Editorial briefings, five pre-computed data stories, downloadable high-resolution charts, open dataset access, and press contacts for journalists covering Singapore enterprise AI adoption.',
  alternates: { canonical: `${SITE.url}/press/` },
};

const DATA_STORIES = [
  {
    number: '01',
    title: 'The Documentation Gap: 60% of award-winning SMEs do not disclose their AI vendor',
    summary:
      'While 100% of winners published quantified operational returns, 18 of the 30 winners (60%) do not name the underlying model provider, cloud platform, or vendor partner in public records.',
    dataPoints: [
      { label: 'Winners with named vendors', value: '12 of 30 (40%)' },
      { label: 'Winners without named vendors', value: '18 of 30 (60%)' },
      { label: 'Takeaway', value: 'Commercial secrecy & internal integration over vendor co-branding' },
    ],
    editorialContext:
      'Enterprise AI adoption among small and medium businesses in Singapore is heavily operationalised through proprietary workflows or uncredited software. C-suite leaders and IT heads report dramatic business returns without endorsing commercial platforms, demonstrating that workflow configuration matters more than raw foundational model selection.',
  },
  {
    number: '02',
    title: 'Operational Queues Beat Chatbot Hype: 63% automate back-office intake',
    summary:
      'Rather than customer-facing conversational bots, 19 of 30 award winners deployed AI to automate unstructured intake: document processing, invoice indexing, scheduling, and order verification.',
    dataPoints: [
      { label: 'Back-office & queue automation', value: '19 of 30 (63.3%)' },
      { label: 'Conversational customer service', value: '2 of 30 (6.7%)' },
      { label: 'Dominant archetype', value: 'LLM Document & Workflow Automation' },
    ],
    editorialContext:
      'The public conversation around GenAI emphasizes chatbots and conversational search, but Singapore SMEs achieving verified ROI are deploying AI as an intake filter: reading PDFs, parsing invoices, matching manifests, and routing human approvals for exceptions.',
  },
  {
    number: '03',
    title: 'Adoption Excellence Parity: Off-the-shelf tools deliver custom-grade ROI',
    summary:
      'The 15 Adoption Excellence winners achieved an average of 40% to 80% process time reductions using established commercial software (COTS), matching proprietary custom builds in speed and scale.',
    dataPoints: [
      { label: 'Average time savings reported', value: '40% – 85%' },
      { label: 'Adoption vs Innovation split', value: '15 Adoption / 15 Innovation' },
      { label: 'Key finding', value: 'Zero custom code needed for top-tier operational impact' },
    ],
    editorialContext:
      'SMEs do not need in-house machine learning engineers to capture award-winning productivity. Half the showcase winners simply embedded ready-to-use software into their existing ERP and accounting systems, realizing massive gains within months of deployment.',
  },
  {
    number: '04',
    title: 'The Third-Party Corroboration Divide: Only 40% independently corroborated',
    summary:
      'Only 12 of 30 winning implementations (40%) have verifiable third-party technical corroboration in mainstream news, vendor whitepapers, or client case studies outside the official government citation.',
    dataPoints: [
      { label: 'Grade A (Independently supported)', value: '12 winners (40%)' },
      { label: 'Grade B (Canonical source only)', value: '18 winners (60%)' },
      { label: 'Total cited sources', value: `${totalSources()} across 30 companies` },
    ],
    editorialContext:
      'A significant evidence gap persists between government award citations and verifiable public technical literature. While IMDA and SBF conducted site visits to verify claims, independent press coverage and public technical whitepapers remain scarce for most small enterprise AI deployments.',
  },
  {
    number: '05',
    title: 'Time is the Universal Currency: 93% of winners measure time saved',
    summary:
      '28 of 30 winners (93.3%) measured their primary impact in hours saved per day or percentage reduction in processing cycles, far outpacing direct headcount cuts or top-line revenue gains.',
    dataPoints: [
      { label: 'Reported time reduction', value: '28 of 30 (93.3%)' },
      { label: 'Capacity expansion', value: '20 of 30 (66.7%)' },
      { label: 'Direct revenue increase', value: '9 of 30 (30.0%)' },
    ],
    editorialContext:
      'Amid tight labor market conditions in Singapore, SMEs view AI primarily as a labor capacity multiplier. Rather than replacing workers, successful deployments absorb transactional volume so existing teams can take on higher-value client work without headcount expansion.',
  },
];

const PRESS_CHARTS = [
  {
    title: 'Industry Sectors Distribution',
    file: '/sme-ai/charts/sectors-distribution.png',
    filename: 'sectors-distribution.png',
    desc: 'Breakdown of 30 winning companies across 21 industry sectors.',
  },
  {
    title: 'AI Technology Architecture Archetypes',
    file: '/sme-ai/charts/ai-types-breakdown.png',
    filename: 'ai-types-breakdown.png',
    desc: 'Distribution of LLM applications, agentic workflows, computer vision, and predictive ML.',
  },
  {
    title: 'Reported Business Outcomes by Frequency',
    file: '/sme-ai/charts/outcomes-frequency.png',
    filename: 'outcomes-frequency.png',
    desc: 'Quantified metrics reported across Time, Capacity, Cost, Quality, and Revenue.',
  },
  {
    title: 'Evidence Grade Distribution',
    file: '/sme-ai/charts/evidence-grades.png',
    filename: 'evidence-grades.png',
    desc: 'Rigor classification across Grade A (independently corroborated) and Grade B.',
  },
  {
    title: 'Research Coverage Score Distribution',
    file: '/sme-ai/charts/coverage-histogram.png',
    filename: 'coverage-histogram.png',
    desc: 'Percentage completeness across 10 evaluation dimensions (average 94%).',
  },
];

export default function PressPage() {
  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Press &amp; Media Resources</p>
          <h1 className="mt-3 max-w-[26ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            Press briefing &amp; data stories
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            Pre-computed data stories, high-resolution downloadable charts, structured data assets,
            and research commentary for journalists, analysts, and enterprise editors.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/data"
              className="inline-flex items-center gap-2 border border-ink bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-blue hover:bg-blue"
            >
              Access the open dataset (CSV/JSON) →
            </Link>
            <a
              href="#stories"
              className="inline-flex items-center gap-2 border border-rule bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
            >
              Read the five data stories ↓
            </a>
          </div>
        </div>
      </header>

      <div className="shell py-12 space-y-16">
        {/* Media contact & Boilerplate */}
        <section className="grid gap-8 border-b border-rule pb-12 md:grid-cols-[1.4fr_1fr]">
          <div className="border border-rule bg-white p-6 sm:p-8">
            <p className="eyebrow">Project Boilerplate</p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink">
              The SME AI Impact Showcase is an independent, evidence-graded research project documenting the 30 winners of Singapore&apos;s inaugural SME AI Impact Awards 2026, organised by IMDA and SBF. Researched and maintained by Ivan Wong at BestCourses.sg, the project provides open datasets, technical architecture analysis, and verifiable case studies to guide enterprise AI adoption across Singapore SMEs.
            </p>
            <div className="mt-6 border-t border-rule pt-4 text-xs text-muted">
              Free for non-commercial and commercial reuse under Creative Commons CC BY 4.0.
            </div>
          </div>

          <div className="border border-rule bg-white p-6 sm:p-8">
            <p className="eyebrow">Media Contact &amp; Enquiries</p>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
              <p className="font-semibold text-ink">Ivan Wong</p>
              <p className="text-xs text-muted">Lead Researcher &amp; Founder, BestCourses.sg</p>
              <p className="pt-2">
                <a
                  href="mailto:press@bestcourses.sg"
                  className="link-underline font-medium text-blue"
                >
                  press@bestcourses.sg
                </a>
              </p>
              <p className="text-xs text-muted">
                Available for commentary on Singapore SME digital transformation, artificial intelligence adoption metrics, and enterprise workflow implementation.
              </p>
            </div>
          </div>
        </section>

        {/* Five Pre-computed Data Stories */}
        <section id="stories" className="scroll-mt-20">
          <div className="mb-8">
            <p className="eyebrow">Analysis</p>
            <h2 className="mt-1 font-sans text-3xl font-bold tracking-tight">Five pre-computed data stories</h2>
            <p className="mt-2 text-sm text-muted">
              Ready-to-use editorial angles backed by exact quantitative data points from the verified award winner records.
            </p>
          </div>

          <div className="space-y-8">
            {DATA_STORIES.map((story) => (
              <article key={story.number} className="border border-rule bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-sans text-2xl font-bold text-blue/40">{story.number}</span>
                  <h3 className="font-sans text-xl font-bold text-ink sm:text-2xl">{story.title}</h3>
                </div>
                <p className="mt-3 text-base font-medium leading-relaxed text-ink/80">{story.summary}</p>

                <div className="my-6 grid gap-3 sm:grid-cols-3">
                  {story.dataPoints.map((dp, i) => (
                    <div key={i} className="border border-rule bg-slate-soft/40 p-3.5">
                      <p className="eyebrow">{dp.label}</p>
                      <p className="mt-1 font-sans text-base font-bold text-blue">{dp.value}</p>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-blue pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Editorial context</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{story.editorialContext}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Downloadable Charts */}
        <section className="border-t border-rule pt-12">
          <div className="mb-8">
            <p className="eyebrow">Press Visual Assets</p>
            <h2 className="mt-1 font-sans text-3xl font-bold tracking-tight">Downloadable Insights charts</h2>
            <p className="mt-2 text-sm text-muted">
              High-resolution PNG charts formatted with source attributions for publication in print or online media.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PRESS_CHARTS.map((chart) => (
              <div key={chart.filename} className="border border-rule bg-white p-5 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper">
                    <Image
                      src={chart.file}
                      alt={chart.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="mt-4 font-sans text-lg font-bold text-ink">{chart.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{chart.desc}</p>
                </div>
                <div className="mt-4 border-t border-rule pt-3 flex items-center justify-between">
                  <span className="text-[0.75rem] text-muted">PNG · 800×480px</span>
                  <a
                    href={chart.file}
                    download={chart.filename}
                    className="inline-flex items-center gap-1.5 border border-rule bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-blue hover:text-blue"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download image
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dataset Link Callout */}
        <section className="border border-rule bg-navy p-8 text-white">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/60">Structured Data Access</p>
            <h2 className="mt-2 font-sans text-2xl font-bold sm:text-3xl">
              Complete, ungated CSV and JSON dataset
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Access the entire tabular dataset including 10-dimension evaluation coverage scores,
              named technology stacks, verified business metrics, and multi-tier source references.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/data"
                className="border border-white bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-white/90"
              >
                Go to data dictionary &amp; downloads →
              </Link>
              <Link
                href="/"
                className="border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:text-white"
              >
                Explore 30 winner case studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
