import type { MetadataRoute } from 'next';
import { bypassSitemapEntries } from '@/data/sitemap-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return bypassSitemapEntries();
}
