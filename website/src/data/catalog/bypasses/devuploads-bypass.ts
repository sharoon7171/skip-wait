import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'DevUploads';

const bypassType = 'Direct Download';

const description =
  'DevUploads bypass locks the mediator page behind a full-page overlay, skips Generate Download Link waits and scroll-down article hops, and puts a Direct Download · Skip Wait button in the overlay with the real CDN link ready to click.';

const domains = [
  'devuploads.com',
  'gujjukhabar.in',
  'djxmaza.in',
  'smartfeecalculator.com',
  'pdfhindibook.com',
  'rfiql.com',
] as const;

const keywords = [
  'devuploads bypass',
  'devuploads.com bypass',
  'bypass devuploads',
  'devuploads download',
  'how to download from devuploads',
  'devuploads generate download link',
  'generate download link bypass',
  'devuploads link generated',
  'devuploads download now',
  'devuploads free download',
  'go to free download page',
  'devuploads scroll down',
  'devuploads mediator',
  'devuploads timer bypass',
  'devuploads skip wait',
  'devuploads direct download',
  'devuploads chrome extension',
  'devuploads apk download',
  'gujjukhabar.devuploads',
  'devuploads disable adblock',
  'skip generate download link',
  'file host bypass',
  'direct download bypass',
  'download timer skip',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip wait chrome extension',
] as const;

const intro =
  'People searching for a DevUploads bypass, how to download from DevUploads, or skip Generate Download Link usually opened a shared file URL and got bounced into a long news-style article with a Scroll Down banner, then a Generate Download Link or Go To Free Download Page button that only unlocks after waiting. DevUploads is a file host many APK, PDF, and archive posts use, so queries like DevUploads timer bypass, DevUploads free download, DevUploads direct download, and DevUploads scroll down show up next to generic download timer skip and file host bypass searches. Skip Wait is a free Chrome extension that takes over on the real download card (the mediator page after DevUploads posts you there): it locks the whole page so ads and article clicks stay unreachable, resolves the CDN in the background, and shows one Direct Download · Skip Wait control inside the overlay—no paste tool, no watching Link Generated for five seconds, and no hunting for Download Now under the post.';

const problem =
  'A typical DevUploads.com file does not hand you the file in one click. First the host auto-sends you to a rotating partner blog (healthcare, fees, PDF books, and similar articles) where you are told to scroll, wait for Generate Download Link, then often hit Link Generated and Download Now—or get pushed through another Go To Free Download Page hop. Leave early, keep an ad blocker on (the host itself warns downloads may fail), or miss the button buried under the article and you restart the same maze. That loop is exactly why people look for a DevUploads generate download link bypass, DevUploads mediator skip, and DevUploads chrome extension instead of finishing the scroll ritual by hand every time someone shares an APK or archive.';

const howItWorks =
  'Skip Wait treats the mediator file card as the place you actually download from—not the blank auto-post page on DevUploads itself. When that card loads with your filename and size, the extension covers the page with a full-page overlay that blocks interaction with ads and scroll steps, resolves the direct CDN download URL the same way a completed Generate Download Link path would (server-side POST, not click automation), and shows one branded Direct Download · Skip Wait control inside the overlay. You click when you want the file; nothing auto-starts. Partner blogs such as gujjukhabar.in, djxmaza.in, smartfeecalculator.com, and pdfhindibook.com are recognized when they host that DevUploads file card, so rotating article domains do not make you relearn a new layout.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait from the Chrome Web Store',
    body: 'Add the free Skip Wait Chrome extension. Searches for DevUploads chrome extension, DevUploads bypass chrome, or skip wait chrome extension all point at the same install. DevUploads rules load automatically—no account and no developer mode.',
  },
  {
    title: 'Keep Skip Wait enabled',
    body: 'Leave the extension on. There is nothing to configure for a DevUploads.com bypass or its partner download cards.',
  },
  {
    title: 'Open the DevUploads file link as usual',
    body: 'Click the shared DevUploads URL the same way you always do. When the host sends you to the file card on a partner blog, Skip Wait locks that page behind the overlay.',
  },
  {
    title: 'Use Direct Download in the overlay',
    body: 'Wait for Direct Download · Skip Wait inside the Skip Wait overlay. Click it when you are ready—the CDN link is already prepared, without Generate Download Link, Link Generated, or another free-download detour.',
  },
];

const skips = [
  'Generate Download Link and Link Generated waits on the file card',
  'Scroll Down banners and long article posts before the download control',
  'Go To Free Download Page and second-hop free download screens',
  'Buried Download Now buttons after forced reading',
  'Ads and page clicks while the overlay locks the mediator',
  'Rotating partner blog layouts that wrap the same DevUploads file',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Where does the Skip Wait button appear for DevUploads?',
    answer:
      'Inside the full-page Skip Wait overlay on the mediator download card—the page that shows your filename after DevUploads posts you to a partner blog—not on the brief auto-redirect screen on DevUploads.com itself.',
  },
  {
    question: 'Why did I land on a random blog instead of my file?',
    answer:
      'DevUploads monetizes free downloads by parking you on partner articles with Scroll Down instructions before Generate Download Link. That blog is the real download UI for free users. Skip Wait locks that page and skips the article scroll path so you are not reading scholarship or fee posts to reach an APK.',
  },
  {
    question: 'Does Skip Wait skip Generate Download Link and Download Now?',
    answer:
      'Yes. The extension prepares the direct CDN URL via the host download protocol and exposes it on the overlay button instead of making you wait for Link Generated and then Download Now.',
  },
  {
    question: 'Can I still click ads or scroll the article?',
    answer:
      'No. While the overlay is active the mediator page is locked—ads, scroll banners, and native download controls stay unreachable. Only the Skip Wait overlay (and its download button once ready) stays interactive.',
  },
  {
    question: 'Do I need to disable my ad blocker for DevUploads?',
    answer:
      'The host warns that ad blockers can break free downloads. If the card never loads or the Skip Wait button fails, allow the DevUploads file URL and the partner blog for that session, then reload. Skip Wait still avoids the scroll-and-wait ritual once the card is available.',
  },
  {
    question: 'Which partner sites does this DevUploads bypass cover?',
    answer:
      'Skip Wait matches DevUploads file cards on the listed partner domains (including gujjukhabar.in, djxmaza.in, smartfeecalculator.com, pdfhindibook.com, and rfiql.com when they host the download form). If a publisher rotates to a new article host, open a support request with that URL.',
  },
  {
    question: 'Will the download start by itself?',
    answer:
      'No. Skip Wait only shows a ready Direct Download button in the overlay. You choose when to click so nothing auto-downloads in the background.',
  },
  {
    question: 'Is the DevUploads bypass free?',
    answer:
      'Yes. Skip Wait is a free Chrome extension with no account and no paid tier required for DevUploads or the listed partner download cards.',
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
    problem,
    howItWorks,
    steps,
    skips,
    faq,
  },
} satisfies SupportedBypass;
