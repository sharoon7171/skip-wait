import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'BBLINK';

const bypassType = 'Skip Waiting Page';

const description =
  'BBLINK bypass clears Step 1/5 Click here to continue waits and the final Get Link countdown so Skip Wait opens the destination when unlock is allowed.';

const domains = ['web.bbmkts.com'] as const;

const keywords = [
  'bblink bypass',
  'bblink timer bypass',
  'bblink countdown bypass',
  'bblink waiting page',
  'bbmkts bypass',
  'click here to continue bypass',
  'step 1/5 bypass',
  'get link bypass',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
] as const;

const intro =
  'BBLINK short aliases open a Step 1/5 card with a Seconds timer and a locked Click here to continue button. Skip Wait is the $1.50/month Chrome extension that clears those continue steps and the later Get Link wait on supported pages.';

const body = `## Five continue cards before Get Link

[BBLINK](https://web.bbmkts.com/) shares on this host do not unlock in one tap. You climb Step 1/5 through Step 5/5, each with its own Seconds countdown and Click here to continue control. After the last continue, a Get Link style unlock still holds for a short server timer before the destination is released.

Reload mid-chain and the step counter starts over. That stacked continue path is the BBLINK waiting-page tax—not a single cosmetic ring.

### What the alias puts in front of you

- Step N/5 indicators on each continue card
- Seconds countdown before Click here to continue enables
- Locked continue buttons between steps
- A final Get Link / unlock countdown after the last continue

## Finishing the alias without babysitting each step

Skip Wait runs on the BBLINK alias you already opened. It advances the continue forms the page already posts, skips client-only delay theater on those cards, honors the short unlock hold when the server still requires it, then opens the destination Get Link would have returned.

You stay on the tab through the chain. No paste tool—just the BBLINK path at $1.50/month after license activation.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does BBLINK bypass clear?',
    answer:
      'The Step 1/5 through Step 5/5 Click here to continue cards and the final Get Link countdown busywork on supported aliases.',
  },
  {
    question: 'Do I still tap Click here to continue on every step?',
    answer:
      'No on supported pages. Skip Wait advances those continue posts for you and continues into the unlock step.',
  },
  {
    question: 'Is the last Get Link wait removed instantly?',
    answer:
      'Client chrome is skipped. When BBLINK still enforces a short unlock hold, Skip Wait waits that once, then opens the destination.',
  },
  {
    question: 'How much does BBLINK support cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. BBLINK runs on supported aliases.',
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
