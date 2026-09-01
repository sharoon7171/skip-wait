import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ModsManiac';

const bypassType = 'Skip Countdown';

const description =
  'ModsManiac bypass skips the ~15-second “Your link is almost ready” countdown so Download shows without waiting.';

const domains = ['modsmaniac.com'] as const;

const keywords = [
  'modsmaniac bypass',
  'ModsManiac bypass extension',
  'modsmaniac bypass chrome',
  'bypass modsmaniac',
  'skip modsmaniac',
  'modsmaniac timer bypass',
  'modsmaniac countdown bypass',
  'modsmaniac download waiting page',
  'modsmaniac progress bar',
  'modsmaniac 15 second wait',
  'your link is almost ready',
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
  'ModsManiac bypass is for the /file/ download page that hides Download behind a progress bar and a “Your link is almost ready” countdown for about fifteen seconds. Skip Wait is the Chrome extension that skips that ModsManiac download waiting page so Download is already on screen.';

const body = `## A Download button that still makes you wait

[ModsManiac](https://modsmaniac.com/) opens a \`/file/\` URL with the APK already in the query string. That page swaps Download out for a progress bar and a countdown that ticks every 900ms for about fifteen seconds before the button returns.

That ModsManiac countdown is the choke point. The APK URL is already on the page; the stall is only a client \`setInterval\`. A please wait bypass and download timer skip matter here because nothing is still being fetched—the wait copy is theater.

### What you sit through on the file page

- Progress bar under the download slot
- “Your link is almost ready, please wait…” counting down
- About fifteen seconds before the bar clears
- Download once the timer ends

## Skip Wait on the ModsManiac file page

Skip Wait is a ModsManiac bypass chrome / skip wait extension path for this catalog. On a supported file page it skips the countdown so Download is visible immediately, with a short Skip Wait notice in the site’s own muted text style.

You stay on ModsManiac. Open the file URL, and use Download without a ModsManiac timer bypass stare-down. That is skip modsmaniac waiting-page busywork and skip waiting page relief on the hop that actually stalls.

## Listing choice versus file-page delay

The listing is where you choose which APK. The \`/file/\` page is where the please wait bypass is needed. Leave mid-countdown, miss Download when it appears, or reopen the file URL and you watch the same progress bar again.

A ModsManiac bypass extension only removes that file-page delay. You still open the build you want and use Download on that page—bypass modsmaniac delay without a paste tool.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a ModsManiac bypass skip?',
    answer:
      'The ~15-second “Your link is almost ready” countdown and progress bar on the file page—so Download is ready without the ModsManiac download waiting page wait.',
  },
  {
    question: 'Is this a download timer skip or a countdown bypass?',
    answer:
      'Both names fit this host. The stall is a progress bar driven by a setInterval countdown. Skip Wait skips that ModsManiac wait on supported file pages.',
  },
  {
    question: 'Will I still see the countdown?',
    answer:
      'On supported pages, no. Download shows without the bar—skip countdown timer busywork on that screen.',
  },
  {
    question: 'Do I paste the ModsManiac link into another website?',
    answer:
      'No. Stay on the file page and use Download there. Bypass countdown timer relief for this host runs in Chrome on that tab.',
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
