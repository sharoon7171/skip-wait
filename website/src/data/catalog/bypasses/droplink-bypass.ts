import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Droplink";

const bypassType = "Skip Countdown";

const description = "Droplink bypass skips the download countdown timer and reveals the hidden file link from this AdLinkFly based shortener instantly without delay.";

const domains = [
  "droplink.co",
] as const;

const keywords = [
  "droplink bypass",
  "Droplink bypass extension",
  "droplink timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Droplink countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on the supported website and unlocks the link or download step faster.";

const problem = "Droplink puts a countdown timer or unlock delay in front of the continue or get link step. A Droplink bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Droplink page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Droplink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Droplink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Droplink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Droplink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Droplink skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What hidden file link does Skip Wait reveal on droplink.co?",
    answer: "Skip Wait skips the download countdown timer on this AdLinkFly shortener and reveals the hidden file link instantly instead of after a timed wait.",
  },
  {
    question: "Does Skip Wait skip the download countdown on this AdLinkFly shortener?",
    answer: "Yes. Unlock countdown timers and get link delay screens on droplink.co are bypassed so the file link appears right away.",
  },
  {
    question: "How quickly can I get past the Droplink get link timer?",
    answer: "As soon as the Droplink page loads, Skip Wait automates the countdown bypass and continues the flow to your download link.",
  },
  {
    question: "Is the Droplink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Droplink bypass runs on supported pages with no account or paid plan required.",
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
