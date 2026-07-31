import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BypassDetailPage } from '@/components/sites/BypassDetailPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { allBypassSlugs, bypassBySlug } from '@/data/catalog-queries';
import { CHROME_WEB_STORE_URL, SITE } from '@/data/constants';
import { breadcrumbJsonLd, indexRobots } from '@/data/seo';
import { bypassPageTitle, bypassSlug } from '@/lib/catalog-slug';
import { bypassSitePath, routes } from '@/lib/routes';
import type { SupportedBypass } from '@/types/catalog';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return allBypassSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = bypassBySlug(slug);
  if (!entry) {
    return {
      title: 'Bypass Not Found',
      robots: { index: false, follow: true },
    };
  }

  const title = bypassPageTitle(entry);
  const description = entry.description;
  const canonical = bypassSitePath(bypassSlug(entry));
  const url = `${SITE.url}${canonical}`;

  return {
    title,
    description,
    keywords: [...entry.keywords],
    robots: indexRobots,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      title: `${title} | ${SITE.name}`,
      description,
      url,
      images: [
        {
          url: '/icon.png',
          width: 128,
          height: 128,
          alt: `${entry.name} bypass | ${SITE.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE.name}`,
      description,
      images: ['/icon.png'],
    },
  };
}

function bypassPageJsonLd(entry: SupportedBypass): Record<string, unknown> {
  const path = bypassSitePath(bypassSlug(entry));
  const url = `${SITE.url}${path}`;
  const steps = entry.article.steps;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name: `${entry.name} Bypass | ${SITE.name}`,
    headline: `${entry.name} Bypass`,
    description: entry.description,
    url,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'BrowserApplication',
      operatingSystem: 'Chrome',
      downloadUrl: CHROME_WEB_STORE_URL,
    },
    keywords: entry.keywords.join(', '),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icon.png`,
    },
    ...(steps && steps.length > 0
      ? {
          mainEntity: {
            '@type': 'HowTo',
            name: `${entry.name} Bypass with ${SITE.name}`,
            description: entry.description,
            step: steps.map((step, index) => ({
              '@type': 'HowToStep',
              position: index + 1,
              name: step.title,
              text: step.body,
            })),
            tool: {
              '@type': 'HowToTool',
              name: SITE.name,
            },
          },
        }
      : {}),
  };
}

function bypassFaqJsonLd(entry: SupportedBypass): Record<string, unknown> {
  const url = `${SITE.url}${bypassSitePath(bypassSlug(entry))}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    mainEntity: entry.article.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default async function BypassSitePage({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const entry = bypassBySlug(slug);
  if (!entry) notFound();

  const path = bypassSitePath(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: routes.home },
            { name: 'Supported Sites', path: routes.sites },
            { name: `${entry.name} Bypass`, path },
          ]),
          bypassPageJsonLd(entry),
          bypassFaqJsonLd(entry),
        ]}
      />
      <BypassDetailPage entry={entry} />
    </>
  );
}
