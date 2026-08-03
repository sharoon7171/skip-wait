import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "OceanofDMG";

const bypassType = "Direct Download";

const description = "OceanofDMG bypass skips the please wait download page and opens the signed CDN file link directly from the software listing without extra delay.";

const domains = [
  "oceanofdmg.com",
] as const;

const keywords = [
  "oceanofdmg bypass",
  "OceanofDMG bypass extension",
  "oceanofdmg timer bypass",
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

const intro = "OceanofDMG bypass skips the please wait download page and opens the signed CDN file link directly from the software listing without extra delay. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "OceanofDMG often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Skip Wait resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The OceanofDMG bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for OceanofDMG.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on OceanofDMG. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported OceanofDMG delay.",
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
    question: "What please wait download page does Skip Wait skip on OceanofDMG?",
    answer: "Skip Wait bypasses the please wait download page on oceanofdmg.com and opens the signed CDN file link directly from the software listing.",
  },
  {
    question: "How does Skip Wait open signed CDN file links from software listings?",
    answer: "When you click download, the extension resolves the real CDN URL in the background instead of sending you through a generating timer page.",
  },
  {
    question: "Can I download Mac software from oceanofdmg.com without waiting?",
    answer: "Yes. Intermediary redirect pages and extra wait screens on download buttons are bypassed so the file link opens immediately.",
  },
  {
    question: "Is the OceanofDMG bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The OceanofDMG bypass runs on supported pages with no account or paid plan required.",
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
