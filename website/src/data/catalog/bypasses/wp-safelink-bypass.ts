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

const intro = "WP Safelink safelink pages chain countdowns and generate link steps. Skip Wait bypasses that safelink flow on 4 supported websites in this network and redirects you to the final URL without manual form clicks.";

const problem = "WP Safelink wraps destination links in a safelink countdown and generate link flow. People search for a WP Safelink bypass to skip that chain and open the final URL.";

const howItWorks = "Install Skip Wait, click a WP Safelink safelink, and avoid the manual generate link routine. The extension bypasses safelink countdowns on supported pages and resolves the decoded destination URL for you. Safelink countdowns on 4 supported websites are skipped so the final URL opens without the multi form chain.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the WP Safelink bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for WP Safelink; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a WP Safelink link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported WP Safelink delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "WP Safelink skip safelink wait flows",
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
