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

const intro = "Tired of PRMovies waiting pages that block every link? Skip Wait is a free Chrome extension built to bypass those gate screens on the supported website without extra setup.";

const problem = "PRMovies places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a PRMovies bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a PRMovies link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for PRMovies. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the PRMovies bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for PRMovies; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a PRMovies link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported PRMovies delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "PRMovies skip waiting page flows",
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
