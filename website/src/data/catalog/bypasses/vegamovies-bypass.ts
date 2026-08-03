import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Vegamovies";

const bypassType = "Skip Landing Wait";

const description = "Vegamovies bypass skips the vglist connecting delay and opens VegaMovies, RogMovies, Anime, and Xprime live servers instantly from the hub.";

const domains = [
  "vglist.top",
  "vglist.nl",
] as const;

const keywords = [
  "vegamovies bypass",
  "Vegamovies bypass extension",
  "vglist bypass",
  "vegamovies timer bypass",
  "skip landing wait",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "landing page bypass",
  "mirror site bypass",
] as const;

const intro = "Vegamovies bypass skips the vglist connecting delay and opens VegaMovies, RogMovies, Anime, and Xprime live servers instantly from the hub. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "Vegamovies delays each Quick Access link behind a connecting page with a forced wait.";

const howItWorks = "Top or vglist.nl, and use Quick Access as usual. The extension resolves the live destination from the connecting page and skips the wait so VegaMovies, RogMovies, Anime, and Xprime open immediately.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The Vegamovies bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for Vegamovies.",
  },
  {
    title: "Open the Vegamovies hub",
    body: "Visit vglist.top or vglist.nl as usual. Skip Wait prepares instant unlocks for the Quick Access destinations.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported Vegamovies delay.",
  },
];

const skips = [
  "Landing-page connection delays",
  "vglist securing-connection delays",
  "Quick Access connecting page waits",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "Which Vegamovies hub domains does Skip Wait support?",
    answer: "Skip Wait supports vglist.top and vglist.nl, skipping the connecting delay before VegaMovies, RogMovies, Anime, and Xprime.",
  },
  {
    question: "What landing wait does Skip Wait skip on the Vegamovies hub?",
    answer: "The securing-connection redirect page after Quick Access is bypassed so you open the live server without the forced wait.",
  },
  {
    question: "Can I open VegaMovies and RogMovies faster with Skip Wait?",
    answer: "Yes. Skip Wait resolves the live destination and opens it immediately instead of making you sit through the connecting delay.",
  },
  {
    question: "Is the Vegamovies bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Vegamovies bypass runs on supported pages with no account or paid plan required.",
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
