import type { MetadataRoute } from 'next';
import { staticSitemapEntries } from '@/data/sitemap-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return staticSitemapEntries();
}
