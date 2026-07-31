import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Sub4Unlock.me";

const bypassType = "Skip Waiting Page";

const description = "Sub4Unlock.me bypass skips the full social locker—YouTube subscribe, like, and comment; WhatsApp, Telegram, and Discord join; TikTok, Instagram, Facebook, and Twitter follow or like; custom links; password; and continue steps—plus the AdLinkFly countdown for instant redirect to your destination.";

const domains = [
  "sub4unlock.me",
] as const;

const keywords = [
  "sub4unlock.me bypass",
  "Sub4Unlock.me bypass extension",
  "sub4unlock me bypass",
  "sub4unlock.me timer bypass",
  "sub4unlock.me social unlock",
  "sub4unlock whatsapp telegram tiktok discord",
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

const intro = "Want a Sub4Unlock.me bypass for monetized short links with a full social locker? Skip Wait skips YouTube, WhatsApp, Telegram, TikTok, Instagram, Facebook, Twitter, Discord, custom link, password, and continue steps, then clears the AdLinkFly wait so you get the destination immediately.";

const problem = "Sub4Unlock.me stacks a social locker and an AdLinkFly gate before the real URL. Creators can require YouTube subscribe, like, or comment; WhatsApp, Telegram, or Discord joins; TikTok, Instagram, Facebook, or Twitter follow or like; custom links; continue hops; and a password. A Sub4Unlock.me bypass is what people want when any of those actions block the destination.";

const howItWorks = "Add Skip Wait to Chrome and open a Sub4Unlock.me unlock link. When the locker or go-link form is present, the extension completes the server unlock path and redirects to the destination without finishing each locker action by hand.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Sub4Unlock.me bypass activates on supported unlock pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle for Sub4Unlock.me; supported unlock pages run when the locker or go-link form matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a sub4unlock.me short link as usual. Whatever mix of locker actions is shown, Skip Wait targets the unlock forms rather than each network button.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait completes the unlock forms and sends you to the destination URL from /links/go.",
  },
];

const skips = [
  "YouTube subscribe, like, comment, and like+comment",
  "WhatsApp, Telegram, and Discord join",
  "TikTok, Instagram, Facebook, and Twitter follow or like",
  "Custom link, continue steps, password gate, AdLinkFly countdown",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which locker actions does Skip Wait cover on Sub4Unlock.me?",
    answer: "YouTube subscribe, like, and comment; WhatsApp, Telegram, and Discord join; TikTok, Instagram, Facebook, and Twitter follow or like; custom links; continue steps; password; and the AdLinkFly countdown on sub4unlock.me.",
  },
  {
    question: "What does Skip Wait bypass on Sub4Unlock.me?",
    answer: "The full social locker and the AdLinkFly unlock countdown on sub4unlock.me for instant redirect to your link.",
  },
  {
    question: "Which domain does this Sub4Unlock.me bypass cover?",
    answer: "This entry covers sub4unlock.me only. Separate catalog pages cover sub4unlock.com, sub4unlock.pro, and sub4unlock.io.",
  },
  {
    question: "Is the Sub4Unlock.me bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Sub4Unlock.me bypass runs on supported pages with no account or paid plan required.",
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
