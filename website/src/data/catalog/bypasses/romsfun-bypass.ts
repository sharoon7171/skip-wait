import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'RomsFun';

const bypassType = 'Skip Countdown';

const description =
  'RomsFun bypass skips the ROM download countdown and reveals the download button faster on this game ROM host without watching the unlock clock.';

const domains = ['romsfun.com'] as const;

const keywords = [
  'romsfun bypass',
  'RomsFun bypass extension',
  'romsfun timer bypass',
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
  'Looking for a RomsFun bypass usually means a ROM page locked the download behind a countdown. Skip Wait is the $1.50/month Chrome extension that runs a romsfun timer bypass and skip countdown path so the download control unlocks without babysitting the clock.';

const body = `## Download buttons trapped behind a clock

RomsFun file pages often sit a timer in front of the download or get-link step. You watch the counter, wait for the button to enable, then restart if you leave the tab early or an overlay covers the control. Across multi-disc sets and mirror retries, that pattern drives searches for skip countdown timer, countdown timer bypass, and skip timer unlock.

The ROM archive is already on the page. The countdown is theater that keeps the control disabled until the client clock finishes.

### What the unlock clock actually does

- Holds the download button until the counter hits zero
- Adds get-link delay screens before the archive
- Resets progress if you switch tabs mid-wait
- Forces a refresh when the unlock UI stalls

## Unlocking the control on the same ROM page

Skip Wait activates on matching countdown flows inside Chrome. It advances the unlock path the page already uses, reveals the download control when the site allows, and skips client-only delay theater.

Required server checks still complete honestly. You stay on the same ROM page—no paste decoder—just a RomsFun bypass extension that treats the timer as automation work. Sitting through every countdown by hand adds up; one skip wait extension install handles the supported unlock pattern so you spend time on the dump instead of the clock.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What is a RomsFun bypass?',
    answer:
      'It is a way to skip the ROM download countdown that locks the file button. Skip Wait advances the unlock in Chrome so you reach the download sooner.',
  },
  {
    question: 'Does Skip Wait reveal the download button faster?',
    answer:
      'Yes on supported pages. Unlock countdowns and get-link delay screens are handled so the ROM download control appears without the full manual wait.',
  },
  {
    question: 'Does every timer disappear instantly?',
    answer:
      'Client-only delay theater is cleared. If the host still needs a short unlock step, Skip Wait stays on it until allowed—so the romsfun timer bypass stays reliable.',
  },
  {
    question: 'Do I need a paste site for the ROM URL?',
    answer:
      'No. The extension works on the page you opened. That is a countdown timer bypass in Chrome, not a third-party decoder.',
  },
  {
    question: 'How much does the RomsFun bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The RomsFun path runs on supported pages.',
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
