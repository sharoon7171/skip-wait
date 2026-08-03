import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "OnhaxPK";

const bypassType = "Skip Copy Step";

const description = "OnhaxPK bypass skips the countdown wait and copies session share data to your clipboard so you unlock software downloads without manual copy.";

const domains = [
  "onhaxpk.net",
] as const;

const keywords = [
  "onhaxpk bypass",
  "OnhaxPK bypass extension",
  "onhaxpk timer bypass",
  "skip copy step",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "copy cookie bypass",
  "session cookie copy",
] as const;

const intro = "OnhaxPK bypass skips the countdown wait and copies session share data to your clipboard so you unlock software downloads without manual copy. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "OnhaxPK makes you wait and copy session data by hand before downloads unlock. Users want a OnhaxPK bypass that copies the needed data without the manual wait and paste dance.";

const howItWorks = "Skip Wait fetches the cookie or share string, copies it to your clipboard, and shows a Copy button if you need it again. On the supported website, that means less waiting and fewer manual copy steps before you can use the session data. Session data on the supported website is easier to copy without the site wait and manual paste dance.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The OnhaxPK bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for OnhaxPK.",
  },
  {
    title: "Stay on the cookie or share page",
    body: "Keep the OnhaxPK page open. Skip Wait works on the supported copy flow without sending you through extra hops.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported OnhaxPK delay.",
  },
];

const skips = [
  "Manual cookie copy waits",
  "Manual copy and wait instructions",
  "Session cookie copy steps",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What session share data does Skip Wait copy from OnhaxPK pages?",
    answer: "Skip Wait skips the countdown wait on onhaxpk.net and copies session share data to your clipboard so you unlock software downloads without manual copying.",
  },
  {
    question: "Does Skip Wait skip the countdown before copying on onhaxpk.net?",
    answer: "Yes. The timer that precedes the copy step is bypassed and the session data is placed on your clipboard automatically.",
  },
  {
    question: "How does Skip Wait replace the manual copy step for software unlocks?",
    answer: "Instead of following copy instructions by hand, the extension fetches the share string and copies it for you, with a Copy button available if you need it again.",
  },
  {
    question: "Is the OnhaxPK bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The OnhaxPK bypass runs on supported pages with no account or paid plan required.",
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
