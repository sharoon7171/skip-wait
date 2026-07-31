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

const intro = "ShortXLinks safelink pages chain countdowns and generate link steps. Skip Wait bypasses that safelink flow on 5 supported websites in this network and redirects you to the final URL without manual form clicks.";

const problem = "ShortXLinks wraps destination links in a safelink countdown and generate link flow. People search for a ShortXLinks bypass to skip that chain and open the final URL.";

const howItWorks = "Install Skip Wait, click a ShortXLinks safelink, and avoid the manual generate link routine. The extension bypasses safelink countdowns on supported pages and resolves the decoded destination URL for you. Safelink countdowns on 5 supported websites are skipped so the final URL opens without the multi form chain.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the ShortXLinks bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for ShortXLinks; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a ShortXLinks link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported ShortXLinks delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "ShortXLinks skip safelink wait flows",
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
