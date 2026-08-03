import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Goost";

const bypassType = "Skip Short Link";

const description = "Goost bypass skips continue and blog wait timers, pins reCAPTCHA for you to solve, then opens the destination from the statistics unlock URL.";

const domains = [
  "goo.st",
  "kreditexperte.online",
] as const;

const keywords = [
  "goost bypass",
  "Goost bypass extension",
  "goost timer bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "ad link bypass",
  "short link bypass",
  "monetized link bypass",
] as const;

const intro = "Goost bypass skips continue and blog wait timers, pins reCAPTCHA for you to solve, then opens the destination from the statistics unlock URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Goost monetized short links chain gate pages, captcha screens, and unlock timers before the destination.";

const howItWorks = "Skip Wait automates the short link bypass steps and continues through gates until your destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Goost bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Goost.",
  },
  {
    title: "Open a supported link",
    body: "Open a Goost link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Goost delay.",
  },
];

const skips = [
  "Short-link verification gates",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What happens with reCAPTCHA on Goost links when using Skip Wait?",
    answer: "Skip Wait pins the reCAPTCHA for you to solve, then skips continue and blog wait timers and opens the destination from the statistics unlock URL.",
  },
  {
    question: "Which Goost domains like goo.st does Skip Wait support?",
    answer: "Skip Wait handles goo.st and kreditexperte.online, automating short link bypass steps and go page redirect hops on both.",
  },
  {
    question: "How does Skip Wait open the destination from the statistics unlock URL?",
    answer: "After you complete captcha when required, the extension continues through gates and unlocks your link from the Goost statistics page automatically.",
  },
  {
    question: "Is the Goost bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Goost bypass runs on supported pages with no account or paid plan required.",
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
