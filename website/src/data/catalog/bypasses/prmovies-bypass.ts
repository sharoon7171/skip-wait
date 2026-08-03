import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "PRMovies";

const bypassType = "Skip Waiting Page";

const description = "PRMovies bypass skips the landing page wait screen and opens the main streaming site URL automatically without sitting through the usual delay.";

const domains = [
  "prmovies.mba",
] as const;

const keywords = [
  "prmovies bypass",
  "PRMovies bypass extension",
  "prmovies timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "PRMovies bypass skips the landing page wait screen and opens the main streaming site URL automatically without sitting through the usual delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "PRMovies places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for PRMovies.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The PRMovies bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for PRMovies.",
  },
  {
    title: "Open a supported link",
    body: "Open a PRMovies link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported PRMovies delay.",
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
    question: "What landing page wait does Skip Wait skip on prmovies.mba?",
    answer: "Skip Wait bypasses the landing page wait screen on prmovies.mba and opens the main streaming site URL automatically.",
  },
  {
    question: "Does Skip Wait open the main streaming site URL automatically?",
    answer: "Yes. Instead of sitting through the landing delay, the extension sends you straight to the main PRMovies site.",
  },
  {
    question: "How does Skip Wait help me reach PRMovies content faster?",
    answer: "Gate pages and please wait screens before the streaming homepage are bypassed so you start browsing content without the initial delay.",
  },
  {
    question: "Is the PRMovies bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The PRMovies bypass runs on supported pages with no account or paid plan required.",
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
