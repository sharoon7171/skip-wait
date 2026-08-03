import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AdFocus";

const bypassType = "Skip Waiting Page";

const description = "AdFocus bypass skips the ad waiting page on monetized download links so you pass the gate screen without manual clicks or forced delay steps.";

const domains = [
  "adfoc.us",
] as const;

const keywords = [
  "adfocus bypass",
  "AdFocus bypass extension",
  "adfocus timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "AdFocus bypass skips the ad waiting page on monetized download links so you pass the gate screen without manual clicks or forced delay steps. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "AdFocus places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The AdFocus bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for AdFocus.",
  },
  {
    title: "Open a supported link",
    body: "Open a AdFocus link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported AdFocus delay.",
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
    question: "What ad gate does Skip Wait bypass on adfoc.us links?",
    answer: "Skip Wait detects the ad waiting page on monetized AdFocus download links and bypasses the please wait gate so you reach the file destination without manual clicks.",
  },
  {
    question: "Can I skip the please wait screen on AdFocus monetized downloads?",
    answer: "Yes. When the AdFocus gate screen loads, Skip Wait removes the click-to-continue step and redirects you to the destination link automatically.",
  },
  {
    question: "How does Skip Wait handle AdFocus continue button loops?",
    answer: "Instead of clicking continue repeatedly on filler screens, the extension skips the delay layer and sends you straight to the target URL on adfoc.us.",
  },
  {
    question: "Is the AdFocus bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The AdFocus bypass runs on supported pages with no account or paid plan required.",
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
