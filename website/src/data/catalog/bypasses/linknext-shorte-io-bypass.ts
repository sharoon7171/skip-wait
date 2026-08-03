import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "LinkNext / Shorte.io";

const bypassType = "Skip Short Link";

const description = "LinkNext bypass skips gate waits, blog mediator steps, and countdown timers on ad link shorteners for instant unlock of your destination URL.";

const domains = [
  "linknext.io",
  "shorte.io",
  "starkroboticsfrc.com",
  "randevuayir.com",
] as const;

const keywords = [
  "linknext / shorte.io bypass",
  "LinkNext / Shorte.io bypass extension",
  "linknext / shorte.io timer bypass",
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

const intro = "LinkNext bypass skips gate waits, blog mediator steps, and countdown timers on ad link shorteners for instant unlock of your destination URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "LinkNext monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Io monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The LinkNext / Shorte.io bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for LinkNext / Shorte.io.",
  },
  {
    title: "Open a supported link",
    body: "Open a LinkNext / Shorte.io link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported LinkNext / Shorte.io delay.",
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
    question: "Which LinkNext and Shorte.io domains does Skip Wait support?",
    answer: "Skip Wait covers linknext.io, shorte.io, starkroboticsfrc.com, and randevuayir.com, bypassing gate waits and blog mediator steps on all four.",
  },
  {
    question: "What blog mediator steps does Skip Wait skip on ad link shorteners?",
    answer: "Blog mediator hops, countdown timers, and short link verification steps are automated until your destination URL opens.",
  },
  {
    question: "Can Skip Wait bypass gate waits and countdown timers on linknext.io?",
    answer: "Yes. Open any supported LinkNext or Shorte.io monetized link and the extension continues through gates until the final URL is ready.",
  },
  {
    question: "Is the LinkNext bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The LinkNext bypass runs on supported pages with no account or paid plan required.",
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
