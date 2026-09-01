import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'APKAward';

const bypassType = 'Skip Countdown';

const description =
  'APKAward bypass skips the “Preparing your download link…” countdown so Download shows without watching the green timer.';

const domains = ['apkaward.com'] as const;

const keywords = [
  'apkaward bypass',
  'APKAward bypass extension',
  'apkaward bypass chrome',
  'bypass apkaward',
  'skip apkaward',
  'apkaward timer bypass',
  'apkaward countdown bypass',
  'apkaward download waiting page',
  'preparing your download link',
  'apkaward please wait',
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
  'APKAward bypass is for the download page that shows Preparing your download link… with a green countdown before Download appears. Skip Wait is the Chrome extension that skips that apkaward download waiting page so the Download button is already on screen.';

const body = `## Preparing a link that is already there

[APKAward](https://apkaward.com/) opens a version download URL after you pick a build. The page shows **Preparing your download link…** and a green timer circle while **Download** stays hidden behind that countdown.

That apkaward countdown is the choke point. The APK URL is already on the Download control; the stall is only the five-second client timer. A please wait bypass and download timer skip matter here because nothing is still being fetched—the prepare copy is theater.

### What you sit through on the file page

- Preparing your download link… with a green timer
- About five seconds before the countdown ends
- Download once the timer clears
- A pink note about closing an ad and clicking Download again

## Skip Wait on the APKAward download page

Skip Wait is an APKAward bypass chrome / skip wait extension path for this catalog. On a supported download page it skips the prepare countdown so Download is visible immediately, with a short Skip Wait note in the site’s own note box style.

You stay on APKAward. Open the version download URL, and use Download without an apkaward timer bypass stare-down. That is skip apkaward waiting-page busywork and skip waiting page relief on the hop that actually stalls.

## Why the prepare screen feels mandatory

Leave mid-count, miss Download when it appears, or reopen the version URL and you watch Preparing your download link… again. An APKAward bypass extension only removes that countdown. You still open the build you want and use Download on that page—bypass apkaward delay without a paste tool.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does an APKAward bypass skip?',
    answer:
      'The Preparing your download link… countdown on the version download page—so Download is ready without the apkaward download waiting page wait.',
  },
  {
    question: 'Is this a download timer skip or a countdown bypass?',
    answer:
      'Both fit this host. The stall is a green timer. Skip Wait skips that apkaward countdown on supported download pages.',
  },
  {
    question: 'Will I still see Preparing your download link…?',
    answer:
      'On supported pages, no. Download shows without the timer—skip countdown timer busywork on that screen.',
  },
  {
    question: 'Does Skip Wait change the Download label?',
    answer:
      'No. The button keeps the site’s own label. A Skip Wait note sits above the button group in the site’s note style.',
  },
  {
    question: 'Do I paste the APKAward link into another website?',
    answer:
      'No. Stay on the download page and use Download there. Bypass countdown timer relief for this host runs in Chrome on that tab.',
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
