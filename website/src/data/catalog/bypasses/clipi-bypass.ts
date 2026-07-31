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

const intro = "Tired of Clipi waiting pages that block every link? Skip Wait is a free Chrome extension built to bypass those gate screens on the supported website without extra setup.";

const problem = "Clipi places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Clipi bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait from the Chrome Web Store, open any Clipi waiting page, and keep browsing normally. The extension detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Clipi bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Clipi; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Clipi link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Clipi delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Clipi skip waiting page flows",
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
