import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Goost";

const bypassType = "Skip Short Link";

const description = "Goost bypass skips continue and blog wait timers, pins reCAPTCHA for you to solve, then opens the destination from the statistics unlock URL.";

const domains = [
  "goo.st",
  "kreditexperte.online",
] as const;

const keywords = [
  "goost bypass",
  "Goost bypass extension",
  "goost timer bypass",
  "skip short link",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "ad link bypass",
  "short link bypass",
  "monetized link bypass",
] as const;

const intro = "Want a Goost bypass for monetized short links without clicking through every gate? Skip Wait handles unlock timers and redirect hops on supported websites on this network automatically.";

const problem = "Goost monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A Goost bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported Goost monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 2 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Goost bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Goost; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Goost link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Goost delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Goost skip short link flows",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What happens with reCAPTCHA on Goost links when using Skip Wait?",
    answer: "Skip Wait pins the reCAPTCHA for you to solve, then skips continue and blog wait timers and opens the destination from the statistics unlock URL.",
  },
  {
    question: "Which Goost domains like goo.st does Skip Wait support?",
    answer: "Skip Wait handles goo.st and kreditexperte.online, automating short link bypass steps and go page redirect hops on both.",
  },
  {
    question: "How does Skip Wait open the destination from the statistics unlock URL?",
    answer: "After you complete captcha when required, the extension continues through gates and unlocks your link from the Goost statistics page automatically.",
  },
  {
    question: "Is the Goost bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Goost bypass runs on supported pages with no account or paid plan required.",
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
