import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import { PlaybookForm } from '@/components/PlaybookForm';

export const metadata: Metadata = {
  title: 'SME AI Implementation Playbook | Operational Synthesis',
  description:
    'A cross-case operational synthesis of 30 verified Singapore SME AI implementations across 21 sectors, mapped to Singapore support schemes (EDG, PSG, GenAI Sandbox, SFEC).',
  alternates: { canonical: `${SITE.url}/playbook/` },
};

export default function PlaybookPage() {
  return (
    <>
      <header className="border-b border-rule bg-slate-50 py-12 sm:py-16">
        <div className="shell text-center">
          <p className="eyebrow text-teal-800">Singapore SME AI Implementation Research · Evidence-Graded Synthesis</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-sans text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            SME AI Implementation Playbook
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A cross-case operational synthesis of the 30 winners of the Singapore SME AI Impact Awards 2026, organised by IMDA and SBF. Compiled by use case, implementation level, and Singapore support scheme mapping.
          </p>
        </div>
      </header>

      <main className="shell mx-auto max-w-4xl py-12">
        {/* Notice on Open Access */}
        <div className="rounded-md border-l-4 border-teal-700 bg-slate-100 p-5 text-sm leading-relaxed text-ink/80">
          <p className="font-semibold text-teal-900">Notice on open access vs. this synthesis</p>
          <p className="mt-1">
            The open case-study record and individual evidence grading for all 30 winning companies remain freely accessible without restriction on the{' '}
            <Link href="/" className="font-medium text-teal-800 underline hover:text-teal-900">
              SME AI Impact Showcase
            </Link>
            . This Playbook is a separate operational compilation: it synthesises the 30 replication blueprints across operational use cases, categorises them into three implementation tiers, and maps each pattern to Singapore grant funding schemes (EDG, PSG, and current GenAI schemes).
          </p>
        </div>

        {/* Who this is for */}
        <section className="mt-12">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Who this playbook is for
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            This playbook is written for operators, not theorists. It is designed specifically for:
          </p>
          <ul className="mt-4 list-disc space-y-2.5 pl-6 text-sm leading-relaxed text-ink/80 sm:text-base">
            <li>
              <strong>Managing Partners, Directors, and COOs</strong> at Singapore SMEs and professional-services firms (law practices, accounting firms, agencies, consultancies, logistics providers) evaluating AI implementation feasibility.
            </li>
            <li>
              <strong>Operations and technology leads</strong> who need to know what technology stacks (n8n, Claude, Make, Python, Postgres, ERP webhooks) work reliably under Singapore regulatory and data constraints.
            </li>
            <li>
              <strong>Business leaders structuring grant applications</strong> who need clarity on whether an initiative belongs under off-the-shelf adoption (PSG / GenAI Sandbox) or bespoke capability development (EDG).
            </li>
          </ul>
        </section>

        {/* What it contains */}
        <section className="mt-12">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            What the playbook contains
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Drawing directly on the 30 verified award citations and technical replication records, this 42-page reference document provides:
          </p>
          <ul className="mt-4 list-disc space-y-2.5 pl-6 text-sm leading-relaxed text-ink/80 sm:text-base">
            <li>
              <strong>6 Cross-Case Use Case Blueprints:</strong> Aggregated from the 30 winners across 21 sectors, detailing recurring workflow architectures, required data structures, and common failure points.
            </li>
            <li>
              <strong>Three Implementation Paths per Use Case:</strong> Detailed specifications for Level 1 (No-code / SaaS setup in 1–2 weeks), Level 2 (Low-code orchestration with n8n/Make in 4–8 weeks), and Level 3 (Governed custom pipelines in 12–20 weeks).
            </li>
            <li>
              <strong>Verified Technology Stack Registry:</strong> Breakdown of commercial vs open-source tools deployed by winners, including OCR parsers, LLM orchestrators, database layers, and vector stores.
            </li>
            <li>
              <strong>PDPA &amp; Governance Checklists:</strong> Practical compliance rules for data residency, client-confidentiality boundaries, and automated regression testing before production release.
            </li>
            <li>
              <strong>Singapore Support Scheme Matrix:</strong> Exact grant criteria, support caps, and application blueprints mapping each implementation pattern to EDG, PSG, and GenAI schemes.
            </li>
          </ul>
        </section>

        {/* The 6 Use Cases */}
        <section className="mt-12">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            The 6 operational use cases covered
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            The 30 winners fall into six distinct operational clusters. The playbook provides end-to-end replication guides for each:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-rule bg-white p-5">
              <h3 className="font-sans text-base font-bold text-ink">
                1. Document &amp; Invoice Processing Automation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Extracting unstructured intake data from PDFs, emails, and scans into structured ERP/accounting systems with human validation.
              </p>
              <p className="mt-3 text-xs text-teal-800">
                <strong>Represented by:</strong>{' '}
                <Link href="/winners/you-tiao-man" className="underline hover:text-ink">You Tiao Man</Link> (83% time reduction),{' '}
                <Link href="/winners/supreme-components-international" className="underline hover:text-ink">Supreme Components</Link>,{' '}
                <Link href="/winners/accountingbpo" className="underline hover:text-ink">Accountingbpo</Link>.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-white p-5">
              <h3 className="font-sans text-base font-bold text-ink">
                2. Customer Engagement &amp; Contact Centre Intelligence
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Real-time caller sentiment analysis, dynamic customer context retrieval from CRM history, automated triage, and 100% QA audit coverage.
              </p>
              <p className="mt-3 text-xs text-teal-800">
                <strong>Represented by:</strong>{' '}
                <Link href="/winners/agape-cp-holdings" className="underline hover:text-ink">Agape CP Holdings</Link>,{' '}
                <Link href="/winners/ihub-solutions" className="underline hover:text-ink">iHub Solutions</Link>,{' '}
                <Link href="/winners/nami-japanese-language-school" className="underline hover:text-ink">Nami Japanese</Link>.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-white p-5">
              <h3 className="font-sans text-base font-bold text-ink">
                3. Operational Monitoring &amp; Quality Computer Vision
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Automated visual inspection, edge camera processing, and sensor data anomaly detection providing 4–7 days advance predictive warning.
              </p>
              <p className="mt-3 text-xs text-teal-800">
                <strong>Represented by:</strong>{' '}
                <Link href="/winners/blue-aqua-international" className="underline hover:text-ink">Blue Aqua</Link> (30% feeding gain),{' '}
                <Link href="/winners/greenphyto" className="underline hover:text-ink">Greenphyto</Link>,{' '}
                <Link href="/winners/getgo-technologies" className="underline hover:text-ink">GetGo</Link>,{' '}
                <Link href="/winners/tts-group" className="underline hover:text-ink">TTS Group</Link>.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-white p-5">
              <h3 className="font-sans text-base font-bold text-ink">
                4. Creative &amp; Marketing Pipeline Automation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Multi-agent briefing, asset variant generation, automated localization, and virtual production rendering pipelines.
              </p>
              <p className="mt-3 text-xs text-teal-800">
                <strong>Represented by:</strong>{' '}
                <Link href="/winners/goodstuph" className="underline hover:text-ink">GOODSTUPH</Link>,{' '}
                <Link href="/winners/brew-interactive" className="underline hover:text-ink">Brew Interactive</Link>,{' '}
                <Link href="/winners/best-marketing-agency" className="underline hover:text-ink">Best Marketing Agency</Link>,{' '}
                <Link href="/winners/oceanus-media-global" className="underline hover:text-ink">Oceanus Media</Link>.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-white p-5">
              <h3 className="font-sans text-base font-bold text-ink">
                5. Enterprise Knowledge Mining &amp; Internal Advisory RAG
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Connecting historical matter files, internal SOPs, and compliance archives into access-controlled RAG systems; governed business-rule separation.
              </p>
              <p className="mt-3 text-xs text-teal-800">
                <strong>Represented by:</strong>{' '}
                <Link href="/winners/glints-singapore" className="underline hover:text-ink">Glints</Link>,{' '}
                <Link href="/winners/ong-ong" className="underline hover:text-ink">ONG&amp;ONG Group</Link>,{' '}
                <Link href="/winners/kyanon-digital" className="underline hover:text-ink">Kyanon Digital</Link> (WisdomMind, 80x faster rule changes).
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-white p-5">
              <h3 className="font-sans text-base font-bold text-ink">
                6. Personalised Learning &amp; Workforce Enablement
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Adaptive diagnostic intake, curriculum generation, personalised coaching feedback, and automated compliance progress tracking.
              </p>
              <p className="mt-3 text-xs text-teal-800">
                <strong>Represented by:</strong>{' '}
                <Link href="/winners/lithan-academy" className="underline hover:text-ink">Lithan Academy</Link>,{' '}
                <Link href="/winners/lil-but-mighty" className="underline hover:text-ink">Lil&apos; but Mighty</Link>,{' '}
                <Link href="/winners/catalyst-performance" className="underline hover:text-ink">Catalyst Performance</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Singapore Support Scheme Mapping */}
        <section className="mt-12">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Singapore support scheme mapping
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Every implementation pattern in the playbook is mapped to its corresponding Singapore grant track, with eligibility criteria and application parameters current as of 2026:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse border border-rule text-left text-xs sm:text-sm">
              <thead className="bg-slate-100">
                <tr className="border-b border-rule">
                  <th className="p-3 font-semibold text-ink">Support Scheme</th>
                  <th className="p-3 font-semibold text-ink">Agency</th>
                  <th className="p-3 font-semibold text-ink">Coverage &amp; Scope</th>
                  <th className="p-3 font-semibold text-ink">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule bg-white">
                <tr>
                  <td className="p-3 font-semibold text-ink">Enterprise Development Grant (EDG)</td>
                  <td className="p-3 text-muted">EnterpriseSG</td>
                  <td className="p-3 text-muted">Up to 50% co-funding for core capability development, process redesign, and custom AI systems</td>
                  <td className="p-3 text-ink/90">Level 2 &amp; 3 builds: custom n8n pipelines, bespoke RAG platforms, enterprise integrations</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-ink">Productivity Solutions Grant (PSG)</td>
                  <td className="p-3 text-muted">IMDA / EnterpriseSG</td>
                  <td className="p-3 text-muted">Up to 50% subsidy for pre-scoped, pre-approved digital and AI packages under SMEs Go Digital</td>
                  <td className="p-3 text-ink/90">Level 1 adoption: pre-approved customer service chatbots, document extraction tools, accounting AI</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-ink">GenAI Sandbox for SMEs</td>
                  <td className="p-3 text-muted">IMDA / EnterpriseSG</td>
                  <td className="p-3 text-muted">Subsidised 3-month trial support for vetted GenAI solutions in marketing, customer engagement &amp; HR</td>
                  <td className="p-3 text-ink/90">Low-risk pilots: testing marketing content generators and customer virtual assistants before full PSG adoption</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-ink">SkillsFuture Enterprise Credit (SFEC) &amp; Training Subsidies</td>
                  <td className="p-3 text-muted">SSG</td>
                  <td className="p-3 text-muted">Up to 70–90% course fee subsidy plus up to S$10,000 credit for workforce transformation</td>
                  <td className="p-3 text-ink/90">Hands-on team upskilling in automation platforms so internal staff own and operate deployed systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Lead Magnet Form */}
        <section className="mt-14">
          <PlaybookForm />
        </section>

        <p className="mt-8 text-center text-xs text-muted">
          Prefer to review the underlying case studies individually first?{' '}
          <Link href="/" className="underline hover:text-ink">
            Explore all 30 case studies on the open SME AI Impact Showcase →
          </Link>
        </p>
      </main>
    </>
  );
}
