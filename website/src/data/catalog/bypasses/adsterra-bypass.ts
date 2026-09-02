import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Adsterra';

const bypassType = 'Skip Waiting Page';

const description =
  'Adsterra bypass clears Secure Checkpoint COMPLETE STEP waits so Skip Wait reaches READY and shows the reward key you copy—not a download link.';

const domains = ['ffgamingkey.gamer.gd', 'ffgaminglink.gt.tc'] as const;

const keywords = [
  'adsterra bypass',
  'adsterra checkpoint bypass',
  'secure checkpoint bypass',
  'complete step bypass',
  'adsterra timer bypass',
  'adsterra countdown bypass',
  'checkpoint reward key',
  'copy checkpoint key',
  'continue to next page skip',
  'verify loading skip',
  'adsterra waiting page',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip wait extension',
  'please wait bypass',
] as const;

const intro =
  'Secure Checkpoint pages backed by Adsterra ads stall you on COMPLETE STEP and CONTINUE TO NEXT PAGE before Status turns READY. Skip Wait is the $1.50/month Chrome extension that clears those waits so the reward key appears for you to copy and paste into the game.';

const body = `## Checkpoint ends on a key, not a file URL

A gated FF Gaming-style unlock opens Checkpoint with Progress, Session Token, and WAITING. The site wants COMPLETE STEP hops, Verify bars, and an 11-second CONTINUE clock. When the session finishes, Status becomes READY and a key box shows a string like a product code—not a Direct Download button.

People often hunt for a destination link after Done. On this flow there is none: the checkpoint reward key in that box is the unlock. Copy it, then paste where the game or mod asks for a key.

### What the waiting tour looks like

- Checkpoint card with Current Step / Total Steps and WAITING
- COMPLETE STEP buttons that open Adsterra-heavy step tabs
- CONTINUE TO NEXT PAGE locked behind a circle countdown
- Fake Verify loading before SCROLL DOWN
- READY state with the key box plus COPY KEY on the page

## Finishing without babysitting every hop

Skip Wait advances supported Checkpoint steps in Chrome until Status is READY. The overlay surfaces the reward key and can copy it for you so you are not stuck wondering where the download went.

Client countdown chrome drops away; you still end on the same Secure Checkpoint session with a key to paste.

## Labels stay even when ads change

Creatives rotate, but the UI keeps saying Checkpoint, COMPLETE STEP, and Secure Checkpoint System. An Adsterra checkpoint bypass keyed to READY + the key box stays useful when the ad wall changes and the prize is still a copyable code.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What do I get when Skip Wait finishes an Adsterra Secure Checkpoint?',
    answer:
      'A reward key in the key box when Status is READY. Copy that string and paste it where the game asks—there is no separate download destination on this flow.',
  },
  {
    question: 'Is the gray key a download link?',
    answer:
      'No. It is the checkpoint reward key (the unlock code). The token in the page URL is only the session id, not the key you paste.',
  },
  {
    question: 'What does an Adsterra bypass clear before the key appears?',
    answer:
      'COMPLETE STEP waiting pages, Verify busywork, and CONTINUE countdown chrome so you reach READY without manual smart-link tabs.',
  },
  {
    question: 'Do I still see Progress update?',
    answer:
      'Yes. Steps still complete on the Checkpoint session. Progress moves until Status is READY and the key box is shown.',
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
