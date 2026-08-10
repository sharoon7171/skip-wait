import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'LiteAPKs';

const bypassType = 'Direct Download';

const description =
  'LiteAPKs bypass that skips the please-wait download page after you pick a version so Download apk starts the APK without the progress delay.';

const domains = ['liteapks.com'] as const;

const keywords = [
  'liteapks bypass',
  'LiteAPKs bypass extension',
  'liteapks bypass chrome',
  'bypass liteapks',
  'skip liteapks',
  'liteapks timer bypass',
  'liteapks countdown bypass',
  'liteapks download waiting page',
  'liteapks please wait',
  'liteapks download apk',
  'mod apk direct download',
  'apk download waiting page',
  'direct download',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'please wait bypass',
  'skip wait extension',
] as const;

const intro =
  'A LiteAPKs bypass search usually means you already opened the version list, tapped Download apk, and still landed on a please-wait screen before the file started. Skip Wait is the free Chrome extension that skips that download waiting page so the APK begins from the version row instead of after the progress delay.';

const body = `## You picked a version—then another please-wait page

[LiteAPKs](https://liteapks.com/) lists MOD and full APK builds on a download page with version tabs when more than one build exists. Each **Download apk** row shows the package size, then sends you to a separate waiting page: a progress bar, “your link is almost ready,” and a locked download control that only unlocks after several seconds.

That middle screen is why people hunt liteapks timer bypass, liteapks please wait, apk download waiting page, and download timer skip help. The version list already named the file; the wait is delay theater before the archive starts—and ads on that hop make the stall feel longer.

### What the wait actually feels like

- Version tabs for older and newer Full or MOD builds on the same post
- Download apk rows that open a new waiting page instead of the file
- Progress chrome that holds the real Download button for a few seconds
- Please-wait copy that repeats even when you only wanted one build
- Extra ad friction before the APK transfer begins

## Single-version and multi-version posts

Some apps expose one Download apk control. Others stack several versions—each with its own size and its own waiting page. Miss the tab, close the wait early, or fight an overlay and you restart the same liteapks download waiting page loop for that build.

A LiteAPKs bypass has to respect which row you clicked. You still choose v17 or an older Full package; Skip Wait only clears the please-wait hop that normally follows that choice.

## Starting the APK from the version list

Skip Wait runs on the LiteAPKs download page inside Chrome. On supported posts the Download apk rows carry Skip Wait branding so you can see the direct path is active. When you click the build you want, the extension skips the progress waiting page and opens the download that page would have unlocked after the delay.

You stay on the listing you already opened—no paste tool and no second helper extension. Client please-wait chrome gets out of the way so mod apk direct download feels like the button you pressed, not another countdown tab.

That is a LiteAPKs bypass extension for skip waiting page busywork on this catalog: one install, the live download page, and less time staring at “almost ready” progress.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a LiteAPKs bypass skip?',
    answer:
      'The please-wait download page after Download apk—the progress bar and “link is almost ready” stall before the APK starts on supported posts.',
  },
  {
    question: 'Do I still pick which version to download?',
    answer:
      'Yes. Use the version tabs and Download apk row for the build you want. Skip Wait only removes the waiting page that normally follows that click.',
  },
  {
    question: 'What if the app has multiple versions?',
    answer:
      'Each Download apk row is covered the same way. Pick the Full or MOD build you need; you do not sit through a separate progress page per row.',
  },
  {
    question: 'Will I still see the progress waiting page?',
    answer:
      'On supported flows, no. The click from the version list starts the file instead of parking you on the please-wait screen.',
  },
  {
    question: 'Do I paste the LiteAPKs link into another website?',
    answer:
      'No. Stay on the download page, click Download apk, and let Skip Wait run on that tab.',
  },
  {
    question: 'Is the LiteAPKs path free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The LiteAPKs bypass runs on supported pages with no account or paid plan.',
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
