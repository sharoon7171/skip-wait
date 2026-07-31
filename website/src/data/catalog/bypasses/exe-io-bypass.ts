import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Exe.io";

const bypassType = "Skip Waiting Page";

const description = "Exe.io bypass skips gate screens, captcha waits, and countdown timers on this popular ad link shortener for instant redirect to your destination URL.";

const domains = [
  "exe.io",
  "exeygo.com",
] as const;

const keywords = [
  "exe.io bypass",
  "Exe.io bypass extension",
  "exe.io timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a Exe.io bypass that actually skips the please wait screen? Skip Wait removes the manual click through on supported websites on this network and sends you to the real destination faster.";

const problem = "Exe.io places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Exe.io bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait from the Chrome Web Store, open any Exe.io waiting page, and keep browsing normally. The extension detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly. You get past continue loops on 2 supported websites and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Exe.io bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Exe.io; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Exe.io link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Exe.io delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Exe.io skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Exe.io gate screens does Skip Wait bypass?",
    answer: "Skip Wait bypasses gate screens, captcha waits, and countdown timers on exe.io and exeygo.com for instant redirect to your destination URL.",
  },
  {
    question: "Does Skip Wait handle captcha waits on exe.io and exeygo.com links?",
    answer: "The extension detects waiting pages on both domains and bypasses please wait steps while handling captcha gates when they appear on the flow.",
  },
  {
    question: "Can I skip countdown timers on this popular ad link shortener?",
    answer: "Yes. Manual continue button loops and gate pages before the destination are skipped automatically on supported Exe.io URLs.",
  },
  {
    question: "Is the Exe.io bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Exe.io bypass runs on supported pages with no account or paid plan required.",
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
