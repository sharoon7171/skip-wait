import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Shrtslug";

const bypassType = "Skip Waiting Page";

const description = "Shrtslug bypass skips the short link verify waiting page on this URL shortener and opens your destination link without any forced delay steps.";

const domains = [
  "shrtslug.biz",
] as const;

const keywords = [
  "shrtslug bypass",
  "Shrtslug bypass extension",
  "shrtslug timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a Shrtslug bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "Shrtslug places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Shrtslug bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a Shrtslug link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for Shrtslug. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Shrtslug bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Shrtslug; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Shrtslug link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Shrtslug delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Shrtslug skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What short link verify waiting page does Skip Wait bypass on shrtslug.biz?",
    answer: "Skip Wait skips the short link verify waiting page on shrtslug.biz and opens your destination link without delay.",
  },
  {
    question: "Do I need to wait on Shrtslug gate screens with Skip Wait installed?",
    answer: "No. please wait and click-to-continue screens are bypassed automatically when you open a Shrtslug link.",
  },
  {
    question: "How quickly does Skip Wait open my destination from Shrtslug links?",
    answer: "When the waiting page loads, the extension runs in the background and redirects immediately to the target URL.",
  },
  {
    question: "Is the Shrtslug bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Shrtslug bypass runs on supported pages with no account or paid plan required.",
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
