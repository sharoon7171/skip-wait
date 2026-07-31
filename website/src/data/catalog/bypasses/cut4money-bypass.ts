import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Cut4Money";

const bypassType = "Skip multi step Waits";

const description = "Cut4Money bypass skips multi step redirect chains and blog waiting pages on this link shortener network to open your final destination link.";

const domains = [
  "adurl.io",
  "cut4money.com",
  "shr2.link",
  "bigcarinsurance.com",
  "bitcotrade.net",
  "healthy4pepole.com",
] as const;

const keywords = [
  "cut4money bypass",
  "Cut4Money bypass extension",
  "cut4money timer bypass",
  "skip multi step waits",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "multi step bypass",
  "redirect chain bypass",
] as const;

const intro = "For Cut4Money bypass through long redirect chains, Skip Wait tracks the flow on 6 supported websites in this network and continues past blog hops and unlock screens automatically.";

const problem = "Cut4Money adds delay layers such as blog mediator hops in the redirect chain before you reach the real destination. People search for a Cut4Money bypass to skip those gates with Skip Wait and continue faster.";

const howItWorks = "Skip Wait follows Cut4Money through blog mediators and redirect hops automatically. Install the extension, open the shared link once, and it advances each step in the chain until the final URL opens. Supported Cut4Money flows on 6 supported websites continue automatically toward the destination.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Cut4Money bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Cut4Money; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Cut4Money link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Cut4Money delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Cut4Money skip multi step waits flows",
  "Blog mediator hops in the redirect chain",
  "Multi page unlock sequences",
  "Session tracking steps between shortener and destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How many sites in the Cut4Money redirect chain does Skip Wait handle?",
    answer: "Skip Wait tracks flows across six supported sites including cut4money.com, adurl.io, shr2.link, and related mediators, advancing past blog hops automatically.",
  },
  {
    question: "What blog waiting pages does Skip Wait skip on cut4money.com links?",
    answer: "multi page unlock sequences and blog mediator hops in the redirect chain are bypassed so you are not stuck clicking through each filler page.",
  },
  {
    question: "Do I need to click through each Cut4Money mediator page manually?",
    answer: "No. Open the shared link once and Skip Wait follows the chain through session tracking steps until the final URL opens.",
  },
  {
    question: "Is the Cut4Money bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Cut4Money bypass runs on supported pages with no account or paid plan required.",
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
