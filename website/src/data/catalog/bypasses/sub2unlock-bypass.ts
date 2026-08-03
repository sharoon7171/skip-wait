import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub2Unlock";

const bypassType = "Skip Waiting Page";

const description = "Sub2Unlock bypass skips all social unlock blocks—YouTube subscribe, sub and hit bell, sub and like, like, comment, and share; Instagram, Facebook, and Twitter actions; and other creator media steps—for instant redirect to the destination on sub2unlock.com.";

const domains = [
  "sub2unlock.com",
] as const;

const keywords = [
  "sub2unlock bypass",
  "Sub2Unlock bypass extension",
  "sub2unlock.com bypass",
  "sub2unlock timer bypass",
  "sub2unlock social unlock",
  "sub2unlock youtube instagram facebook twitter",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
  "skip click to continue",
] as const;

const intro = "Sub2Unlock bypass skips all social unlock blocks—YouTube subscribe, sub and hit bell, sub and like, like, comment, and share; Instagram, Facebook, and Twitter actions; and other creator media steps—for instant redirect to the destination on sub2unlock.com. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Sub2Unlock requires fans to complete each social block before the unlock button turns green. Supported actions include YouTube subscribe, sub and hit bell, sub and like, like, comment, and share, plus Instagram, Facebook, Twitter, and other media steps.";

const howItWorks = "When the page embeds the destination in its unlock data, Skip Wait reads it and redirects without completing each social block.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Sub2Unlock bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Sub2Unlock.",
  },
  {
    title: "Open a supported link",
    body: "Open a Sub2Unlock link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Sub2Unlock delay.",
  },
];

const skips = [
  "YouTube subscribe, sub & hit bell, sub & like, like, comment, and share",
  "Instagram, Facebook, and Twitter unlock blocks",
  "Other creator media steps before the unlock button",
  "Client-only unlock gating that waits for every block",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which unlock actions does Skip Wait cover on Sub2Unlock?",
    answer: "YouTube subscribe, sub and hit bell, sub and like, like, comment, and share; Instagram, Facebook, and Twitter blocks; and other creator media steps on sub2unlock.com.",
  },
  {
    question: "What does Skip Wait bypass on Sub2Unlock?",
    answer: "All social unlock blocks and the client unlock gate on sub2unlock.com, then instant redirect to the embedded destination link.",
  },
  {
    question: "Which domain does this Sub2Unlock bypass cover?",
    answer: "This entry covers sub2unlock.com. Separate catalog pages cover sub2unlock.io, sub2unlock.me, and the Sub4Unlock hosts.",
  },
  {
    question: "Is the Sub2Unlock bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Sub2Unlock bypass runs on supported pages with no account or paid plan required.",
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
