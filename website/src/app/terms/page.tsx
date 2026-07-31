import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, LegalSection, LegalSubheading } from '@/components/legal/LegalPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { CHROME_WEB_STORE_URL, CONTACT, SITE } from '@/data/constants';
import { breadcrumbJsonLd, indexRobots, legalWebPageJsonLd } from '@/data/seo';
import { routes } from '@/lib/routes';

const title = 'Terms of Use';
const description = `Terms of use for the free ${SITE.name} Chrome extension: license, supported sites, acceptable use, disclaimers, and contact for Skip Wait.`;
const updated = '2026-07-28';
const path = routes.terms;
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
        alt: `${SITE.name} terms of use`,
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

export default function TermsPage(): React.ReactElement {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Terms of Use', path },
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
        title="Terms of Use"
        updated={updated}
        summary={`These Terms of Use (“Terms”) govern your use of the ${SITE.name} Chrome extension (“Extension”). By installing or using the Extension, you agree to these Terms.`}
      >
        <LegalSection title="1. The Extension">
          <p>
            {SITE.name} is a free Chrome extension distributed on the{' '}
            <a href={CHROME_WEB_STORE_URL}>Chrome Web Store</a>. On supported pages it either:
          </p>
          <ul>
            <li>bypasses countdown timers and waiting pages when possible, or</li>
            <li>automates waits and continue clicks when a full skip is not possible</li>
          </ul>
          <p>
            No account or paid subscription is required. The Extension runs automatically on
            supported flows. There is no settings panel to turn bypasses off.
          </p>
          <p>
            Supported domains and unlock flows change over time as sites are added or break. The
            Extension only modifies pages that match its supported-host checks.
          </p>
        </LegalSection>

        <LegalSection title="2. Eligibility and Acceptance">
          <p>
            You must be able to enter a binding agreement under the laws that apply to you. If you do
            not agree to these Terms, do not install or use the Extension.
          </p>
        </LegalSection>

        <LegalSection title="3. License">
          <p>
            Subject to these Terms and the Chrome Web Store terms that apply to your install, you may
            install and use the Extension for its stated purpose: completing supported unlock and wait
            flows in your browser.
          </p>
          <p>
            You may not redistribute the Extension, or modify it for redistribution, except to the
            extent applicable law expressly allows that despite this restriction.
          </p>
        </LegalSection>

        <LegalSection title="4. Acceptable Use">
          <p>You agree to use the Extension only in ways that are lawful where you are. You must not:</p>
          <ul>
            <li>use the Extension to attack, disrupt, or overload third-party systems</li>
            <li>misrepresent the Extension as affiliated with sites it unlocks</li>
            <li>
              use the Extension in any way that violates applicable law, including copyright or other
              intellectual property laws
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Third-Party Sites">
          <p>
            The Extension interacts with third-party websites (link shorteners, mediators, file hosts,
            and similar pages). We do not own, operate, or control those sites.
          </p>
          <p>We are not responsible for their:</p>
          <ul>
            <li>content</li>
            <li>downloads</li>
            <li>ads</li>
            <li>malware risk</li>
            <li>availability</li>
            <li>terms</li>
          </ul>
          <p>
            You are solely responsible for complying with each third-party site’s terms and with laws
            that apply to your use of those sites and any files you obtain. Reaching a destination
            faster does not grant you rights you do not already have.
          </p>
        </LegalSection>

        <LegalSection title="6. No Warranty">
          <p>
            The Extension is provided “as is” and “as available.” We do not warrant that:
          </p>
          <ul>
            <li>every supported flow will always work</li>
            <li>timers will always be skipped</li>
            <li>destinations will be correct</li>
            <li>the Extension will be uninterrupted or error-free</li>
          </ul>
          <p>
            Sites change their unlock logic without notice. Bypasses and automations can break.
          </p>
          <p>
            To the fullest extent permitted by law, we disclaim all warranties, express or implied,
            including merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </LegalSection>

        <LegalSection title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, the Extension author and anyone distributing the
            Extension are not liable for any indirect, incidental, special, consequential, or punitive
            damages, or for any loss of data, profits, or goodwill, arising from your use of the
            Extension or from third-party sites you visit with it.
          </p>
          <p>
            Where liability cannot be excluded, it is limited to the amount you paid for the Extension
            in the three months before the claim. The Extension is currently free, so that amount is
            zero, to the extent such a limit is enforceable.
          </p>
        </LegalSection>

        <LegalSection title="8. Changes">
          <p>
            We may update the Extension, supported sites, or these Terms at any time. The “Last
            updated” date shows the current Terms. Continued use after a change means you accept the
            updated Terms. Features or the Extension may be discontinued without notice.
          </p>
        </LegalSection>

        <LegalSection title="9. Privacy">
          <p>
            How the Extension handles information is described in the{' '}
            <Link href={routes.privacy}>Privacy Policy</Link>. Read it together with these Terms.
          </p>
        </LegalSection>

        <LegalSection title="10. Contact">
          <LegalSubheading>Support Channels</LegalSubheading>
          <p>The Extension popup links to these channels when you choose them:</p>
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
        </LegalSection>
      </LegalPage>
    </>
  );
}
