import type { Metadata } from 'next';
import { AppLink } from '@/components/nav/AppLink';
import { LegalPage, LegalSection, LegalSubheading } from '@/components/legal/LegalPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { CHROME_WEB_STORE_URL, CONTACT, PRICE, SITE } from '@/data/constants';
import { breadcrumbJsonLd, indexRobots, legalWebPageJsonLd } from '@/data/seo';
import { routes } from '@/lib/routes';

const title = 'Privacy Policy';
const description = `Privacy policy for the ${SITE.name} Chrome extension: what data the extension accesses, what it stores, and how Skip Wait handles information on supported sites.`;
const updated = '2026-08-20';
const path = routes.privacy;
const url = `${SITE.url}${path}`;

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
    type: 'website',
    title: `${title} | ${SITE.name}`,
    description,
    url,
    images: [
      {
        url: '/icon.png',
        width: 128,
        height: 128,
        alt: `${SITE.name} privacy policy`,
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

export default function PrivacyPage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path },
          ]),
          legalWebPageJsonLd({
            title,
            description,
            path,
            dateModified: updated,
          }),
        ]}
      />
      <LegalPage
        title="Privacy Policy"
        updated={updated}
        summary={`This policy describes how the ${SITE.name} Chrome extension (“Extension”) and the ${SITE.name} marketing website (“Website”) handle information.`}
      >
        <LegalSection title="1. Scope">
          <p>
            {SITE.name} is a Chrome extension that, on supported link shorteners and file hosts,
            bypasses countdown timers and waiting pages or automates waits and continue clicks. It is
            available from the{' '}
            <a href={CHROME_WEB_STORE_URL}>Chrome Web Store</a>. Bypass requires a {PRICE.summary}
            license. No separate website account is required.
          </p>
          <p>
            The Website is the marketing site at{' '}
            <a href={SITE.url}>{SITE.url.replace(/^https?:\/\//, '')}</a>. It describes the Extension
            and supported flows. Third-party shortener, mediator, and file-host sites have their own
            policies.
          </p>
        </LegalSection>

        <LegalSection title="2. Website Analytics">
          <p>
            When configured, the Website uses Google Analytics 4 (GA4) via the Google tag (gtag.js)
            to understand how visitors use the site.
          </p>
          <p>GA4 may collect:</p>
          <ul>
            <li>page views (which pages were opened and how often)</li>
            <li>
              traffic source and approximate location (for example organic, direct, and country)
            </li>
            <li>device and browser information</li>
            <li>
              Add to Chrome clicks as separate events for header, hero, and bypass pages; footer
              Chrome Web Store link clicks; contact CTA clicks (GitHub, Telegram, email); and
              Supported Sites search terms
            </li>
          </ul>
          <p>
            That data is processed by Google under Google’s terms and privacy policy. See{' '}
            <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
              Google Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://business.safety.google/privacy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Business Data Responsibility
            </a>
            . The Extension does not use Google Analytics.
          </p>
        </LegalSection>

        <LegalSection title="3. Extension Permissions">
          <p>
            The Extension declares these permissions in its Chrome manifest. Each is used only as
            described below.
          </p>

          <LegalSubheading>Scripting</LegalSubheading>
          <p>
            Runs helpers in the page context on supported unlock flows (for example main-world hooks
            or visibility helpers). Used only to complete those flows—not for advertising or
            analytics.
          </p>

          <LegalSubheading>Storage</LegalSubheading>
          <p>
            Uses <code>chrome.storage.local</code> on your device for:
          </p>
          <ul>
            <li>
              short-lived progress during multi-step shortener chains, including:
              <ul>
                <li>Arolinks</li>
                <li>Cut4Money</li>
                <li>Nitrolink</li>
                <li>ShortXLinks-style flows</li>
              </ul>
            </li>
            <li>
              the cached supported-site list downloaded from the public{' '}
              <code>hosts.json</code> file in the extension repository, plus the last refresh
              time
            </li>
          </ul>
          <p>
            That data stays on your device and is not sent to us. There is no global on/off preference
            stored.
          </p>

          <LegalSubheading>Cookies</LegalSubheading>
          <p>
            The <code>cookies</code> permission lets the background worker call{' '}
            <code>chrome.cookies.getAll</code> on certain TipsGuru-family prolink pages when the
            destination URL is stored in an HttpOnly cookie that page scripts cannot read. Values are
            processed locally to finish the redirect.
          </p>
          <p>
            The Extension does not upload those values. It does not use the{' '}
            <code>chrome.cookies</code> API to set or delete cookies.
          </p>

          <LegalSubheading>Web Navigation</LegalSubheading>
          <p>
            Observes supported navigations early enough for bypass flows (for example fast shortener
            hops and early main-world injects on specific unlock hosts). It is not used to build a
            browsing-history profile.
          </p>

          <LegalSubheading>Host Access</LegalSubheading>
          <p>
            Declares <code>&lt;all_urls&gt;</code> because supported wait pages and mediators span
            many domains. Content scripts can load broadly; bypass logic still gates on a remote
            supported-site list and only runs on matching flows. Unrelated sites are not modified for
            that purpose.
          </p>
        </LegalSection>

        <LegalSection title="4. Extension Data Handling">
          <p>
            The Extension does not collect or transmit your personal data, browsing history, or page
            content to the developer for analytics, advertising, or resale. It does not include
            analytics, tracking, or telemetry SDKs.
          </p>

          <LegalSubheading>Page Storage and Cookies</LegalSubheading>
          <p>
            On some supported flows, the Extension may read, write, or clear data that those sites
            already use in the page context, including:
          </p>
          <ul>
            <li>
              <code>localStorage</code>
            </li>
            <li>
              <code>sessionStorage</code>
            </li>
            <li>
              cookies via <code>document.cookie</code>
            </li>
          </ul>
          <p>
            That happens only to complete the unlock. The data stays in your browser for that site’s
            flow and is not sent to us.
          </p>
        </LegalSection>

        <LegalSection title="5. Extension Network Requests">
          <p>
            The Extension does not operate a developer backend that receives your browsing data.
          </p>
          <p>Network requests it makes are limited to:</p>
          <ul>
            <li>
              the page you are on, or related shortener, mediator, unlock, or file-host endpoints in
              that same flow
            </li>
            <li>
              helper endpoints required by a supported site’s unlock logic (for example an IP lookup
              used by the LinkNext mediator via <code>ipv4.icanhazip.com</code>)
            </li>
            <li>
              the public supported-site list at{' '}
              <code>
                raw.githubusercontent.com/sharoon7171/skip-wait-bypass-timers-countdowns-extension/main/extension/public/hosts.json
              </code>{' '}
              when the extension starts and when you tap Refresh in the popup
            </li>
          </ul>
          <p>Those requests are not used by the Extension for advertising or analytics.</p>
        </LegalSection>

        <LegalSection title="6. Contact Links">
          <p>
            The Extension popup can open GitHub, email, or Telegram when you choose those links. The
            Extension does not auto-send messages on your behalf.
          </p>
        </LegalSection>

        <LegalSection title="7. Changes">
          <p>
            This policy may be updated when the Extension changes. The “Last updated” date at the top
            is the current version.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>Questions about this policy:</p>
          <ul>
            <li>
              Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              Telegram: <a href={CONTACT.telegram}>{CONTACT.telegram}</a>
            </li>
            <li>
              GitHub: <a href={CONTACT.github}>{CONTACT.github}</a>
            </li>
          </ul>
          <p>
            Related: <AppLink href={routes.terms}>Terms of Use</AppLink>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
