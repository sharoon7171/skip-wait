import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FileHippo';

const bypassType = 'Direct Download';

const description =
  'FileHippo bypass skips the post click download delay and opens the real mirror file link instantly when you hit the download button on the page.';

const domains = [
  'filehippo.com',
  'filehippo.de',
  'filehippo.jp',
  'filehippo.pl',
] as const;

const keywords = [
  'filehippo bypass',
  'FileHippo bypass extension',
  'filehippo timer bypass',
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
  'A FileHippo bypass search usually means you already picked a mirror, hit download, and still sat on a post-click delay before the real file path opened. Skip Wait is the $1.50/month Chrome extension that fetches that mirror link when the host allows it so the generating screen does not own the transfer.';

const body = `## After you pick a mirror, another delay

FileHippo software pages often add a wait after the download click—generating chrome, an intermediary redirect, or a short hold before the mirror file link appears. You already chose the build; the extra screen only burns time.

That post-click stall is why filehippo timer bypass, direct download bypass, and download timer skip sit next to FileHippo bypass extension queries across regional storefronts.

## Fetching the real file path from the button

Skip Wait watches the download control you already use. Instead of sitting on a generating screen, it resolves the direct mirror URL in the background and starts the file path when the host allows it. You stay on the product page; no paste tool and no alternate download portal.

Client delay theater gets out of the way. Required holds still finish honestly so the fetch does not fail with a fake instant cheat.

## Same Download click across regional storefronts

Supported regional FileHippo storefronts share the same post-click pattern. One skip wait extension install covers those pages so you are not maintaining a userscript per language site.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What post-click delay does Skip Wait remove?',
    answer:
      'The waiting or generating page after you hit download. Skip Wait opens the direct mirror file link when the host allows it.',
  },
  {
    question: 'Do regional FileHippo sites work?',
    answer:
      'Yes on supported regional storefronts. The same post-click resolve path runs across those pages.',
  },
  {
    question: 'Do I still choose the mirror myself?',
    answer:
      'Yes. Skip Wait fetches the real link after your download click; it does not pick a different mirror for you.',
  },
  {
    question: 'How much does the FileHippo bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup.',
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
