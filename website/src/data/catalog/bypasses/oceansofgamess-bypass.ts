import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "OceansOfGamess";

const bypassType = "Direct Download";

const description = "OceansOfGamess bypass skips getsoft, IPC Games, and please wait pages and opens the signed CDN file link directly from the download button instantly.";

const domains = [
  "oceansofgamess.com",
] as const;

const keywords = [
  "oceansofgamess bypass",
  "OceansOfGamess bypass extension",
  "oceansofgamess timer bypass",
  "direct download",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "direct download bypass",
  "download timer skip",
  "file host bypass",
] as const;

const intro = "OceansOfGamess bypass skips getsoft, IPC Games, and please wait pages and opens the signed CDN file link directly from the download button instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "OceansOfGamess often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The OceansOfGamess bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for OceansOfGamess.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on OceansOfGamess. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported OceansOfGamess delay.",
  },
];

const skips = [
  "Direct-download generating timers",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which intermediate pages like getsoft and IPC Games does Skip Wait skip?",
    answer: "Skip Wait bypasses getsoft, IPC Games, and please wait pages on oceansofgamess.com, opening signed CDN file links directly from the download button.",
  },
  {
    question: "How does Skip Wait open signed CDN links from OceansOfGamess download buttons?",
    answer: "The extension fetches the direct CDN link in the background and bypasses generating timers and redirect hops that normally follow each click.",
  },
  {
    question: "What please wait screens does Skip Wait bypass on oceansofgamess.com?",
    answer: "Download generating timers and intermediary redirect pages before the file are skipped so your game download starts from the resolved link.",
  },
  {
    question: "Is the OceansOfGamess bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The OceansOfGamess bypass runs on supported pages with no account or paid plan required.",
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
