import type { MetadataRoute } from 'next';
import { SITE } from '@/data/constants';
import { sitemapIndexUrls } from '@/data/sitemap';

export const dynamic = 'force-static';
export const revalidate = false;

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
