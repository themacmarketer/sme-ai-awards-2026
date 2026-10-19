import type { Metadata } from 'next';
import { Compare } from '@/components/Compare';
import { winners, SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Compare case studies',
  description:
    'Compare two or three SME AI Impact Awards winners side by side: industry, business problem, solution type, technology layers, published outcomes and evidence availability.',
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
            Select two or three winners to compare the problem they faced, the type of AI they
            deployed, how much of the stack is documented, and what they published as results.
          </p>
        </div>
      </header>

      <div className="shell py-10">
        <Compare winners={winners} />
      </div>
    </>
  );
}
