import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Move2Link";

const bypassType = "Skip Waiting Page";

const description = "Move2Link bypass skips blog session waits and go page delays on this link shortener network to open your destination link automatically and fast.";

const domains = [
  "siendu.com",
  "go.move2link.co",
] as const;

const keywords = [
  "move2link bypass",
  "Move2Link bypass extension",
  "move2link timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Move2Link bypass skips blog session waits and go page delays on this link shortener network to open your destination link automatically and fast. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Move2Link places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens.";

const howItWorks = "Skip Wait detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Move2Link bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Move2Link.",
  },
  {
    title: "Open a supported link",
    body: "Open a Move2Link link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Move2Link delay.",
  },
];

const skips = [
  "Waiting pages and continue gates",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Move2Link domains like go.move2link.co does Skip Wait support?",
    answer: "Skip Wait handles siendu.com and go.move2link.co, bypassing blog session waits and go page delays on both Move2Link hosts.",
  },
  {
    question: "What blog session waits does Skip Wait skip on Move2Link?",
    answer: "please wait screens and continue gates in the Move2Link network are bypassed so you reach the destination link without filler pages.",
  },
  {
    question: "Can Skip Wait bypass go page delays in the Move2Link network?",
    answer: "Yes. The extension detects waiting pages and redirects you past gate screens and manual continue loops automatically.",
  },
  {
    question: "Is the Move2Link bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Move2Link bypass runs on supported pages with no account or paid plan required.",
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
