import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "MultiUp";

const bypassType = "Skip Waiting Page";

const description = "MultiUp bypass skips the download waiting page and opens the mirror download list automatically on this multi host file aggregator instantly.";

const domains = [
  "multiup.io",
] as const;

const keywords = [
  "multiup bypass",
  "MultiUp bypass extension",
  "multiup timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "MultiUp bypass skips the download waiting page and opens the mirror download list automatically on this multi host file aggregator instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "MultiUp places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for MultiUp.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The MultiUp bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for MultiUp.",
  },
  {
    title: "Open a supported link",
    body: "Open a MultiUp link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported MultiUp delay.",
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
    question: "What download waiting page does Skip Wait skip on multiup.io?",
    answer: "Skip Wait bypasses the download waiting page on multiup.io and opens the mirror download list automatically on this multi-host aggregator.",
  },
  {
    question: "Does Skip Wait open the mirror download list automatically?",
    answer: "Yes. Instead of sitting on a please wait gate, the extension sends you straight to the mirror list where you pick your file host.",
  },
  {
    question: "How does Skip Wait help with this multi-host file aggregator?",
    answer: "Gate pages and manual continue button loops before the mirror list are bypassed so you reach download options without repeated clicks.",
  },
  {
    question: "Is the MultiUp bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The MultiUp bypass runs on supported pages with no account or paid plan required.",
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
