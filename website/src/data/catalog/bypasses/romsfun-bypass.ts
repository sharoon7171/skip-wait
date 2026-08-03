import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "RomsFun";

const bypassType = "Skip Countdown";

const description = "RomsFun bypass skips the ROM download countdown timer and reveals the download button faster on this game ROM file host without extra waits.";

const domains = [
  "romsfun.com",
] as const;

const keywords = [
  "romsfun bypass",
  "RomsFun bypass extension",
  "romsfun timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "RomsFun bypass skips the ROM download countdown timer and reveals the download button faster on this game ROM file host without extra waits. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "RomsFun puts a countdown timer or unlock delay in front of the continue or get link step. A RomsFun bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The RomsFun bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for RomsFun.",
  },
  {
    title: "Open a supported link",
    body: "Open a RomsFun link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported RomsFun delay.",
  },
];

const skips = [
  "Countdown timers on unlock pages",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What ROM download countdown does Skip Wait skip on romsfun.com?",
    answer: "Skip Wait bypasses the ROM download countdown timer on romsfun.com and reveals the download button faster on this game ROM host.",
  },
  {
    question: "Does Skip Wait reveal the download button faster on RomsFun?",
    answer: "Yes. Unlock countdown timers and get link delay screens are bypassed so the ROM download button appears without the full wait.",
  },
  {
    question: "How does Skip Wait help with game ROM file downloads?",
    answer: "The extension activates on RomsFun countdown flows and continues automatically when the site allows the bypass.",
  },
  {
    question: "Is the RomsFun bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The RomsFun bypass runs on supported pages with no account or paid plan required.",
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
