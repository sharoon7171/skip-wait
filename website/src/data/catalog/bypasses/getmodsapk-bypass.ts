import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'GETMODSAPK';

const bypassType = 'Skip Countdown';

const description =
  'GETMODSAPK bypass skips the 5-second file-page progress bar so the Download button is ready without watching the bar fill.';

const domains = ['getmodsapk.com'] as const;

const keywords = [
  'getmodsapk bypass',
  'GETMODSAPK bypass extension',
  'getmodsapk bypass chrome',
  'bypass getmodsapk',
  'skip getmodsapk',
  'getmodsapk timer bypass',
  'getmodsapk countdown bypass',
  'getmodsapk download waiting page',
  'getmodsapk progress bar',
  'getmodsapk 5 second wait',
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
  'GETMODSAPK bypass is for the file page that thanks you for downloading, then still fills a progress track for five seconds before Download shows. Skip Wait is the $1.50/month Chrome extension that skips that getmodsapk download waiting page so the Download button is already on screen.';

const body = `## A Download button that still makes you watch a bar

[GETMODSAPK](https://getmodsapk.com/) lists several builds on the first download screen—each row is a **Download** control. That click does not start the APK. It opens a second file page with thank-you copy, a filling progress bar, and the real **Download** control hidden until the bar finishes.

That getmodsapk 5 second wait is the choke point. You already picked the build you want; the file page still runs a getmodsapk progress bar as if the link were being prepared. A getmodsapk timer bypass and download timer skip matter here because the wait is only that filling track—not a missing file.

### What you sit through after the listing click

- First screen: one Download row per build
- File page: thank-you line plus a horizontal progress track
- Five seconds of bar fill before Download appears
- Download again once the bar is gone
- A report-a-problem control that is separate from the wait

## Skip Wait on the GETMODSAPK file page

Skip Wait is a GETMODSAPK bypass chrome / skip wait extension path for this catalog. On a supported file page it skips the progress fill so Download is visible immediately, with a short Skip Wait notice in the same card as the button.

You stay on GETMODSAPK. Pick the build on the listing, land on the file page, and use Download without a getmodsapk countdown bypass stare-down. That is skip getmodsapk waiting-page busywork and skip waiting page relief on the hop that actually stalls.

## Listing choice versus file-page delay

The listing is where you choose which APK. The file page is where the please wait bypass is needed. Close the tab during the fill, miss Download when it finally appears, or start over on another build and you watch the same bar again.

A GETMODSAPK bypass extension only removes that file-page delay. You still tap the Download row you want. Multi-build posts keep every Download row; skip countdown timer treatment applies when that row opens the filling-bar page—bypass getmodsapk delay without losing which package you picked.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a GETMODSAPK bypass skip?',
    answer:
      'The five-second progress bar on the file page after you tap a Download row—so Download is ready without the getmodsapk download waiting page fill.',
  },
  {
    question: 'Is this a download timer skip or a countdown bypass?',
    answer:
      'Both names fit this host. The stall is a filling bar, not a numeric clock. Skip Wait skips that getmodsapk progress bar on supported file pages.',
  },
  {
    question: 'Do I still pick which APK to download?',
    answer:
      'Yes. Use the first download screen and the Download row for the build you want. Skip Wait only removes the bar on the file page that follows that click.',
  },
  {
    question: 'Will I still see the progress bar?',
    answer:
      'On supported file pages, no. Download is shown without the 5 second wait—skip countdown timer busywork on that screen.',
  },
  {
    question: 'Does Skip Wait change the Download button label?',
    answer:
      'No. The button keeps the site’s own label. A Skip Wait notice sits above it so you can see the GETMODSAPK bypass extension ran.',
  },
  {
    question: 'Do I paste the GETMODSAPK link into another website?',
    answer:
      'No. Stay on the file page and use Download there. Bypass countdown timer relief for this host runs in Chrome on that tab.',
  },
  {
    question: 'How much does the GETMODSAPK path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The GETMODSAPK bypass runs on supported pages.',
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
