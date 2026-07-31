import type { MetadataRoute } from 'next';
import { SITE } from '@/data/constants';
import { sitemapIndexUrls } from '@/data/sitemap-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: sitemapIndexUrls(),
    host: SITE.url,
  };
}
