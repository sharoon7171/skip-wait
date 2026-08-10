import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Mirrored.to';

const bypassType = 'Skip Countdown';

const description =
  'Mirrored.to bypass for mirror-files countdowns and interstitial waits: Skip Wait unlocks the host list so you can pick a download mirror without watching the clock first.';

const domains = ['mirrored.to'] as const;

const keywords = [
  'mirrored.to bypass',
  'Mirrored.to bypass extension',
  'mirrored.to timer bypass',
  'skip countdown',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'countdown timer bypass',
  'skip timer unlock',
] as const;

const intro =
  'People search Mirrored.to bypass or skip timer unlock after a share opens a mirror-files countdown instead of host buttons. Skip Wait is the free Chrome extension that clears that unlock delay so the download list appears sooner.';

const body = `## Mirror landings that hide every host

Mirrored.to pages are aggregators: the useful part is the row of host download buttons, but those buttons often stay locked behind a mirror-files countdown or interstitial. You open the share, stare at please-wait chrome, then finally choose a CDN. Refresh early or mistime Continue and the interstitial returns—common fuel for Mirrored.to timer bypass and countdown timer bypass queries.

The delay is not the file itself. It is the landing that monetizes attention before any mirror is clickable.

### What the unlock screen is doing

- Holding host buttons until a client timer finishes
- Inserting get-link delay UI between the share and the list
- Asking for a manual continue after the clock hits zero
- Resetting progress if you leave mid-interstitial

## Unlocking the list without babysitting

Skip Wait runs on the mirror page inside Chrome. It advances past client-only unlock timers so the host row is no longer blocked by a fake wait wall. When a step still needs a real hold, the extension stays until unlock is allowed, then continues—skip countdown without inventing dead mirrors.

You pick the host yourself once the list is live. That keeps a Mirrored.to bypass extension install useful when interstitial markup rotates but the same unlock pattern remains.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Mirrored.to bypass unlock?',
    answer:
      'It clears mirror-files countdowns and interstitial waits so host download buttons appear without you watching the clock on every share.',
  },
  {
    question: 'Does every timer vanish instantly?',
    answer:
      'Client-only delays go away. When unlock still needs a real wait, Skip Wait finishes that step, then continues—so the Mirrored.to timer bypass stays reliable.',
  },
  {
    question: 'Do I still click Continue after the countdown?',
    answer:
      'On supported flows the extension advances unlock for you, so you spend less time hunting continue controls after the timer.',
  },
  {
    question: 'Does Skip Wait pick a host for me?',
    answer:
      'No. It unlocks the list. You still choose which mirror download button to use.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free. The Mirrored.to path runs on supported pages with no account or paid plan.',
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
