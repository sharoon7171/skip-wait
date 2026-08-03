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

const intro = "Nitrolink bypass skips the multi page waiting chain and blog mediator steps on this link shortener to reach your destination URL faster every time. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Nitrolink adds delay layers such as blog mediator hops in the redirect chain before you reach the real destination.";

const howItWorks = "Skip Wait follows Nitrolink through blog mediators and redirect hops automatically.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Nitrolink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Nitrolink.",
  },
  {
    title: "Open a supported link",
    body: "Open a Nitrolink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Nitrolink delay.",
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
