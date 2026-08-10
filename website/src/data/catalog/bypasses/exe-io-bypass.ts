import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Exe.io';

const bypassType = 'Skip Waiting Page';

const description =
  'Exe.io bypass skips gate screens, captcha waits, and countdown timers on this popular ad link shortener for instant redirect to your destination URL.';

const domains = ['exe.io', 'exeygo.com'] as const;

const keywords = [
  'exe.io bypass',
  'Exe.io bypass extension',
  'exe.io timer bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
] as const;

const intro =
  'People search Exe.io bypass or Exe.io timer bypass after an ad short link dumps them on a please-wait gate instead of the destination. Skip Wait is the free Chrome extension that clears those waiting pages and continue loops so you are not the one tapping through every gate.';

const body = `## Please-wait gates before the real redirect

Exe.io-style ad shorteners sit a waiting page between the short URL and your destination. You face please wait chrome, click to continue, and countdown UI that only releases after the gate decides the visit counted. Leave early and the same waiting page bypass hunt starts again.

That stacked gate is why skip waiting page, please wait bypass, and skip click to continue show up next to Exe.io bypass extension queries—the pain is babysitting the interstitial, not finding the target.

### Continue loops that reset if you leave early

Some shares chain more than one gate or re-arm Continue after a refresh. Manual clicking through overlays is fragile; an Exe.io bypass extension install is meant to keep the live tab moving without restarting the loop by hand.

## Clearing the gate inside the shortener tab

Skip Wait detects supported gate screens, advances please-wait and continue steps when the page allows it, and follows the redirect to the destination. Client delay theater stops owning the tab; holds the shortener still enforces are waited honestly so unlock does not error out.

You open the shared alias the normal way—no paste box. Matching sibling hosts on the same network wake the same path.

## Captcha when the shortener still asks

If a human check appears on the gate, finish it once on the pinned widget. After the token exists, Skip Wait continues the unlock so skip countdown timer and link shortener bypass stay practical inside Chrome rather than a captcha farm.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does an Exe.io bypass skip?',
    answer:
      'Gate screens, please-wait chrome, continue loops, and client countdown busywork on supported pages. Required captcha still needs a human once.',
  },
  {
    question: 'Does Skip Wait handle captcha waits?',
    answer:
      'It keeps the gate usable. You complete the check; afterward the extension continues unlock toward the destination.',
  },
  {
    question: 'Are countdown timers always zeroed instantly?',
    answer:
      'Client-only delay theater goes away. If the shortener still enforces a real hold, Skip Wait stays on that step until redirect is allowed.',
  },
  {
    question: 'Do I click Continue myself?',
    answer:
      'On supported gates, no. Skip Wait advances continue when the page allows it.',
  },
  {
    question: 'Is the Exe.io bypass free?',
    answer:
      'Yes. Skip Wait is free with no account or paid plan for supported pages.',
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
