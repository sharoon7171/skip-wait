import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FlightSim.to";

const bypassType = "Skip Download Timer";

const description = "FlightSim bypass skips the addon download countdown timer dialog so flight simulator mods and add ons start downloading immediately for free users.";

const domains = [
  "flightsim.to",
] as const;

const keywords = [
  "flightsim.to bypass",
  "FlightSim.to bypass extension",
  "flightsim.to timer bypass",
  "skip download timer",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "download countdown bypass",
  "addon download skip",
] as const;

const intro = "FlightSim.to shows a download countdown before files start. Skip Wait bypasses that addon download timer on the supported website so the file begins immediately.";

const problem = "FlightSim.to shows a download countdown dialog before the file starts. A FlightSim.to bypass clears that timer so the download begins right away.";

const howItWorks = "Install Skip Wait, browse to a supported FlightSim.to page, and use the site normally. The extension activates on recognized skip download timer flows and bypasses or automates the wait so you reach the content faster. The countdown dialog on the supported website is cleared so the file transfer can start right away.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the FlightSim.to bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for FlightSim.to; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a FlightSim.to link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported FlightSim.to delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "FlightSim.to skip download timer flows",
  "Addon download countdown dialogs",
  "Pre download delay timers",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What countdown dialog does Skip Wait skip before FlightSim.to addon downloads?",
    answer: "Skip Wait bypasses the addon download countdown timer dialog on flightsim.to so flight simulator mods and add-ons start downloading immediately.",
  },
  {
    question: "Can flight simulator mods start downloading immediately with Skip Wait?",
    answer: "Yes. The pre-download delay timer is bypassed and the file download begins as soon as you trigger it on supported FlightSim.to pages.",
  },
  {
    question: "Does Skip Wait bypass timed locks on FlightSim.to download pages?",
    answer: "Yes. Skip Wait activates on download timer flows and bypasses the wait so you reach the file without sitting through the countdown dialog.",
  },
  {
    question: "Is the FlightSim.to bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FlightSim.to bypass runs on supported pages with no account or paid plan required.",
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
