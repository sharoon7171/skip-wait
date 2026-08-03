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

const intro = "LinkUnlocker bypass skips the content locker countdown timer and unlocks your link or copies the result text automatically without any waiting. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "LinkUnlocker puts a countdown timer or unlock delay in front of the continue or get link step. A LinkUnlocker bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The LinkUnlocker bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for LinkUnlocker.",
  },
  {
    title: "Open a supported link",
    body: "Open a LinkUnlocker link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported LinkUnlocker delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
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
