import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppLink } from '@/components/nav/AppLink';
import { LegalPage, LegalSection } from '@/components/legal/LegalPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { CHROME_WEB_STORE_URL, QUETTA, SITE } from '@/data/constants';
import { breadcrumbJsonLd, indexRobots, legalWebPageJsonLd } from '@/data/seo';
import { routes } from '@/lib/routes';

const title = 'Install Skip Wait on Android with Quetta';
const description =
  'Step-by-step: install Quetta Browser from Google Play, add Skip Wait from the Chrome Web Store, and use it on supported wait pages on Android.';
const updated = '2026-08-10';
const path = routes.guidesAndroid;
const url = `${SITE.url}${path}`;

type GuideFaq = {
  question: string;
  answer: ReactNode;
  answerText?: string;
};

const guideFaqs: readonly GuideFaq[] = [
  {
    question: 'Can I install Skip Wait in Chrome for Android?',
    answer:
      'No. Chrome for Android does not run Chrome Web Store extensions on the phone. Use Quetta Browser on Android instead.',
  },
  {
    question: 'Does this work on iPhone or iPad?',
    answer:
      'No. Quetta documents Chrome extension install for Android. Skip Wait is not available in Quetta on iOS.',
  },
  {
    question: 'Skip Wait installed but a page still waits—what next?',
    answer: (
      <>
        Confirm the host is on{' '}
        <AppLink href={routes.sites}>Supported Sites</AppLink>, that Skip Wait is enabled in Quetta’s
        extension manager, and reload the page. If it still fails only on Android, try the same URL in
        desktop Chrome and report the page URL via GitHub, Telegram, or email in the site footer.
      </>
    ),
    answerText:
      'Confirm the host is on Supported Sites, that Skip Wait is enabled in Quetta’s extension manager, and reload the page. If it still fails only on Android, try the same URL in desktop Chrome and report the page URL via GitHub, Telegram, or email in the site footer.',
  },
];

function guideFaqPlainAnswer(item: GuideFaq): string {
  if (typeof item.answer === 'string') {
    return item.answer;
  }
  if (item.answerText) {
    return item.answerText;
  }
  throw new Error(`Guide FAQ "${item.question}" needs answerText`);
}

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title,
  description,
  robots: indexRobots,
  alternates: {
    canonical: path,
  },
  openGraph: {
    type: 'article',
    title: `${title} | ${SITE.name}`,
    description,
    url,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} on Android with Quetta`,
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

function howToJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    url,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Install Quetta Browser',
        text: 'Install Quetta Browser from Google Play and open it.',
        url: QUETTA.playStore,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Add Skip Wait',
        text: 'In Quetta, open the Skip Wait Chrome Web Store listing, review permissions, and tap Add to Quetta. Or open the Extensions menu, search for Skip Wait, and add it from the official listing.',
        url: CHROME_WEB_STORE_URL,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Enable and test',
        text: 'Confirm Skip Wait is enabled in Quetta’s extension manager, then open a supported wait or short-link page.',
      },
    ],
  };
}

function guideFaqJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guideFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: guideFaqPlainAnswer(item),
      },
    })),
  };
}

export default function AndroidQuettaGuidePage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Install on Android', path },
          ]),
          legalWebPageJsonLd({
            title,
            description,
            path,
            dateModified: updated,
          }),
          howToJsonLd(),
          guideFaqJsonLd(),
        ]}
      />
      <LegalPage
        title={title}
        updated={updated}
        summary="Skip Wait is a Chrome Web Store extension. On Android, install it through Quetta Browser—Chrome for Android cannot run store extensions on the phone."
      >
        <LegalSection title="Before you start">
          <p>
            Quetta Browser on Android can install extensions from the Chrome Web Store. Skip Wait has
            been installed and tested there. Desktop Chrome (and other Chromium browsers that support
            the extension) are unchanged—this guide is only for Android phones and tablets.
          </p>
          <p>
            Quetta’s extension support is documented for Android, not iOS. Skip Wait is not available
            in Quetta on iPhone or iPad.
          </p>
        </LegalSection>

        <LegalSection title="1. Install Quetta">
          <ol>
            <li>
              Install{' '}
              <a href={QUETTA.playStore} rel="noopener noreferrer" target="_blank">
                Quetta Browser from Google Play
              </a>{' '}
              (package <code>net.quetta.browser</code>).
            </li>
            <li>Open Quetta and apply any available update from the Play Store first.</li>
          </ol>
        </LegalSection>

        <LegalSection title="2. Add Skip Wait">
          <p>
            Inside Quetta, open the official{' '}
            <a href={CHROME_WEB_STORE_URL} rel="noopener noreferrer" target="_blank">
              Skip Wait listing on the Chrome Web Store
            </a>
            . Review the publisher and permissions, then tap <strong>Add to Quetta</strong> (or the
            install action Quetta shows). Wait until Quetta confirms the extension was added.
          </p>
          <p>
            Alternatively: open Quetta’s Extensions menu, search for <strong>Skip Wait</strong>, open
            the official listing, and add it the same way. Menu labels can change between Quetta
            releases.
          </p>
          <p>
            For Quetta’s own screenshots on enabling, disabling, and removing extensions, see their{' '}
            <a href={QUETTA.installGuide} rel="noopener noreferrer" target="_blank">
              Android extensions walkthrough
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="3. Enable and use">
          <ol>
            <li>Open Quetta’s extension manager and confirm Skip Wait is listed and enabled.</li>
            <li>
              Open any link from{' '}
              <AppLink href={routes.sites}>Supported Sites</AppLink>. On matching pages, Skip Wait
              bypasses the wait when the site allows it, or automates the remaining continue steps.
            </li>
          </ol>
          <p>
            Not every Chrome extension behaves the same on a phone as on desktop. Quetta notes that
            some desktop-oriented UI or APIs can differ on Android even when install succeeds. Skip
            Wait’s main unlock flows have been verified in Quetta on Android; if a specific host
            misbehaves only on mobile, use the FAQ below.
          </p>
        </LegalSection>

        <LegalSection title="FAQ">
          <div>
            <FaqAccordion items={guideFaqs} />
          </div>
        </LegalSection>
      </LegalPage>
    </>
  );
}
