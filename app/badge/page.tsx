import type { Metadata } from 'next';
import Link from 'next/link';
import { winners, SITE } from '@/lib/data';
import { BadgeGenerator } from '@/components/BadgeGenerator';

export const metadata: Metadata = {
  title: 'Embeddable Winner Badges — SME AI Impact Showcase',
  description:
    'Generate verified embeddable badges for winners of the SME AI Impact Awards 2026. Evidence-graded case study attribution for corporate websites, newsrooms, and press kits.',
  alternates: { canonical: `${SITE.url}/badge/` },
};

export default function BadgePage() {
  return (
    <>
      <header className="border-b border-rule bg-white">
        <div className="shell py-12">
          <p className="eyebrow">Winner Recognition &amp; Embeds</p>
          <h1 className="mt-3 max-w-[26ch] font-sans text-[2.25rem] leading-[1.1] tracking-tight sm:text-[3rem]">
            Embeddable showcase badges
          </h1>
          <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            Are you one of the 30 award-winning companies? Embed a live, evidence-graded badge on
            your website or newsroom to demonstrate independent verification of your implementation
            and business outcomes.
          </p>
        </div>
      </header>

      <div className="shell py-12 space-y-12">
        <BadgeGenerator winners={winners} />

        <section className="border border-rule bg-white p-6 sm:p-8">
          <h2 className="font-sans text-xl font-semibold">Usage &amp; Attribution Guidelines</h2>
          <div className="mt-3 max-w-prose space-y-3 text-sm leading-relaxed text-ink/80">
            <p>
              Badges generated here link directly to the independent case study on this showcase.
              They may be used by the recognized winning organizations, their implementation
              partners, and media outlets covering the awards.
            </p>
            <p className="text-xs text-muted">
              Note: This badge represents inclusion in the independent research showcase of the SME
              AI Impact Awards 2026 organized by IMDA and SBF. It does not imply endorsement by any
              party.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="border border-ink bg-navy px-5 py-2.5 text-sm text-white hover:border-blue hover:bg-blue"
          >
            Browse all 30 case studies
          </Link>
          <Link
            href="/data"
            className="border border-rule bg-white px-5 py-2.5 text-sm hover:border-blue hover:text-blue"
          >
            View open dataset (CSV/JSON)
          </Link>
        </div>
      </div>
    </>
  );
}
