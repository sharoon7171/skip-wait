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

const intro = "FlightSim bypass skips the addon download countdown timer dialog so flight simulator mods and add ons start downloading immediately for free users. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FlightSim.to shows a download countdown dialog before the file starts. A FlightSim.to bypass clears that timer so the download begins right away.";

const howItWorks = "To page, and use the site normally. The extension activates on recognized skip download timer flows and bypasses or automates the wait so you reach the content faster. The countdown dialog on the supported website is cleared so the file transfer can start right away.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FlightSim.to bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FlightSim.to.",
  },
  {
    title: "Open a supported link",
    body: "Open a FlightSim.to link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FlightSim.to delay.",
  },
];

const skips = [
  "Download Timer that block the destination",
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
