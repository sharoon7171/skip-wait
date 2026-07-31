import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SiteFooter } from '@/components/nav/SiteFooter';
import { SiteHeader } from '@/components/nav/SiteHeader';
import { HashScroll } from '@/components/nav/HashScroll';
import { JsonLd } from '@/components/seo/JsonLd';
import { CONTACT, ORGANIZATION, SITE } from '@/data/constants';
import {
  indexRobots,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from '@/data/seo';
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from '@/lib/analytics';
import '@/styles/global.css';

export const dynamic = 'force-static';
export const revalidate = false;

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
  authors: [{ name: 'Sharoon', url: CONTACT.github }],
  creator: 'Sharoon',
  publisher: ORGANIZATION.name,
  category: 'technology',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '128x128' }],
    apple: [{ url: '/icon.png', type: 'image/png', sizes: '128x128' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
  robots: indexRobots,
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
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), softwareApplicationJsonLd()]} />
        <HashScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
      {isAnalyticsEnabled() ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
    </html>
  );
}
