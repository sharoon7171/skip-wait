import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "iCutLink";

const bypassType = "Skip Short Link";

const description = "iCutLink bypass skips go page countdown timers and multi step blog waits on this link shortener to unlock your destination URL faster every time.";

const domains = [
  "icutlink.com",
  "toolskitpro.net",
] as const;

const keywords = [
  "icutlink bypass",
  "iCutLink bypass extension",
  "icutlink timer bypass",
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

const intro = "Want a iCutLink bypass for monetized short links without clicking through every gate? Skip Wait handles unlock timers and redirect hops on supported websites on this network automatically.";

const problem = "iCutLink monetized short links chain gate pages, captcha screens, and unlock timers before the destination. A iCutLink bypass is what people want when they need the final URL without clicking through every hop.";

const howItWorks = "Once Skip Wait is active, open any supported iCutLink monetized link. The extension automates the short link bypass steps and continues through gates until your destination URL is ready. Gate hops on 2 supported websites keep moving until the destination URL is ready.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the iCutLink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for iCutLink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a iCutLink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported iCutLink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "iCutLink skip short link flows",
  "Ad link countdown timers",
  "Go page and unlock redirect hops",
  "Short link verification steps before the destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What go page countdown does Skip Wait skip on icutlink.com?",
    answer: "Skip Wait bypasses go page countdown timers and multi step blog waits on icutlink.com and toolskitpro.net to unlock your destination URL.",
  },
  {
    question: "Does Skip Wait handle multi step blog waits on iCutLink shorteners?",
    answer: "Yes. Ad link countdown timers and unlock redirect hops are automated until your destination URL is ready on supported iCutLink hosts.",
  },
  {
    question: "Which iCutLink domains like toolskitpro.net are covered?",
    answer: "Both icutlink.com and toolskitpro.net are supported, with short link verification steps bypassed on each.",
  },
  {
    question: "Is the iCutLink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The iCutLink bypass runs on supported pages with no account or paid plan required.",
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
