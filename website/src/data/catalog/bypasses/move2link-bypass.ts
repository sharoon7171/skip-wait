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

const intro = "Move2Link wraps links behind waiting pages and continue gates. Skip Wait detects those flows on supported websites on this network and bypasses the delay so you are not stuck on filler screens.";

const problem = "Move2Link places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Move2Link bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait from the Chrome Web Store, open any Move2Link waiting page, and keep browsing normally. The extension detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly. You get past continue loops on 2 supported websites and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Move2Link bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Move2Link; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Move2Link link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Move2Link delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Move2Link skip waiting page flows",
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
