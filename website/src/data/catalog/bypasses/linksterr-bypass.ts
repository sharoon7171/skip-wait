import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Linksterr';

const bypassType = 'Skip Waiting Page';

const description =
  'Linksterr bypass that clears the gateway waiting page on this URL shortener and redirects to the destination without manual continue loops or filler delays.';

const domains = ['linksterr.com'] as const;

const keywords = [
  'linksterr bypass',
  'linksterr bypass chrome',
  'linksterr bypass extension',
  'bypass linksterr',
  'skip linksterr',
  'linksterr timer bypass',
  'linksterr gateway',
  'linksterr waiting page',
  'skip waiting page',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'Searching for a Linksterr bypass usually means a short URL opened a gateway waiting page instead of the destination. Skip Wait is the $1.50/month Chrome extension that clears that please-wait gate and redirects without you tapping Continue through ads.';

const body = `## Gateway pages that sit between you and the URL

Linksterr puts a waiting gateway after the short link: please wait, click to continue, overlays that hide the real destination until the UI decides you waited long enough. Leave early and you restart the gate.

That is why linksterr waiting page and skip click to continue searches appear next to generic waiting page bypass—the shortener already knows where you are going; the gateway is the product.

### What the gateway adds

- Please-wait screens before any redirect
- Click-to-continue loops under ad clutter
- Gate pages that hold the destination behind UI
- Manual retries when the wrong tab closes mid-wait

## Redirecting when the page already holds the target

Skip Wait detects the gateway, bypasses filler wait chrome when the destination is present, and sends you there without hunting Continue.

You open the short link as usual—no paste tool. Client-only delay UI gets out of the way so the redirect can fire on the live page.

## One waiting pattern, fewer manual steps

Gateway layouts shuffle; the continue-then-redirect behavior stays familiar. A Linksterr bypass extension that runs on that live gate keeps skip waiting page useful without inventing a new paste workflow each week.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Linksterr bypass skip?',
    answer:
      'The gateway waiting page and continue loops so the destination opens without manual please-wait steps.',
  },
  {
    question: 'Do I still click Continue myself?',
    answer:
      'On supported gates, no. Skip Wait advances past please wait and continue screens.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Filler wait chrome goes away when the destination is present. Required holds still finish before redirect if the page enforces them.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The Linksterr path runs on supported pages.',
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
