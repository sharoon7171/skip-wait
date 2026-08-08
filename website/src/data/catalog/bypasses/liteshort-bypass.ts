import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'LiteShort';

const bypassType = 'Skip Short Link';

const description =
  'LiteShort bypass skips the Continue to Destination notice, rotating short mediators, and the Get Link countdown so you reach the next URL without waiting through every hop.';

const domains = [
  'liteshort.com',
  'link.liteshort.com',
  'gadinow.in',
  'jobsmbn.in',
  'strictstrategies.com',
  'adrinolinks.in',
  'adrinolinks.com',
  'carrnissan.com',
] as const;

const keywords = [
  'liteshort bypass',
  'bypass liteshort',
  'skip liteshort',
  'liteshort timer bypass',
  'liteshort countdown bypass',
  'liteshort get link',
  'get link bypass',
  'liteshort continue to destination',
  'continue to destination bypass',
  'liteshort mediator bypass',
  'short mediator bypass',
  'organic redirect google bypass',
  'skip waiting page',
  'skip waiting page liteshort',
  'link shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'monetized short link bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'LiteShort is a three-act short link: a Continue to Destination disclaimer, a rotating short mediator that insists on a Google-style first result and blog continues, then a Get Link countdown on the unlock page. Skip Wait cuts that chain down to the parts that actually matter. The free Chrome extension skips the notice, recognizes live mediators so you are not stuck in organic-redirect theater, and finishes the unlock waiting page with only a real server timer when one is required—so a LiteShort countdown bypass feels like moving forward, not completing chores.';

const problem =
  'Publishers rotate the middle hop on purpose. One day the mediator looks like a news post, the next it is another search page, but the goal is the same: prove you came from an allowed referrer before Get Link appears. Click the wrong result, miss a continue, or refresh mid-chain and LiteShort sends you back to the start. That short-mediator maze is the whole product; the destination is just the prize at the end.';

const howItWorks =
  'From the LiteShort entry screen Skip Wait bypasses Continue to Destination and aims you at unlock. If a rotating mediator loads instead, it skips the search and article filler and returns you to the unlock waiting page with the visit context that page expects. There, the Links Go–style Get Link flow runs under Skip Wait: early unlock when allowed, a single enforced wait when the server demands it, then a redirect to the next URL—without fake countdown UI or manual hopping every time mediators change.';

const steps: readonly BypassStep[] = [
  {
    title: 'Get Skip Wait',
    body: 'Install from the Chrome Web Store. LiteShort entry, mediator, and unlock support activate automatically.',
  },
  {
    title: 'Stay enabled',
    body: 'Leave the extension on. No paste tools or per-link settings.',
  },
  {
    title: 'Click the LiteShort link',
    body: 'Open it like any other short URL. Skip Wait follows the notice, mediator, and unlock screens as they show up.',
  },
  {
    title: 'Keep going to the next URL',
    body: 'When unlock succeeds you leave for the destination—no Continue to Destination taps and no first-result scavenger hunt.',
  },
];

const skips = [
  'Continue to Destination disclaimer taps',
  'Rotating short-mediator search hops',
  'Blog continue chains on mediators',
  'Fake Get Link countdown chrome',
  'Relearning the path when mediators rotate',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a LiteShort bypass skip?',
    answer:
      'The disclaimer, the rotating short mediators, and the busywork around Get Link—so you are not stuck on intermediate pages. Skip Wait covers supported entry, mediator, and unlock screens.',
  },
  {
    question: 'Why do I keep landing on random blogs?',
    answer:
      'Unlock only works after a visit that looks like it came from an allowed short mediator. Those mediators rotate; Skip Wait knows the live ones and skips their search and article steps.',
  },
  {
    question: 'Does Get Link still make me wait?',
    answer:
      'Only if the server enforces a real timer. Skip Wait tries unlock immediately and ignores cosmetic countdown UI.',
  },
  {
    question: 'Do I tap Continue to Destination myself?',
    answer:
      'No. Skip Wait clears that notice and moves the chain forward for you.',
  },
  {
    question: 'Is LiteShort support free?',
    answer:
      'Yes. Skip Wait is free Chrome extension software with no account and no paid LiteShort tier.',
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
    problem,
    howItWorks,
    steps,
    skips,
    faq,
  },
} satisfies SupportedBypass;
