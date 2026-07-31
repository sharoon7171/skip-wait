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

const intro = "Need a OceansOfGamess direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "OceansOfGamess often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a OceansOfGamess bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a OceansOfGamess file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the OceansOfGamess bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for OceansOfGamess; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on OceansOfGamess. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported OceansOfGamess page.",
  },
];

const skips = [
  "OceansOfGamess direct download flows",
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
