import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'LiteShort';

const bypassType = 'Skip Short Link';

const description =
  'LiteShort bypass that clears Continue to Destination notices, rotating short mediators, and Get Link countdown chrome so you reach the next URL without scavenger-hunt hops.';

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
  'LiteShort is a three-act short link: a Continue to Destination disclaimer, a rotating short mediator that pushes search-style first results and blog continues, then a Get Link countdown on unlock. Skip Wait is the free Chrome extension that clears that choreography so a LiteShort countdown bypass feels like forward motion, not scavenger hunting.';

const body = `## Disclaimer, fake search hop, then Get Link

Publishers rotate the middle hop on purpose. One day the mediator looks like a news post, the next like a search page, but the goal is the same: prove you came from an allowed referrer before Get Link appears. Click the wrong result, miss a continue, or refresh mid-chain and LiteShort sends you back to Continue to Destination.

That short-mediator maze is the product. The destination is only the prize after the tour—exactly why people search liteshort continue to destination, organic redirect google bypass, and liteshort get link.

### The three screens most shares force

1. Continue to Destination disclaimer taps
2. Rotating short mediators with search / blog continue filler
3. Get Link countdown chrome on the unlock waiting page

## Cutting the tour down to what still matters

From the entry screen Skip Wait bypasses Continue to Destination and aims you at unlock. If a rotating mediator loads instead, it skips the search and article filler and returns you to the unlock waiting page with the visit context that page expects.

There, the Get Link flow runs under Skip Wait: early unlock when allowed, a single enforced wait when the server demands it, then a redirect to the next URL—without fake countdown UI or relearning the path every time mediators change.

## Mediators rotate; paste tools do not keep up

Hardcoded mediator lists die overnight. A LiteShort bypass that recognizes live short mediators inside Chrome keeps skip waiting page useful without pasting the URL into another website each week.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a LiteShort bypass skip?',
    answer:
      'The disclaimer, rotating short mediators, and Get Link busywork—so you are not stuck on intermediate pages. Skip Wait covers supported entry, mediator, and unlock screens.',
  },
  {
    question: 'Why do I keep landing on random blogs or search pages?',
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
    body,
    faq,
  },
} satisfies SupportedBypass;
