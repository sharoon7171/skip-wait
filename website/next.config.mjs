import path from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteRoot = path.dirname(fileURLToPath(import.meta.url));
const CDN_MAX_AGE = 31536000;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: websiteRoot,
  },
  experimental: {
    useTypeScriptCli: true,
  },
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }

    return [
      {
        source: '/((?!_next/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
          {
            key: 'CDN-Cache-Control',
            value: `public, s-maxage=${CDN_MAX_AGE}`,
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: `public, s-maxage=${CDN_MAX_AGE}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
