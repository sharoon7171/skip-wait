import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "XDMovies Mediator";

const bypassType = "Skip Waiting Page";

const description = "XDMovies bypass skips the extra waiting page and verification steps in the download mediator chain to open your file link faster and automatically.";

const domains = [
  "latestnewsonline.sbs",
] as const;

const keywords = [
  "xdmovies mediator bypass",
  "XDMovies Mediator bypass extension",
  "xdmovies mediator timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "XDMovies bypass skips the extra waiting page and verification steps in the download mediator chain to open your file link faster and automatically. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "XDMovies Mediator places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for XDMovies Mediator.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The XDMovies Mediator bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for XDMovies Mediator.",
  },
  {
    title: "Open a supported link",
    body: "Open a XDMovies Mediator link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported XDMovies Mediator delay.",
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
    question: "What verification steps does Skip Wait skip in the XDMovies download mediator chain?",
    answer: "Skip Wait skips the extra waiting page and verification steps in the XDMovies download mediator chain on latestnewsonline.sbs to open your file link faster.",
  },
  {
    question: "Does Skip Wait bypass the extra waiting page on latestnewsonline.sbs?",
    answer: "Yes. please wait and click-to-continue gate screens are bypassed automatically when you open an XDMovies Mediator link.",
  },
  {
    question: "How does Skip Wait help open file links faster from XDMovies mediators?",
    answer: "When the mediator waiting page loads, the extension skips the delay layer and sends you straight to the target file URL.",
  },
  {
    question: "Is the XDMovies bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The XDMovies bypass runs on supported pages with no account or paid plan required.",
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
