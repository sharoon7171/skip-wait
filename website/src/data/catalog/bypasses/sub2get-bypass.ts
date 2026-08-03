import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub2Get";

const bypassType = "Skip Waiting Page";

const description = "Sub2Get bypass skips the subscribe to unlock waiting page and jumps straight to your destination link from this monetized shortener instantly.";

const domains = [
  "sub2get.com",
] as const;

const keywords = [
  "sub2get bypass",
  "Sub2Get bypass extension",
  "sub2get timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Sub2Get bypass skips the subscribe to unlock waiting page and jumps straight to your destination link from this monetized shortener instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Sub2Get places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for Sub2Get.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Sub2Get bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Sub2Get.",
  },
  {
    title: "Open a supported link",
    body: "Open a Sub2Get link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Sub2Get delay.",
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
    question: "What subscribe-to-unlock waiting page does Skip Wait bypass on Sub2Get?",
    answer: "Skip Wait bypasses the subscribe to unlock waiting page on sub2get.com and jumps straight to your destination link.",
  },
  {
    question: "Does Skip Wait jump straight to the destination from sub2get.com links?",
    answer: "Yes. Gate pages and please wait screens in the Sub2Get monetized shortener flow are bypassed for direct redirect to your URL.",
  },
  {
    question: "How does Skip Wait handle Sub2Get monetized shortener gates?",
    answer: "When the waiting page loads, the extension skips the delay layer and sends you to the target URL without manual continue clicks.",
  },
  {
    question: "Is the Sub2Get bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Sub2Get bypass runs on supported pages with no account or paid plan required.",
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
