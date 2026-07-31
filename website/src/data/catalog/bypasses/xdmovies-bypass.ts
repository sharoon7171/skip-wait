import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "XDMovies";

const bypassType = "Skip Landing Wait";

const description = "XDMovies bypass skips the landing page delay before open main site and takes you to the streaming homepage without any forced waiting on load.";

const domains = [
  "xdmovies.com",
] as const;

const keywords = [
  "xdmovies bypass",
  "XDMovies bypass extension",
  "xdmovies timer bypass",
  "skip landing wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "landing page bypass",
  "mirror site bypass",
] as const;

const intro = "XDMovies landing pages delay access to the main site or mirror. Skip Wait bypasses that landing wait on the supported website and opens the working destination URL faster.";

const problem = "XDMovies delays the main site behind a landing wait screen. Users look for a XDMovies bypass to open the homepage without sitting through the delay.";

const howItWorks = "Install Skip Wait, browse to a supported XDMovies page, and use the site normally. The extension activates on recognized skip landing wait flows and bypasses or automates the wait so you reach the content faster. The landing delay on the supported website is skipped so you continue into the main site URL.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the XDMovies bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for XDMovies; supported flows run in the background when the page matches.",
  },
  {
    title: "Land on the entry page",
    body: "Visit the XDMovies landing URL as usual. Skip Wait advances past the delay into the main site.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait skips the landing delay and opens the main XDMovies site URL.",
  },
];

const skips = [
  "XDMovies skip landing wait flows",
  "Landing page mirror delays",
  "Open main site wait screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What landing page delay does Skip Wait skip before opening XDMovies main site?",
    answer: "Skip Wait bypasses the landing page delay before open main site on xdmovies.com and takes you to the streaming homepage without waiting.",
  },
  {
    question: "Does Skip Wait take me to the streaming homepage without waiting?",
    answer: "Yes. Landing page mirror delays and open-main-site wait screens are bypassed so you start browsing immediately.",
  },
  {
    question: "How does Skip Wait bypass the open main site screen on xdmovies.com?",
    answer: "The extension activates on landing wait flows and opens the working destination URL faster instead of making you sit through the delay.",
  },
  {
    question: "Is the XDMovies bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The XDMovies bypass runs on supported pages with no account or paid plan required.",
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
