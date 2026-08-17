import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'AnkerGames';

const bypassType = 'Skip Waiting Page';

const description =
  'AnkerGames bypass that clears the Opening Treasure Box initializing countdown so download buttons unlock as soon as the quick check is solved—no timer babysitting.';

const domains = ['ankergames.net'] as const;

const keywords = [
  'ankergames bypass',
  'AnkerGames bypass extension',
  'ankergames bypass chrome',
  'bypass ankergames',
  'skip ankergames',
  'ankergames timer bypass',
  'ankergames treasure box skip',
  'opening treasure box bypass',
  'ankergames waiting page',
  'ankergames download timer',
  'treasure box download bypass',
  'initializing download skip',
  'skip waiting page',
  'waiting page bypass',
  'please wait bypass',
  'download timer skip',
  'skip countdown timer',
  'bypass countdown timer',
  'file host bypass',
  'skip wait extension',
] as const;

const intro =
  'AnkerGames free downloads open a treasure-box waiting page with an initializing countdown before the real download controls appear. Skip Wait is the free Chrome extension that clears that Opening Treasure Box delay so you are not stuck watching progress fill while the quick check finishes.';

const body = `## Opening Treasure Box before the file

Clicking Download on an AnkerGames game page does not hand you the file right away. The site sends you to an Opening Treasure Box waiting page—progress chrome, pirate phrases, and an initializing download countdown—before the download buttons are ready. Multi-part games repeat that same ankergames download timer ritual for every chunk.

The page is built to keep you on the waiting hop. You still need the site’s own quick check when it appears; the busywork is the countdown theater layered on top.

### What the waiting page inserts

- Initializing Download progress before controls unlock
- Treasure-box countdown chrome and animated status lines
- Holds that keep download buttons hidden until the timer finishes
- Extra waits stacked on top of the human check

## Clearing the timer inside Chrome

Skip Wait runs on the AnkerGames waiting page you already opened from Download. It removes the initializing countdown so the page sits in its ready state without the progress theater. A short on-page note confirms the wait timer is gone. When the quick check is solved, the site’s own download buttons unlock—you press them yourself; the extension does not auto-start the file.

That is an ankergames timer bypass and treasure box skip in one step: the official Download path stays intact, and only the waiting-page delay is stripped. No paste tool and no hunting a hidden CDN link behind the animation.

## What still needs a real click

The quick check on the treasure-box page is still the site’s gate. Skip Wait does not pretend that check away. It only clears the countdown delay so you are not babysitting initializing download progress after the check is already done—or while it is still running. Finish the check, use the unlocked buttons, and move on to the next part the same way.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What delay does an AnkerGames bypass remove?',
    answer:
      'It clears the Opening Treasure Box initializing countdown on the download waiting page so controls are not locked behind progress theater.',
  },
  {
    question: 'Do I still use the site’s Download button on the game page?',
    answer:
      'Yes. Open Download as usual. AnkerGames takes you to the treasure-box waiting page; Skip Wait runs there and removes the timer hold.',
  },
  {
    question: 'Does Skip Wait start the file automatically?',
    answer:
      'No. When the quick check is solved, the page’s own download buttons unlock. You choose when to click—there is no forced auto-download.',
  },
  {
    question: 'Do I still complete the quick check?',
    answer:
      'Yes when the waiting page shows it. Skip Wait removes the countdown delay; the check remains the site’s unlock step for the buttons.',
  },
  {
    question: 'Is the AnkerGames path free?',
    answer:
      'Yes. Skip Wait is free. The AnkerGames bypass runs on supported pages with no account or paid plan.',
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
