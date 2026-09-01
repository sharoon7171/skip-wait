import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'WP Safelink';

const bypassType = 'Skip Safelink Wait';

const description =
  'WP Safelink bypass for Themeson countdown pages: Skip Wait clears skip safelink wait, generate-link, and please-wait busywork so the destination opens on a real hop.';

const domains = [
  'stbemuiptvcodes.com',
  'techedubyte.com',
  'demo-safelink.themeson.com',
  'dev-safelink.themeson.com',
] as const;

const keywords = [
  'wp safelink bypass',
  'wp safelink bypass extension',
  'wp safelink timer bypass',
  'wp safelink countdown bypass',
  'wordpress safelink bypass',
  'themeson safelink bypass',
  'safelink generate link',
  'skip safelink wait',
  'safelink waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'link shortener bypass',
  'skip wait extension',
  'safelink bypass',
] as const;

const intro =
  'A WP Safelink bypass matters when a wrapped download opens a countdown card, ads, and a generate-link sequence instead of the file. Skip Wait is the Chrome extension that runs skip safelink wait on that hop so a wordpress safelink bypass is not fifteen seconds of please wait plus another generate click.';

const body = `## Countdown, generate link, then get link

WP Safelink (Themeson) sits between the click and the file. The share looks like a normal post or a dedicated wait page. What you actually hit is a skip countdown timer, then safelink generate link, then a short please wait, then Get Link. Leave mid-timer and the same safelink waiting page starts over.

That plugin flow—not a random shortener—is the WP Safelink timer bypass problem: the destination is already tied to the hop; the ads and generate routine are the stall.

### What the wait page actually demands

- Skip countdown timer chrome before Generate Link enables
- Safelink generate link, then another please-wait step
- Get Link only after that chain, often under ads
- A full blog layout on some skins that still hides the same wait at the bottom

## Opening the destination on a real hop

Skip Wait’s WP Safelink bypass extension runs in Chrome on the listed hosts. On a wrapped safelink URL, or on the actual countdown / generate page, it resolves the destination and leaves skip safelink wait behind. You stay in the tab you opened. No paste decoder, no hand-submitting generate.

Client theater (countdown, generate, please wait) gets out of the way. Required checks still finish honestly. A normal article that only *lists* wrapped links is not that hop—Skip Wait does not yank you off the post you meant to read.

## Skins change; the wait does not

Demo templates and publisher themes rotate. A WP Safelink countdown bypass that keys off the wait page and the wrapped link stays useful across the supported set instead of a userscript per skin. New hosts are covered when they join that list—same as using Skip Wait on the live page rather than a third-party paste box.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a WP Safelink bypass skip?',
    answer:
      'Skip safelink wait on the real hop: skip countdown timer, safelink generate link, and please-wait busywork. Skip Wait then opens the destination already tied to that page or wrapped URL.',
  },
  {
    question: 'Will it leave a normal blog post on a WP Safelink site?',
    answer:
      'No. A wordpress safelink bypass here is the countdown / generate waiting page or a wrapped safelink URL—not every article that happens to mention downloads.',
  },
  {
    question: 'Do I still click Generate Link myself?',
    answer:
      'On supported hops, no. Skip Wait clears generate-link and please wait bypass steps so you are not running that routine by hand.',
  },
  {
    question: 'Is this every WordPress safelink plugin?',
    answer:
      'No. This entry is WP Safelink / Themeson-style hosts listed here. Other safelink families use different continue hops.',
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
