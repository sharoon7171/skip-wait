import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Mitly';

const bypassType = 'Skip Countdown';

const description =
  'Mitly bypass for gate waits, captcha-style screens, and get-link countdowns: Skip Wait advances the shortener unlock so the destination opens without restarting Continue by hand.';

const domains = ['mitly.us'] as const;

const keywords = [
  'mitly bypass',
  'Mitly bypass extension',
  'mitly timer bypass',
  'skip countdown',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'countdown timer bypass',
  'skip timer unlock',
] as const;

const intro =
  'A Mitly bypass or skip timer unlock search usually means a short URL dumped you into a gate wait and countdown instead of the file. Skip Wait is the $1/month Chrome extension that clears those unlock layers on the live shortener page.';

const body = `## Short links that open as gates first

Mitly shares behave like classic ad shorteners: gate wait, sometimes a captcha-style check, then a countdown before Get Link or Continue works. The destination is already decided; the page just refuses to release it until the UI cooperates. Close early or fail the check and you replay the same shortener flow—why mitly timer bypass, link shortener bypass, and skip waiting page spike together.

### Gate → check → countdown

The free path most visitors see is sequential. First a holding screen. Then a human-shaped check when the shortener wants one. Only after that does the unlock clock run and the continue control enable. Each stage can reset independently if the tab loses focus or an overlay eats the click.

## Advancing unlock on the live page

Skip Wait’s Mitly support runs inside Chrome on the short link you opened. It covers client-only unlock timers and continue busywork so get-link is no longer a fake wait wall. When a real delay or check remains, the extension stays until the page allows progress, then opens the destination.

Paste boxes break when gate layouts rotate. A Mitly bypass extension that keys off unlock behavior keeps working without re-copying the URL into another site each week—the durable version of skip countdown and countdown timer bypass for this host.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Mitly bypass skip?',
    answer:
      'Gate waits, client countdowns, and hunting Get Link through ads after the shortener is ready. Required checks still complete before the destination opens.',
  },
  {
    question: 'Is every timer removed instantly?',
    answer:
      'No. Client-only delays go away. When unlock still needs a real wait, Skip Wait stays on that step—so the mitly timer bypass stays stable.',
  },
  {
    question: 'Do I still press Get Link myself?',
    answer:
      'On supported flows the extension advances unlock, so you are not hunting the button after every countdown.',
  },
  {
    question: 'What if the gate UI changes?',
    answer:
      'If the unlock pattern is the same, Skip Wait follows the live page. You do not need a third-party paste tool for a layout tweak.',
  },
  {
    question: 'How much does the Mitly bypass cost?',
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
