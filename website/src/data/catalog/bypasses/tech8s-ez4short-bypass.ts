import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Tech8s / Ez4Short";

const bypassType = "Skip Short Link";

const description = "Tech8s bypass skips gate page waits and redirect hops on Ez4Short style ad link shorteners to open your destination URL automatically and fast.";

const domains = [
  "ez4short.com",
  "game5s.com",
  "tech8s.net",
  "link4m.co",
] as const;

const keywords = [
  "tech8s / ez4short bypass",
  "Tech8s / Ez4Short bypass extension",
  "tech8s / ez4short timer bypass",
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

const intro = "If Tech8s / Ez4Short links keep adding countdowns and go pages, Skip Wait is the Chrome extension that bypasses those short link waits on 4 supported websites in this network for you.";

const problem = "Tech8s monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A Tech8s bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported Tech8s / Ez4Short monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 4 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Tech8s bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Tech8s; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Tech8s link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Tech8s delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Tech8s / Ez4Short skip short link flows",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Ez4Short-style domains like ez4short.com does Skip Wait support?",
    answer: "Skip Wait covers ez4short.com, game5s.com, tech8s.net, and link4m.co, bypassing gate page waits on all four.",
  },
  {
    question: "What gate page waits does Skip Wait skip on Tech8s ad links?",
    answer: "Gate page waits and redirect hops on Ez4Short-style ad link shorteners are automated until your destination URL opens.",
  },
  {
    question: "Can Skip Wait open my destination from Tech8s redirect hops automatically?",
    answer: "Yes. Ad link countdown timers and unlock redirect hops are handled without you clicking through each gate yourself.",
  },
  {
    question: "Is the Tech8s bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Tech8s bypass runs on supported pages with no account or paid plan required.",
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
