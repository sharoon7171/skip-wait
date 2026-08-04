import localFont from 'next/font/local';

export const poppins = localFont({
  src: [
    { path: './poppins/poppins-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './poppins/poppins-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './poppins/poppins-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './poppins/poppins-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: './poppins/poppins-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: false,
  preload: true,
});

export const ibmPlexMono = localFont({
  src: [
    {
      path: './ibm-plex-mono/ibm-plex-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ibm-plex-mono/ibm-plex-mono-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './ibm-plex-mono/ibm-plex-mono-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
  adjustFontFallback: false,
  preload: true,
});
