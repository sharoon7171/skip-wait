import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SiteFooter } from '@/components/nav/SiteFooter';
import { SiteHeader } from '@/components/nav/SiteHeader';
import { HashScroll } from '@/components/nav/HashScroll';
import { JsonLd } from '@/components/seo/JsonLd';
import { ORGANIZATION, SITE } from '@/data/constants';
import { softwareApplicationJsonLd, websiteJsonLd } from '@/data/seo';
import '@/styles/global.css';

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: 'Sharoon', url: SITE.url }],
  creator: 'Sharoon',
  publisher: ORGANIZATION.name,
  category: 'technology',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} — bypass and automate countdown timers`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: SITE.title,
    description: SITE.description,
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className="[color-scheme:light]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-surface-canvas font-sans text-ink antialiased">
        <JsonLd data={[websiteJsonLd(), softwareApplicationJsonLd()]} />
        <HashScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
