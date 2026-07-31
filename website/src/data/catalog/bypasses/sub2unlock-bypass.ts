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

const intro = "Want a Sub2Unlock bypass for Next.js social unlock pages? Skip Wait skips every creator block—YouTube subscribe variants, like, comment, and share; Instagram, Facebook, and Twitter steps; and other media actions—then opens the destination without waiting for the unlock button.";

const problem = "Sub2Unlock requires fans to complete each social block before the unlock button turns green. Supported actions include YouTube subscribe, sub and hit bell, sub and like, like, comment, and share, plus Instagram, Facebook, Twitter, and other media steps. A Sub2Unlock bypass is what people want when those blocks delay the destination.";

const howItWorks = "Add Skip Wait to Chrome and open a Sub2Unlock unlock link. When the page embeds the destination in its unlock data, the extension reads it and redirects without completing each social block.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Sub2Unlock bypass activates on supported unlock pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle for Sub2Unlock; supported unlock pages run when unlock data is present.",
  },
  {
    title: "Open a supported link",
    body: "Visit a sub2unlock.com unlock link as usual. Whatever mix of social blocks is shown, Skip Wait opens the destination without finishing each step.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait reads the embedded destination and sends you there without the social-block unlock gate.",
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
