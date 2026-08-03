import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Clipi";

const bypassType = "Skip Waiting Page";

const description = "Clipi bypass skips the short link waiting page on this URL shortener and sends you straight to the long destination URL without delay or clicks.";

const domains = [
  "clipi.cc",
] as const;

const keywords = [
  "clipi bypass",
  "Clipi bypass extension",
  "clipi timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Clipi bypass skips the short link waiting page on this URL shortener and sends you straight to the long destination URL without delay or clicks. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Clipi places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Clipi bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Clipi.",
  },
  {
    title: "Open a supported link",
    body: "Open a Clipi link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Clipi delay.",
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
    question: "What waiting page does Skip Wait bypass on clipi.cc links?",
    answer: "Skip Wait skips the short link waiting page on clipi.cc and sends you straight to the long URL without sitting on please wait or click-to-continue screens.",
  },
  {
    question: "Do I need to manually continue past Clipi gate screens?",
    answer: "No. The extension detects gate pages before the destination URL and bypasses manual continue button loops automatically.",
  },
  {
    question: "How fast does Skip Wait redirect me to the long URL from a Clipi short link?",
    answer: "When the waiting page loads, Skip Wait runs in the background and redirects immediately to the target URL instead of after a timed delay.",
  },
  {
    question: "Is the Clipi bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Clipi bypass runs on supported pages with no account or paid plan required.",
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
