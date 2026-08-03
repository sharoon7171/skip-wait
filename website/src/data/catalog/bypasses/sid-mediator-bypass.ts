import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "SID Mediator";

const bypassType = "Skip Waiting Page";

const description = "SID bypass skips the session waiting page on mediator sites and continues to your destination link after setting the required access cookie.";

const domains = [
  "cloud.unblockedgames.world",
  "health.jkssbworld.in",
  "tech.examzculture.in",
] as const;

const keywords = [
  "sid mediator bypass",
  "SID Mediator bypass extension",
  "sid mediator timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "SID bypass skips the session waiting page on mediator sites and continues to your destination link after setting the required access cookie. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "SID Mediator places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "When the waiting page loads, Skip Wait runs in the background, skips the delay layer, and sends you straight to the target URL supported for SID Mediator.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The SID Mediator bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for SID Mediator.",
  },
  {
    title: "Open a supported link",
    body: "Open a SID Mediator link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported SID Mediator delay.",
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
    question: "What session waiting page does Skip Wait bypass on SID mediator sites?",
    answer: "Skip Wait skips the session waiting page on SID mediator sites and continues to your destination after setting the required access cookie.",
  },
  {
    question: "Does Skip Wait set the required access cookie before continuing?",
    answer: "Yes. The extension sets the access cookie the mediator expects, then bypasses the delay layer and redirects to your target URL.",
  },
  {
    question: "Which SID mediator domains like cloud.unblockedgames.world are covered?",
    answer: "Three sites are supported: cloud.unblockedgames.world, health.jkssbworld.in, and tech.examzculture.in.",
  },
  {
    question: "Is the SID bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The SID bypass runs on supported pages with no account or paid plan required.",
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
