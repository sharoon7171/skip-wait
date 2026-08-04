const CDN_MAX_AGE = 31536000;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [100],
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
