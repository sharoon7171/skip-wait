import type { MetadataRoute } from 'next';
import { SITE } from '@/data/constants';
import { routes } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}${routes.sites}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
