import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "Linkvertise";

const bypassType = "Skip Access Steps";

const description = "Linkvertise bypass skips ad tasks, access steps, and wait timers on monetized links so you reach the final download URL or copied content faster.";

const domains = [
  "linkvertise.com",
  "beta.luadefender.xyz",
] as const;

const keywords = [
  "linkvertise bypass",
  "linkvertise bypass chrome",
  "linkvertise bypass extension",
  "bypass linkvertise",
  "skip linkvertise",
  "linkvertise skip",
  "linkvertise timer bypass",
  "linkvertise waiting page",
  "linkvertise access bypass",
  "luadefender bypass",
] as const;

const intro = "Linkvertise monetized links stack ad tasks and access steps before the final URL. Skip Wait bypasses those access screens on supported websites on this network so you reach the destination or copied content faster.";

const problem = "Linkvertise stacks ad tasks and access steps before the final URL or copied content. A Linkvertise bypass skips those access screens so you reach the destination faster.";

const howItWorks = "Add Skip Wait to Chrome and open a Linkvertise access page. The extension completes supported access tasks, bypasses wait timers, and redirects to the final link or copies the result content when that is what the page returns. Access tasks on 2 supported websites are completed where supported, then you get the final URL or copied content.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the Linkvertise bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for Linkvertise; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a Linkvertise link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported Linkvertise delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "Linkvertise skip access steps flows",
  "Ad tasks on monetized links",
  "Access step wait screens",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What ad tasks does Skip Wait complete on Linkvertise monetized links?",
    answer: "Skip Wait completes supported access tasks and bypasses ad task screens on linkvertise.com and beta.luadefender.xyz so you reach the final URL faster.",
  },
  {
    question: "Does Skip Wait copy result content when Linkvertise returns text instead of a URL?",
    answer: "Yes. The extension redirects to the final link or copies the result content when that is what the Linkvertise access page returns.",
  },
  {
    question: "Which access step waits does Skip Wait bypass on Linkvertise?",
    answer: "Access step wait screens and ad tasks on monetized links are bypassed so you reach the download URL or copied content without clicking through every step.",
  },
  {
    question: "Is the Linkvertise bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The Linkvertise bypass runs on supported pages with no account or paid plan required.",
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
