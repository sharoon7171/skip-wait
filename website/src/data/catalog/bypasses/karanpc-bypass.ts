import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "KaranPC";

const bypassType = "Skip Waiting Page";

const description = "KaranPC bypass skips the download progress bar wait timer and enables the continue to file button immediately on software download pages for you.";

const domains = [
  "inloadapi.com",
] as const;

const keywords = [
  "karanpc bypass",
  "KaranPC bypass extension",
  "karanpc timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "KaranPC bypass skips the download progress bar wait timer and enables the continue to file button immediately on software download pages for you. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "KaranPC places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for KaranPC.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The KaranPC bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for KaranPC.",
  },
  {
    title: "Open a supported link",
    body: "Open a KaranPC link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported KaranPC delay.",
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
    question: "What progress bar wait does Skip Wait skip on KaranPC downloads?",
    answer: "Skip Wait skips the download progress bar wait timer on inloadapi.com and enables the continue to file button immediately on KaranPC software pages.",
  },
  {
    question: "Does Skip Wait enable the continue-to-file button immediately on inloadapi.com?",
    answer: "Yes. The please wait gate that blocks the continue button is bypassed so you reach the file link without waiting for the progress bar to finish.",
  },
  {
    question: "How does Skip Wait speed up KaranPC software download pages?",
    answer: "When the waiting page loads, the extension runs in the background and sends you straight to the target file URL on supported KaranPC links.",
  },
  {
    question: "Is the KaranPC bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The KaranPC bypass runs on supported pages with no account or paid plan required.",
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
