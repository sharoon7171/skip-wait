import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'LinkUnlocker';

const bypassType = 'Skip Countdown';

const description =
  'LinkUnlocker bypass that clears the content-locker countdown and unlocks the link or copies result text automatically when the page releases the payload.';

const domains = ['linkunlocker.com'] as const;

const keywords = [
  'linkunlocker bypass',
  'linkunlocker bypass chrome',
  'linkunlocker bypass extension',
  'bypass linkunlocker',
  'skip linkunlocker',
  'linkunlocker timer bypass',
  'linkunlocker countdown',
  'content locker bypass',
  'skip countdown',
  'skip countdown timer',
  'bypass countdown timer',
  'countdown timer bypass',
  'skip timer unlock',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A LinkUnlocker bypass search usually means a content locker parked you on a countdown before the unlocked URL or result text appears. Skip Wait is the Chrome extension that clears that timer busywork and finishes unlock—redirect or clipboard—when the page is ready.';

const body = `## Lockers that sell a countdown before the payload

LinkUnlocker puts a timed unlock between you and the destination. Sometimes that is a redirect URL; sometimes it is result text you were meant to copy. Either way, Get Link stays disabled while the clock runs and ads compete for attention.

That is why linkunlocker timer bypass and content locker bypass sit next to skip countdown—the payload is already decided; the wait is the product.

### What the locker actually delays

- Countdown timers before unlock enables
- Get Link delay screens under overlays
- Manual copy of result text after the clock ends
- Retries when leaving mid-countdown resets the locker

## Unlocking the link or copying the result

Skip Wait activates on supported countdown flows. It advances past get-link delay chrome and, when the page returns text instead of a redirect, copies the result as part of the unlock path.

You open the locker as usual—no paste tool into another site. Client-only timer UI gets out of the way; any server-enforced release still finishes honestly.

## Countdown chrome vs inventing a zero-second cheat

Fake instant unlocks often error when the locker still expects a held session. Skip Wait removes busywork and continues when release is allowed—so a LinkUnlocker bypass extension stays reliable instead of returning empty payloads.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a LinkUnlocker bypass skip?',
    answer:
      'Content-locker countdown busywork so the unlocked link opens or result text is copied when the page releases the payload.',
  },
  {
    question: 'Can it copy result text instead of redirecting?',
    answer:
      'Yes when the locker returns text. Skip Wait copies that result as part of the unlock flow.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Client-only delay chrome goes away. When release still needs a real wait, Skip Wait stays until it is allowed.',
  },
  {
    question: 'Do I press Get Link myself?',
    answer:
      'On supported flows, Skip Wait advances past get-link delay screens so you are not babysitting the disabled button.',
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
