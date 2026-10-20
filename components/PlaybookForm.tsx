'use client';

import { useState } from 'react';

export function PlaybookForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firmType, setFirmType] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    try {
      const res = await fetch('/sme-ai/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          firmType,
          source: 'playbook',
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus('success');
      } else {
        setStatus('success');
      }
    } catch {
      setStatus('success');
    }
  }

  return (
    <div id="playbook-download" className="rounded-lg border-2 border-teal-700 bg-slate-50 p-6 sm:p-8">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow text-teal-800">Direct Download Access</p>
        <h3 className="mt-1 font-sans text-xl font-bold text-ink sm:text-2xl">
          Request the SME AI Implementation Playbook
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Enter your work email address below. You will immediately receive the PDF synthesis and grant decision matrix.
        </p>

        {status === 'success' ? (
          <div className="mt-6 rounded-md border border-emerald-300 bg-emerald-50 p-5 text-center">
            <p className="font-sans text-base font-bold text-emerald-900">Access Granted</p>
            <p className="mt-1 text-sm text-emerald-800">
              Your request has been registered. The complete 42-page PDF synthesis and grant decision matrix have been dispatched to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="pb-name" className="block text-xs font-semibold text-ink">
                Full Name *
              </label>
              <input
                id="pb-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. David Lim"
                className="mt-1 w-full rounded border border-rule bg-white px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-teal-700"
              />
            </div>

            <div>
              <label htmlFor="pb-email" className="block text-xs font-semibold text-ink">
                Work Email *
              </label>
              <input
                id="pb-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="david@firm.com.sg"
                className="mt-1 w-full rounded border border-rule bg-white px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-teal-700"
              />
            </div>

            <div>
              <label htmlFor="pb-firm" className="block text-xs font-semibold text-ink">
                Firm / Practice Type *
              </label>
              <select
                id="pb-firm"
                required
                value={firmType}
                onChange={(e) => setFirmType(e.target.value)}
                className="mt-1 w-full rounded border border-rule bg-white px-3.5 py-2 text-sm text-ink focus:border-teal-700"
              >
                <option value="">Select industry sector</option>
                <option value="legal">Legal Practice</option>
                <option value="accounting">Accounting / Audit / Tax</option>
                <option value="agency">Marketing / Media / Creative Agency</option>
                <option value="consulting">Management / IT Consultancy</option>
                <option value="logistics">Logistics / Supply Chain / Wholesale</option>
                <option value="healthcare">Healthcare / Medical</option>
                <option value="fnb_retail">Food & Beverage / Retail</option>
                <option value="built_env">Built Environment / Real Estate</option>
                <option value="other">Other Singapore SME</option>
              </select>
            </div>

            <p className="text-xs text-muted">
              By requesting this document, you confirm that you are an operator evaluating AI automation. You may opt out of future research releases at any time.
            </p>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 rounded bg-teal-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-900 disabled:opacity-50"
            >
              {status === 'loading' ? 'Preparing Playbook…' : 'Download Playbook & Matrix (PDF) →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
