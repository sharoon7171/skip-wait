import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Pling / openDesktop';

const bypassType = 'Direct Download';

const description =
  'Pling bypass for download redirect delays on openDesktop and KDE-style stores: Skip Wait starts add-on and project packages without a post-click waiting screen.';

const domains = [
  'addons.videolan.org',
  'opendesktop.org',
  'store.kde.org',
] as const;

const keywords = [
  'pling / opendesktop bypass',
  'Pling / openDesktop bypass extension',
  'pling / opendesktop timer bypass',
  'direct download',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
] as const;

const intro =
  'Looking for a Pling / openDesktop bypass usually means an add-on or project file sat behind a redirect delay after download. Skip Wait is the $1/month Chrome extension that resolves the real package URL so direct download replaces that store wait.';

const body = `## Storefront clicks that pause before the archive

openDesktop, KDE Store, and related Pling storefronts often insert a short redirect or generating wait between your download click and the actual theme, plasmoid, or VLC add-on package. Click, wait, hope the file starts—fuel for pling / opendesktop timer bypass, download timer skip, and skip waiting page searches when you only wanted the archive.

### Same delay pattern across sibling stores

VLC add-on pages, KDE project pages, and openDesktop listings share the habit even when branding differs. Refreshing the wait page or hopping mirrors rarely helps if every host uses the same post-click delay.

## Resolving the package on the live store button

Skip Wait runs inside Chrome on matching store pages. After you click download it resolves the real file URL the store already prepares, skips client-only delay pages, and lets the transfer begin. You keep the normal store button—no paste workflow. Bypass is $1 per month.

Required server handshakes still finish. What disappears is busywork redirect theater—the practical Pling / openDesktop bypass extension reading of file host bypass on these storefronts.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Pling / openDesktop bypass clear?',
    answer:
      'Post-click redirect delays on openDesktop and KDE-style store pages. Skip Wait opens the real package after your download click without the usual wait screen.',
  },
  {
    question: 'Does this cover VLC add-ons and KDE projects?',
    answer:
      'Yes on supported storefronts. The same direct download path applies when those stores sit a redirect delay in front of the package.',
  },
  {
    question: 'Do I still click the normal download button?',
    answer:
      'Yes. Skip Wait watches the button you already use. It does not invent a separate download UI.',
  },
  {
    question: 'Will every timer vanish instantly?',
    answer:
      'Client-only redirect waits are cleared. Brief server handshakes still finish—so the pling / opendesktop timer bypass stays reliable.',
  },
  {
    question: 'How much does the Pling bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
  },
];

export const bypass = {
  name,
  bypass: bypassType,
  description,
  domains,
  keywords,
  article: {
    intro,
    body,
    faq,
  },
} satisfies SupportedBypass;
