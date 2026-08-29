import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'GAPKMOD';

const bypassType = 'Direct Download';

const description =
  'GAPKMOD bypass and download timer skip for the app-page spinner and the download links waiting page—direct file-host links in a new tab, with version names kept when a post has more than one build.';

const domains = ['gapkmod.net'] as const;

const keywords = [
  'gapkmod bypass',
  'GAPKMOD bypass extension',
  'gapkmod bypass chrome',
  'bypass gapkmod',
  'skip gapkmod',
  'gapkmod timer bypass',
  'gapkmod countdown bypass',
  'gapkmod download waiting page',
  'gapkmod please wait',
  'gapkmod download apk',
  'gapkmod download links timer',
  'gapkmod multiple versions',
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
  'GAPKMOD bypass clears the download links spinner on the app post and the second download waiting page after it. Skip Wait is the $1.50/month Chrome extension that turns those gapkmod countdowns into direct file-host links in a new tab—version names from the download links page stay on multi-build posts.';

const body = `## Download links locked behind a countdown

[GAPKMOD](https://gapkmod.net/) lists MOD APK posts with a **Download APK** control that normally only scrolls to Download links. Those links stay hidden while a spinner counts down. When the timer ends, the first Download still opens a download links waiting page with another countdown before the real file host appears. Multi-version posts list several builds there (for example Link v2.8.0 version and Link v2.4.0 Latest Version) behind that same stall.

That gapkmod please wait stack is the choke point. The post already knew which APK builds existed; the gapkmod timer bypass problem is theater on the listing plus a second download waiting page. A please wait bypass and download timer skip matter here because both waits sit in front of links the site already had.

### Stages on the way to the file

- App post with Download APK that only jumps to the Download links box
- Spinner countdown that keeps the Download control hidden
- Middle download links waiting page with another gapkmod countdown stall
- One or more version rows (names like Link v2.8.0 version) that still point through an encrypted hop
- File host open after that hop—ads and overlays stretch skip waiting page relief into a longer sit

## What a GAPKMOD bypass extension clears

Skip Wait is a GAPKMOD bypass chrome / skip wait extension path for this catalog. On supported posts it:

- Hides the spinner and shows the Download links box immediately
- Replaces each list row with a real file-host link that opens in a new tab
- Keeps the download links page version names on multi-build posts

You stay on GAPKMOD—no paste tool and no second helper. Client countdown chrome gets out of the way, so mod apk direct download and bypass countdown timer relief feel like the button you pressed. That is skip gapkmod waiting-page busywork in one install.

## Listing page and download links page

Some visits start on the app post; others land on the download links waiting page after the first Download click. Close the wait early, miss the control, or fight an overlay and you restart the same stall.

A file host bypass for GAPKMOD covers both screens. On the post, the Download links list becomes direct host links after a short unlock. On the download links page itself, the same skip countdown timer treatment rewrites each version row without another spinner—names stay as the site showed them.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a GAPKMOD bypass skip?',
    answer:
      'The gapkmod download links spinner on the app post and the second download waiting page countdown before the file host on supported posts.',
  },
  {
    question: 'Is this a download timer skip or direct download bypass?',
    answer:
      'Both on supported pages. Skip Wait clears the double countdown and turns the Download links list into direct file-host links that open in a new tab.',
  },
  {
    question: 'What if the post has multiple download versions?',
    answer:
      'Each version row from the download links page is resolved separately. Names such as Link v2.8.0 version stay on the buttons; each opens its own host in a new tab.',
  },
  {
    question: 'Will I still see the download links waiting page?',
    answer:
      'On supported flows from the app post, no—you do not need that middle countdown. If you already landed on the download links page, Skip Wait rewrites those version links in place without another spinner.',
  },
  {
    question: 'Do I paste the GAPKMOD link into another website?',
    answer:
      'No. Stay on the post or download links page and let the GAPKMOD bypass extension run on that tab.',
  },
  {
    question: 'How much does the GAPKMOD path cost?',
    answer:
      'Skip Wait is $1.50 per month. Activate a license in the popup. The GAPKMOD bypass runs on supported pages.',
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
