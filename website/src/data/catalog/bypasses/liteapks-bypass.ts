import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'LiteAPKs';

const bypassType = 'Direct Download';

const description =
  'LiteAPKs bypass and download timer skip for the please-wait Download apk page—direct download without the progress waiting stall.';

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
  'LiteAPKs bypass clears the please-wait Download apk screen after you pick a build. Skip Wait is the $1.50/month Chrome extension that turns that liteapks download waiting page into a direct download from the version list—no progress stall, no skip countdown timer busywork on supported posts.';

const body = `## Download apk that still opens a waiting page

[LiteAPKs](https://liteapks.com/) puts MOD and full APK builds on a download page. When more than one build exists, version tabs split older and newer Full packages. Each **Download apk** row shows the size, then opens a separate apk download waiting page instead of starting the file.

That liteapks please wait hop is the real choke point. You already chose the build; the next screen still runs a progress bar, “your link is almost ready” copy, and a locked Download control for several seconds. Ads on that hop stretch a liteapks timer bypass problem into a longer sit. A please wait bypass and download timer skip matter here because the listing already knew which APK you wanted.

### Stages on the way to the file

- Version tabs for Full or MOD builds on the same post
- Download apk rows that leave the listing for a middle waiting page
- Progress chrome that holds the real Download button
- Liteapks countdown-style delay before the archive transfer starts
- Extra ad friction on the waiting page before skip waiting page relief

## What a LiteAPKs bypass extension clears

Skip Wait is a LiteAPKs bypass chrome / skip wait extension path for this catalog. On supported download pages, Download apk rows show Skip Wait branding so the direct download bypass is visible. When you click the build you want, the extension skips the progress waiting page and starts the APK from the version list.

You stay on the listing—no paste tool and no second helper. Client please-wait chrome gets out of the way, so mod apk direct download and bypass countdown timer relief feel like the button you pressed, not another tab of delay theater. That is skip liteapks waiting-page busywork in one install.

## Single-version and multi-version posts

Some apps expose one Download apk control. Others stack several versions—each with its own size and its own liteapks download waiting page. Close the wait early, miss the tab, or fight an overlay and you restart the same stall for that build.

A file host bypass for LiteAPKs has to respect the row you clicked. You still choose the newer Full package or an older one; Skip Wait only removes the please-wait hop after that choice. Multi-version posts get the same direct download treatment on every supported Download apk row—bypass liteapks delay without losing which build you picked.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a LiteAPKs bypass skip?',
    answer:
      'The liteapks please wait / download waiting page after Download apk—the progress bar and “link is almost ready” stall before the APK starts on supported posts.',
  },
  {
    question: 'Is this a download timer skip or direct download bypass?',
    answer:
      'Both on supported pages. Skip Wait clears the progress waiting page so Download apk becomes a direct download from the version list.',
  },
  {
    question: 'Do I still pick which version to download?',
    answer:
      'Yes. Use the version tabs and Download apk row for the Full or MOD build you want. Skip Wait only removes the waiting page that normally follows that click.',
  },
  {
    question: 'What if the app has multiple versions?',
    answer:
      'Each Download apk row is covered the same way. Pick the build you need; you do not sit through a separate progress page per row.',
  },
  {
    question: 'Will I still see the progress waiting page?',
    answer:
      'On supported flows, no. The click from the version list starts the file instead of the please-wait screen—skip waiting page and skip countdown timer busywork on that hop.',
  },
  {
    question: 'Do I paste the LiteAPKs link into another website?',
    answer:
      'No. Stay on the download page, click Download apk, and let the LiteAPKs bypass extension run on that tab.',
  },
  {
    question: 'How much does the LiteAPKs path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The LiteAPKs bypass runs on supported pages.',
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
