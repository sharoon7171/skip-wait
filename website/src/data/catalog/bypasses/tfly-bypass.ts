import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Tfly";

const bypassType = "Skip Waiting Page";

const description = "Tfly bypass skips the continue gate, captcha screen, and unlock countdown on this link shortener for instant redirect to your destination URL.";

const domains = [
  "tfly.link",
] as const;

const keywords = [
  "tfly bypass",
  "Tfly bypass extension",
  "tfly timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Looking for a Tfly bypass that actually skips the please wait screen? Skip Wait removes the manual click through on the supported website and sends you to the real destination faster.";

const problem = "Tfly places a waiting page between the short link and your destination so you sit through a please wait screen or continue loop before the real URL opens. People search for a Tfly bypass to skip that delay and reach the destination without the manual gate.";

const howItWorks = "After you add Skip Wait, visit a Tfly link as usual. When the waiting page loads, the extension runs in the background, skips the delay layer, and sends you straight to the target URL supported for Tfly. You get past continue loops on the supported website and land on the real destination instead of another gate screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Tfly bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Tfly; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Tfly link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Tfly delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Tfly skip waiting page flows",
  "Please wait and click to continue screens",
  "Gate pages before the destination URL",
  "Manual continue button loops",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What continue gate and captcha does Skip Wait handle on tfly.link?",
    answer: "Skip Wait skips the continue gate, captcha screen, and unlock countdown on tfly.link for instant redirect to your link.",
  },
  {
    question: "Does Skip Wait skip the unlock countdown on Tfly shorteners?",
    answer: "Yes. Gate pages and manual continue button loops are bypassed automatically when you open a Tfly monetized URL.",
  },
  {
    question: "How quickly can I reach my link from a Tfly monetized URL?",
    answer: "When the waiting page loads, the extension bypasses the delay layer and sends you straight to the destination without repeated clicks.",
  },
  {
    question: "Is the Tfly bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Tfly bypass runs on supported pages with no account or paid plan required.",
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
