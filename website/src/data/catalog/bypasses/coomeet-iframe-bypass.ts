import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Coomeet Iframe";

const bypassType = "Skip Embedded Wait";

const description = "Coomeet bypass speeds up embedded please wait countdown timers inside the iframe so loading screens finish in seconds instead of long minutes.";

const domains = [
  "iframe.coomeet.com",
] as const;

const keywords = [
  "coomeet iframe bypass",
  "Coomeet Iframe bypass extension",
  "coomeet iframe timer bypass",
  "skip embedded wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "iframe timer bypass",
  "embedded countdown skip",
] as const;

const intro = "Coomeet bypass speeds up embedded please wait countdown timers inside the iframe so loading screens finish in seconds instead of long minutes. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Coomeet embeds a long loading countdown inside an iframe before the chat or video UI becomes usable.";

const howItWorks = "Skip Wait shortens the embedded please-wait countdown so the iframe finishes loading much sooner. Embedded countdowns finish in seconds so you are not stuck on a long loading screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Coomeet Iframe bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Coomeet Iframe.",
  },
  {
    title: "Let the iframe load",
    body: "When the Coomeet Iframe iframe shows a long please wait screen, Skip Wait shortens that countdown automatically.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Coomeet Iframe delay.",
  },
];

const skips = [
  "Embedded iframe countdowns",
  "Embedded iframe countdown timers",
  "Long please wait loading screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What embedded timers does Skip Wait speed up inside Coomeet iframes?",
    answer: "Skip Wait accelerates the please wait countdown timers embedded inside Coomeet iframes on iframe.coomeet.com so loading screens finish in seconds.",
  },
  {
    question: "How much faster do Coomeet iframe loading screens finish with Skip Wait?",
    answer: "Long please wait loading screens that normally take minutes are compressed to seconds by bypassing the embedded iframe countdown.",
  },
  {
    question: "Does Skip Wait work on iframe.coomeet.com please wait countdowns?",
    answer: "Yes. The extension activates on embedded wait flows inside the Coomeet iframe and automates the countdown so the page completes loading faster.",
  },
  {
    question: "Is the Coomeet Iframe bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Coomeet Iframe bypass runs on supported pages with no account or paid plan required.",
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
