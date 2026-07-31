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

const intro = "Looking for a SID Mediator bypass that actually skips the please wait screen? Skip Wait removes the manual click through on supported websites on this network and sends you to the real destination faster.";

const problem = "SID Mediator places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a SID Mediator bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a SID Mediator link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for SID Mediator. You get past continue loops on 3 supported websites and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the SID bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for SID; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a SID Mediator link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported SID Mediator delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "SID Mediator skip waiting page flows",
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
