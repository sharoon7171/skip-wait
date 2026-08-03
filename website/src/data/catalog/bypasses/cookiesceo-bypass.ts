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

const intro = "CookiesCEO bypass adds a Copy cookie button on premium cookie pages so you copy the session cookie without the site wait or manual copy steps. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "CookiesCEO makes you wait and copy session data by hand before downloads unlock. Users want a CookiesCEO bypass that copies the needed data without the manual wait and paste dance.";

const howItWorks = "Skip Wait fetches the cookie or share string, copies it to your clipboard, and shows a Copy button if you need it again. On the supported website, that means less waiting and fewer manual copy steps before you can use the session data. Session data on the supported website is easier to copy without the site wait and manual paste dance.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The CookiesCEO bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for CookiesCEO.",
  },
  {
    title: "Stay on the cookie or share page",
    body: "Keep the CookiesCEO page open. Skip Wait works on the supported copy flow without sending you through extra hops.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported CookiesCEO delay.",
  },
];

const skips = [
  "Manual cookie copy waits",
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
