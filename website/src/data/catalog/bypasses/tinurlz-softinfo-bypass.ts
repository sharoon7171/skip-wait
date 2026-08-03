import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Tinurlz / Softinfo";

const bypassType = "Skip Waiting Page";

const description = "Tinurlz bypass skips the short link waiting page and unwraps nested download redirects to open your target file or URL right away without delay.";

const domains = [
  "tinurlz.com",
  "softinfo.blog",
] as const;

const keywords = [
  "tinurlz / softinfo bypass",
  "Tinurlz / Softinfo bypass extension",
  "tinurlz / softinfo timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Tinurlz bypass skips the short link waiting page and unwraps nested download redirects to open your target file or URL right away without delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Tinurlz places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for Tinurlz / Softinfo.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Tinurlz / Softinfo bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Tinurlz / Softinfo.",
  },
  {
    title: "Open a supported link",
    body: "Open a Tinurlz / Softinfo link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Tinurlz / Softinfo delay.",
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
    question: "Which Tinurlz and Softinfo domains does Skip Wait support?",
    answer: "Skip Wait handles tinurlz.com and softinfo.blog, bypassing short link waiting pages and nested download redirects on both.",
  },
  {
    question: "Does Skip Wait unwrap nested download redirects from tinurlz.com links?",
    answer: "Yes. The extension skips the waiting page and follows through nested redirects to open your target file or URL right away.",
  },
  {
    question: "What short link waiting page does Skip Wait bypass on Softinfo?",
    answer: "please wait and click-to-continue gate screens on Softinfo links are bypassed for direct redirect to the destination.",
  },
  {
    question: "Is the Tinurlz bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Tinurlz bypass runs on supported pages with no account or paid plan required.",
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
