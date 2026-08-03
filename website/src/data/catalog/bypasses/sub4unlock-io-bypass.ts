import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub4Unlock.io";

const bypassType = "Skip Waiting Page";

const description = "Sub4Unlock.io bypass skips all social unlock actions—YouTube subscribe, like, comment, and hit bell; Instagram, Facebook, and Twitter follow; Telegram and Discord join—plus client timers for instant redirect to the destination on the Unlock Link button.";

const domains = [
  "sub4unlock.io",
  "sub2unlock.io",
] as const;

const keywords = [
  "sub4unlock.io bypass",
  "Sub4Unlock.io bypass extension",
  "sub4unlock io bypass",
  "sub4unlock.io timer bypass",
  "sub4unlock.io social unlock",
  "sub2unlock.io bypass",
  "Sub2Unlock bypass extension",
  "sub2unlock io bypass",
  "sub4unlock youtube telegram discord",
  "sub4unlock instagram facebook twitter",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Sub4Unlock.io bypass skips all social unlock actions—YouTube subscribe, like, comment, and hit bell; Instagram, Facebook, and Twitter follow; Telegram and Discord join—plus client timers for instant redirect to the destination on the Unlock Link button. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Sub4Unlock.io requires fans to complete the creator’s chosen actions before Unlock Link works. Supported actions include YouTube subscribe variants, video like and comment, Instagram, Facebook, and Twitter follow, and Telegram and Discord join.";

const howItWorks = "Io unlock link. When the Unlock Link control has a destination href, Skip Wait reads it and redirects without waiting through each locked-action timer.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Sub4Unlock.io bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Sub4Unlock.io.",
  },
  {
    title: "Open a supported link",
    body: "Open a Sub4Unlock.io link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Sub4Unlock.io delay.",
  },
];

const skips = [
  "YouTube subscribe, 2nd subscribe, like & subscribe, sub & hit bell, like, like & comment",
  "Instagram, Facebook, and Twitter follow",
  "Telegram and Discord join (including a second Telegram)",
  "Locked-action progress timers before Unlock Link",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which unlock actions does Skip Wait cover on Sub4Unlock.io?",
    answer: "YouTube subscribe, 2nd subscribe, like and subscribe, sub and hit bell, like, and like and comment; Instagram, Facebook, and Twitter follow; Telegram and Discord join; plus locked-action timers on sub4unlock.io and sub2unlock.io.",
  },
  {
    question: "What does Skip Wait bypass on Sub4Unlock.io?",
    answer: "All locked social-action steps and client timers on sub4unlock.io and sub2unlock.io, then instant redirect to the destination href on Unlock Link.",
  },
  {
    question: "Which domains does this Sub4Unlock.io bypass cover?",
    answer: "This entry covers sub4unlock.io and sub2unlock.io. Separate catalog pages cover sub4unlock.com, sub4unlock.pro, and sub4unlock.me.",
  },
  {
    question: "Is the Sub4Unlock.io bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Sub4Unlock.io bypass runs on supported pages with no account or paid plan required.",
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
