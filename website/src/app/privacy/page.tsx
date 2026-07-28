import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, LegalSection, LegalSubheading } from '@/components/legal/LegalPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { CHROME_WEB_STORE_URL, CONTACT, SITE } from '@/data/constants';
import { breadcrumbJsonLd, privacyCanonical } from '@/data/seo';
import { routes } from '@/lib/routes';

const title = 'Privacy Policy';
const description = `How the ${SITE.name} Chrome extension handles information.`;
const updated = 'July 28, 2026';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: routes.privacy,
  },
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: privacyCanonical,
  },
  twitter: {
    card: 'summary',
    title: `${title} | ${SITE.name}`,
    description,
  },
};

export default function PrivacyPage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: routes.privacy },
          ]),
        ]}
      />
      <LegalPage
        title="Privacy Policy"
        updated={updated}
        summary={`This policy describes how the ${SITE.name} Chrome extension (“Extension”) handles information. It applies only to the Extension, not to third-party websites you visit.`}
      >
        <LegalSection title="1. Scope">
          <p>
            {SITE.name} is a Chrome extension that, on supported link shorteners and file hosts,
            bypasses countdown timers and waiting pages or automates waits and continue clicks. It is
            available from the{' '}
            <a href={CHROME_WEB_STORE_URL}>Chrome Web Store</a>. No account is required.
          </p>
          <p>
            This policy covers the Extension only. Third-party shortener, mediator, and file-host
            sites have their own policies.
          </p>
        </LegalSection>

        <LegalSection title="2. Permissions">
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
            Uses <code>chrome.storage.local</code> on your device for short-lived progress during
            multi-step shortener chains, including:
          </p>
          <ul>
            <li>Arolinks</li>
            <li>Cut4Money</li>
            <li>Nitrolink</li>
            <li>ShortXLinks-style flows</li>
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
            many domains. Content scripts can load broadly; bypass logic still gates on host checks
            and only runs on supported flows. Unrelated sites are not modified for that purpose.
          </p>
        </LegalSection>

        <LegalSection title="3. Data Handling">
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

        <LegalSection title="4. Network Requests">
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
          </ul>
          <p>Those requests are not used by the Extension for advertising or analytics.</p>
        </LegalSection>

        <LegalSection title="5. Contact Links">
          <p>
            The Extension popup can open GitHub, email, or Telegram when you choose those links. The
            Extension does not auto-send messages on your behalf.
          </p>
        </LegalSection>

        <LegalSection title="6. Changes">
          <p>
            This policy may be updated when the Extension changes. The “Last updated” date at the top
            is the current version.
          </p>
        </LegalSection>

        <LegalSection title="7. Contact">
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
            Related: <Link href={routes.terms}>Terms of Use</Link>.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
