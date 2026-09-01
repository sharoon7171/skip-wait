import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Exe.io';

const bypassType = 'Skip Waiting Page';

const description =
  'Exe.io bypass walks the continue gate, Turnstile check, and go-link unlock timer on exe.io and exeygo.com so Skip Wait opens the destination when the session is ready.';

const domains = ['exe.io', 'exeygo.com'] as const;

const keywords = [
  'exe.io bypass',
  'Exe.io bypass extension',
  'exe.io timer bypass',
  'exeygo bypass',
  'exeygo.com bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
  'get link bypass',
  'exe.io get link',
] as const;

const intro =
  'Exe.io bypass searches spike when a short link stops on please-wait chrome, a captcha, or a Get Link countdown instead of the file or article. Skip Wait is the Chrome extension that runs the live unlock path on exe.io and exeygo.com—continue, captcha, then go-link—without you clicking through every gate by hand.';

const body = `## Three gates before the real redirect

Exe.io-style shorteners chain more than one screen. You usually hit a Continue gate first, then a Turnstile human check, then a banner page with a Get Link button and a countdown. Only that last go-link step carries the unlock timer; earlier hops are not on a fake delay clock.

Shares often open on **exeygo.com**, a mirror host on the same network. Skip Wait treats matching exe.io and exeygo.com tabs the same so you do not restart the hunt when the alias host rotates.

### What each phase does

1. **Continue** — clears the first please-wait / click-to-continue gate
2. **Turnstile** — finishes the human check when the shortener still requires it
3. **Get Link** — waits the real go-page hold, then posts unlock and follows the redirect

Leave mid-chain and the same waiting page bypass loop starts again. An Exe.io bypass extension install is meant to keep one live session moving through those phases inside Chrome.

## Unlock on the go-link page, not a paste box

Skip Wait does not ask you to copy the alias into another site. It stays on the tab you opened, advances supported continue and captcha steps, syncs the overlay countdown with the go-page timer, and unlocks when the shortener allows redirect.

Client-only clutter and disabled unlock chrome get out of the way. Holds the server still enforces on the go-link step are waited honestly—so exe.io timer bypass stays stable instead of bouncing back to the start.

## Captcha when the shortener still asks

If Turnstile appears on the gate, finish it once on the pinned widget under the Skip Wait overlay. After the token exists, the extension submits that phase and continues toward Get Link. That keeps link shortener bypass practical in Chrome rather than a captcha farm tab.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does an Exe.io bypass skip?',
    answer:
      'Continue gates, captcha busywork after you verify once, and manual Get Link clicking on supported exe.io and exeygo.com pages. The go-link timer is synced and released when unlock is allowed.',
  },
  {
    question: 'Is the countdown removed on every screen?',
    answer:
      'No. Only the final go-link page uses a real unlock timer. Continue and captcha hops run as soon as the page allows—there is no extra countdown theater on those steps.',
  },
  {
    question: 'Does Skip Wait handle Turnstile?',
    answer:
      'Yes. Complete the check on the pinned widget; Skip Wait continues the unlock chain afterward.',
  },
  {
    question: 'Do I click Continue or Get Link myself?',
    answer:
      'On supported gates, no. Skip Wait advances continue, captcha, and go-link unlock inside the live tab.',
  },
  {
    question: 'Does exeygo.com work the same as exe.io?',
    answer:
      'Yes on supported pages. Open the shared alias normally; matching mirror hosts use the same bypass path.',
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
