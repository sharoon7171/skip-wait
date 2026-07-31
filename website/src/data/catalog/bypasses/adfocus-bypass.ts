import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "AdFocus";

const bypassType = "Skip Waiting Page";

const description = "AdFocus bypass skips the ad waiting page on monetized download links so you pass the gate screen without manual clicks or forced delay steps.";

const domains = [
  "adfoc.us",
] as const;

const keywords = [
  "adfocus bypass",
  "AdFocus bypass extension",
  "adfocus timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a AdFocus bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "AdFocus places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a AdFocus bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "Install Skip Wait from the Chrome Web Store, open any AdFocus waiting page, and keep browsing normally. The extension detects the gate screen, bypasses the please wait step when possible, and redirects you to the destination link without asking you to click continue repeatedly. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the AdFocus bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for AdFocus; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a AdFocus link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported AdFocus delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "AdFocus skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What ad gate does Skip Wait bypass on adfoc.us links?",
    answer: "Skip Wait detects the ad waiting page on monetized AdFocus download links and bypasses the please wait gate so you reach the file destination without manual clicks.",
  },
  {
    question: "Can I skip the please wait screen on AdFocus monetized downloads?",
    answer: "Yes. When the AdFocus gate screen loads, Skip Wait removes the click-to-continue step and redirects you to the destination link automatically.",
  },
  {
    question: "How does Skip Wait handle AdFocus continue button loops?",
    answer: "Instead of clicking continue repeatedly on filler screens, the extension skips the delay layer and sends you straight to the target URL on adfoc.us.",
  },
  {
    question: "Is the AdFocus bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The AdFocus bypass runs on supported pages with no account or paid plan required.",
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
