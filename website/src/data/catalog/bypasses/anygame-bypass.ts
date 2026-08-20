import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'AnyGame';

const bypassType = 'Direct Download';

const description =
  'AnyGame bypass that skips MOD APK download countdowns and unlocks direct file links when you click Fast Download or Torrent on the release page.';

const domains = ['anygame.net'] as const;

const keywords = [
  'anygame bypass',
  'AnyGame bypass extension',
  'anygame bypass chrome',
  'bypass anygame',
  'skip anygame',
  'anygame timer bypass',
  'anygame fast download bypass',
  'anygame torrent bypass',
  'mod apk download bypass',
  'mod apk countdown skip',
  'direct download',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'Looking for an AnyGame bypass or MOD APK download bypass usually means Fast Download and Torrent still hide behind a countdown. Skip Wait is the $1/month Chrome extension that unlocks those direct file links when you click—without sitting on the generating timer.';

const body = `## Fast Download and Torrent behind a countdown

AnyGame release pages often put a download wait in front of MOD APK and related installs. You press Fast Download or Torrent, then watch a timer before the real file path appears. That pattern drives anygame timer bypass, mod apk countdown skip, and skip countdown timer searches from people who already know which button they want.

### What blocks the file

- Countdown timers before MOD APK unlocks
- Generating screens after Fast Download clicks
- Intermediary redirects before the host
- Extra waits on torrent-style buttons

## Unlocking MOD APK paths on click

Skip Wait’s AnyGame support fetches the direct link in the background when you use the same buttons already on the page. Instead of sitting on a generating screen, you start the file path as soon as the host allows it. One AnyGame bypass extension install covers Fast Download and Torrent flows—no paste box required.

Cosmetic countdown theater gets skipped; if a host still needs a short real hold, Skip Wait finishes that honestly, then continues.

## Choosing torrent vs file hop

Whether you want a quick file hop or a torrent pick, the friction is the same: a timer between intent and download. A direct download bypass that resolves both control types keeps your workflow consistent—click once, let Skip Wait clear the wait, take the destination.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which AnyGame download buttons work with Skip Wait?',
    answer:
      'Fast Download and Torrent are supported. Skip Wait unlocks direct file links and skips the MOD APK download countdown that normally blocks them.',
  },
  {
    question: 'What timer does the AnyGame bypass skip?',
    answer:
      'The countdown that appears before MOD APK and related downloads unlock. The extension fetches the direct link when the host allows it.',
  },
  {
    question: 'Can I get a direct file link without waiting?',
    answer:
      'Yes for supported buttons. Skip Wait resolves the real download URL in the background so you skip the generating screen and start the file path right away.',
  },
  {
    question: 'Do torrent picks work the same way?',
    answer:
      'Yes. Supported torrent controls follow the same unlock path—click once and let Skip Wait clear the intermediary wait.',
  },
  {
    question: 'How much does the AnyGame path cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The AnyGame bypass runs on supported pages.',
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
