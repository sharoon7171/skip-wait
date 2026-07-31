import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Rinku";

const bypassType = "Skip Short Link";

const description = "Rinku bypass skips landing page countdowns, captcha gates, and unlock timers on this link shortener for redirect to your destination URL faster.";

const domains = [
  "excelad.top",
  "7mb.io",
  "rinku.pro",
  "rinku.me",
] as const;

const keywords = [
  "rinku bypass",
  "Rinku bypass extension",
  "rinku timer bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "ad link bypass",
  "short link bypass",
  "monetized link bypass",
] as const;

const intro = "If Rinku links keep adding countdowns and go pages, Skip Wait is the Chrome extension that bypasses those short link waits on 4 supported websites in this network for you.";

const problem = "Rinku monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A Rinku bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Install Skip Wait, paste or click a Rinku short link, and let the extension handle the unlock flow. It bypasses countdown timers, go pages, and captcha follow ups on supported Rinku URLs, then opens the final destination automatically. Gate hops on 4 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Rinku bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Rinku; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Rinku link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Rinku delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Rinku skip short link flows",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Rinku domains like rinku.pro and rinku.me does Skip Wait support?",
    answer: "Skip Wait covers excelad.top, 7mb.io, rinku.pro, and rinku.me, bypassing landing page countdowns and unlock timers on all four.",
  },
  {
    question: "What landing page countdowns does Skip Wait skip on Rinku links?",
    answer: "Landing page countdowns, captcha gates, and go page redirect hops are automated until your destination URL opens.",
  },
  {
    question: "Does Skip Wait handle captcha gates on Rinku shorteners?",
    answer: "Yes. The extension bypasses countdown timers and handles captcha follow-ups on supported Rinku URLs, then opens the final destination.",
  },
  {
    question: "Is the Rinku bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Rinku bypass runs on supported pages with no account or paid plan required.",
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
