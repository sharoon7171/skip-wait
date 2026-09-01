import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'CookiesCEO';

const bypassType = 'Skip Copy Step';

const description =
  'CookiesCEO bypass that adds a Copy cookie control on premium cookie pages so you grab the session string without the site wait and manual copy dance.';

const domains = ['cookiesceo.com'] as const;

const keywords = [
  'cookiesceo bypass',
  'CookiesCEO bypass extension',
  'cookiesceo bypass chrome',
  'bypass cookiesceo',
  'skip cookiesceo',
  'cookiesceo timer bypass',
  'copy cookie bypass',
  'session cookie copy',
  'premium cookie copy',
  'skip copy step',
  'cookie copy wait skip',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A CookiesCEO bypass search usually means a premium cookie page still forces a wait plus line-by-line copy instructions before the session string is usable. Skip Wait is the Chrome extension that fetches the cookie, puts it on your clipboard, and shows a Copy cookie control if you need it again.';

const body = `## Premium cookie pages and copy choreography

CookiesCEO-style pages do not behave like a normal shortener redirect. You wait, then follow manual copy steps to grab a session cookie or share string before downloads unlock elsewhere. That choreography is why copy cookie bypass, session cookie copy, and skip copy step searches show up—people want the data, not the ritual.

### What slows the grab

- Site waits before cookie data is ready
- Line-by-line manual copy instructions
- Repeat visits when the clipboard clear loses the string
- Extra hops that only restate how to paste

## One Copy cookie control instead of waiting

Skip Wait fetches the cookie or share string on supported premium cookie pages, copies it to your clipboard, and surfaces a Copy cookie button if you need another grab. You stay on the cookie page; the CookiesCEO bypass extension removes the wait-and-paste dance without sending you through unrelated gates.

No decoding puzzles and no third-party paste site. The extension works on the live copy flow so session data is easier to reuse when you need it again.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'How does Skip Wait copy the session cookie?',
    answer:
      'It fetches the session cookie or share string from supported premium cookie pages and copies it to your clipboard automatically.',
  },
  {
    question: 'Is there a Copy cookie button?',
    answer:
      'Yes. Skip Wait adds a Copy cookie control so you can grab the session string again without repeating the site wait and manual instructions.',
  },
  {
    question: 'What manual steps does this replace?',
    answer:
      'Instead of following line-by-line copy instructions after a wait, the extension pulls the cookie data and places it on your clipboard in one step.',
  },
  {
    question: 'Does this redirect me to a download host?',
    answer:
      'No. CookiesCEO support is a skip copy step helper. It focuses on getting the session string into your clipboard cleanly.',
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
