import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "PeskTop";

const bypassType = "Direct Download";

const description = "PeskTop bypass skips the downloads waiting page and opens the signed peskfree CDN file link directly from the Direct download button instantly.";

const domains = [
  "pesktop.com",
] as const;

const keywords = [
  "pesktop bypass",
  "PeskTop bypass extension",
  "pesktop timer bypass",
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

const intro = "PeskTop often hides files behind generating timers and redirect hops. Skip Wait bypasses those download delays on the supported website and opens the file link from the button you already clicked.";

const problem = "PeskTop often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a PeskTop bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "With Skip Wait installed, go to a PeskTop download page and click the same Direct Download, Fast Download, or host button you already use. The extension resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. Download buttons on the supported website resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the PeskTop bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for PeskTop; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on PeskTop. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported PeskTop page.",
  },
];

const skips = [
  "PeskTop direct download flows",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What downloads waiting page does Skip Wait skip on PeskTop?",
    answer: "Skip Wait bypasses the downloads waiting page on pesktop.com and opens the signed peskfree CDN file link directly from the Direct download button.",
  },
  {
    question: "How does Skip Wait open signed peskfree CDN links from Direct download?",
    answer: "The extension resolves the real CDN URL in the background after your click, skipping the timer page that normally blocks the file link.",
  },
  {
    question: "Can I bypass PeskTop delays after clicking the download button?",
    answer: "Yes. Generating timers and intermediary redirect pages are bypassed so the file opens from the button you already pressed.",
  },
  {
    question: "Is the PeskTop bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The PeskTop bypass runs on supported pages with no account or paid plan required.",
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
