import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "LinkUnlocker";

const bypassType = "Skip Countdown";

const description = "LinkUnlocker bypass skips the content locker countdown timer and unlocks your link or copies the result text automatically without any waiting.";

const domains = [
  "linkunlocker.com",
] as const;

const keywords = [
  "linkunlocker bypass",
  "LinkUnlocker bypass extension",
  "linkunlocker timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Waiting on LinkUnlocker unlock countdowns adds up fast. Skip Wait bypasses the timer on the supported website and continues the flow automatically when the site allows it.";

const problem = "LinkUnlocker puts a countdown timer or unlock delay in front of the continue or get link step. A LinkUnlocker bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported LinkUnlocker page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the LinkUnlocker bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for LinkUnlocker; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a LinkUnlocker link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported LinkUnlocker delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "LinkUnlocker skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What content locker countdown does Skip Wait skip on LinkUnlocker?",
    answer: "Skip Wait bypasses the content locker countdown timer on linkunlocker.com and unlocks your link or copies the result text automatically.",
  },
  {
    question: "Can Skip Wait copy result text automatically from linkunlocker.com?",
    answer: "Yes. When the page returns text instead of a redirect, the extension copies the result content as part of the bypass flow.",
  },
  {
    question: "How does Skip Wait unlock links behind LinkUnlocker timers?",
    answer: "The extension activates on countdown flows and bypasses get link delay screens so you reach the unlocked content faster.",
  },
  {
    question: "Is the LinkUnlocker bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The LinkUnlocker bypass runs on supported pages with no account or paid plan required.",
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
