import type { MetadataRoute } from 'next';
import { bypassSitemapEntries } from '@/data/sitemap';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return bypassSitemapEntries();
}
