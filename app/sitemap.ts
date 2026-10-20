import type { MetadataRoute } from 'next';
import { winners, practitionerCases, communityCases, SITE } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    '',
    '/playbook',
    '/course',
    '/submit',
    '/insights',
    '/compare',
    '/about',
    '/research-gaps',
    '/data',
    '/press',
    '/changelog',
    '/badge',
  ].map((p) => ({
    url: `${SITE.url}${p}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  const winnerRoutes = winners.map((w) => ({
    url: `${SITE.url}/winners/${w.slug}/`,
    lastModified: new Date(w.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  const nonAwardCases = [...practitionerCases, ...communityCases];
  const caseRoutes = nonAwardCases.map((w) => ({
    url: `${SITE.url}/cases/${w.slug}/`,
    lastModified: new Date(w.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...winnerRoutes, ...caseRoutes];
}

