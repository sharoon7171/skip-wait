import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Linclik";

const bypassType = "Skip Waiting Page";

const description = "Linclik bypass skips the continue gate and AdLinkFly unlock countdown on this link shortener for automatic redirect to your destination URL.";

const domains = [
  "linclik.com",
] as const;

const keywords = [
  "linclik bypass",
  "Linclik bypass extension",
  "linclik timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Linclik bypass skips the continue gate and AdLinkFly unlock countdown on this link shortener for automatic redirect to your destination URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Linclik places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Linclik bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Linclik.",
  },
  {
    title: "Open a supported link",
    body: "Open a Linclik link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Linclik delay.",
  },
];

const skips = [
  "Waiting pages and continue gates",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What continue gate does Skip Wait bypass on linclik.com?",
    answer: "Skip Wait skips the continue gate and AdLinkFly unlock countdown on linclik.com for automatic redirect to your destination link.",
  },
  {
    question: "Does Skip Wait skip the AdLinkFly unlock countdown on Linclik?",
    answer: "Yes. Gate pages and manual continue button loops are bypassed so you are not stuck on filler screens between the short link and your URL.",
  },
  {
    question: "Can I get automatic redirect to my destination from Linclik links?",
    answer: "Yes. Open any Linclik waiting page with Skip Wait installed and the extension handles the bypass without repeated continue clicks.",
  },
  {
    question: "Is the Linclik bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Linclik bypass runs on supported pages with no account or paid plan required.",
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
