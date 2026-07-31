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

const intro = "OnhaxPK pages make you copy session data by hand after a wait. Skip Wait adds a one click copy flow on the supported website so you bypass the manual copy step entirely.";

const problem = "OnhaxPK makes you wait and copy session data by hand before downloads unlock. Users want a OnhaxPK bypass that copies the needed data without the manual wait and paste dance.";

const howItWorks = "Install Skip Wait and open a OnhaxPK page that normally asks you to copy session data manually. The extension fetches the cookie or share string, copies it to your clipboard, and shows a Copy button if you need it again. On the supported website, that means less waiting and fewer manual copy steps before you can use the session data. Session data on the supported website is easier to copy without the site wait and manual paste dance.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the OnhaxPK bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for OnhaxPK; supported flows run in the background when the page matches.",
  },
  {
    title: "Stay on the cookie or share page",
    body: "Keep the OnhaxPK page open. Skip Wait works on the supported copy flow without sending you through extra hops.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait prepares the session data and lets you copy it without the manual wait loop on OnhaxPK.",
  },
];

const skips = [
  "OnhaxPK skip copy step flows",
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
