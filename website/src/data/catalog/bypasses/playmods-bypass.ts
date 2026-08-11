import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'PlayMods';

const bypassType = 'Direct Download';

const description =
  'PlayMods bypass and download timer skip for single-build Download APK and the multi-version all-download list—direct APK with Skip Wait branding, no mediator hop.';

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
  'PlayMods bypass clears the middle download waiting page on single-build posts and after you pick a build on the all-download list. Skip Wait is the free Chrome extension that turns PlayMods Download APK into a branded direct download—or opens the version list when more than one build exists—without playmods please wait busywork.';

const body = `## Download APK that still opens a waiting page

[PlayMods](https://playmods.net/) puts **Download APK** on every game or app post. A single-build post sends that control to a download waiting page packed with ads. A multi-build post opens the all-download list first; each version **Download** row then hits the same waiting page before the archive starts.

That playmods please wait hop is the choke point. You already chose the package; the next screen still sits between you and the file. A please wait bypass and download timer skip matter here because the post or version list already knew which APK you wanted.

### Stages on the way to the file

- Game or app post with Download APK
- Single-build posts: Download APK opens the middle download waiting page
- Multi-build posts: Download APK opens the all-download version list
- Version rows each open the same waiting page after you pick a build
- Extra ads and a second Download tap before the archive transfer starts

## What a PlayMods bypass extension clears

Skip Wait is a PlayMods bypass chrome / skip wait extension path for this catalog. On supported pages it:

- On single-build posts, turns Download APK into a branded direct download with no mediator hop
- On multi-build posts, brands Download APK and keeps the path to the all-download version list
- Rewrites each all-download version button to a direct download with Skip Wait branding
- If you already landed on the waiting page, jumps straight into the file transfer

You stay on PlayMods—no paste tool and no second helper. Fast Download (the site’s own installer pitch) is left alone; the PlayMods bypass targets the normal Download APK / version Download path only.

## Single build, version list, and download waiting page

Some visits start on a one-file post; others land on all-download or the download waiting page after the first click. Close the wait early, miss the control, or fight an overlay and you restart the same stall.

A file host bypass for PlayMods covers all three. On a single-build post, Download APK becomes the direct transfer. On all-download, each version row becomes a branded direct download. On the download waiting page itself, the same skip countdown timer treatment sends you into the transfer without another Download tap.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a PlayMods bypass skip?',
    answer:
      'The playmods download waiting page on single-build Download APK and after you pick a version on the all-download list, so the APK starts without that middle hop on supported pages.',
  },
  {
    question: 'Is this a download timer skip or direct download bypass?',
    answer:
      'Both on supported pages. Skip Wait turns Download APK and version Download buttons into branded direct downloads and clears the mediator waiting page if you already opened it.',
  },
  {
    question: 'What if the post has only one download version?',
    answer:
      'Download APK on the game or app post becomes a branded direct download. You do not need the middle waiting page.',
  },
  {
    question: 'What if the post has multiple download versions?',
    answer:
      'Download APK still opens the all-download list so you can pick a build. Each version row there is resolved separately into its own direct link.',
  },
  {
    question: 'Will I still see the download waiting page?',
    answer:
      'On supported single-build and all-download flows, no—you do not need that middle page. If you already landed there, Skip Wait jumps into the file transfer.',
  },
  {
    question: 'Does Fast Download get bypassed too?',
    answer:
      'No. Fast Download is the site’s own app pitch and is left alone. The PlayMods bypass only rewrites the normal Download APK / version Download path.',
  },
  {
    question: 'Do I paste the PlayMods link into another website?',
    answer:
      'No. Stay on the post, all-download list, or download waiting page and let the PlayMods bypass extension run on that tab.',
  },
  {
    question: 'Is the PlayMods path free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The PlayMods bypass runs on supported pages with no account or paid plan.',
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
