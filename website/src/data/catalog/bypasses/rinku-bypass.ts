import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Rinku';

const bypassType = 'Skip Short Link';

const description =
  'Rinku bypass for people tired of please-wait screens: skip the countdown, clear the waiting page, and move past unlock checks on monetized ad links so the destination shows sooner.';

const domains = ['rinku.me', 'rinku.pro', '7mb.io'] as const;

const keywords = [
  'rinku bypass',
  'bypass rinku',
  'skip rinku',
  'rinku.me bypass',
  'rinku.pro bypass',
  '7mb.io bypass',
  'fly.inc bypass',
  'rinku timer bypass',
  'rinku countdown bypass',
  'rinku waiting page',
  'rinku chrome extension',
  'rinku bypass extension',
  'skip short link',
  'short link bypass',
  'ad link bypass',
  'monetized link bypass',
  'link shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'skip wait chrome extension',
  'skip wait extension',
] as const;

const intro =
  'Searching for a Rinku bypass usually means a short link parked you on a timer instead of the file or page you wanted. Skip Wait is the free Chrome extension that runs a rinku timer bypass and short link bypass in place—no paste site—so monetized ad-link waits eat less of your day.';

const body = `## Ad-gated timers on monetized short URLs

Rinku-style shorteners lean on delay: a countdown holds Continue, a waiting page resets if you leave, a captcha may appear, then another unlock hop. Ad networks get paid when you linger, so the friction is intentional—exactly why people search skip rinku, rinku countdown bypass, please wait bypass, and monetized link bypass after the third identical gate.

This is not one interstitial. It is a sequence that only releases the destination after each step cooperates.

### Pieces of the unlock tour

- Countdown timers that keep Continue disabled
- Waiting-page delays on ad-gated short links
- Unlock hops after the clock ends
- Captcha follow-ups stacked on the same gate

## Following the live unlock path

Open the short URL you already have and Skip Wait starts from that tab only. It follows the unlock path across rotating blog hops by how those pages behave—not a fixed host list—keeps human checks in view when required, and opens the destination the shortener releases.

Nothing is invented offline. Required waits still finish; client-only busywork does not. That is a full skip short link flow in one rinku chrome extension install.

Paste boxes fail when intermediate blogs rotate. A rinku bypass extension that runs on the pages you opened keeps working as the chain reshuffles—as long as the unlock pattern stays the same.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What is a Rinku bypass?',
    answer:
      'It is a way to skip please-wait and countdown gates on Rinku monetized short links. Skip Wait advances the unlock path in Chrome so you spend less time on waiting pages.',
  },
  {
    question: 'Is this a paste-a-link bypass website?',
    answer:
      'No. Skip Wait is a Chrome extension. You never paste the short URL into a third-party page—the work happens on the page you already opened.',
  },
  {
    question: 'Will a rinku timer bypass still need a captcha sometimes?',
    answer:
      'Often yes. Human checks stay with you; what disappears is watching the clock, hunting Continue, and restarting after every stall.',
  },
  {
    question: 'Does skip rinku mean the destination is guessed?',
    answer:
      'No. Skip Wait drives the real short-link unlock. The final address still comes from the shortener after those steps succeed.',
  },
  {
    question: 'Is the Rinku bypass free?',
    answer:
      'Yes. Free Chrome extension, no account, no paid tier required for the supported short link bypass.',
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
