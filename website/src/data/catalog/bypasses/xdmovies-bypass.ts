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

const intro = "XDMovies bypass skips the landing page delay before open main site and takes you to the streaming homepage without any forced waiting on load. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "XDMovies delays the main site behind a landing wait screen.";

const howItWorks = "Skip Wait clears the landing wait so you continue into the site without the connection delay.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The XDMovies bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for XDMovies.",
  },
  {
    title: "Land on the entry page",
    body: "Visit the XDMovies landing URL as usual. Skip Wait advances past the delay into the main site.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported XDMovies delay.",
  },
];

const skips = [
  "Landing-page connection delays",
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
