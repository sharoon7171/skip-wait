import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Streamerviewerbot";

const bypassType = "Skip Preparing Timer";

const description = "Streamerviewerbot bypass skips the free trial Preparing countdown on Stream and Kick follower and viewer forms so the submit button unlocks right away.";

const domains = [
  "streamerviewerbot.com",
] as const;

const keywords = [
  "streamerviewerbot bypass",
  "Streamerviewerbot bypass extension",
  "streamerviewerbot timer bypass",
  "skip preparing timer",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "free stream followers bypass",
  "skip wait extension",
  "free trial timer skip",
  "preparing countdown bypass",
] as const;

const intro = "Streamerviewerbot bypass skips the free trial Preparing countdown on Stream and Kick follower and viewer forms so the submit button unlocks right away. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Streamerviewerbot embeds a multi-minute Preparing countdown before Start Free Trial on free follower and viewer pages.";

const howItWorks = "Skip Wait patches the trial iframe countdown so the page runs its own unlock path immediately, then you complete reCAPTCHA and submit.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Streamerviewerbot bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Streamerviewerbot.",
  },
  {
    title: "Open a free trial page",
    body: "Visit free stream followers or free stream viewers on streamerviewerbot.com the same way you normally would.",
  },
  {
    title: "Claim without the wait",
    body: "Skip Wait unlocks the ready state so you can finish the form without watching the countdown.",
  },
];

const skips = [
  "Preparing countdowns on free trial forms",
  "Locked Start Free Trial buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What Preparing countdown does Skip Wait skip on streamerviewerbot.com?",
    answer: "Skip Wait bypasses the free trial Preparing countdown in the trial iframe so Start Free Trial unlocks without the multi-minute wait.",
  },
  {
    question: "Does this work on free stream followers and free stream viewers?",
    answer: "Yes. Both pages embed the same trial form, and the Preparing timer unlock applies to that embedded flow.",
  },
  {
    question: "Do I still need to complete reCAPTCHA?",
    answer: "Yes. Skip Wait removes the Preparing wait and reveals reCAPTCHA early; you still complete the captcha before submitting.",
  },
  {
    question: "Is the Streamerviewerbot bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Streamerviewerbot bypass runs on supported pages with no account or paid plan required.",
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
