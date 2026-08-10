import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Boostellar / Bstshrt';

const bypassType = 'Skip Countdown';

const description =
  'Boostellar / Bstshrt bypass that clears content locker gates and unlock countdowns on monetized short links so the destination opens without watching the locker clock.';

const domains = ['bstshrt.com', 'bstlar.com', 'boostellar.com'] as const;

const keywords = [
  'boostellar bypass',
  'bstshrt bypass',
  'bstlar bypass',
  'boostellar bstshrt bypass',
  'Boostellar bypass extension',
  'boostellar timer bypass',
  'bstshrt timer bypass',
  'boostellar content locker',
  'content locker bypass',
  'content locker countdown skip',
  'skip countdown',
  'skip countdown timer',
  'bypass countdown timer',
  'countdown timer bypass',
  'skip timer unlock',
  'get link delay bypass',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'A Boostellar bypass or Bstshrt bypass search usually starts when a monetized short link freezes behind a content locker countdown. Skip Wait is the free Chrome extension that clears that locker gate so the destination opens without watching the unlock clock by hand.';

const body = `## Content lockers that freeze Get Link

Boostellar and Bstshrt shares park a content locker between the short alias and the long URL. Continue or Get Link stays disabled until the countdown finishes, even when the destination is already known. That stall is why boostellar content locker, content locker countdown skip, and get link delay bypass queries sit next to generic skip countdown timer searches.

### What the locker holds

- Unlock countdowns before Continue enables
- Content locker chrome on monetized short URLs
- Get Link delay screens after the timer
- Manual babysitting when the page resets mid-count

## Monetized short URLs past the locker clock

Skip Wait runs on the live locker page in Chrome, advances past countdown busywork when the flow allows, and opens the destination once unlock is permitted. One Boostellar / Bstshrt bypass extension install covers the matching hosts listed on this page—no paste form and no per-link toggle.

Client-only delay theater clears; if the locker still enforces a real server hold, Skip Wait finishes that hold honestly, then continues.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which Boostellar / Bstshrt hosts are covered?',
    answer:
      'The hosts listed in the domains section on this page. Open any of those monetized short links with Skip Wait enabled and the locker path starts automatically.',
  },
  {
    question: 'What content locker gate does Skip Wait clear?',
    answer:
      'The locker that blocks instant redirect—countdown chrome and Get Link delay—so the destination opens when unlock is allowed.',
  },
  {
    question: 'Does it skip the full countdown every time?',
    answer:
      'It removes client busywork and advances as soon as unlock is permitted. Server-enforced holds are waited once, then the redirect continues.',
  },
  {
    question: 'Is this the same as BoostyLink?',
    answer:
      'Related locker family, different action loop. Boostellar / Bstshrt focuses on countdown gates; BoostyLink also automates stacked locker actions.',
  },
  {
    question: 'Is the Boostellar path free?',
    answer:
      'Yes. Skip Wait is free. The Boostellar / Bstshrt bypass runs on supported pages with no account or paid plan.',
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
