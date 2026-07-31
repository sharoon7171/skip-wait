import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Cutwin";

const bypassType = "Skip Waiting Page";

const description = "Cutwin bypass skips the blog waiting page gate and unlocks your destination link from this cut URL style shortener automatically and instantly.";

const domains = [
  "masrawytrend.com",
] as const;

const keywords = [
  "cutwin bypass",
  "Cutwin bypass extension",
  "cutwin timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Tired of Cutwin waiting pages that block every link? Skip Wait is a free Chrome extension built to bypass those gate screens on the supported website without extra setup.";

const problem = "Cutwin places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Cutwin bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a Cutwin link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for Cutwin. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Cutwin bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Cutwin; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Cutwin link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Cutwin delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Cutwin skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What blog waiting gate does Skip Wait bypass on Cutwin-style links?",
    answer: "Skip Wait skips the blog waiting page gate on Cutwin cut-URL shorteners and unlocks your destination link from masrawytrend.com automatically.",
  },
  {
    question: "Does Skip Wait work on masrawytrend.com Cutwin pages?",
    answer: "Yes. When the waiting page loads on supported Cutwin hosts, the extension bypasses the delay layer and redirects to your target URL.",
  },
  {
    question: "Can I reach my destination without the Cutwin please wait screen?",
    answer: "Yes. Gate pages and manual continue button loops are skipped so you go straight to the destination link.",
  },
  {
    question: "Is the Cutwin bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Cutwin bypass runs on supported pages with no account or paid plan required.",
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
