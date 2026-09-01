import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'PlayMods';

const bypassType = 'Direct Download';

const description =
  'PlayMods bypass and download timer skip for Download APK, History Versions, all-versions, and all-download lists—direct APK with Skip Wait branding, no mediator hop.';

const domains = ['playmods.net'] as const;

const keywords = [
  'playmods bypass',
  'PlayMods bypass extension',
  'playmods bypass chrome',
  'bypass playmods',
  'skip playmods',
  'playmods timer bypass',
  'playmods countdown bypass',
  'playmods download waiting page',
  'playmods please wait',
  'playmods download apk',
  'playmods all download',
  'playmods all versions',
  'playmods history versions',
  'playmods version download',
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
  'PlayMods bypass clears the middle download waiting page on single-build Download APK, History Versions rows, the all-versions list, and all-download variant picks. Skip Wait is the Chrome extension that turns those PlayMods controls into branded direct downloads—or opens the variant list when more than one APK family exists—without playmods please wait busywork.';

const body = `## Download APK that still opens a waiting page

[PlayMods](https://playmods.net/) puts **Download APK** on every game or app post. A single-build post sends that control to a download waiting page packed with ads. A multi-build post opens the all-download list first; each variant **Download** row then hits the same waiting page. History Versions on the post (and **more>** all-versions) list older builds the same way—each row still opens the waiting page before the archive starts.

That playmods please wait hop is the choke point. You already chose the package or history build; the next screen still sits between you and the file. A please wait bypass and download timer skip matter here because the post or version list already knew which APK you wanted.

### Stages on the way to the file

- Game or app post with Download APK
- Single-build posts: Download APK opens the middle download waiting page
- Multi-build posts: Download APK opens the all-download variant list
- History Versions rows on the post, each with its own Download control
- **more>** all-versions page with the full history list
- Extra ads and a second Download tap before the archive transfer starts

## What a PlayMods bypass extension clears

Skip Wait is a PlayMods bypass chrome / skip wait extension path for this catalog. On supported pages it:

- On single-build posts, turns Download APK into a branded direct download with no mediator hop
- On multi-build posts, brands Download APK and keeps the path to the all-download variant list
- Rewrites History Versions and all-versions Download rows into branded direct downloads
- Rewrites each all-download variant button to a direct download with Skip Wait branding
- If you already landed on the waiting page, jumps straight into the file transfer

You stay on PlayMods—no paste tool and no second helper. Fast Download (the site’s own installer pitch) is left alone; the PlayMods bypass targets the normal Download APK / history / version Download path only.

## Single build, history, variant list, and download waiting page

Some visits start on a one-file post; others use History Versions, all-versions, all-download, or the download waiting page after the first click. Close the wait early, miss the control, or fight an overlay and you restart the same stall.

A file host bypass for PlayMods covers each surface. On a single-build post, Download APK becomes the direct transfer. History and all-versions rows become branded direct downloads for that build id. On all-download, each variant row becomes a branded direct download. On the download waiting page itself, the same skip countdown timer treatment sends you into the transfer without another Download tap.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a PlayMods bypass skip?',
    answer:
      'The playmods download waiting page after Download APK, History Versions, all-versions, or all-download picks, so the APK starts without that middle hop on supported pages.',
  },
  {
    question: 'Is this a download timer skip or direct download bypass?',
    answer:
      'Both on supported pages. Skip Wait turns Download APK, history, and version Download buttons into branded direct downloads and clears the mediator waiting page if you already opened it.',
  },
  {
    question: 'What if the post has only one download version?',
    answer:
      'Download APK on the game or app post becomes a branded direct download. History Versions rows for older builds are resolved the same way.',
  },
  {
    question: 'What if the post has multiple download versions?',
    answer:
      'Download APK still opens the all-download list so you can pick a variant APK. Each row there, and each History Versions / all-versions row, is resolved into its own direct link.',
  },
  {
    question: 'Does History Versions or all-versions get skipped too?',
    answer:
      'Yes on supported pages. Those Download rows become branded direct downloads, and more> still opens the full all-versions list when you want every build.',
  },
  {
    question: 'Will I still see the download waiting page?',
    answer:
      'On supported Download APK, history, all-versions, and all-download flows, no—you do not need that middle page. If you already landed there, Skip Wait jumps into the file transfer.',
  },
  {
    question: 'Does Fast Download get bypassed too?',
    answer:
      'No. Fast Download is the site’s own app pitch and is left alone. The PlayMods bypass only rewrites the normal Download APK / history / version Download path.',
  },
  {
    question: 'Do I paste the PlayMods link into another website?',
    answer:
      'No. Stay on the post, history list, all-versions, all-download, or download waiting page and let the PlayMods bypass extension run on that tab.',
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
