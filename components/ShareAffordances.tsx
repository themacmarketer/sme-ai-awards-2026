'use client';

import { useState } from 'react';

export function ShareAffordances({
  name,
  slug,
  headline,
  useCase,
  researchedAt,
  canonicalUrl,
}: {
  name: string;
  slug: string;
  headline: string;
  useCase: string;
  researchedAt: string;
  canonicalUrl: string;
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCite, setCopiedCite] = useState(false);
  const [showCite, setShowCite] = useState(false);

  const year = new Date(researchedAt).getFullYear() || 2026;
  const citationText = `Wong, I. (${year}). ${name}: ${headline}. SME AI Impact Showcase (IMDA & SBF Awards Study). Retrieved from ${canonicalUrl}`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  }

  async function handleCopyCite() {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopiedCite(true);
      setTimeout(() => setCopiedCite(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="mt-5 border-t border-rule pt-4">
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 border border-rule bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          aria-label="Copy case study permalink"
        >
          <svg className="h-3.5 w-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>{copiedLink ? 'Link copied!' : 'Copy link'}</span>
        </button>

        {/* LinkedIn Share */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-rule bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          aria-label="Share case study on LinkedIn"
        >
          <svg className="h-3.5 w-3.5 text-blue" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span>Share on LinkedIn</span>
        </a>

        {/* Cite button */}
        <button
          type="button"
          onClick={() => setShowCite(!showCite)}
          aria-expanded={showCite}
          className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors ${
            showCite ? 'border-blue bg-blue-soft text-blue' : 'border-rule bg-white text-ink hover:border-blue hover:text-blue'
          }`}
        >
          <svg className="h-3.5 w-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v20c0 4.418 7.163 8 16 8 1.38 0 2.5-1.12 2.5-2.5V14" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span>Cite this case study</span>
        </button>
      </div>

      {showCite && (
        <div className="mt-3 border border-rule bg-slate-soft/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">APA Citation</p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-ink select-all">
                {citationText}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyCite}
              className="shrink-0 border border-rule bg-white px-2.5 py-1 text-xs font-medium text-ink hover:border-blue hover:text-blue"
            >
              {copiedCite ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
