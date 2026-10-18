import Link from 'next/link';
import { meta, totalSources, formatDate } from '@/lib/data';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-navy text-white">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xl font-bold">SME AI Impact Showcase</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            An independent, evidence-graded study of the {meta.totalWinners} winners of the
            SME AI Impact Awards 2026, organised by IMDA and SBF.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/50">
            This project is not affiliated with, endorsed by, or sponsored by IMDA, SBF, or any
            winning company. Company names and award citations belong to their respective owners.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Sections</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-white transition-colors" href="/">Winner directory</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/insights">Insights</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/compare">Compare case studies</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/research-gaps">Research gaps</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/about">Methodology</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Record</p>
          <dl className="mt-3 space-y-2 text-sm text-white/80">
            <div>
              <dt className="text-white/40">Winners</dt>
              <dd>{meta.totalWinners}</dd>
            </div>
            <div>
              <dt className="text-white/40">Sources cited</dt>
              <dd>{totalSources()}</dd>
            </div>
            <div>
              <dt className="text-white/40">Research date</dt>
              <dd>{formatDate(meta.researchedAt)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Canonical source:{' '}
            <a className="underline underline-offset-2 hover:text-white/80 transition-colors" href={meta.canonicalSource}>
              smesgodigital.gov.sg
            </a>
          </p>
          <p>Corrections: see the methodology page.</p>
        </div>
      </div>
    </footer>
  );
}
