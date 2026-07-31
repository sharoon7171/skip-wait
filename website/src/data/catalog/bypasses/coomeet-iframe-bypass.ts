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

const intro = "Coomeet Iframe embeds long please wait timers inside iframes. Skip Wait accelerates those embedded countdowns on the supported website so the page finishes loading in seconds.";

const problem = "Coomeet Iframe embeds long please wait countdown timers inside iframes. A Coomeet Iframe bypass speeds those timers up so loading screens finish in seconds instead of minutes.";

const howItWorks = "Install Skip Wait, browse to a supported Coomeet Iframe page, and use the site normally. The extension activates on recognized skip embedded wait flows and bypasses or automates the wait so you reach the content faster. Embedded countdowns finish in seconds so you are not stuck on a long loading screen.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Coomeet Iframe bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Coomeet Iframe; supported flows run in the background when the page matches.",
  },
  {
    title: "Let the iframe load",
    body: "When the Coomeet Iframe iframe shows a long please wait screen, Skip Wait shortens that countdown automatically.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait speeds up the embedded please wait countdown so the Coomeet Iframe loading screen finishes quickly.",
  },
];

const skips = [
  "Coomeet Iframe skip embedded wait flows",
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
