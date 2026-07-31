import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Boostellar / Bstshrt";

const bypassType = "Skip Countdown";

const description = "Boostellar bypass skips the content locker gate and countdown timer on monetized short links for instant redirect to your destination URL every time.";

const domains = [
  "bstshrt.com",
  "bstlar.com",
  "boostellar.com",
] as const;

const keywords = [
  "boostellar / bstshrt bypass",
  "Boostellar / Bstshrt bypass extension",
  "boostellar / bstshrt timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Boostellar / Bstshrt countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on supported websites on this network and unlocks the link or download step faster.";

const problem = "Boostellar puts a countdown timer or unlock delay in front of the continue or get link step. A Boostellar bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported Boostellar / Bstshrt page, and use the site normally. Unlock timers on 3 supported websites no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Boostellar bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Boostellar; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Boostellar link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Boostellar delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Boostellar / Bstshrt skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Boostellar domains like bstshrt.com and bstlar.com are covered?",
    answer: "Skip Wait supports bstshrt.com, bstlar.com, and boostellar.com, bypassing content locker gates and countdown timers on monetized short links across all three.",
  },
  {
    question: "What content locker gate does Skip Wait skip on Boostellar links?",
    answer: "The content locker that blocks instant redirect is bypassed so Skip Wait unlocks your destination link without waiting through the full gate timer.",
  },
  {
    question: "Does Skip Wait bypass the countdown before redirect on monetized Boostellar short links?",
    answer: "Yes. Unlock countdown timers and get link delay screens are skipped for instant redirect to your destination URL.",
  },
  {
    question: "Is the Boostellar bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Boostellar bypass runs on supported pages with no account or paid plan required.",
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
