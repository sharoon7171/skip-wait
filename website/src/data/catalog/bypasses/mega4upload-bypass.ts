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

const intro = "Mega4Upload often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on the supported website and opens the file link from the button you already clicked.";

const problem = "Mega4Upload often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a Mega4Upload bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a Mega4Upload file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Mega4Upload bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Mega4Upload; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on Mega4Upload. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported Mega4Upload page.",
  },
];

const skips = [
  "Mega4Upload direct download flows",
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
