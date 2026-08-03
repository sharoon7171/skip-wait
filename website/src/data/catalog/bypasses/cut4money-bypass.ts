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

const intro = "Cut4Money bypass skips multi step redirect chains and blog waiting pages on this link shortener network to open your final destination link. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Cut4Money adds delay layers such as blog mediator hops in the redirect chain before you reach the real destination.";

const howItWorks = "Skip Wait follows Cut4Money through blog mediators and redirect hops automatically, advancing each step until the final URL opens.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Cut4Money bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Cut4Money.",
  },
  {
    title: "Open a supported link",
    body: "Open a Cut4Money link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Cut4Money delay.",
  },
];

const skips = [
  "Multi-step blog hops and countdown waits",
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
