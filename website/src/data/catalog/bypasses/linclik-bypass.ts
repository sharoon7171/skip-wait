import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Linclik';

const bypassType = 'Skip Waiting Page';

const description =
  'Linclik bypass that clears the continue gate and AdLinkFly-style unlock countdown so Skip Wait can redirect to the destination without babysitting Get Link.';

const domains = ['linclik.com'] as const;

const keywords = [
  'linclik bypass',
  'linclik bypass chrome',
  'linclik bypass extension',
  'bypass linclik',
  'skip linclik',
  'linclik timer bypass',
  'linclik countdown bypass',
  'linclik continue',
  'adlinkfly unlock',
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
  'A Linclik bypass search usually means a short URL parked you on a continue gate and an AdLinkFly-style unlock countdown instead of the destination. Skip Wait is the free Chrome extension that advances that waiting page and redirects when unlock is ready.';

const body = `## Continue, then unlock countdown, then the real URL

Linclik shares follow a familiar AdLinkFly pattern: a continue gate under ads, a please-wait strip, then an unlock countdown before Get Link or the redirect fires. Miss Continue or leave early and you restart the gate.

That is why linclik timer bypass and skip click to continue sit next to waiting page bypass—the destination is delayed by UI chores, not a mystery URL.

### Gates people actually sit through

- Continue buttons that stay disabled until the client timer ends
- Please-wait strips stacked over the unlock control
- AdLinkFly-style countdown before redirect
- Manual retries when ads hide Get Link

## Finishing unlock on the live waiting page

Skip Wait detects the gate, completes the continue flow the page expects, and covers unlock countdown busywork so the redirect can fire when allowed.

You open the short link as usual—no paste tool. Client-only clutter gets out of the way; any server-enforced hold still finishes honestly before the destination opens.

## Why re-clicking Continue never teaches you anything new

The unlock pattern stays the same even when ad layouts shuffle. A Linclik bypass extension that runs on the live page keeps skip waiting page useful without learning a new paste site every time the shortener tweaks chrome.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Linclik bypass skip?',
    answer:
      'The continue gate and AdLinkFly-style unlock countdown busywork so the destination opens when unlock is allowed.',
  },
  {
    question: 'Do I still press Continue myself?',
    answer:
      'On supported pages, no. Skip Wait completes the continue flow and advances unlock without hunting buttons through ads.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Client-only delays go away. When unlock still needs a real wait, Skip Wait stays until it is allowed—so the linclik countdown bypass stays stable.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free. The Linclik path runs on supported pages with no paid plan.',
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
