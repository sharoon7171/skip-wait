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

const intro = "Genlink chains multiple blog hops before the final URL appears. Skip Wait automates that multi step bypass across 4 supported websites in this network so you do not click through every mediator page yourself.";

const problem = "Genlink adds delay layers such as blog mediator hops in the redirect chain before you reach the real destination. People search for a Genlink bypass to skip those gates with Skip Wait and continue faster.";

const howItWorks = "Skip Wait follows Genlink through blog mediators and redirect hops automatically. Install the extension, open the shared link once, and it advances each step in the chain until the final URL opens. Supported Genlink flows on 4 supported websites continue automatically toward the destination.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Genlink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Genlink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Genlink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Genlink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Genlink skip multi step waits flows",
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
