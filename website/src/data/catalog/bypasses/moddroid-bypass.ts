import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Moddroid';

const bypassType = 'Skip Countdown';

const description =
  'Moddroid bypass skips the “Préparation du téléchargement…” 5-second prepare bar so Download shows without watching the orange progress fill.';

const domains = ['moddroid.com'] as const;

const keywords = [
  'moddroid bypass',
  'Moddroid bypass extension',
  'moddroid bypass chrome',
  'bypass moddroid',
  'skip moddroid',
  'moddroid timer bypass',
  'moddroid countdown bypass',
  'moddroid download waiting page',
  'moddroid progress bar',
  'moddroid 5 second wait',
  'preparation du telechargement',
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
  'Moddroid bypass is for the file download page that shows Préparation du téléchargement… with an orange progress bar for five seconds before Download appears. Skip Wait is the $1.50/month Chrome extension that skips that moddroid download waiting page so the APK button is already on screen.';

const body = `## Preparing a link that is already there

[Moddroid](https://moddroid.com/) lists the app on a detail page, then opens a file download URL with a token path. That page shows **Préparation du téléchargement, veuillez patienter quelques secondes……** and an orange fill bar while **Download** stays hidden for five seconds.

That moddroid 5 second wait is the choke point. The APK URL is already on the Download control; the stall is only a client \`setTimeout\` plus a CSS progress animation. A please wait bypass and download timer skip matter here because nothing is still being fetched—the prepare copy is theater.

### What you sit through on the file page

- Préparation du téléchargement… with an orange progress track
- About five seconds before the bar finishes
- Download (and on mobile, Download Moddroid APP) once the timer clears
- A yellow notice that an ad may appear before the file starts

## Skip Wait on the Moddroid download page

Skip Wait is a Moddroid bypass chrome / skip wait extension path for this catalog. On a supported download page it skips the prepare timeout so Download is visible immediately, with a short Skip Wait notice in the site’s own ad-notice style.

You stay on Moddroid (including language hosts like fr.moddroid.com). Open the token download URL, and use Download without a moddroid timer bypass stare-down. That is skip moddroid waiting-page busywork and skip waiting page relief on the hop that actually stalls.

## Detail page versus file-page delay

The detail page is where you choose to download. The token file page is where the please wait bypass is needed. Leave mid-fill, miss Download when it appears, or reopen the token URL and you watch the same prepare bar again.

A Moddroid bypass extension only removes that file-page delay. You still open the build you want; Download keeps the site label—bypass moddroid delay without a paste tool.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Moddroid bypass skip?',
    answer:
      'The five-second prepare progress bar on the token download page—so Download is ready without the moddroid download waiting page fill.',
  },
  {
    question: 'Is this a download timer skip or a countdown bypass?',
    answer:
      'Both names fit this host. The stall is a filling bar driven by a five-second timer. Skip Wait skips that moddroid progress bar on supported file pages.',
  },
  {
    question: 'Will I still see Préparation du téléchargement…?',
    answer:
      'On supported pages, no. Download shows without the prepare bar—skip countdown timer busywork on that screen.',
  },
  {
    question: 'Does this work on fr.moddroid.com and other language hosts?',
    answer:
      'Yes. Language subdomains under moddroid.com are covered the same way as the main host.',
  },
  {
    question: 'Do I paste the Moddroid link into another website?',
    answer:
      'No. Stay on the download page and use Download there. Bypass countdown timer relief for this host runs in Chrome on that tab.',
  },
  {
    question: 'How much does the Moddroid path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The Moddroid bypass runs on supported pages.',
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
