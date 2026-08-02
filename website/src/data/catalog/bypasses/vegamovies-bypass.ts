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

const intro = "Vegamovies hub links on vglist send you through a securing-connection wait before VegaMovies, RogMovies, Anime, or Xprime. Skip Wait bypasses that landing wait on the supported websites and opens the live destination faster.";

const problem = "Vegamovies delays each Quick Access link behind a connecting page with a forced wait. Users look for a Vegamovies bypass to reach the live server without sitting through that delay.";

const howItWorks = "Install Skip Wait, open vglist.top or vglist.nl, and use Quick Access as usual. The extension resolves the live destination from the connecting page and skips the wait so VegaMovies, RogMovies, Anime, and Xprime open immediately.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Vegamovies bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Vegamovies; supported flows run in the background when the page matches.",
  },
  {
    title: "Open the Vegamovies hub",
    body: "Visit vglist.top or vglist.nl as usual. Skip Wait prepares instant unlocks for the Quick Access destinations.",
  },
  {
    title: "Reach the destination faster",
    body: "Choose VegaMovies, RogMovies, Anime, or Xprime. Skip Wait skips the connecting delay and opens the live server URL.",
  },
];

const skips = [
  "Vegamovies skip landing wait flows",
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
