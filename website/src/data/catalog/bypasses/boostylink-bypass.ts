import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'BoostyLink';

const bypassType = 'Skip Countdown';

const description =
  'BoostyLink bypass that runs content locker actions and the server unlock timer on monetized short links so the destination opens without tapping every step.';

const domains = ['boostylink.com'] as const;

const keywords = [
  'boostylink bypass',
  'BoostyLink bypass extension',
  'boostylink bypass chrome',
  'bypass boostylink',
  'skip boostylink',
  'boostylink timer bypass',
  'boostylink content locker',
  'content locker action bypass',
  'locker unlock timer',
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
  'A BoostyLink bypass search usually means a content locker still wants a stack of actions plus a server unlock timer before Continue works. Skip Wait is the Chrome extension that runs those locker steps for you and opens the destination when unlock completes.';

const body = `## Locker actions stacked before unlock

BoostyLink pages are not a single countdown strip. You start locker actions, wait a server-side unlock timer, complete each step, then finally navigate. Miss an action or leave mid-timer and the sequence resets. That is why boostylink content locker, content locker action bypass, and locker unlock timer queries show up beside generic skip countdown timer searches.

### What you would tap by hand

- Manual locker action starts and completes
- Server unlock timer busywork on the page
- Get Link delay screens after the actions finish
- Return-URL navigation you still have to click

## Completing the action loop in Chrome

Skip Wait starts the locker actions, waits out the unlock timer the server still enforces, completes each action, and opens the destination URL automatically. Cosmetic UI babysitting disappears; the honest server hold remains. One BoostyLink bypass extension install covers matching pages—no paste box and no userscript pack.

## Return URLs after the timer finishes

When the locker returns a destination—including return links from sites that use BoostyLink as their shortener—Skip Wait navigates there once unlock is allowed.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which BoostyLink pages does Skip Wait support?',
    answer:
      'Supported locker pages are listed in the domains section on this page. The extension automates action start and complete calls before opening the destination URL.',
  },
  {
    question: 'Does Skip Wait remove the unlock timer completely?',
    answer:
      'The unlock timer is server-side. Skip Wait runs the locker flow for you and opens the destination as soon as unlock is allowed—no manual action clicks.',
  },
  {
    question: 'Will BoostyLink still open my return URL after unlock?',
    answer:
      'Yes. When the locker returns a destination URL—including return links from sites that use BoostyLink as their shortener—Skip Wait navigates there automatically after unlock.',
  },
  {
    question: 'Is this just a countdown skip?',
    answer:
      'No. BoostyLink often stacks locker actions with the timer. Skip Wait automates both the taps and the wait choreography.',
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
