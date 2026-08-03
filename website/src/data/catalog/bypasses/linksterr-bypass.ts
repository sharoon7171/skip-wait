import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Linksterr";

const bypassType = "Skip Waiting Page";

const description = "Linksterr bypass skips the gateway waiting page on this URL shortener and redirects you to the destination link without manual steps or waits.";

const domains = [
  "linksterr.com",
] as const;

const keywords = [
  "linksterr bypass",
  "Linksterr bypass extension",
  "linksterr timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Linksterr bypass skips the gateway waiting page on this URL shortener and redirects you to the destination link without manual steps or waits. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Linksterr places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Linksterr bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Linksterr.",
  },
  {
    title: "Open a supported link",
    body: "Open a Linksterr link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Linksterr delay.",
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
    question: "What gateway waiting page does Skip Wait bypass on linksterr.com?",
    answer: "Skip Wait skips the gateway waiting page on linksterr.com and redirects you to the destination link without manual steps.",
  },
  {
    question: "Do I need manual steps to reach my link from Linksterr with Skip Wait?",
    answer: "No. please wait screens and click-to-continue gates are bypassed automatically when you open a Linksterr URL.",
  },
  {
    question: "How does Skip Wait redirect me from Linksterr to the destination?",
    answer: "The extension detects the gate screen and sends you to the real destination URL instead of asking you to click continue repeatedly.",
  },
  {
    question: "Is the Linksterr bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Linksterr bypass runs on supported pages with no account or paid plan required.",
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
