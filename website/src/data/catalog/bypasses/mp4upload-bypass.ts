import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "MP4Upload";

const bypassType = "Skip Countdown";

const description = "MP4Upload bypass skips the free download countdown timer on this video file host and advances you to the create download link page right away.";

const domains = [
  "mp4upload.com",
] as const;

const keywords = [
  "mp4upload bypass",
  "MP4Upload bypass extension",
  "mp4upload timer bypass",
  "skip countdown",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "countdown timer bypass",
  "skip timer unlock",
] as const;

const intro = "MP4Upload countdown timers are a common reason people search for a bypass extension. Skip Wait skips those timer screens on the supported website and unlocks the link or download step faster.";

const problem = "MP4Upload puts a countdown timer or unlock delay in front of the continue or get link step. A MP4Upload bypass removes that wait so the destination opens without watching the clock.";

const howItWorks = "Install Skip Wait, browse to a supported MP4Upload page, and use the site normally. Unlock timers on the supported website no longer block the get link or continue step.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the MP4Upload bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for MP4Upload; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a MP4Upload link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported MP4Upload delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "MP4Upload skip countdown flows",
  "Unlock countdown timers",
  "Get link delay screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What free download countdown does Skip Wait skip on mp4upload.com?",
    answer: "Skip Wait bypasses the free download countdown timer on mp4upload.com and advances you to the create download link page faster.",
  },
  {
    question: "Does Skip Wait advance me to the create download link page faster?",
    answer: "Yes. Unlock countdown timers and get link delay screens are skipped so you reach the download link creation step without the full wait.",
  },
  {
    question: "How does Skip Wait help with MP4Upload video file downloads?",
    answer: "The extension activates on MP4Upload countdown flows and automates the wait so your video file download path opens sooner.",
  },
  {
    question: "Is the MP4Upload bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The MP4Upload bypass runs on supported pages with no account or paid plan required.",
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
