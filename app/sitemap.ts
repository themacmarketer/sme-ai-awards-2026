import type { MetadataRoute } from 'next';
import { winners, SITE } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/insights', '/compare', '/about', '/research-gaps'].map((p) => ({
    url: `${SITE.url}${p}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const winnerRoutes = winners.map((w) => ({
    url: `${SITE.url}/winners/${w.slug}/`,
    lastModified: new Date(w.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...winnerRoutes];
}
