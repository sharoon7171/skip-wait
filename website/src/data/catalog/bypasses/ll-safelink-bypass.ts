import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "LL Safelink";

const bypassType = "Skip Safelink Wait";

const description = "LL Safelink bypass skips the safelink waiting chain and multi form unlock steps on WordPress safelink pages to reach your final URL right away.";

const domains = [
  "teknoasian.com",
] as const;

const keywords = [
  "ll safelink bypass",
  "LL Safelink bypass extension",
  "ll safelink timer bypass",
  "skip safelink wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "safelink bypass",
  "wordpress safelink bypass",
] as const;

const intro = "LL Safelink bypass skips the safelink waiting chain and multi form unlock steps on WordPress safelink pages to reach your final URL right away. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "LL Safelink wraps destination links in a safelink countdown and generate link flow.";

const howItWorks = "Skip Wait bypasses safelink countdowns on supported pages and resolves the decoded destination URL for you. Safelink countdowns on the supported website are skipped so the final URL opens without the multi form chain.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The LL Safelink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for LL Safelink.",
  },
  {
    title: "Open a supported link",
    body: "Open a LL Safelink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported LL Safelink delay.",
  },
];

const skips = [
  "Safelink Wait that block the destination",
  "Safelink countdown chains",
  "Generate link form steps",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What safelink waiting chain does Skip Wait bypass on LL Safelink pages?",
    answer: "Skip Wait bypasses the safelink waiting chain and multi-form unlock steps on WordPress safelink pages like teknoasian.com to reach your final URL.",
  },
  {
    question: "Does Skip Wait skip multi-form unlock steps on teknoasian.com safelinks?",
    answer: "Yes. Safelink countdown chains and generate link form steps are bypassed without you clicking through each manual unlock form.",
  },
  {
    question: "Can I avoid the manual generate-link routine on WordPress safelink pages?",
    answer: "Yes. Click an LL Safelink and Skip Wait resolves the decoded destination URL instead of making you run the generate link routine yourself.",
  },
  {
    question: "Is the LL Safelink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The LL Safelink bypass runs on supported pages with no account or paid plan required.",
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
