import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Cuty';

const bypassType = 'Skip Countdown';

const description =
  'Cuty bypass skips the continue button countdown timer on this link shortener and unlocks your destination after captcha when required, instantly.';

const domains = ['cuttty.com'] as const;

const keywords = [
  'cuty bypass',
  'Cuty bypass extension',
  'cuty timer bypass',
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
  'A Cuty bypass search usually means a shared short URL left the Continue control grey until a countdown finished. Skip Wait is the free Chrome extension that advances that unlock timer after any required captcha so you are not watching the clock on every alias.';

const body = `## Continue stays grey until the clock dies

Cuty monetizes shares with a continue or get-link control that only enables after a client countdown. Miss the unlock moment, close the tab early, or fight overlays for the button and you restart the same skip countdown ritual—exactly the loop behind cuty timer bypass and countdown timer bypass searches.

That is a single-page unlock delay, not a blog tour. The shortener expects you to sit with the tab open until Continue is legal.

### Captcha still sits between you and unlock

Some shares insert a human check before the timer path finishes. Solving it does not remove the countdown chrome; it only proves a real browser is present. People who want a Cuty bypass extension usually want both steps handled without re-pasting the alias into another site.

## Letting Chrome finish the unlock page

Skip Wait activates on supported Cuty unlock pages. It covers busy UI, advances the continue flow once the shortener allows it, and opens the destination when unlock is ready. Required captcha stays yours to complete once; client-only timer theater stops owning the tab.

If the shortener still enforces a real hold, Skip Wait stays on that step until unlock is accepted—so skip timer unlock stays reliable instead of a fake zero-second cheat that errors out.

## Why paste boxes miss the session after captcha

Unshorten paste tools often fail when Cuty expects cookies and a live tab after the captcha. A skip wait extension install keeps the session on the page you already opened, which is the durable reading of link shortener bypass for this host.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Cuty bypass actually skip?',
    answer:
      'The continue-button countdown busywork on supported unlock pages. Skip Wait advances unlock after any required captcha so you spend less time watching the timer.',
  },
  {
    question: 'Do I still solve captcha?',
    answer:
      'When Cuty requires it, yes. After the token exists, Skip Wait finishes the countdown path and opens the destination.',
  },
  {
    question: 'Does every timer disappear instantly?',
    answer:
      'Client-only delay theater goes away. If unlock still needs a real wait, Skip Wait stays on that step until it is allowed—stable skip timer unlock, not a broken cheat.',
  },
  {
    question: 'Do I click Continue myself?',
    answer:
      'On supported pages, no. Skip Wait advances the continue flow once unlock is allowed.',
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
