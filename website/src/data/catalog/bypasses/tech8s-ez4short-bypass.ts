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

const intro = "Tech8s bypass skips gate page waits and redirect hops on Ez4Short style ad link shorteners to open your destination URL automatically and fast. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Tech8s monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Tech8s / Ez4Short bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Tech8s / Ez4Short.",
  },
  {
    title: "Open a supported link",
    body: "Open a Tech8s / Ez4Short link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Tech8s / Ez4Short delay.",
  },
];

const skips = [
  "Short-link verification gates",
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
