import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Genlink";

const bypassType = "Skip multi step Waits";

const description = "Genlink bypass skips multi page blog waits and unlock countdown timers across this link shortener chain to reach your destination URL faster.";

const domains = [
  "genlink.site",
  "rplinks.in",
  "jazbaat.in",
  "crazymindhub.xyz",
] as const;

const keywords = [
  "genlink bypass",
  "Genlink bypass extension",
  "genlink timer bypass",
  "skip multi step waits",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "multi step bypass",
  "redirect chain bypass",
] as const;

const intro = "Genlink bypass skips multi page blog waits and unlock countdown timers across this link shortener chain to reach your destination URL faster. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Genlink adds delay layers such as blog mediator hops in the redirect chain before you reach the real destination.";

const howItWorks = "Skip Wait follows Genlink through blog mediators and redirect hops automatically.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Genlink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Genlink.",
  },
  {
    title: "Open a supported link",
    body: "Open a Genlink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Genlink delay.",
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
    question: "How many blog hops does Skip Wait automate in a Genlink chain?",
    answer: "Skip Wait advances through blog mediators across four supported sites, genlink.site, rplinks.in, jazbaat.in, and crazymindhub.xyz, until the final URL opens.",
  },
  {
    question: "Which Genlink mediator sites like rplinks.in does Skip Wait advance through?",
    answer: "Sites such as rplinks.in and jazbaat.in are handled automatically, skipping multi page unlock sequences and session tracking steps.",
  },
  {
    question: "What unlock countdown timers does Skip Wait skip on genlink.site links?",
    answer: "Blog waiting pages and unlock countdown timers across the Genlink chain are bypassed so you do not click through every mediator page yourself.",
  },
  {
    question: "Is the Genlink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Genlink bypass runs on supported pages with no account or paid plan required.",
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
