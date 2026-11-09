'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'bestcourses.sg';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    function handleOutboundClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a');
      if (!target || !target.href) return;

      const href = target.href;
      const isExternal =
        href.startsWith('http://') || href.startsWith('https://');

      if (!isExternal) return;

      const currentHost = window.location.host;
      let targetHost = '';
      try {
        targetHost = new URL(href).host;
      } catch {
        return;
      }

      if (targetHost === currentHost) return;

      // Classify the outbound link
      const isCanonical = targetHost.includes('smesgodigital.gov.sg');
      const isWinnerSite =
        target.hasAttribute('rel') &&
        (target.getAttribute('rel')?.includes('nofollow') ||
          target.innerText.toLowerCase().includes('open ') ||
          target.getAttribute('data-analytics') === 'winner-site');

      const eventCategory = isCanonical
        ? 'canonical_source_click'
        : isWinnerSite
        ? 'winner_site_click'
        : 'outbound_click';

      // Send to GA4
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventCategory, {
          event_category: 'outbound',
          event_label: href,
          destination: href,
          transport_type: 'beacon',
        });
      }

      // Send to Plausible
      if (typeof window.plausible === 'function') {
        window.plausible(eventCategory, {
          props: {
            url: href,
            domain: targetHost,
          },
        });
      }
    }

    document.addEventListener('click', handleOutboundClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleOutboundClick, { capture: true });
    };
  }, []);

  return (
    <>
      {/* GA4 loads from the GTM container (app/layout.tsx); gtag() here is the dataLayer stub. */}

      {/* Plausible Analytics */}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.tagged-events.outbound-links.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
