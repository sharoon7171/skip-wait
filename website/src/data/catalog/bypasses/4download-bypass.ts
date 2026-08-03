import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "4Download";

const bypassType = "Direct Download";

const description = "4Download bypass unlocks direct download links on every mirror button, skipping the loading wait for Google Drive, MediaFire, and torrent files.";

const domains = [
  "4download.net",
] as const;

const keywords = [
  "4download bypass",
  "4Download bypass extension",
  "4download timer bypass",
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

const intro = "4Download bypass unlocks direct download links on every mirror button, skipping the loading wait for Google Drive, MediaFire, and torrent files. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "4Download often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The 4Download bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for 4Download.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on 4Download. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported 4Download delay.",
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
    question: "Which download hosts does Skip Wait unlock on 4Download?",
    answer: "Skip Wait resolves real file links from Google Drive, MediaFire, and torrent buttons on 4download.net, bypassing the loading wait that normally appears after each click.",
  },
  {
    question: "What happens when I click Direct Download on 4Download with Skip Wait?",
    answer: "The extension fetches the actual file URL in the background and opens it directly, skipping the generating timer and intermediary redirect page that usually follows the button press.",
  },
  {
    question: "Does Skip Wait skip the generating download screen on 4Download?",
    answer: "Yes. Extra wait screens on mirror and host buttons are bypassed so your download starts from the resolved link instead of sitting on a timer page.",
  },
  {
    question: "Is the 4Download bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The 4Download bypass runs on supported pages with no account or paid plan required.",
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
