import type { Metadata } from 'next';
import { Compare } from '@/components/Compare';
import { allCases, SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Compare case studies — SME AI Impact Showcase',
  description:
    'Compare two or three SME AI case studies side by side across award winners and practitioner implementations: industry, problem, solution, technology layers, outcomes, and research coverage.',
  alternates: { canonical: `${SITE.url}/compare/` },
};

export default function ComparePage() {
  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Side by side</p>
          <h1 className="mt-3 font-sans text-[2.25rem] leading-tight tracking-tight sm:text-4xl">
            Compare case studies
          </h1>
          <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            Select two or three case studies from the sealed award cohort or Maple Commerce practitioner deployments to compare their operational friction, AI architecture, documented stack, and published outcomes.
          </p>
        </div>
      </header>

      <div className="shell py-10">
        <Compare winners={allCases} />
      </div>
    </>
  );
}
