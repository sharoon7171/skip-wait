import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Genlink';

const bypassType = 'Skip multi step Waits';

const description =
  'Genlink bypass for stacked blog hops and unlock countdowns: Skip Wait advances continue gates across the shortener chain so you reach the destination without restarting each mediator by hand.';

const domains = ['genlink.site', 'rplinks.in', 'jazbaat.in', 'crazymindhub.xyz'] as const;

const keywords = [
  'genlink bypass',
  'genlink bypass chrome',
  'genlink bypass extension',
  'bypass genlink',
  'skip genlink',
  'genlink timer bypass',
  'genlink countdown bypass',
  'genlink waiting page',
  'rplinks bypass',
  'skip multi step waits',
  'multi step link bypass',
  'redirect chain bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'A Genlink bypass search usually starts after a shared short URL dumps you into rotating article hops instead of the file. Skip Wait is the Chrome extension that walks that multi-step chain—continue gates, please-wait strips, unlock countdown—so you are not the one babysitting every mediator.';

const body = `## Article hops that keep inventing another Continue

Genlink shares are built as a tour. You leave the shortener, land on a blog with a please-wait strip, tap Continue under ads, then bounce to another article before the unlock screen appears. Close a hop early and the redirect chain starts over—exactly the loop behind skip genlink and Genlink waiting page searches.

The product is the stack: hop count, session cookies, and a final countdown that only runs after the blogs cooperate. A single interstitial would be simple; this chain is not.

### Stages that eat the click

- Rotating blog mediators between shortener and unlock
- Please-wait strips that re-enable Continue only after the client timer
- Unlock countdowns that appear only after the hop list finishes
- Lost progress when a hop opens in the wrong tab

## Walking the live chain in Chrome

Skip Wait treats Genlink as a multi-step wait, not a paste-box riddle. On the short URL it starts the chain and covers busy UI. On each article hop it completes the continue action the page already expects, then follows the next location without hunting buttons through overlays.

When unlock finally loads, the extension holds only as long as that step still requires, then opens the destination already on the page. Client chrome gets out of the way; server-side waits still finish honestly—so a Genlink countdown bypass stays reliable instead of inventing a zero-second cheat that errors out.

## When the next share uses a new blog host

Paste tools and userscripts break the moment the mediator domain rotates. A Genlink bypass chrome install stays useful because it keys off hop behavior—continue gates, unlock release—not a hardcoded blog list you update by hand. That is the practical meaning of skip multi step waits here: one extension, the live chain, less time restarting Continue screens.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Genlink bypass actually skip?',
    answer:
      'It skips the busywork of multi-step waits: hunting Continue on blog hops and sitting through unlock UI after the chain is ready. Required holds still complete before the destination opens.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'No. Client-only delays and button hunting go away. When unlock still needs a real wait, Skip Wait stays on that step, then continues—so the Genlink timer bypass stays stable.',
  },
  {
    question: 'Do I still click Continue on article pages?',
    answer:
      'On supported hops, no. Skip Wait completes the continue flow so ads do not hide the control you were meant to press.',
  },
  {
    question: 'What if tomorrow’s share uses a new blog host?',
    answer:
      'If the unlock pattern is the same, the extension follows behavior on the live page. You do not paste the URL into a third-party tool when the mediator rotates.',
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
