import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "TipsGuru";

const bypassType = "Skip Prolink Wait";

const description = "TipsGuru bypass skips prolink access waits and unlock timers on this Indian link monetization network to open your destination faster every time.";

const domains = [
  "tipsguru.in",
  "vidyarays.com",
  "mineverse360.com",
  "stream.testuk.org",
  "rarestudy.in",
  "samfygros.com",
] as const;

const keywords = [
  "tipsguru bypass",
  "TipsGuru bypass extension",
  "tipsguru timer bypass",
  "skip prolink wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "prolink bypass",
  "unlock timer bypass",
] as const;

const intro = "TipsGuru bypass skips prolink access waits and unlock timers on this Indian link monetization network to open your destination faster every time. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "TipsGuru uses prolink access waits and unlock timers on monetized links. A TipsGuru bypass opens the destination without those delays.";

const howItWorks = "Skip Wait activates on recognized skip prolink wait flows and bypasses or automates the wait so you reach the content faster.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The TipsGuru bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for TipsGuru.",
  },
  {
    title: "Open a supported link",
    body: "Open a TipsGuru link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported TipsGuru delay.",
  },
];

const skips = [
  "Prolink Wait that block the destination",
  "Prolink access wait screens",
  "Unlock timer windows",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How many TipsGuru network sites does Skip Wait cover?",
    answer: "Skip Wait supports six TipsGuru sites including tipsguru.in, vidyarays.com, mineverse360.com, and rarestudy.in.",
  },
  {
    question: "What prolink access waits does Skip Wait skip on tipsguru.in?",
    answer: "Prolink access wait screens and unlock timer windows on this Indian link monetization network are bypassed for faster destination access.",
  },
  {
    question: "Can Skip Wait bypass unlock timers on this Indian link monetization network?",
    answer: "Yes. The extension activates on prolink wait flows across supported TipsGuru hosts and resolves the final link faster.",
  },
  {
    question: "Is the TipsGuru bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The TipsGuru bypass runs on supported pages with no account or paid plan required.",
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
