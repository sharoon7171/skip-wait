import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Sub2Unlock';

const bypassType = 'Skip Waiting Page';

const description =
  'Sub2Unlock bypass skips YouTube subscribe, bell, like, comment, and share blocks plus Instagram, Facebook, and Twitter creator steps so the embedded destination opens without finishing every social action.';

const domains = ['sub2unlock.com'] as const;

const keywords = [
  'sub2unlock bypass',
  'Sub2Unlock bypass extension',
  'sub2unlock.com bypass',
  'sub2unlock timer bypass',
  'sub2unlock social unlock',
  'sub2unlock youtube instagram facebook twitter',
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
  'People searching for a Sub2Unlock bypass or sub2unlock social unlock usually hit a page where YouTube subscribe, hit bell, like, comment, and share must turn green before Instagram, Facebook, or Twitter steps unlock the link. Skip Wait is the $1.50/month Chrome extension that reads the destination already on the page so skip waiting page busywork is not a full social checklist.';

const body = `## YouTube-first lockers that greenlight one block at a time

A typical Sub2Unlock share is a creator locker, not a shortener timer. Fans are told to subscribe, hit the bell, like the video, leave a comment, or share—then often follow on Instagram, Facebook, or Twitter—before the unlock control turns usable. Miss one block or fight overlays and the whole sub2unlock timer bypass hunt restarts.

The destination is commonly already embedded in the page’s unlock data. The product is forcing every social proof step before redirect.

### Creator actions this flow usually stacks

- YouTube subscribe, sub and hit bell, sub and like
- Video like, comment, and share requirements
- Instagram, Facebook, and Twitter follow or like blocks
- Client-only gating that waits for every block to clear

## Reading the embedded destination in Chrome

When the unlock page embeds the destination in its unlock data, Skip Wait reads it and redirects without completing each social block by hand.

That is a Sub2Unlock bypass extension for social unlock pages—not a multi-slot password locker and not a paste decoder. Client gating disappears; you open the same share URL you already received. If your link uses the Unlock Link button pattern on the .
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which unlock actions does Skip Wait cover on Sub2Unlock?',
    answer:
      'YouTube subscribe, sub and hit bell, sub and like, like, comment, and share; Instagram, Facebook, and Twitter blocks; and other creator media steps on supported unlock pages.',
  },
  {
    question: 'Does Skip Wait invent the destination?',
    answer:
      'No. When the page embeds the destination in unlock data, the extension reads that value and redirects. The URL still comes from the locker page.',
  },
  {
    question: 'Is this the same as Sub4Unlock multi-slot checklists?',
    answer:
      'No. This entry targets Sub2Unlock social-block lockers. Multi-slot subscribe/follow/password flows are separate catalog pages.',
  },
  {
    question: 'Do I still need a YouTube account?',
    answer:
      'Not for Skip Wait’s redirect path on supported pages. The extension does not require you to complete each subscribe or like step when the destination is already on the page.',
  },
  {
    question: 'How much does the Sub2Unlock bypass cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The Sub2Unlock path runs on supported pages.',
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
