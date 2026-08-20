import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ShrtFly';

const bypassType = 'Skip Short Link';

const description =
  '$1/month ShrtFly bypass for Chrome that skips ad-gated short-link timers, human checks, and publisher waits so you reach the destination faster.';

const domains = [
  'shrtslug.biz',
  'shrtfly.com',
  'technons.com',
  'cloudnguide.com',
  'dailyjobposting.xyz',
  'financefernly.com',
] as const;

const keywords = [
  'shrtfly bypass',
  'shrtfly bypass extension',
  'bypass shrtfly',
  'shrtslug bypass',
  'shrtslug.biz bypass',
  'skip short link',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'turnstile short link',
  'ad link shortener bypass',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'People searching for a ShrtFly bypass or shrtslug bypass usually cleared a verify hop only to land on publisher pages with Turnstile, progress bars, and another countdown. Skip Wait is the $1/month Chrome extension that runs that ad link shortener bypass on the live chain so skip waiting page busywork is not your job.';

const body = `## Verify hops into rotating publisher pages

Ad-gated ShrtFly shorteners force a verify step, then bounce you through publisher articles that pin Turnstile, show progress bars, and hold Continue until a client timer finishes. Only after that tour does a speed-token redirect open the real URL—why turnstile short link and bypass shrtfly queries spike next to generic skip countdown timer searches.

Entry slug hosts and publisher mediators are one network. Closing a publisher tab early usually voids the unlock session.

### Screens that dominate the free path

- Forced verify / human-check continue clicks
- Publisher interstitial continue loops
- Progress-bar and countdown unlock screens
- Manual next-hop form submissions after Turnstile

## Overlay, Turnstile, then the final redirect

Skip Wait shows an unlock overlay on matching short links, submits the entry verify hop the page already expects, pins Turnstile on mediator pages when a human check is required, respects only server-enforced unlock timers, follows speed-token redirects, and opens the final link.

You still complete Turnstile once when shown. What disappears is hunting Continue through ads and replaying progress bars by hand. That is a shrtfly bypass extension install that tracks behavior—not last week’s publisher hostname.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What is a ShrtFly bypass?',
    answer:
      'It is a way to skip ad-gated waits on ShrtFly short links. Skip Wait automates the unlock chain in Chrome so you spend less time on verify and timer pages.',
  },
  {
    question: 'Does this cover Shrtslug entry links too?',
    answer:
      'Yes. Entry slug hosts use the same unlock network. The bypass handles that hop and the publisher mediator pages that follow.',
  },
  {
    question: 'Do I still need to complete Turnstile?',
    answer:
      'Only when a mediator page requires it. Skip Wait pins the widget; after you finish the check, the flow continues without more Continue hunting.',
  },
  {
    question: 'Are progress bars skipped instantly?',
    answer:
      'Client busywork and continue loops go away. Timers the network still enforces server-side are waited honestly before redirect.',
  },
  {
    question: 'How much does the ShrtFly bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
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
