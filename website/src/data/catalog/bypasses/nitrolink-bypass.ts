import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Nitrolink";

const bypassType = "Skip multi step Waits";

const description = "Nitrolink bypass skips the multi page waiting chain and blog mediator steps on this link shortener to reach your destination URL faster every time.";

const domains = [
  "nitro-link.com",
  "almontsf.com",
] as const;

const keywords = [
  "nitrolink bypass",
  "Nitrolink bypass extension",
  "nitrolink timer bypass",
  "skip multi step waits",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "multi step bypass",
  "redirect chain bypass",
] as const;

const intro = "Nitrolink chains multiple blog hops before the final URL appears. Skip Wait automates that multi step bypass across supported websites on this network so you do not click through every mediator page yourself.";

const problem = "Nitrolink adds delay layers such as blog mediator hops in the redirect chain before you reach the real destination. People search for a Nitrolink bypass to skip those gates with Skip Wait and continue faster.";

const howItWorks = "Skip Wait follows Nitrolink through blog mediators and redirect hops automatically. Install the extension, open the shared link once, and it advances each step in the chain until the final URL opens. Supported Nitrolink flows on 2 supported websites continue automatically toward the destination.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Nitrolink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Nitrolink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Nitrolink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Nitrolink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Nitrolink skip multi step waits flows",
  "Blog mediator hops in the redirect chain",
  "Multi page unlock sequences",
  "Session tracking steps between shortener and destination",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What multi page waiting chain does Skip Wait skip on Nitrolink?",
    answer: "Skip Wait skips the multi page waiting chain and blog mediator steps on nitro-link.com and almontsf.com to reach your destination URL.",
  },
  {
    question: "Which Nitrolink domains like nitro-link.com does Skip Wait automate?",
    answer: "Both nitro-link.com and almontsf.com are supported, with blog hops and session tracking steps handled automatically.",
  },
  {
    question: "Do I need to click through blog mediator steps on Nitrolink myself?",
    answer: "No. Open the shared link once and Skip Wait advances each step in the chain until the final URL opens.",
  },
  {
    question: "Is the Nitrolink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Nitrolink bypass runs on supported pages with no account or paid plan required.",
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
