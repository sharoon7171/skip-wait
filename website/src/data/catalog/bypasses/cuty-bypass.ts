import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Cuty';

const bypassType = 'Skip Countdown';

const description =
  'Cuty bypass for cuttty.com and cuty.io short links: Skip Wait advances Continue and captcha, waits the real unlock timer, then opens the destination when the shortener allows it.';

const domains = ['cuttty.com', 'cuty.io'] as const;

const keywords = [
  'cuty bypass',
  'Cuty bypass extension',
  'cuttty bypass',
  'cuty.io bypass',
  'cuty timer bypass',
  'cuty short link bypass',
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
  'A Cuty bypass matters when a shared short link on cuttty.com or cuty.io leaves Continue grey, asks for a captcha, then holds another countdown before the destination opens. Skip Wait is the free Chrome extension that runs that unlock path on supported Cuty pages so you are not babysitting every step.';

const body = `## Continue, captcha, then another clock

Cuty monetizes shares with a multi-step free path: a first Continue gate, a human check when required, then a prepared-link countdown before the destination opens. Miss the unlock moment, close the tab early, or fight overlays for the button and you restart the same skip countdown ritual.

That is a shortener unlock delay, not a mirror host list. On [Mirrored.to](/sites/mirrored-to-bypass), Skip Wait replaces short URL Download buttons with the real host link without opening Cuty at all. This Cuty page is the separate short-link path when another site still sends you through Cuty itself.

### Stages on a free unlock

- First Continue gate after the short link opens
- Captcha before the prepared-link screen when Cuty requires it
- Countdown while the link is prepared
- Final unlock that opens the destination

## Running the unlock path inside Chrome

Skip Wait activates on supported Cuty unlock pages on both Cuty domains. It covers busy UI, advances each unlock step once the page is ready, and holds only for the real countdown the shortener still enforces—then opens the destination. Required captcha stays yours to complete once; fake timer chrome stops owning the tab.

When a share already includes the destination in a quick Cuty link, Skip Wait prefers that destination instead of walking the full unlock tour.

If an adblocker is on for Cuty, the shortener often sends you back to the first gate after the timer. Pause your blocker for this site, reload, and the unlock path can finish.

## Why paste boxes miss the session after captcha

Unshorten paste tools often fail when Cuty expects cookies and a live tab after the captcha. A skip wait extension install keeps the session on the page you already opened, which is the durable reading of link shortener bypass for this host.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Cuty bypass actually skip?',
    answer:
      'The Continue and prepared-link busywork on supported unlock pages. Skip Wait advances unlock after any required captcha and opens the destination after the real countdown.',
  },
  {
    question: 'Is this the same as the Mirrored.to bypass?',
    answer:
      'No. Mirrored.to replaces short URL Download buttons with host links on the mirror page. Cuty bypass runs when you land on Cuty itself.',
  },
  {
    question: 'Do I still solve captcha?',
    answer:
      'When Cuty requires it, yes. After you finish the check, Skip Wait continues the countdown path and opens the destination.',
  },
  {
    question: 'Does every timer disappear instantly?',
    answer:
      'Fake delay chrome goes away. The prepared-link countdown is still honored when unlock needs that wait—stable skip timer unlock, not a broken early open.',
  },
  {
    question: 'Why does Cuty send me back to the first step?',
    answer:
      'Cuty often blocks unlock when an adblocker is active and restarts the flow after the timer. Pause your blocker for Cuty, reload, and the destination can open.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The Cuty path runs with no paid plan.',
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
