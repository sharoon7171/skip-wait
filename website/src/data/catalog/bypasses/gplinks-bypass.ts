import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'GPLinks';

const bypassType = 'Skip Short Link';

const description =
  'GPLinks bypass skips the Premium paywall, Continue with ads blog waits, Get Link countdowns, and Cloudflare Turnstile so you reach the destination without hand clicking every step.';

const domains = ['gplinks.co', 'gplinks.com', 'rajcet.com'] as const;

const keywords = [
  'gplinks bypass',
  'gplink bypass',
  'gp links bypass',
  'gplinks.co bypass',
  'gplinks.com bypass',
  'bypass gplinks',
  'skip gplinks',
  'gplinks skip',
  'gplinks timer bypass',
  'gplinks countdown bypass',
  'gplinks waiting page',
  'gplinks please wait',
  'gplinks get link',
  'gplinks continue with ads',
  'skip gplinks premium',
  'gplinks premium skip',
  'gplinks shortener bypass',
  'gplinks chrome extension',
  'gplinks bypass chrome',
  'gplinks turnstile bypass',
  'cloudflare turnstile gplinks',
  'gplinks verify continue',
  'gplinks intermediate page',
  'indian shortlink bypass',
  'short link bypass gplinks',
  'skip countdown timer',
  'bypass countdown timer',
  'please wait bypass',
  'link shortener bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'Searching for a GPLinks bypass, GP Links skip, or gplinks chrome extension usually means someone shared a monetized short URL and you are stuck on an intermediate page instead of the file, drive folder, or download you wanted. GPLinks is one of the most common Indian shortlink networks behind movie sites, software mirrors, and Telegram shares, so queries like bypass gplinks, gplinks timer bypass, gplinks get link, and skip countdown timer show up constantly next to generic link shortener bypass searches. Skip Wait is a free Chrome extension that runs on those pages for you: it skips the GPLinks Premium subscription gate when you choose the free path, advances the Continue with ads mediator blogs, and finishes the Get Link and Cloudflare Turnstile go page so you are not babysitting Verify, Continue, and countdown UI by hand. You open the short link the same way you always do, with no paste box, no Python script, and no separate gplink bypasser userscript to maintain.';

const problem =
  'A typical GPLinks short link does not open the destination in one hop. First you hit a Protected link or Ad Free Experience screen pushing GPLinks Premium (pay to skip ads) with Continue with ads as the free escape. Choosing ads drops you through a redirect into a blog mediator where a Please wait countdown, VERIFY, and CONTINUE or GET LINK buttons gate each of several Step X of Y article pages before the shortener will send you back. Only after that chain do you land on the GPLinks go page with a second countdown, Cloudflare Turnstile human check, and a Get Link unlock submit. Close the tab early, trip an ad blocker modal, or mistime the verify click and you restart the intermediate page slog. That stacked friction is exactly why people look for a gplinks waiting page skip, gplinks countdown bypass, gplinks turnstile bypass, and skip gplinks premium helpers instead of clicking through every ad wall manually.';

const howItWorks =
  'Skip Wait’s GPLinks support is three coordinated handlers, not a single fake redirect. On the shortener hosts, the subscription gate handler takes the Continue with ads free path so you never have to open Razorpay or type an email for Premium. On supported mediator blogs, the extension talks to the site’s own flow REST API (poll server wait state, then advance), the same Continue action the page would fire after VERIFY, so blog steps complete without hunting buttons through ads. When the flow returns you to the shortener unlock page, the go page handler covers the Get Link countdown and Cloudflare Turnstile pin so the unlock can finish and open the real destination. Timers that the shortener still enforces server side are waited honestly; client only UI (VERIFY reveal, disabled buttons, overlay clutter) is what gets out of your way. That is a full GPLinks shortener bypass path inside one Chrome install, not a one shot API paste tool that breaks when the blog host rotates.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install the Skip Wait Chrome extension',
    body: 'Add Skip Wait from the Chrome Web Store. Search Skip Wait Chrome extension, gplinks bypass chrome, or gplinks chrome extension if you are comparing shortlink helpers. The GPLinks rules load automatically on supported pages with no API key or developer mode.',
  },
  {
    title: 'Leave Skip Wait enabled in Chrome',
    body: 'Keep the extension on. There is no per link paste form and nothing to configure for a gplinks bypass or Continue with ads skip. The content scripts match when you open a supported page.',
  },
  {
    title: 'Open the GPLinks short URL as usual',
    body: 'Click the shared GPLinks link from Telegram, a movie site, or a download page. Prefer Continue with ads over Premium if you want the free path. Skip Wait picks up the gate, then the mediator blogs, then the Get Link screen in order.',
  },
  {
    title: 'Let the overlay finish the shortlink chain',
    body: 'Stay on the tab while Skip Wait shows progress through Premium skip, blog step advances, and the go page countdown or Turnstile. When the unlock succeeds, you land on the destination URL instead of restarting the GPLinks intermediate page.',
  },
];

const skips = [
  'GPLinks Premium or Ad Free paywall when you take Continue with ads',
  'Please wait, VERIFY, and CONTINUE blog steps on mediator articles',
  'Multi step Step X of Y article hops before the unlock page',
  'Get Link countdown timers on the GPLinks go page',
  'Cloudflare Turnstile friction on go page unlocks',
  'Manual unlock clicks after the shortener is ready',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which sites does the GPLinks bypass support?',
    answer:
      'Skip Wait covers the GPLinks shortener hosts for the Premium gate and Get Link go page, plus the supported Continue with ads blog mediator listed on this page. If a publisher rotates the article host, support follows the live flow mediator pattern once that host is listed. Open a support request if you hit a new blog that still shows VERIFY or CONTINUE for GPLinks.',
  },
  {
    question: 'Does Skip Wait skip GPLinks Premium or only the free Continue with ads path?',
    answer:
      'It automates the free path: Continue with ads, then the mediator and go page. It does not buy GPLinks Premium, enter Razorpay, or invent a paid subscription. If you already subscribe, you may never see the free chain. If you do not, Skip Wait is the skip gplinks premium alternative that still respects the free flow unlocks.',
  },
  {
    question: 'Why do I still see a Please wait timer on the mediator blog?',
    answer:
      'The mediator’s server tracks waited time before advance is allowed. Skip Wait polls that state and posts advance when ready, so you avoid VERIFY or CONTINUE clicking and ad hunting, but the shortener’s required wait still elapses. That is a gplinks waiting page automation, not a fake zero second cheat that would return session or wait errors.',
  },
  {
    question: 'Can Skip Wait handle Cloudflare Turnstile on the GPLinks Get Link page?',
    answer:
      'Yes on supported go pages. When Turnstile is required, Skip Wait pins the widget over its overlay so you can complete the human check once. After the token is present it continues the Get Link unlock. That matches searches for gplinks turnstile bypass and Cloudflare Turnstile gplinks help without a separate captcha farm.',
  },
  {
    question: 'Is this the same as a GPLinks paste API or userscript bypass?',
    answer:
      'No. Paste tools and Tampermonkey auto click verify scripts often break when GPLinks moves from cookie blogs to newer flow REST mediators. Skip Wait runs inside Chrome on the live pages (gate, mediator steps, and go page), so a rotating intermediate host does not require you to re copy a URL into a third party site.',
  },
  {
    question: 'Does an ad blocker break the GPLinks shortener bypass?',
    answer:
      'Aggressive blockers can trigger the mediator’s AdBlocker detected modal and stall Continue. If the page blocks progress, allow ads or pause the blocker for the shortener and mediator for that session, then reload. Skip Wait strips obvious blocker dialogs when it can, but the shortener still expects a normal browser context to finish Get Link.',
  },
  {
    question: 'Is the GPLinks bypass free with Skip Wait?',
    answer:
      'Yes. Skip Wait is a free Chrome extension. The GPLinks bypass and related short link rules run on supported pages with no account, premium tier, or paid unlimited bypass plan.',
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
