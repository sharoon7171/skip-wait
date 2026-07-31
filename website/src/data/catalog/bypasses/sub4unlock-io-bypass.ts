import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub4Unlock.io";

const bypassType = "Skip Waiting Page";

const description = "Sub4Unlock.io bypass skips all social unlock actions—YouTube subscribe, like, comment, and hit bell; Instagram, Facebook, and Twitter follow; Telegram and Discord join—plus client timers for instant redirect to the destination on the Unlock Link button.";

const domains = [
  "sub4unlock.io",
] as const;

const keywords = [
  "sub4unlock.io bypass",
  "Sub4Unlock.io bypass extension",
  "sub4unlock io bypass",
  "sub4unlock.io timer bypass",
  "sub4unlock.io social unlock",
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

const intro = "Want a Sub4Unlock.io bypass for one-page social unlocks? Skip Wait skips YouTube subscribe, second subscribe, like and subscribe, sub and hit bell, like, and like and comment; Instagram, Facebook, and Twitter follow; Telegram and Discord join; and the locked-action timers, then opens the destination on Unlock Link.";

const problem = "Sub4Unlock.io requires fans to complete the creator’s chosen actions before Unlock Link works. Supported actions include YouTube subscribe variants, video like and comment, Instagram, Facebook, and Twitter follow, and Telegram and Discord join. A Sub4Unlock.io bypass is what people want when those locked actions delay the destination.";

const howItWorks = "Add Skip Wait to Chrome and open a Sub4Unlock.io unlock link. When the Unlock Link control has a destination href, the extension reads it and redirects without waiting through each locked-action timer.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Sub4Unlock.io bypass activates on supported unlock pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle for Sub4Unlock.io; supported unlock pages run when the get-link control matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a sub4unlock.io unlock link as usual. Whatever mix of locked actions is shown, Skip Wait opens the destination on Unlock Link.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait reads the Unlock Link destination and sends you there without the social-action delays.",
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
    answer: "YouTube subscribe, 2nd subscribe, like and subscribe, sub and hit bell, like, and like and comment; Instagram, Facebook, and Twitter follow; Telegram and Discord join; plus locked-action timers on sub4unlock.io.",
  },
  {
    question: "What does Skip Wait bypass on Sub4Unlock.io?",
    answer: "All locked social-action steps and client timers on sub4unlock.io, then instant redirect to the destination href on Unlock Link.",
  },
  {
    question: "Which domain does this Sub4Unlock.io bypass cover?",
    answer: "This entry covers sub4unlock.io only. Separate catalog pages cover sub4unlock.com, sub4unlock.pro, and sub4unlock.me.",
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
