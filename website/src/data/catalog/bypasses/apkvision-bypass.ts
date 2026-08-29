import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'APKVision';

const bypassType = 'Skip Countdown';

const description =
  'APKVision bypass skips the “Your download link is almost ready” timer so Download APK shows without watching the countdown.';

const domains = ['apkvision.org'] as const;

const keywords = [
  'apkvision bypass',
  'APKVision bypass extension',
  'apkvision bypass chrome',
  'bypass apkvision',
  'skip apkvision',
  'apkvision timer bypass',
  'apkvision countdown bypass',
  'apkvision download waiting page',
  'your download link is almost ready',
  'apkvision please wait',
  'mod apk download wait',
  'apk download waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'download timer skip',
  'skip wait extension',
] as const;

const intro =
  'APKVision bypass is for the download page that shows “Your download link is almost ready” with a green countdown circle before Download APK. Skip Wait is the $1.50/month Chrome extension that skips that apkvision download waiting page so the file button is already on screen.';

const body = `## Almost ready that still makes you wait

[APKVision](https://apkvision.org/) opens a version download URL after you pick a build. The page thanks you, then parks you on **Your download link is almost ready** with a large green timer while **Download APK** stays hidden.

That apkvision countdown is the choke point. Filename, version, processor, and size are already on the page; the real file URL is already wired. A please wait bypass and download timer skip matter here because the stall is only the client countdown—not a missing link.

### What you sit through on the file page

- Ad notice asking you to close a popup and click download again
- “Your download link is almost ready” with a circling green timer
- About seven seconds before the countdown ends
- Download APK with the full filename once the timer hits zero
- Optional Telegram bot download on the same card

## Skip Wait on the APKVision download page

Skip Wait is an APKVision bypass chrome / skip wait extension path for this catalog. On a supported download page it skips the almost-ready timer so Download APK is visible immediately, with a short Skip Wait note in the site’s own attention style.

You stay on APKVision. Open the version download URL, and use Download APK without an apkvision timer bypass stare-down. That is skip apkvision waiting-page busywork and skip waiting page relief on the hop that actually stalls.

## Why the countdown feels longer than it looks

Ads before the click and the almost-ready circle stack. Leave mid-count, miss Download APK when it appears, or restart the version URL and you watch the same green timer again.

An APKVision bypass extension only removes that countdown. You still open the version you want. Download APK keeps the site label; skip countdown timer treatment applies when the almost-ready block is holding the button—bypass apkvision delay without a second helper site.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does an APKVision bypass skip?',
    answer:
      'The “Your download link is almost ready” countdown on the version download page—so Download APK is ready without the apkvision download waiting page wait.',
  },
  {
    question: 'Is this a download timer skip or a countdown bypass?',
    answer:
      'Both fit this host. The stall is a green timer circle. Skip Wait skips that apkvision countdown on supported download pages.',
  },
  {
    question: 'Will I still see “almost ready”?',
    answer:
      'On supported pages, no. Download APK shows without the timer—skip countdown timer busywork on that screen.',
  },
  {
    question: 'Does Skip Wait change the Download APK label?',
    answer:
      'No. The button keeps the site label and filename. A Skip Wait note sits above the ready block in the site’s attention style.',
  },
  {
    question: 'Do I paste the APKVision link into another website?',
    answer:
      'No. Stay on the download page and use Download APK there. Bypass countdown timer relief for this host runs in Chrome on that tab.',
  },
  {
    question: 'How much does the APKVision path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The APKVision bypass runs on supported pages.',
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
