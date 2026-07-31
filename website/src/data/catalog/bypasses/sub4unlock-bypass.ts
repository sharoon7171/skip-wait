import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub4Unlock";

const bypassType = "Skip Waiting Page";

const description = "Sub4Unlock bypass skips all creator task slots on sub4unlock.com and sub4unlock.pro—subscribe, follow, join, like, comment, custom links, countdowns, and password gates—for instant redirect to your destination URL.";

const domains = [
  "sub4unlock.com",
  "sub4unlock.pro",
] as const;

const keywords = [
  "sub4unlock bypass",
  "Sub4Unlock bypass extension",
  "sub4unlock.com bypass",
  "sub4unlock.pro bypass",
  "sub4unlock timer bypass",
  "sub4unlock password bypass",
  "sub4unlock social unlock",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Want a Sub4Unlock bypass for monetized short links with multiple unlock actions? Skip Wait handles every creator task slot, countdown wait, and password gate on sub4unlock.com and sub4unlock.pro so you reach the destination without working through the full unlock list.";

const problem = "Sub4Unlock on .com and .pro can require up to ten actions before the destination—subscribe, follow, join, like, comment, or custom links—then countdown waits and an optional password screen. A Sub4Unlock bypass is what people want when those gates stand between them and the real URL.";

const howItWorks = "Add Skip Wait to Chrome and open a Sub4Unlock short link on .com or .pro. The extension matches the unlock pages, reads the destination already on the page, and redirects you without requiring each task slot to be completed.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Sub4Unlock bypass activates on supported unlock pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle for Sub4Unlock; supported unlock paths run when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a sub4unlock.com or sub4unlock.pro short link as usual. Task slots may include any mix of social or custom actions—Skip Wait skips the unlock layer as a whole.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait skips the task and password layer on supported pages and sends you to the destination URL.",
  },
];

const skips = [
  "All url1–url10 creator task slots (subscribe, follow, join, like, comment, custom)",
  "Countdown waits before Get Link",
  "Password and code gates on the final page",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which unlock actions does Skip Wait cover on Sub4Unlock?",
    answer: "Every creator task slot on supported pages—subscribe, follow, join, like, comment, custom links—plus countdown waits and password gates on sub4unlock.com and sub4unlock.pro.",
  },
  {
    question: "Does Skip Wait jump straight to the destination from Sub4Unlock short links?",
    answer: "Yes. Supported /S/, LP, and LPD unlock pages are handled so you reach the destination without completing the full action list.",
  },
  {
    question: "Which Sub4Unlock domains does this bypass cover?",
    answer: "This entry covers sub4unlock.com and sub4unlock.pro. Separate catalog pages cover sub4unlock.me and sub4unlock.io.",
  },
  {
    question: "Is the Sub4Unlock bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Sub4Unlock bypass runs on supported pages with no account or paid plan required.",
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
