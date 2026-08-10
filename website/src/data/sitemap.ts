import type { MetadataRoute } from 'next';
import { allBypassSlugs } from '@/data/catalog';
import { SITE } from '@/data/constants';
import { bypassSitePath, routes } from '@/lib/routes';

const SITEMAP_CONTENT_UPDATED = new Date('2026-07-31T00:00:00.000Z');

const SITEMAP_PATHS = {
  static: '/sitemap.xml',
  bypasses: '/sites/sitemap.xml',
} as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

function absoluteUrl(path: string): string {
  return `${SITE.url}${path}`;
}

function entry(
  path: string,
  changeFrequency: NonNullable<SitemapEntry['changeFrequency']>,
  priority: number,
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified: SITEMAP_CONTENT_UPDATED,
    changeFrequency,
    priority,
  };
}

export function staticSitemapEntries(): MetadataRoute.Sitemap {
  return [
    entry(routes.home, 'weekly', 1),
    entry(routes.sites, 'weekly', 0.9),
    entry(routes.privacy, 'yearly', 0.3),
    entry(routes.terms, 'yearly', 0.3),
  ];
}

export function bypassSitemapEntries(): MetadataRoute.Sitemap {
  return allBypassSlugs().map((slug) => entry(bypassSitePath(slug), 'monthly', 0.8));
}

export function sitemapIndexUrls(): string[] {
  return [absoluteUrl(SITEMAP_PATHS.static), absoluteUrl(SITEMAP_PATHS.bypasses)];
}
