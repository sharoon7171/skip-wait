import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Ouo';

const bypassType = 'Skip Countdown';

const description =
  'Ouo bypass for get-link countdown timers and continue waits on ad shorteners: Skip Wait advances unlock so the destination opens without watching the clock on every share.';

const domains = ['ouo.io', 'ouo.press'] as const;

const keywords = [
  'ouo bypass',
  'ouo.io bypass',
  'bypass ouo',
  'skip ouo',
  'ouo skip',
  'ouo.press bypass',
  'ouo timer bypass',
  'ouo get link bypass',
  'ouo chrome extension',
] as const;

const intro =
  'People searching ouo bypass, skip ouo, or ouo get link bypass usually landed on a get-link countdown instead of the file. Skip Wait is the $1/month Chrome extension that clears those continue waits on matching Ouo shortener pages.';

const body = `## Ad shorteners that monetize the unlock clock

Ouo shares are classic get-link walls: open the short URL, sit through a countdown, hunt Continue, then finally leave for the destination. Mistime the button or fight an overlay and the same unlock restarts—why ouo timer bypass and ouo skip queries stay common next to generic ad-link frustration.

Both public Ouo fronts in this catalog share that countdown-and-continue shape even when the hostname differs.

### Get Link as the choke point

The destination is decided before you arrive. The page’s job is to delay Get Link until the timer and continue UI cooperate. Skip Wait covers that unlock chrome inside Chrome so bypass ouo means less babysitting, not inventing a fake redirect.

When a step still needs a real hold, the extension stays until unlock is allowed, then continues—stable ouo get link bypass instead of a brittle zero-second cheat.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which Ouo fronts does Skip Wait cover?',
    answer:
      'The Ouo shortener hosts listed on this page. Get-link countdowns and continue waits are handled the same way on each supported front.',
  },
  {
    question: 'What get-link countdown is skipped?',
    answer:
      'The unlock timer and continue delay screens that block the destination on Ouo ad links. Skip Wait advances when the page allows.',
  },
  {
    question: 'Do continue button waits still need a click?',
    answer:
      'On supported flows the extension advances unlock for you so you are not hunting Continue after every countdown.',
  },
  {
    question: 'Is every second removed instantly?',
    answer:
      'Client busywork goes away. Required holds still finish—so the ouo timer bypass stays reliable.',
  },
  {
    question: 'How much does Skip Wait cost?',
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
