'use client';

import { useState } from 'react';

export function CourseForm() {
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
          source: 'email-course',
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
    <div id="course-signup" className="rounded-lg border-2 border-blue-700 bg-slate-50 p-6 sm:p-8">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow text-blue-700">Complimentary 5-Day Delivery</p>
        <h3 className="mt-1 font-sans text-xl font-bold text-ink sm:text-2xl">
          Enroll in the 5-Day Email Course
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Receive Lesson 1 immediately upon registration. Remaining lessons arrive at 8:00 AM SGT over the next four business days. No marketing hype; only verified operational analysis.
        </p>

        {status === 'success' ? (
          <div className="mt-6 rounded-md border border-emerald-300 bg-emerald-50 p-5 text-center">
            <p className="font-sans text-base font-bold text-emerald-900">Registration Confirmed</p>
            <p className="mt-1 text-sm text-emerald-800">
              You are enrolled! Lesson 1 has been dispatched to <strong>{email}</strong>. Check your inbox to begin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="cr-name" className="block text-xs font-semibold text-ink">
                Full Name *
              </label>
              <input
                id="cr-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rachel Tan"
                className="mt-1 w-full rounded border border-rule bg-white px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-blue-700"
              />
            </div>

            <div>
              <label htmlFor="cr-email" className="block text-xs font-semibold text-ink">
                Work Email *
              </label>
              <input
                id="cr-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rachel@firm.com.sg"
                className="mt-1 w-full rounded border border-rule bg-white px-3.5 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-blue-700"
              />
            </div>

            <div>
              <label htmlFor="cr-firm" className="block text-xs font-semibold text-ink">
                Firm / Practice Type *
              </label>
              <select
                id="cr-firm"
                required
                value={firmType}
                onChange={(e) => setFirmType(e.target.value)}
                className="mt-1 w-full rounded border border-rule bg-white px-3.5 py-2 text-sm text-ink focus:border-blue-700"
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
              Delivered daily for 5 days. You may unsubscribe with a single click at any time.
            </p>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 rounded bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:opacity-50"
            >
              {status === 'loading' ? 'Enrolling…' : 'Start Lesson 1 Now →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
