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

const intro = "TipsGuru prolink flows hide the destination behind access waits. Skip Wait bypasses those unlock timers on 6 supported websites in this network and resolves the final link faster.";

const problem = "TipsGuru uses prolink access waits and unlock timers on monetized links. A TipsGuru bypass opens the destination without those delays.";

const howItWorks = "Install Skip Wait, browse to a supported TipsGuru page, and use the site normally. The extension activates on recognized skip prolink wait flows and bypasses or automates the wait so you reach the content faster. Prolink unlock timers on 6 supported websites are skipped so the destination opens faster.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the TipsGuru bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for TipsGuru; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a TipsGuru link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported TipsGuru delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "TipsGuru skip prolink wait flows",
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
