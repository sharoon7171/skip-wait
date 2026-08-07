import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'AdLinkFly Token Payload';

const bypassType = 'Skip Short Link';

const description =
  'Skip Wait unlocks ShrinkPe and LoanBuzz style short links after the captcha, skips the blog Continue chain and Get Link countdown for most destinations, and holds briefly before opening sensitive movie drive downloads so arrival looks like a normal visit.';

const domains = ['oii.la', 'tpi.li', 'aii.sh', 'lnbz.la', 'shrink.pe'] as const;

const keywords = [
  'adlinkfly bypass',
  'ad link fly bypass',
  'AdLinkFly token bypass',
  'shrinkpe bypass',
  'shrink.pe bypass',
  'loanbuzz bypass',
  'lnbz.la bypass',
  'lnbz bypass',
  'oii.la bypass',
  'tpi.li bypass',
  'aii.sh bypass',
  'shrinkbixby bypass',
  'adlinkfly captcha skip',
  'adlinkfly turnstile bypass',
  'cloudflare turnstile shortlink',
  'skip shortlink captcha',
  'short link continue bypass',
  'blog continue shortlink skip',
  'get link countdown bypass',
  'adlinkfly get link skip',
  'monetized short link bypass',
  'ad shortener bypass',
  'ad link shortener bypass',
  'mighty script shortener bypass',
  'please wait shortlink bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'short link bypass',
  'skip wait chrome extension',
  'chrome extension shortlink bypass',
  'paste shortlink bypass alternative',
] as const;

const intro =
  'People look for an AdLinkFly bypass, ShrinkPe bypass, LoanBuzz bypass, or a free short link skip when a download, faucet, or movie share opens a captcha page instead of the file. Those networks often stack a human check, one or more blog Continue screens with long ad modals, then a Get Link countdown on the shortener again. Online paste tools and one shot userscripts break when the blog host or captcha type rotates. Skip Wait is a free Chrome extension that runs on the supported captcha shortlink page itself: after you clear the check, it unlocks the destination without you walking the blog chain by hand for ordinary links. When the unlocked target is a protected OlaMovies drive download, it still waits out a full normal visit length before opening so the drive does not treat the arrival as an instant skip. You keep one install, no paste box, and no separate script to babysit.';

const problem =
  'A typical ShrinkPe or LoanBuzz style short URL does not send you straight to the file. First you land on a captcha shortlink screen where Continue stays locked until Cloudflare Turnstile or a similar check finishes. Submitting that form drops you into rotating blog articles with Step One and Step Two style buttons, minute long ad overlays, and more Continue hops before the shortener will talk to you again. Only then do you reach a banner or interstitial Get Link page with its own countdown. Close a tab early, trip an ad blocker lock, or mistime a step and the session can reset. That is why searches for adlinkfly captcha skip, short link continue bypass, get link countdown bypass, and please wait shortlink bypass stay common: the destination was already known to the shortener, but the site still wants a long click path through ads.';

const howItWorks =
  'On a supported captcha shortlink page, Skip Wait reads the destination that the shortener already embedded for unlock, shows a clear overlay, and opens that URL after the check is done so you are not forced through every blog Continue and Get Link click. Most destinations open as soon as the unlock is ready. If the destination is an OlaMovies drive download, Skip Wait keeps you on the overlay for the full chain length a careful manual visit would take (blog step waits plus the final Get Link timer), then navigates once. That hold is only for those drive links; other destinations stay fast. The extension does not buy Premium, does not paste your URL into a third party site, and does not ask you to decode anything yourself.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait from the Chrome Web Store',
    body: 'Add the free Skip Wait Chrome extension. Search skip wait chrome extension or chrome extension shortlink bypass if you are comparing helpers. The AdLinkFly token shortlink rules load on supported pages with no account or API key.',
  },
  {
    title: 'Leave the extension enabled',
    body: 'Keep Skip Wait on in Chrome. There is nothing to configure per link and no paste form. When you open a supported short URL, the overlay appears on the captcha page automatically.',
  },
  {
    title: 'Open the short link and finish the captcha',
    body: 'Click the shared short URL the same way you always do. Complete the Turnstile or other human check when the page asks. Skip Wait continues from there without sending you through blog Continue screens for a normal unlock.',
  },
  {
    title: 'Wait only when the destination needs it',
    body: 'For most files the overlay unlocks and opens quickly. If the destination is a protected OlaMovies drive download, stay on the tab while the countdown finishes the full visit length, then the drive opens like a normal arrival.',
  },
];

const skips = [
  'Manual blog Continue and Step One or Step Two clicking after captcha',
  'Long ad overlay waits on mediator articles for ordinary destinations',
  'Repeated Get Link countdown pages when the destination is already unlocked',
  'Copy paste into an online shortlink bypasser each time',
  'Guessing or decoding the destination yourself',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which short links does this bypass cover?',
    answer:
      'It covers the AdLinkFly captcha shortlink hosts listed in the domains section on this page, including ShrinkPe and LoanBuzz style pages that embed the destination behind a human check. Support follows those listed hosts; open a request if you hit a twin brand that still forces the full blog chain after captcha.',
  },
  {
    question: 'Do I still need to solve the captcha?',
    answer:
      'Yes. The shortener expects a completed human check before unlock. Skip Wait takes over after that check so you are not stuck on blog Continue hops and Get Link countdowns for a normal destination.',
  },
  {
    question: 'Why is there sometimes a long countdown before the file opens?',
    answer:
      'When the unlocked destination is a protected OlaMovies drive download, Skip Wait waits the full length of a careful manual visit before opening it. That is only for those drive links. Other destinations skip the blog chain and open once the shortener unlock is ready.',
  },
  {
    question: 'Is this the same as pasting the URL into an online bypasser?',
    answer:
      'No. Paste sites and bots often fail when blogs rotate or Turnstile is required. Skip Wait runs in your Chrome tab on the live shortlink page, so you keep your own session and captcha result without handing the link to a third party.',
  },
  {
    question: 'Will an ad blocker stop the shortlink unlock?',
    answer:
      'Aggressive blockers can lock the shortener or blog with an adblock warning. If progress stalls, allow ads or pause the blocker for that tab, reload, finish the captcha again, and let Skip Wait continue.',
  },
  {
    question: 'Is the AdLinkFly Token Payload bypass free?',
    answer:
      'Yes. Skip Wait is a free Chrome extension. This short link bypass runs on supported pages with no account, paid plan, or unlimited bypass subscription.',
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
