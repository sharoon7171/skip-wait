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

const intro = "Need a 4Download direct download bypass that skips timer pages on file buttons? Skip Wait resolves real download URLs on the supported website so clicks open files instead of waiting screens.";

const problem = "4Download often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a 4Download bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a 4Download download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the 4Download bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for 4Download; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on 4Download. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported 4Download page.",
  },
];

const skips = [
  "4Download direct download flows",
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
