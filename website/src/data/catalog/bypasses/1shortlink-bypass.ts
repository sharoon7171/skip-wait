import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = '1shortlink';

const bypassType = 'Skip Waiting Page';

const description =
  '1shortlink bypass for ad shortener continue gates: Skip Wait clears the timed waiting page and opens the long URL without hunting Continue under ads.';

const domains = ['1shortlink.com'] as const;

const keywords = [
  '1shortlink bypass',
  '1shortlink bypass chrome',
  '1shortlink bypass extension',
  'bypass 1shortlink',
  'skip 1shortlink',
  '1shortlink timer bypass',
  '1shortlink countdown bypass',
  '1shortlink waiting page',
  '1shortlink continue skip',
  'ad shortener continue bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
  'ad link shortener bypass',
] as const;

const intro =
  'A 1shortlink bypass search usually starts when an ad shortener drops you on a timed gate instead of the page or file behind the share. Skip Wait is the $1/month Chrome extension that clears that waiting page and opens the destination once unlock is allowed.';

const body = `## Ad shortener shares that stall on Continue

1shortlink shares almost never resolve in a single hop. You land on a please-wait screen, dig for skip click to continue under ad chrome, and sometimes restart if you refresh too early. That loop is what people mean by 1shortlink waiting page, 1shortlink timer bypass, and ad link shortener bypass—not a hard destination, just a gate built to burn attention.

### Controls that keep the tab busy

- Timed please-wait strips before unlock
- Continue buttons buried beside rotating creatives
- Gate chrome that sits between the short alias and the long URL
- Restarts when a mistimed click resets the client timer

## Clearing the gate without babysitting ads

Skip Wait’s 1shortlink support runs on the live waiting page in Chrome. It advances the continue flow the shortener already expects, skips cosmetic delay theater, and redirects to the long URL attached to that share. One 1shortlink bypass extension install covers matching pages—no paste box and no userscript pack.

If a step still needs a real hold before unlock, the extension finishes that hold honestly, then continues. That keeps a 1shortlink countdown bypass stable instead of inventing a zero-second cheat that errors out.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a 1shortlink bypass skip?',
    answer:
      'It skips babysitting the ad shortener waiting page—please-wait busywork and continue hunting—so you reach the long URL when unlock is allowed.',
  },
  {
    question: 'Do I still press Continue under the ads?',
    answer:
      'On supported pages, no. Skip Wait completes the continue flow so you are not digging buttons out of creatives.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Client-only delays go away. When the shortener still enforces a real hold, Skip Wait waits that step once, then continues—a reliable 1shortlink timer bypass, not a fake skip.',
  },
  {
    question: 'Do I paste the URL into another site?',
    answer:
      'No. Open the short link in Chrome with Skip Wait enabled and stay on that tab.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The 1shortlink path runs on supported pages.',
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
