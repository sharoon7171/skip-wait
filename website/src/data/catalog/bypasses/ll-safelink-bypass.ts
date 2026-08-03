import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "LL Safelink";

const bypassType = "Skip Safelink Wait";

const description = "LL Safelink bypass skips WordPress safelink forms and LLAC Continue ad hops by decoding the ddx unlock into your destination URL.";

const domains = [
  "teknoasian.com",
  "linegee.net",
] as const;

const keywords = [
  "ll safelink bypass",
  "LL Safelink bypass extension",
  "ll safelink timer bypass",
  "linegee bypass",
  "llac bypass",
  "skip safelink wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "safelink bypass",
  "wordpress safelink bypass",
] as const;

const intro = "LL Safelink bypass skips WordPress safelink forms and LLAC Continue ad hops by decoding the ddx unlock into your destination URL. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "LL Safelink wraps destinations in WordPress safelink forms, then an LLAC Continue page that opens ads before releasing the real link.";

const howItWorks = "On teknoasian.com Skip Wait completes the safelink form chain to the next hop. On linegee.net it decodes the LLAC atob ddx token, fetches the unlock response, and opens the destination from #xxc without the Continue ad.";

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
    body: "Open a teknoasian.com or linegee.net unlock link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported LL Safelink and LLAC steps.",
  },
];

const skips = [
  "WordPress safelink form and generate-link waits",
  "LLAC Continue ad popups on linegee.net",
  "Manual ddx unlock after Continue",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What safelink waiting chain does Skip Wait bypass on LL Safelink pages?",
    answer: "Skip Wait completes the safelink form chain on teknoasian.com and decodes the LLAC ddx unlock on linegee.net so the destination opens without Continue ads.",
  },
  {
    question: "Does Skip Wait skip the Continue ad on linegee.net?",
    answer: "Yes. Skip Wait reads the LLAC atob ddx token from the page, fetches the unlock response, and opens the #xxc destination without clicking Continue or loading the ad tab.",
  },
  {
    question: "Can I avoid the manual generate-link routine on WordPress safelink pages?",
    answer: "Yes. Open an LL Safelink and Skip Wait resolves through the supported forms and LLAC hop instead of making you run each step yourself.",
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
