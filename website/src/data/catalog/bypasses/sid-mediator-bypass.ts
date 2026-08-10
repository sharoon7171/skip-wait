import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'SID Mediator';

const bypassType = 'Skip Waiting Page';

const description =
  'SID bypass skips the session waiting page on mediator sites and continues to your destination link after setting the required access cookie.';

const domains = [
  'cloud.unblockedgames.world',
  'health.jkssbworld.in',
  'tech.examzculture.in',
] as const;

const keywords = [
  'sid mediator bypass',
  'SID Mediator bypass extension',
  'sid mediator timer bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
] as const;

const intro =
  'An SID Mediator bypass search usually means a short link parked you on a session waiting page that only continues after an access cookie is set. Skip Wait is the free Chrome extension that clears that please wait bypass and skip click to continue loop so the destination opens without babysitting the mediator.';

const body = `## Session cookies hidden behind please-wait

SID-style mediators place a waiting page between the short URL and the real destination. The page looks like a generic please-wait or continue screen, but progress depends on a session cookie the mediator expects before it will redirect. Sit through the strip, miss Continue under ads, or reload too early and you loop—why sid mediator timer bypass and waiting page bypass searches show up next to skip waiting page help.

This is not a multi-blog shortener tour. It is one gate whose job is cookie-plus-delay before the target URL.

### What the mediator gate actually does

- Shows a session waiting page before redirect
- Expects an access cookie before continuing
- Hides Continue behind ads or a timer
- Restarts if you leave before the cookie sticks

## Setting the cookie, then leaving the gate

When the waiting page loads, Skip Wait runs in the background, sets the access cookie the mediator expects, skips the delay layer, and sends you to the target URL supported for that SID Mediator hop.

No paste decoder—just a SID Mediator bypass extension that treats the session wait as automation. Client busywork disappears; any hold the mediator still enforces finishes honestly.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does an SID Mediator bypass skip?',
    answer:
      'It skips the session waiting page and continue busywork on supported mediators, after the access cookie the gate expects is in place.',
  },
  {
    question: 'Does Skip Wait set the access cookie?',
    answer:
      'Yes. The extension sets the cookie the mediator expects, then bypasses the delay layer and redirects to your target URL.',
  },
  {
    question: 'Is this the same as a multi-hop shortener bypass?',
    answer:
      'No. SID Mediator support targets a single session waiting page pattern, not a long blog-hop chain.',
  },
  {
    question: 'Do I still click Continue by hand?',
    answer:
      'On supported hops, no. Skip Wait completes the continue flow so ads do not hide the control.',
  },
  {
    question: 'Is the SID bypass free?',
    answer:
      'Yes. Skip Wait is free. The SID path runs on supported pages with no paid plan.',
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
