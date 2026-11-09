import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Analytics } from '@/components/Analytics';
import { SITE } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Singapore SME AI Impact Showcase — 30 winners, evidence-graded',
    template: '%s — SME AI Impact Showcase',
  },
  description: SITE.description,
  keywords: [
    'SME AI Impact Awards 2026',
    'Singapore SME AI',
    'IMDA',
    'SBF',
    'AI case studies',
    'AI adoption Singapore',
  ],
  authors: [{ name: 'Independent research showcase' }],
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Singapore SME AI Impact Showcase',
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Singapore SME AI Impact Showcase — 30 evidence-graded case studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore SME AI Impact Showcase',
    description: SITE.description,
    images: [`${SITE.url}/og.png`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE.url}/` },
};

const GTM_ID = 'GTM-NZJSKBDM';
// Stub keeps gtag('event', ...) calls (Analytics.tsx) flowing to GA4 via the container's Google tag.
const gtmHead = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en-SG',
  publisher: {
    '@type': 'Organization',
    name: 'Independent research showcase',
    description:
      'An independent research project. Not affiliated with, endorsed by, or sponsored by IMDA or SBF.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: gtmHead }} />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-blue focus:px-4 focus:py-2 focus:text-white focus:rounded-md"
        >
          Skip to content
        </a>
        <Analytics />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
