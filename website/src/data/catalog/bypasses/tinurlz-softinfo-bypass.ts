import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Tinurlz / Softinfo';

const bypassType = 'Skip Waiting Page';

const description =
  'Tinurlz / Softinfo bypass that clears short-link waiting pages and unwraps nested download redirects so the target file or URL opens without babysitting continue loops.';

const domains = ['tinurlz.com', 'softinfo.blog'] as const;

const keywords = [
  'tinurlz bypass',
  'softinfo bypass',
  'tinurlz / softinfo bypass',
  'tinurlz bypass extension',
  'tinurlz timer bypass',
  'softinfo waiting page',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
  'nested redirect bypass',
] as const;

const intro =
  'A Tinurlz bypass or Softinfo waiting page search usually means a short URL parked you on please-wait chrome, then nested download redirects, instead of the file. Skip Wait is the Chrome extension that clears those gates and follows the nested hops so skip click to continue is not a manual chore.';

const body = `## Short wait, then another redirect

Tinurlz and Softinfo shares often put a waiting page between the short link and the real destination, then wrap the download in another redirect layer. You sit through please wait, tap Continue, land on another interstitial, and only then reach the target. Close early and the chain restarts.

That nested shape—not one countdown alone—is why people hunt for a waiting page bypass, please wait bypass, and nested redirect bypass next to Tinurlz.

### Layers that keep you clicking

- Please-wait and click-to-continue gates on Softinfo-style pages
- Short-link waiting chrome before any real URL appears
- Nested download redirects after the first unlock
- Manual continue loops when a hop opens wrong

## Unwrapping the chain on the page you opened

Skip Wait runs in Chrome on the matching waiting page. It skips the delay layer the flow already expects, then follows nested redirects to the target file or URL without a paste box.

You keep opening the shared link as usual. Required holds still finish honestly; client-only continue theater does not.

## Softinfo skins that change between shares

Bookmark workarounds break when the next blog skin appears. A Tinurlz / Softinfo bypass extension keyed to waiting-page behavior stays useful without re-copying the short URL into a third-party unlocker each time.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Tinurlz / Softinfo bypass clear?',
    answer:
      'Short-link waiting pages, please-wait / continue gates, and nested download redirects on supported shares. Skip Wait opens the target without a full manual click-through.',
  },
  {
    question: 'Does it unwrap nested download redirects?',
    answer:
      'Yes on supported flows. After the waiting page, the extension follows nested redirects to the file or URL instead of leaving you on each interstitial.',
  },
  {
    question: 'Do I still press Continue myself?',
    answer:
      'On supported gates, no. Skip Wait completes the continue path the page already expects.',
  },
  {
    question: 'Do I need a license?',
    answer:
      'Yes. Get a free trial or monthly license on EAS Store and activate your key in the extension popup.',
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
