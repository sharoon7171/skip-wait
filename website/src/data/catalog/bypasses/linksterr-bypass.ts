import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Linksterr";

const bypassType = "Skip Waiting Page";

const description = "Linksterr bypass skips the gateway waiting page on this URL shortener and redirects you to the destination link without manual steps or waits.";

const domains = [
  "linksterr.com",
] as const;

const keywords = [
  "linksterr bypass",
  "Linksterr bypass extension",
  "linksterr timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a Linksterr bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "Linksterr places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Linksterr bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait from the Chrome Web Store, open any Linksterr waiting page, and keep browsing normally. The extension detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Linksterr bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Linksterr; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Linksterr link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Linksterr delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Linksterr skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What gateway waiting page does Skip Wait bypass on linksterr.com?",
    answer: "Skip Wait skips the gateway waiting page on linksterr.com and redirects you to the destination link without manual steps.",
  },
  {
    question: "Do I need manual steps to reach my link from Linksterr with Skip Wait?",
    answer: "No. please wait screens and click-to-continue gates are bypassed automatically when you open a Linksterr URL.",
  },
  {
    question: "How does Skip Wait redirect me from Linksterr to the destination?",
    answer: "The extension detects the gate screen and sends you to the real destination URL instead of asking you to click continue repeatedly.",
  },
  {
    question: "Is the Linksterr bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Linksterr bypass runs on supported pages with no account or paid plan required.",
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
