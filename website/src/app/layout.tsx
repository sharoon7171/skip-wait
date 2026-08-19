import type { Metadata, Viewport } from 'next';
import { SiteFooter } from '@/components/nav/SiteFooter';
import { SiteHeader } from '@/components/nav/SiteHeader';
import { HashScroll } from '@/components/nav/HashScroll';
import { DeferredGoogleAnalytics } from '@/components/seo/DeferredGoogleAnalytics';
import { JsonLd } from '@/components/seo/JsonLd';
import { DEVELOPER, SITE } from '@/data/constants';
import {
  indexRobots,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from '@/data/seo';
import { ibmPlexMono, poppins } from '@/fonts';
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
  authors: [{ name: DEVELOPER.name, url: DEVELOPER.url }],
  creator: DEVELOPER.name,
  publisher: DEVELOPER.name,
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
    <html
      lang="en"
      className={`[color-scheme:light] ${poppins.variable} ${ibmPlexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-surface-canvas font-sans text-ink antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), softwareApplicationJsonLd()]} />
        <HashScroll />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
      {isAnalyticsEnabled() ? <DeferredGoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
    </html>
  );
}
