import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "ShortXLinks";

const bypassType = "Skip Safelink Wait";

const description = "ShortXLinks bypass skips the safelink waiting chain and multi page ad waits across this link shortener network to unlock your final URL faster.";

const domains = [
  "shortxlinks.com",
  "flexthecar.com",
  "nkrmusic.in.net",
  "raisingcanesmenux.com",
  "pcfileszone.com",
] as const;

const keywords = [
  "shortxlinks bypass",
  "ShortXLinks bypass extension",
  "shortxlinks timer bypass",
  "skip safelink wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "safelink bypass",
  "wordpress safelink bypass",
] as const;

const intro = "ShortXLinks bypass skips the safelink waiting chain and multi page ad waits across this link shortener network to unlock your final URL faster. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "ShortXLinks wraps destination links in a safelink countdown and generate link flow.";

const howItWorks = "Skip Wait bypasses safelink countdowns on supported pages and resolves the decoded destination URL for you.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The ShortXLinks bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for ShortXLinks.",
  },
  {
    title: "Open a supported link",
    body: "Open a ShortXLinks link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported ShortXLinks delay.",
  },
];

const skips = [
  "Safelink Wait that block the destination",
  "Safelink countdown chains",
  "Generate link form steps",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How many ShortXLinks network sites does Skip Wait support?",
    answer: "Skip Wait covers five ShortXLinks sites including shortxlinks.com, flexthecar.com, nkrmusic.in.net, and pcfileszone.com.",
  },
  {
    question: "What safelink waiting chain does Skip Wait bypass on ShortXLinks?",
    answer: "Safelink countdown chains and generate link form steps are bypassed so you reach the final URL without manual form clicks.",
  },
  {
    question: "Does Skip Wait skip multi page ad waits to unlock the final URL?",
    answer: "Yes. The extension bypasses safelink waits and multi page ad gates across the ShortXLinks network and resolves the decoded destination URL.",
  },
  {
    question: "Is the ShortXLinks bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The ShortXLinks bypass runs on supported pages with no account or paid plan required.",
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
