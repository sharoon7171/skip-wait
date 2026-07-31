import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Storyline SCORM";

const bypassType = "Skip Course Wait";

const description = "Storyline bypass skips the course play countdown wait on SCORM training slides so you can advance past timed content blocks immediately and freely.";

const domains = [
  "mrtzn.com",
  "vocationaltraininghub.com",
] as const;

const keywords = [
  "storyline scorm bypass",
  "Storyline SCORM bypass extension",
  "storyline scorm timer bypass",
  "skip course wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "scorm timer bypass",
  "course slide bypass",
] as const;

const intro = "Storyline SCORM training slides use timed SCORM blocks that force waiting. Skip Wait bypasses those course play timers on supported websites on this network so you can move past locked slides immediately.";

const problem = "Storyline SCORM blocks SCORM slides behind a course play countdown. People search for a Storyline SCORM bypass to advance past timed content right away.";

const howItWorks = "Install Skip Wait, browse to a supported Storyline SCORM page, and use the site normally. The extension activates on recognized skip course wait flows and bypasses or automates the wait so you reach the content faster. Course play countdowns on supported slides are cleared so you can advance without waiting out the timer.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Storyline SCORM bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Storyline SCORM; supported flows run in the background when the page matches.",
  },
  {
    title: "Open the training slide",
    body: "Open the SCORM or training content on Storyline SCORM. Skip Wait clears the play countdown on supported slides.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait clears the course play countdown so you can advance the Storyline SCORM slide immediately.",
  },
];

const skips = [
  "Storyline SCORM skip course wait flows",
  "SCORM slide countdown blocks",
  "Timed training slide locks",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What course play countdown does Skip Wait skip on Storyline SCORM slides?",
    answer: "Skip Wait bypasses the course play countdown wait on SCORM training slides so you advance past timed content blocks immediately.",
  },
  {
    question: "Which training domains like mrtzn.com does Skip Wait support?",
    answer: "Skip Wait works on mrtzn.com and vocationaltraininghub.com, bypassing SCORM slide countdown blocks on both.",
  },
  {
    question: "Can I advance past timed content blocks in SCORM training immediately?",
    answer: "Yes. Timed training slide locks that force you to wait before continuing are bypassed on supported Storyline SCORM pages.",
  },
  {
    question: "Is the Storyline SCORM bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Storyline SCORM bypass runs on supported pages with no account or paid plan required.",
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
