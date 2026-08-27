import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'MODDED-1';

const bypassType = 'Skip Countdown';

const description =
  'MODDED-1 bypass skips the 4-second Loading… progress bar so Download shows without waiting.';

const domains = ['modded-1.com'] as const;

const keywords = [
  'modded-1 bypass',
  'MODDED-1 bypass extension',
  'modded-1 bypass chrome',
  'bypass modded-1',
  'skip modded-1',
  'modded-1 timer bypass',
  'modded-1 countdown bypass',
  'modded-1 download waiting page',
  'modded-1 progress bar',
  'modded-1 4 second wait',
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
  'MODDED-1 bypass is for the download page that shows a Loading… progress bar for four seconds before Download appears. Skip Wait is the $1/month Chrome extension that skips that modded-1 download waiting page so the Download button is already on screen.';

const body = `## A Download button that still makes you watch Loading…

[MODDED-1](https://modded-1.com/) opens a version download URL after you pick a build. That page shows a **Loading…** progress bar while **Download** stays hidden for four seconds.

That modded-1 4 second wait is the choke point. The download URL is already on the button; the stall is only a client \`setTimeout\`. A please wait bypass and download timer skip matter here because nothing is still being fetched—the loading bar is theater.

### What you sit through on the file page

- Loading… progress bar across the download slot
- About four seconds before the bar clears
- Download once the timer ends
- A Note box about Play Protect and install tips

## Skip Wait on the MODDED-1 download page

Skip Wait is a MODDED-1 bypass chrome / skip wait extension path for this catalog. On a supported download page it skips the loading timeout so Download is visible immediately, with a short Skip Wait notice in the site’s own Note box style.

You stay on MODDED-1. Open the download URL, and use Download without a modded-1 timer bypass stare-down. That is skip modded-1 waiting-page busywork and skip waiting page relief on the hop that actually stalls.

## Listing choice versus file-page delay

The listing is where you choose which APK. The \`/download/N\` page is where the please wait bypass is needed. Leave mid-load, miss Download when it appears, or reopen the download URL and you watch the same Loading… bar again.

A MODDED-1 bypass extension only removes that file-page delay. You still open the build you want and use Download on that page—bypass modded-1 delay without a paste tool.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a MODDED-1 bypass skip?',
    answer:
      'The four-second Loading… progress bar on the download page—so Download is ready without the modded-1 download waiting page wait.',
  },
  {
    question: 'Is this a download timer skip or a countdown bypass?',
    answer:
      'Both names fit this host. The stall is a loading bar driven by a four-second timer. Skip Wait skips that modded-1 progress bar on supported file pages.',
  },
  {
    question: 'Will I still see Loading…?',
    answer:
      'On supported pages, no. Download shows without the bar—skip countdown timer busywork on that screen.',
  },
  {
    question: 'Do I paste the MODDED-1 link into another website?',
    answer:
      'No. Stay on the download page and use Download there. Bypass countdown timer relief for this host runs in Chrome on that tab.',
  },
  {
    question: 'How much does the MODDED-1 path cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The MODDED-1 bypass runs on supported pages.',
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
