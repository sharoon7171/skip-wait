import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Ouo";

const bypassType = "Skip Countdown";

const description = "Ouo bypass skips the get link countdown timer and continue button waits on ad link shorteners for instant redirect to your destination URL every time.";

const domains = [
  "ouo.io",
  "ouo.press",
] as const;

const keywords = [
  "ouo bypass",
  "ouo.io bypass",
  "bypass ouo",
  "skip ouo",
  "ouo skip",
  "ouo.press bypass",
  "ouo timer bypass",
  "ouo get link bypass",
  "ouo chrome extension",
] as const;

const intro = "Ouo countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on supported websites on this network and unlocks the link or download step faster.";

const problem = "Ouo puts a countdown timer or unlock delay in front of the continue or get link step. A Ouo bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Ouo page, and use the site normally. Unlock timers on 2 supported websites no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Ouo bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Ouo; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Ouo link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Ouo delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Ouo skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Ouo domains like ouo.io and ouo.press does Skip Wait cover?",
    answer: "Skip Wait supports both ouo.io and ouo.press, bypassing get link countdown timers and continue button waits on each.",
  },
  {
    question: "What get link countdown does Skip Wait skip on Ouo shorteners?",
    answer: "The unlock countdown timer and get link delay screens on Ouo ad link shorteners are bypassed for instant redirect to your destination.",
  },
  {
    question: "Does Skip Wait bypass continue button waits on Ouo ad links?",
    answer: "Yes. The extension activates on Ouo countdown flows and automates the wait so your destination URL opens faster.",
  },
  {
    question: "Is the Ouo bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Ouo bypass runs on supported pages with no account or paid plan required.",
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
