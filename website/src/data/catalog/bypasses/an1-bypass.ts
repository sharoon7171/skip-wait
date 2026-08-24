import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'AN1';

const bypassType = 'Direct Download';

const description =
  'AN1 bypass and download timer skip on the APK download waiting page—Skip Wait reveals the green Download button instantly with Skip Wait branding, no countdown.';

const domains = ['an1.com'] as const;

const keywords = [
  'an1 bypass',
  'AN1 bypass extension',
  'an1 timer bypass',
  'an1 countdown bypass',
  'an1 download waiting page',
  'an1 please wait',
  'an1 apk download',
  'apk download waiting page',
  'download timer skip',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'direct download',
  'direct download bypass',
  'skip wait extension',
  'file host bypass',
] as const;

const intro =
  'AN1 bypass clears the green circle countdown on the APK download waiting page so the file button appears at once. Skip Wait is the $1/month Chrome extension that turns that an1 please wait screen into an instant Download · Skip Wait control.';

const body = `## Download waiting page that still forces a countdown

[AN1](https://an1.com/) game and app posts send **Download** to a dedicated download waiting page. A large green timer counts down before the real APK button appears, even though the package link is already on the page. That an1 countdown bypass and download timer skip pain is the freemium stall between the listing and the archive.

You already chose Whiteout Survival or any other title. The next screen still hides the green Download control until the circle finishes—classic apk download waiting page and please wait bypass territory.

### Stages on the way to the file

- Game or app listing with Download
- Download waiting page with the green circle timer
- Hidden Download button until the countdown ends
- Extra store pitches and overlays while you wait
- Finally the APK transfer after the timer clears

## What an AN1 bypass extension clears

Skip Wait is an AN1 bypass extension / skip wait extension path for this catalog. On supported download waiting pages it:

- Hides the green countdown circle immediately
- Reveals the Download button with Skip Wait branding
- Keeps the same AN1 green button style so the page still looks native
- Leaves the direct APK href ready—no paste tool and no second helper

You stay on AN1. The an1 timer bypass targets the waiting-page countdown only; listing pages still open that page, then Skip Wait makes the download available without the wait.

## Countdown skip and direct download

Some visits land straight on the download waiting page after the first click. Close the tab early, miss the reveal, or fight an overlay and you restart the same stall.

A file host bypass for AN1 covers that surface: skip countdown timer treatment shows Download · Skip Wait at once so the APK starts when you tap—direct download bypass without sitting through the circle.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does an AN1 bypass skip?',
    answer:
      'The green countdown on the APK download waiting page, so Download appears immediately on supported pages.',
  },
  {
    question: 'Is this a download timer skip or direct download bypass?',
    answer:
      'Both on supported waiting pages. Skip Wait reveals the branded Download button and the APK link is ready without the countdown.',
  },
  {
    question: 'Do I still click Download myself?',
    answer:
      'Yes. Skip Wait reveals the button instantly; you choose when to start the transfer.',
  },
  {
    question: 'Do I need a paste tool for the APK link?',
    answer: 'No. The extension unlocks the download control on the page you already opened.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer: 'Skip Wait is $1 per month. Activate a license in the popup.',
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
