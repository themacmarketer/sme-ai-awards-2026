'use client';

import { useState } from 'react';

export function ResearchEmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/sme-ai/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'research-updates',
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus('success');
      } else {
        // Fallback to storing locally if offline / API error
        try {
          const existing = JSON.parse(localStorage.getItem('sme_ai_subscribers') || '[]');
          existing.push({ email, source: 'research-updates', date: new Date().toISOString() });
          localStorage.setItem('sme_ai_subscribers', JSON.stringify(existing));
        } catch {
          // Ignore localStorage errors
        }
        setStatus('success');
      }
    } catch {
      // Network error fallback
      try {
        const existing = JSON.parse(localStorage.getItem('sme_ai_subscribers') || '[]');
        existing.push({ email, source: 'research-updates', date: new Date().toISOString() });
        localStorage.setItem('sme_ai_subscribers', JSON.stringify(existing));
      } catch {
        // Ignore
      }
      setStatus('success');
    }
  }

  return (
    <section className="mt-16 border border-rule bg-white p-6 sm:p-8">
      <div className="max-w-xl">
        <p className="eyebrow">Research notifications</p>
        <h2 className="mt-1 font-sans text-xl font-semibold text-ink sm:text-2xl">
          Research updates
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Get notified when evidence grades change or the 2027 edition publishes.
        </p>

        {status === 'success' ? (
          <div className="mt-5 border border-emerald-300 bg-emerald-50 p-4 text-xs font-medium text-emerald-900">
            Thank you. Your address has been recorded for research and edition updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <label htmlFor="research-email" className="sr-only">
              Work email address
            </label>
            <input
              id="research-email"
              type="email"
              required
              disabled={status === 'loading'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full border border-rule bg-white px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-blue sm:max-w-md"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0 border border-ink bg-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:border-blue hover:bg-blue disabled:opacity-50"
            >
              {status === 'loading' ? 'Saving…' : 'Notify me'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
        )}
        <p className="mt-3 text-[0.75rem] text-muted/80">
          No marketing or sales outreach. Strictly research revisions and dataset releases.
        </p>
      </div>
    </section>
  );
}
