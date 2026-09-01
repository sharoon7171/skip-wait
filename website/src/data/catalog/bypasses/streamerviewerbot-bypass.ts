import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Streamerviewerbot';

const bypassType = 'Skip Preparing Timer';

const description =
  'Streamerviewerbot bypass skips the free trial Preparing countdown on Stream and Kick follower and viewer forms so the submit button unlocks right away.';

const domains = ['streamerviewerbot.com'] as const;

const keywords = [
  'streamerviewerbot bypass',
  'Streamerviewerbot bypass extension',
  'streamerviewerbot timer bypass',
  'skip preparing timer',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'free stream followers bypass',
  'skip wait extension',
  'free trial timer skip',
  'preparing countdown bypass',
] as const;

const intro =
  'A Streamerviewerbot bypass or skip preparing timer search usually means a free trial form stuck on Preparing for minutes before Start Free Trial unlocks. Skip Wait is the Chrome extension that clears that preparing countdown bypass so free stream followers bypass busywork is not a multi-minute clock.';

const body = `## Multi-minute Preparing before Start Free Trial

Free follower and free viewer pages embed a trial iframe that holds Start Free Trial behind a Preparing countdown. You fill the channel fields, then sit through the clock—or reload and lose the form—before reCAPTCHA even appears. That is the loop behind streamerviewerbot timer bypass, free trial timer skip, and skip countdown timer searches.

The form is already on the page. Preparing is a client lock on the submit control.

### What the trial iframe holds back

- Preparing countdowns on free trial forms
- Locked Start Free Trial buttons
- Late reveal of reCAPTCHA after the clock
- Lost form state if you refresh mid-wait

## Unlocking ready state inside the iframe

Skip Wait patches the trial iframe countdown so the page runs its own unlock path immediately. Preparing clears, Start Free Trial becomes usable, and you still complete reCAPTCHA before submit—human checks stay with you; the multi-minute theater does not.

Open free stream followers or free stream viewers as usual. That is a Streamerviewerbot bypass extension for skip preparing timer flows, not a paste decoder.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What Preparing countdown does Skip Wait skip?',
    answer:
      'It bypasses the free trial Preparing countdown in the trial iframe so Start Free Trial unlocks without the multi-minute wait.',
  },
  {
    question: 'Does this work on free followers and free viewers?',
    answer:
      'Yes. Both pages embed the same trial form, and the Preparing timer unlock applies to that embedded flow.',
  },
  {
    question: 'Do I still need to complete reCAPTCHA?',
    answer:
      'Yes. Skip Wait removes the Preparing wait and reveals reCAPTCHA early; you still complete the captcha before submitting.',
  },
  {
    question: 'Is the destination guessed offline?',
    answer:
      'No. The extension unlocks the page’s own ready state. You still submit the form on the live site.',
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
