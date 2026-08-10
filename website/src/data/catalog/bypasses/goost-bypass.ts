import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Goost';

const bypassType = 'Skip Short Link';

const description =
  'Goost bypass that clears continue and blog wait timers, pins reCAPTCHA for a single human check, then opens the destination from the statistics unlock page.';

const domains = ['goo.st', 'kreditexperte.online'] as const;

const keywords = [
  'goost bypass',
  'goost bypass chrome',
  'goost bypass extension',
  'bypass goost',
  'skip goost',
  'goost timer bypass',
  'goost countdown bypass',
  'goost waiting page',
  'goost recaptcha',
  'skip short link',
  'ad link bypass',
  'short link bypass',
  'monetized link bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'People hunting a Goost bypass or Goost recaptcha fix usually hit a monetized short URL that parks them on continue gates, a blog wait, then a human check before any destination appears. Skip Wait is the free Chrome extension that advances those timers, pins the captcha once, and finishes unlock from the statistics page.';

const body = `## Short links that end in a statistics unlock

A Goost share is rarely one redirect. Verification gates and continue screens come first, then a blog wait timer, then a reCAPTCHA that blocks the go page until a human token exists. Only after that does the statistics unlock URL reveal where you were going.

That sequence is why goost waiting page and short link bypass queries sit next to goost timer bypass—the pain is the checklist, not one cosmetic clock.

### Checklist most visitors actually face

1. Survive continue and blog wait timers after the short link
2. Complete reCAPTCHA when the gate demands a human check
3. Pass the go page into the statistics unlock hop
4. Hope the session still accepts the unlock after the captcha

## Continue gates without babysitting every hop

On supported Goost pages, Skip Wait skips continue and blog wait busywork, then pins reCAPTCHA over the overlay so you can solve it once. After the token is present it continues through the statistics unlock until the destination opens.

Timers the shortener still enforces server-side are waited honestly. Disabled unlock chrome and button hunting get out of the way. That is skip short link as a live browser path—not a paste API that dies when the next gate host changes.

## Captcha stays human; babysitting does not

Skip Wait never claims to farm reCAPTCHA. It keeps the widget usable so one solve unlocks the rest of the flow. A Goost bypass extension install that runs on the gates you already opened stays useful when blog or unlock hosts rotate, as long as the same short-link pattern remains.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Does Skip Wait solve reCAPTCHA for me?',
    answer:
      'No. It pins the widget so you can complete the human check once. After the token is present, unlock continues automatically.',
  },
  {
    question: 'What does a Goost bypass skip?',
    answer:
      'Continue gates, blog wait timers, and unlock busywork on the short-link path. Required holds and a real captcha still happen when the page demands them.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Client-only delays go away. When a step still requires a real wait, Skip Wait stays until it is allowed—so the Goost countdown bypass stays stable.',
  },
  {
    question: 'Do I click Continue on every gate?',
    answer:
      'On supported pages, no. Skip Wait advances continue and blog wait steps so ads do not hide the control you were meant to press.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free. The Goost path runs on supported pages with no paid plan.',
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
