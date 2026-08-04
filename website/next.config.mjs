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
            value: 'private, no-store, no-cache, max-age=0, must-revalidate',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: `public, max-age=${CDN_MAX_AGE}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
