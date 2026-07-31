import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "CookiesCEO";

const bypassType = "Skip Copy Step";

const description = "CookiesCEO bypass adds a Copy cookie button on premium cookie pages so you copy the session cookie without the site wait or manual copy steps.";

const domains = [
  "cookiesceo.com",
] as const;

const keywords = [
  "cookiesceo bypass",
  "CookiesCEO bypass extension",
  "cookiesceo timer bypass",
  "skip copy step",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "copy cookie bypass",
  "session cookie copy",
] as const;

const intro = "Instead of following CookiesCEO copy instructions line by line, Skip Wait pulls the session cookie or share string on the supported website and copies it to your clipboard for you.";

const problem = "CookiesCEO makes you wait and copy session data by hand before downloads unlock. Users want a CookiesCEO bypass that copies the needed data without the manual wait and paste dance.";

const howItWorks = "Install Skip Wait and open a CookiesCEO page that normally asks you to copy session data manually. The extension fetches the cookie or share string, copies it to your clipboard, and shows a Copy button if you need it again. On the supported website, that means less waiting and fewer manual copy steps before you can use the session data. Session data on the supported website is easier to copy without the site wait and manual paste dance.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the CookiesCEO bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for CookiesCEO; supported flows run in the background when the page matches.",
  },
  {
    title: "Stay on the cookie or share page",
    body: "Keep the CookiesCEO page open. Skip Wait works on the supported copy flow without sending you through extra hops.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait prepares the session data and lets you copy it without the manual wait loop on CookiesCEO.",
  },
];

const skips = [
  "CookiesCEO skip copy step flows",
  "Manual copy and wait instructions",
  "Session cookie copy steps",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How does Skip Wait copy the session cookie from CookiesCEO pages?",
    answer: "Skip Wait fetches the session cookie or share string from premium cookie pages on cookiesceo.com and copies it to your clipboard automatically.",
  },
  {
    question: "Is there a Copy cookie button on premium CookiesCEO pages with Skip Wait?",
    answer: "Yes. Skip Wait adds a Copy cookie button so you can grab the session cookie again without repeating the site wait and manual copy instructions.",
  },
  {
    question: "What manual copy steps does Skip Wait replace on cookiesceo.com?",
    answer: "Instead of following line-by-line copy instructions after a wait, the extension pulls the cookie data and places it on your clipboard in one step.",
  },
  {
    question: "Is the CookiesCEO bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The CookiesCEO bypass runs on supported pages with no account or paid plan required.",
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
