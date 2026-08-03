import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "KotakAnimeID";

const bypassType = "Skip Waiting Page";

const description = "KotakAnimeID bypass skips the out page countdown wait and shows anime episode download links by 1080p, 720p, and other resolutions instantly.";

const domains = [
  "kotakanimeid.link",
] as const;

const keywords = [
  "kotakanimeid bypass",
  "KotakAnimeID bypass extension",
  "kotakanimeid timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "KotakAnimeID bypass skips the out page countdown wait and shows anime episode download links by 1080p, 720p, and other resolutions instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "KotakAnimeID places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The KotakAnimeID bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for KotakAnimeID.",
  },
  {
    title: "Open a supported link",
    body: "Open a KotakAnimeID link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported KotakAnimeID delay.",
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
    question: "What out-page countdown does Skip Wait skip on KotakAnimeID?",
    answer: "Skip Wait bypasses the out page countdown wait on kotakanimeid.link and reveals anime episode download links without the timed gate.",
  },
  {
    question: "Does Skip Wait reveal anime episode links by 1080p and 720p resolution?",
    answer: "Yes. After bypassing the waiting page, episode download links organized by 1080p, 720p, and other resolutions become available immediately.",
  },
  {
    question: "How does Skip Wait help reach download links on kotakanimeid.link?",
    answer: "The extension detects the gate screen and redirects you past please wait and continue screens to the destination link automatically.",
  },
  {
    question: "Is the KotakAnimeID bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The KotakAnimeID bypass runs on supported pages with no account or paid plan required.",
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
