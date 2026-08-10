import type { MetadataRoute } from 'next';
import { staticSitemapEntries } from '@/data/sitemap';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return staticSitemapEntries();
}
