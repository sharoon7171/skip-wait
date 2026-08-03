import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "iCutLink";

const bypassType = "Skip Short Link";

const description = "iCutLink bypass skips go page countdown timers and multi step blog waits on this link shortener to unlock your destination URL faster every time.";

const domains = [
  "icutlink.com",
  "toolskitpro.net",
] as const;

const keywords = [
  "icutlink bypass",
  "iCutLink bypass extension",
  "icutlink timer bypass",
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

const intro = "iCutLink bypass skips go page countdown timers and multi step blog waits on this link shortener to unlock your destination URL faster every time. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "iCutLink monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The iCutLink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for iCutLink.",
  },
  {
    title: "Open a supported link",
    body: "Open a iCutLink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported iCutLink delay.",
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
    question: "What go page countdown does Skip Wait skip on icutlink.com?",
    answer: "Skip Wait bypasses go page countdown timers and multi step blog waits on icutlink.com and toolskitpro.net to unlock your destination URL.",
  },
  {
    question: "Does Skip Wait handle multi step blog waits on iCutLink shorteners?",
    answer: "Yes. Ad link countdown timers and unlock redirect hops are automated until your destination URL is ready on supported iCutLink hosts.",
  },
  {
    question: "Which iCutLink domains like toolskitpro.net are covered?",
    answer: "Both icutlink.com and toolskitpro.net are supported, with short link verification steps bypassed on each.",
  },
  {
    question: "Is the iCutLink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The iCutLink bypass runs on supported pages with no account or paid plan required.",
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
