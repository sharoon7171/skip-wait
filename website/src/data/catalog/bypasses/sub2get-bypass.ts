import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Sub2Get';

const bypassType = 'Skip Waiting Page';

const description =
  'Sub2Get bypass skips the subscribe-to-unlock waiting page on this monetized shortener and continues to the destination without babysitting Continue.';

const domains = ['sub2get.com'] as const;

const keywords = [
  'sub2get bypass',
  'Sub2Get bypass extension',
  'sub2get timer bypass',
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
  'A Sub2Get bypass search usually means a monetized short URL parked you on a subscribe-to-unlock waiting page instead of the file. Skip Wait is the $1/month Chrome extension that clears that please wait bypass and skip click to continue loop so the destination opens without finishing every social prompt by hand.';

const body = `## Subscribe prompts that never open the file

Sub2Get shares present as a short link but resolve to a waiting page that pushes subscribe or continue steps before redirect. You sit through please-wait chrome, hunt Continue under overlays, or bounce when the gate stalls—then the same unlock screen returns. That pattern drives sub2get timer bypass, waiting page bypass, and link shortener bypass searches when you only wanted the destination.

Unlike multi-slot creator lockers, this flow is a single shortener gate: delay UI first, destination second.

### Gate behaviors that eat the click

- Subscribe-to-unlock waiting pages
- Please-wait and click-to-continue screens
- Gate pages before the destination URL
- Manual continue loops after a stalled unlock

## Leaving the gate on the live short URL

When the waiting page loads, Skip Wait runs in the background, skips the delay layer the shortener already uses, and sends you to the target URL supported for Sub2Get.

No paste box—just a Sub2Get bypass extension that treats the unlock wait as automation. Client busywork disappears; any hold the shortener still enforces finishes honestly.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Sub2Get bypass skip?',
    answer:
      'It skips the subscribe-to-unlock waiting page and continue busywork on supported Sub2Get short links so the destination opens without manual gate sitting.',
  },
  {
    question: 'Is this the same as Sub2Unlock social lockers?',
    answer:
      'No. Sub2Get support targets a monetized shortener waiting page. Creator social-block lockers are separate catalog entries.',
  },
  {
    question: 'Do I still click Continue by hand?',
    answer:
      'On supported hops, no. Skip Wait completes the continue flow so ads do not hide the control.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'Client delay theater goes away. If unlock still needs a real hold, Skip Wait stays until allowed, then continues.',
  },
  {
    question: 'How much does the Sub2Get bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The Sub2Get path runs on supported pages.',
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
