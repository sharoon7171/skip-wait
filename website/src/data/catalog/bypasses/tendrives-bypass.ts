import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = '10Drives';

const bypassType = 'Direct Download';

const description =
  '10Drives bypass skips Continue, Create link, and Get Now waits on gamesmain.xyz. Free Chrome extension unlocks Direct Download · Skip Wait with the real CDN link—no timer, no article hops.';

const domains = ['10drives.com', 'gamesmain.xyz'] as const;

const keywords = [
  '10drives bypass',
  '10drives.com bypass',
  'bypass 10drives',
  '10 drive bypass',
  '10drives download',
  'how to download from 10drives',
  '10drives free download',
  '10drives download link',
  '10drives create link',
  'create link bypass',
  'link is ready bypass',
  '10drives get now',
  'get now bypass',
  '10drives continue',
  'gamesmain.xyz bypass',
  'gamesmain continue bypass',
  'gamesmain.xyz download',
  'techblogverse download',
  '10drives timer bypass',
  '10drives skip wait',
  '10drives direct download',
  '10drives chrome extension',
  '10drives apk download',
  '10drives please wait',
  'skip continue button',
  'file host bypass',
  'direct download bypass',
  'download timer skip',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip wait chrome extension',
] as const;

const intro =
  'People searching for a 10Drives bypass, how to download from 10Drives, or skip the gamesmain Continue button usually opened a shared 10drives.com/b/… link and landed on a file card with ads, a spinner, and Continue that only leads into more blog posts, Create link delays, Link is Ready waits, and a Get Now countdown before the real file. 10Drives is a file host many APK and archive shares use, so queries like 10Drives timer bypass, 10Drives free download, 10Drives direct download, gamesmain.xyz bypass, and 10Drives Get Now show up next to generic download timer skip and file host bypass searches. Skip Wait is a free Chrome extension that takes over on the gamesmain.xyz download card: it locks the whole page so ads and Continue clicks stay unreachable, resolves the direct CDN download URL in the background, and shows one Direct Download · Skip Wait control inside the overlay—no paste tool, no Please wait, and no hunting for Get Now under another article.';

const problem =
  'A typical 10Drives.com free link does not hand you the file in one click. First the short link sends you to a partner blog (gamesmain.xyz / TechBlogverse-style posts) where your filename and size sit above ads, then Continue opens another tab or post, Create link forces a wait until Link is Ready, and Get Now only unlocks after another countdown while the current tab is pushed into ad redirects. Leave early, miss the buried button, or fight the ad stack and you restart the same maze. That loop is exactly why people look for a 10Drives create link bypass, gamesmain Continue bypass, 10Drives Get Now skip, and 10Drives chrome extension instead of finishing every hop by hand every time someone shares an APK or archive.';

const howItWorks =
  'Skip Wait treats the gamesmain file card as the place you actually download from—not the brief auto-redirect on 10drives.com itself. When that card loads with your filename and size, the extension covers the page with a full-page overlay that blocks interaction with ads and Continue steps, resolves the direct CDN download URL the same way a completed Get Now path would (no click automation through the article hops), and shows one branded Direct Download · Skip Wait control inside the overlay. You click when you want the file; nothing auto-starts. Partner posts on gamesmain.xyz are recognized when they host that 10Drives unlock card, so rotating article URLs do not make you relearn a new layout.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait from the Chrome Web Store',
    body: 'Add the free Skip Wait Chrome extension. Searches for 10Drives chrome extension, 10Drives bypass chrome, or skip wait chrome extension all point at the same install. 10Drives rules load automatically—no account and no developer mode.',
  },
  {
    title: 'Keep Skip Wait enabled',
    body: 'Leave the extension on. There is nothing to configure for a 10Drives.com bypass or the gamesmain.xyz download card.',
  },
  {
    title: 'Open the 10Drives file link as usual',
    body: 'Click the shared 10drives.com/b/… URL the same way you always do. When the host sends you to the file card on gamesmain.xyz, Skip Wait locks that page behind the overlay.',
  },
  {
    title: 'Use Direct Download in the overlay',
    body: 'Wait for Direct Download · Skip Wait inside the Skip Wait overlay. Click it when you are ready—the CDN link is already prepared, without Continue, Create link, Link is Ready, or Get Now.',
  },
];

const skips = [
  'Continue buttons and second-tab article hops on gamesmain.xyz',
  'Create link delays and Link is Ready waits',
  'Get Now countdowns on the final unlock card',
  'Please wait spinners before the download control',
  'Ad redirects that fire when native download controls are used',
  'Ads and page clicks while the overlay locks the mediator',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Where does the Skip Wait button appear for 10Drives?',
    answer:
      'Inside the full-page Skip Wait overlay on gamesmain.xyz after a 10drives.com/b/… short link sends you there—not on the brief redirect screen on 10drives.com itself.',
  },
  {
    question: 'Why did I land on gamesmain.xyz instead of my file?',
    answer:
      '10Drives monetizes free downloads by parking you on partner blog posts (TechBlogverse-style articles) with Continue, Create link, and Get Now steps before the CDN URL is shown. That blog is the real free-download UI. Skip Wait locks that page and skips those hops so you are not reading random posts to reach an APK.',
  },
  {
    question: 'Does Skip Wait skip Continue, Create link, and Get Now?',
    answer:
      'Yes. Those native wait controls stay blocked under the overlay. The extension prepares the direct CDN URL and exposes it on the Skip Wait button instead of making you finish each article hop and countdown.',
  },
  {
    question: 'Can I still click ads or Continue on gamesmain?',
    answer:
      'No. While the overlay is active the mediator page is locked—ads, Continue, Create link, and Get Now stay unreachable. Only the Skip Wait overlay (and its download button once ready) stays interactive.',
  },
  {
    question: 'What is the Create link / Link is Ready step on 10Drives?',
    answer:
      'After Continue, partner posts show a Create link button that waits (often about ten seconds) before Link is Ready appears. Skip Wait skips that delay and the later Get Now countdown by resolving the CDN URL directly.',
  },
  {
    question: 'Will the download start by itself?',
    answer:
      'No. Skip Wait only shows a ready Direct Download button in the overlay. You choose when to click so nothing auto-downloads in the background.',
  },
  {
    question: 'Is the 10Drives bypass free?',
    answer:
      'Yes. Skip Wait is a free Chrome extension with no account and no paid tier required for 10Drives or gamesmain.xyz download cards.',
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
