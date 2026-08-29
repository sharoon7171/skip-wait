import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Tfly';

const bypassType = 'Skip Waiting Page';

const description =
  'Tfly bypass for continue gates, captcha pins, and unlock countdowns on this shortener—Skip Wait clears waiting-page busywork and opens the destination when unlock is allowed.';

const domains = ['tfly.link'] as const;

const keywords = [
  'tfly bypass',
  'tfly bypass extension',
  'tfly timer bypass',
  'tfly waiting page',
  'tfly captcha',
  'tfly get link',
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
  'A Tfly bypass or Tfly timer bypass search usually means a monetized short URL parked you on a continue gate, captcha, and unlock countdown instead of the real destination. Skip Wait is the $1.50/month Chrome extension that clears those waiting-page steps so skip click to continue is not a manual loop.';

const body = `## Please-wait, then check, then unlock

Tfly shares rarely open the target in one hop. You land on a please-wait style gate, may hit a captcha screen, then sit through an unlock countdown before a Get Link style redirect. Miss a continue, close early, or fight overlays and the same waiting page bypass loop restarts.

That sequence—not a single timer—is why people also search please wait bypass and link shortener bypass next to Tfly.

### Gates that reset progress

- Waiting pages that hide Continue until the client timer ends
- Captcha screens before unlock is allowed
- Unlock countdown chrome on the go step
- Manual continue button loops after a failed hop

## Finishing the short URL on the live gate

Skip Wait’s Tfly support runs inside Chrome on the waiting page you already opened. It skips delay layers the flow already expects, pins captcha when required, and sends you to the target once unlock is allowed.

Client-only busywork disappears; required verification still finishes honestly. That is a skip waiting page path without a paste tool that breaks when the next gate skin changes.

## Layouts that change overnight

Third-party unlock sites often fail when Tfly rotates gate chrome. A Tfly bypass extension keyed to continue release and unlock behavior stays useful as long as that pattern holds—without re-copying the short URL into another website each week.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Tfly bypass skip?',
    answer:
      'Continue gates, unlock countdown busywork, and manual continue loops on supported waiting pages. Skip Wait opens the destination when unlock is ready.',
  },
  {
    question: 'Does the unlock countdown vanish instantly?',
    answer:
      'Busywork and client-only delays go away. When a step still needs a real wait, Skip Wait stays until it is allowed, then continues—reliable timer bypass, not a fake zero-second cheat.',
  },
  {
    question: 'Do I still solve captcha?',
    answer:
      'Yes when the site shows one. Skip Wait pins the check; after you finish it, unlock continues without hunting Continue through ads.',
  },
  {
    question: 'How much does the Tfly bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. This path runs on supported pages.',
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
