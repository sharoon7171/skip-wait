import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Mega4Upload";

const bypassType = "Direct Download";

const description = "Mega4Upload bypass skips the free download countdown and captcha gate to open the direct torrent download link from this file host instantly.";

const domains = [
  "mega4upload.net",
] as const;

const keywords = [
  "mega4upload bypass",
  "Mega4Upload bypass extension",
  "mega4upload timer bypass",
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

const intro = "Mega4Upload bypass skips the free download countdown and captcha gate to open the direct torrent download link from this file host instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Mega4Upload often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Mega4Upload bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Mega4Upload.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on Mega4Upload. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Mega4Upload delay.",
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
    question: "What free download countdown does Skip Wait skip on mega4upload.net?",
    answer: "Skip Wait bypasses the free download countdown and captcha gate on mega4upload.net to open the direct torrent download link.",
  },
  {
    question: "Does Skip Wait handle the captcha gate before Mega4Upload torrent links?",
    answer: "The extension bypasses generating timers and redirect pages so your torrent download starts from the resolved link when the host allows it.",
  },
  {
    question: "Can I open direct torrent downloads from Mega4Upload with Skip Wait?",
    answer: "Yes. Click download on mega4upload.net and Skip Wait fetches the direct torrent link instead of making you wait through the countdown first.",
  },
  {
    question: "Is the Mega4Upload bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Mega4Upload bypass runs on supported pages with no account or paid plan required.",
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
