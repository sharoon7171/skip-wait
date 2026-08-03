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

const intro = "Storyline bypass skips the course play countdown wait on SCORM training slides so you can advance past timed content blocks immediately and freely. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Storyline SCORM blocks SCORM slides behind a course play countdown.";

const howItWorks = "Skip Wait activates on recognized skip course wait flows and bypasses or automates the wait so you reach the content faster. Course play countdowns on supported slides are cleared so you can advance without waiting out the timer.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Storyline SCORM bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Storyline SCORM.",
  },
  {
    title: "Open the training slide",
    body: "Open the SCORM or training content on Storyline SCORM. Skip Wait clears the play countdown on supported slides.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Storyline SCORM delay.",
  },
];

const skips = [
  "Course Wait that block the destination",
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
