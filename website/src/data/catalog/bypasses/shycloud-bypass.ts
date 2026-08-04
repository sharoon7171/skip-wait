import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "ShyCloud";

const bypassType = "Skip Waiting Page";

const description = "ShyCloud bypass skips the Secure Link Generator wait on inloadapi and redirects past the download gate used by sites like karanpc.com.";

const domains = [
  "inloadapi.com",
  "srv.inload.net",
  "karanpc.com",
] as const;

const keywords = [
  "shycloud bypass",
  "ShyCloud bypass extension",
  "inloadapi bypass",
  "karanpc bypass",
  "karanpc timer bypass",
  "skip waiting page",
  "skip countdown timer",
  "bypass countdown timer",
  "link shortener bypass",
  "skip wait extension",
  "please wait bypass",
  "waiting page bypass",
] as const;

const intro = "ShyCloud bypass skips the Secure Link Generator wait on inloadapi and redirects past the download gate used by sites like karanpc.com. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "ShyCloud’s inloadapi gate sits between software download buttons and the real file host, forcing a progress wait before the destination opens.";

const howItWorks = "When the inloadapi waiting page loads, Skip Wait decodes the unlock route, shows an overlay, and redirects to the destination or srv.inload download path without the timer.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The ShyCloud bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for ShyCloud or karanpc.com download links.",
  },
  {
    title: "Open a supported link",
    body: "Open a download button that routes through inloadapi (including karanpc.com). No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs on the matching page and moves you past the supported ShyCloud delay.",
  },
];

const skips = [
  "Secure Link Generator wait timers",
  "Continue button unlock delays",
  "srv.inload.net securing connection waits",
  "Manual continue and download now clicks",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What wait does Skip Wait skip on ShyCloud inloadapi pages?",
    answer: "Skip Wait skips the Secure Link Generator progress wait on inloadapi.com and redirects to the decoded destination without the timer.",
  },
  {
    question: "Does the ShyCloud bypass work on karanpc.com download buttons?",
    answer: "Yes. karanpc.com posts through ShyCloud’s inloadapi gateway, so Skip Wait runs after that hop and unlocks the destination.",
  },
  {
    question: "Does Skip Wait also skip the srv.inload.net securing connection screen?",
    answer: "Yes. The extension skips the short securing connection delay and continues to the secure download step immediately.",
  },
  {
    question: "Is the ShyCloud bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The ShyCloud bypass runs on supported pages with no account or paid plan required.",
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
