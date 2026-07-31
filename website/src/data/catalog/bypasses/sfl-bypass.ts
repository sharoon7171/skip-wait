import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "SFL";

const bypassType = "Skip Countdown";

const description = "SFL bypass skips the gate timer and blog unlock waits on this link shortener for automatic redirect to your destination URL without delay steps.";

const domains = [
  "sfl.gl",
  "app.khaddavi.net",
] as const;

const keywords = [
  "sfl bypass",
  "SFL bypass extension",
  "sfl timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "Waiting on SFL unlock countdowns adds up fast. Skip Wait bypasses the timer on supported websites on this network and continues the flow automatically when the site allows it.";

const problem = "SFL puts a countdown timer or unlock delay in front of the continue or get link step. A SFL bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported SFL page, and use the site normally. Unlock timers on 2 supported websites no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the SFL bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for SFL; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a SFL link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported SFL delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "SFL skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which SFL domains like sfl.gl does Skip Wait cover?",
    answer: "Skip Wait supports sfl.gl and app.khaddavi.net, bypassing gate timers and blog unlock waits on both SFL hosts.",
  },
  {
    question: "What gate timer and blog unlock waits does Skip Wait skip?",
    answer: "Unlock countdown timers, blog unlock waits, and get link delay screens are bypassed for automatic redirect to your destination URL.",
  },
  {
    question: "Can I get automatic redirect from SFL short links with Skip Wait?",
    answer: "Yes. Open any supported SFL page and the extension automates the countdown bypass and continues the flow to your link.",
  },
  {
    question: "Is the SFL bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The SFL bypass runs on supported pages with no account or paid plan required.",
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
