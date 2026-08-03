import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "WP Safelink";

const bypassType = "Skip Safelink Wait";

const description = "WP Safelink bypass skips the safelink countdown and generate link steps on WordPress safelink plugin pages for instant destination redirect.";

const domains = [
  "stbemuiptvcodes.com",
  "techedubyte.com",
  "demo-safelink.themeson.com",
  "dev-safelink.themeson.com",
] as const;

const keywords = [
  "wp safelink bypass",
  "WP Safelink bypass extension",
  "wp safelink timer bypass",
  "skip safelink wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "safelink bypass",
  "wordpress safelink bypass",
] as const;

const intro = "WP Safelink bypass skips the safelink countdown and generate link steps on WordPress safelink plugin pages for instant destination redirect. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "WP Safelink wraps destination links in a safelink countdown and generate link flow.";

const howItWorks = "Skip Wait bypasses safelink countdowns on supported pages and resolves the decoded destination URL for you.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The WP Safelink bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for WP Safelink.",
  },
  {
    title: "Open a supported link",
    body: "Open a WP Safelink link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported WP Safelink delay.",
  },
];

const skips = [
  "Safelink Wait that block the destination",
  "Safelink countdown chains",
  "Generate link form steps",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which WordPress safelink plugin sites does Skip Wait support?",
    answer: "Skip Wait covers four WP Safelink sites including stbemuiptvcodes.com, techedubyte.com, and demo-safelink.themeson.com.",
  },
  {
    question: "What generate-link steps does Skip Wait skip on WP Safelink pages?",
    answer: "Safelink countdown chains and generate link form steps on WordPress safelink plugin pages are bypassed for instant destination redirect.",
  },
  {
    question: "Can Skip Wait bypass safelink countdowns on techedubyte.com and similar sites?",
    answer: "Yes. Click a WP Safelink and the extension resolves the decoded destination URL without the manual generate link routine.",
  },
  {
    question: "Is the WP Safelink bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The WP Safelink bypass runs on supported pages with no account or paid plan required.",
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
