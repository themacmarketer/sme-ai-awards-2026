'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Winner } from '@/lib/types';
import { GRADE_MEANING } from './Evidence';

export function BadgeGenerator({ winners }: { winners: Winner[] }) {
  const [selectedSlug, setSelectedSlug] = useState(winners[0]?.slug || '');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState(false);

  const winner = winners.find((w) => w.slug === selectedSlug) || winners[0];
  const caseUrl = `https://bestcourses.sg/sme-ai/winners/${winner.slug}/`;

  // HTML snippet using inline SVG & styles for universal compatibility
  const htmlSnippet = `<a href="${caseUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border:1px solid ${
    theme === 'dark' ? '#334155' : '#E2E8F0'
  };border-radius:8px;background-color:${
    theme === 'dark' ? '#0F172A' : '#FFFFFF'
  };color:${
    theme === 'dark' ? '#F8FAFC' : '#0F172A'
  };text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;line-height:1.4;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
  <span style="display:inline-block;padding:2px 7px;border-radius:4px;font-weight:700;font-size:11px;background-color:${
    winner.confidence === 'A'
      ? '#D1FAE5;color:#065F46'
      : winner.confidence === 'B'
      ? '#DBEAFE;color:#1E40AF'
      : '#FEF3C7;color:#92400E'
  };">Grade ${winner.confidence}</span>
  <span>
    <strong style="display:block;font-size:13px;font-weight:600;color:${theme === 'dark' ? '#FFFFFF' : '#0F172A'};">${winner.name}</strong>
    <span style="color:${theme === 'dark' ? '#94A3B8' : '#64748B'};font-size:11px;">Evidence-graded case study · SME AI Impact Showcase</span>
  </span>
</a>`;

  const markdownSnippet = `[![Evidence-graded case study — SME AI Impact Showcase: ${winner.name} (Grade ${winner.confidence})](https://img.shields.io/badge/SME_AI_Impact_Awards_2026-${encodeURIComponent(winner.name)}_·_Grade_${winner.confidence}-1F4B43?style=flat-square)](${caseUrl})`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(htmlSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-2 border border-rule bg-white p-5">
        <div>
          <label htmlFor="badge-winner-select" className="eyebrow block">
            Select Winning Company
          </label>
          <select
            id="badge-winner-select"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="mt-1.5 w-full border border-rule bg-white px-3 py-2 text-sm text-ink focus:border-blue"
          >
            {winners.map((w) => (
              <option key={w.slug} value={w.slug}>
                {w.name} (Grade {w.confidence} · {w.sector})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="eyebrow block">Badge Theme</label>
          <div className="mt-1.5 flex gap-2">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`border px-4 py-2 text-xs font-medium transition-colors ${
                theme === 'light'
                  ? 'border-ink bg-navy text-white'
                  : 'border-rule bg-white text-ink hover:border-blue hover:text-blue'
              }`}
            >
              Light Theme
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`border px-4 py-2 text-xs font-medium transition-colors ${
                theme === 'dark'
                  ? 'border-ink bg-navy text-white'
                  : 'border-rule bg-white text-ink hover:border-blue hover:text-blue'
              }`}
            >
              Dark Theme
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="border border-rule bg-white p-6 sm:p-8">
        <p className="eyebrow">Live Interactive Preview</p>
        <div
          className={`mt-4 flex items-center justify-center p-8 rounded-lg border transition-colors ${
            theme === 'dark' ? 'bg-[#0B1320] border-slate-700' : 'bg-slate-soft/50 border-rule'
          }`}
        >
          <a
            href={caseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3.5 px-4 py-2.5 rounded-lg border shadow-sm transition-transform hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-rule text-ink'
            }`}
          >
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                winner.confidence === 'A'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : winner.confidence === 'B'
                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                  : 'bg-amber-100 text-amber-950 border border-amber-300'
              }`}
            >
              Grade {winner.confidence}
            </span>
            <span className="text-left">
              <strong className="block text-sm font-semibold">{winner.name}</strong>
              <span className={`block text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-muted'}`}>
                Evidence-graded case study — SME AI Impact Showcase
              </span>
            </span>
          </a>
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          Clicking the badge opens {winner.name}&apos;s verified case study at {caseUrl}
        </p>
      </div>

      {/* Embed Code Section */}
      <div className="border border-rule bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-sans text-lg font-bold">Embed code (HTML)</h3>
            <p className="text-xs text-muted">
              Copy and paste this snippet anywhere on your website, press release, or partner directory.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="border border-ink bg-navy px-4 py-2 text-xs font-medium text-white transition-colors hover:border-blue hover:bg-blue"
          >
            {copied ? 'Copied to clipboard!' : 'Copy embed code'}
          </button>
        </div>

        <pre className="mt-4 max-h-48 overflow-x-auto rounded border border-rule bg-slate-900 p-4 font-mono text-xs text-emerald-300 whitespace-pre-wrap select-all">
          {htmlSnippet}
        </pre>

        <div className="mt-6 border-t border-rule pt-4">
          <p className="eyebrow">Markdown Snippet (for README &amp; Docs)</p>
          <pre className="mt-2 overflow-x-auto rounded border border-rule bg-slate-900 p-3 font-mono text-xs text-blue-300 select-all">
            {markdownSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
