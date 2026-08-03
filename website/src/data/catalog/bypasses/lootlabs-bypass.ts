import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "LootLabs";

const bypassType = "Skip Content Locker";

const description = "LootLabs bypass skips content locker waits and ad gate timers on LootLabs monetized links for automatic redirect to your destination URL instantly.";

const domains = [
  "links.lootlabs.gg",
  "rapid-links.com",
  "loot-link.com",
  "lootlinks.com",
  "speedy-links.com",
  "best-links.org",
  "free-leaks.com",
  "fast-links.org",
  "beta.luadefender.xyz",
] as const;

const keywords = [
  "lootlabs bypass",
  "LootLabs bypass extension",
  "lootlabs timer bypass",
  "skip content locker",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "content locker bypass",
  "loot link bypass",
] as const;

const intro = "LootLabs bypass skips content locker waits and ad gate timers on LootLabs monetized links for automatic redirect to your destination URL instantly. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "LootLabs locks the destination behind content locker waits and ad gates. A LootLabs bypass unlocks the link without sitting through those timers.";

const howItWorks = "Skip Wait works through the locker flow on supported hosts and redirects you when the destination becomes available.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The LootLabs bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for LootLabs.",
  },
  {
    title: "Open a supported link",
    body: "Open a LootLabs link the same way you usually do. No paste tool or special settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported LootLabs delay.",
  },
];

const skips = [
  "Content Locker that block the destination",
  "Content locker ad gates",
  "Locker release wait timers",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "How many LootLabs domains like links.lootlabs.gg does Skip Wait cover?",
    answer: "Skip Wait supports nine LootLabs hosts including links.lootlabs.gg, loot-link.com, speedy-links.com, and best-links.org.",
  },
  {
    question: "What content locker ad gates does Skip Wait bypass on LootLabs links?",
    answer: "Content locker ad gates and locker release wait timers are bypassed so the destination opens when the server releases the link.",
  },
  {
    question: "Does Skip Wait redirect automatically when the LootLabs destination releases?",
    answer: "Yes. Keep the tab active and the extension works through the locker flow on supported hosts, redirecting you when the link becomes available.",
  },
  {
    question: "Is the LootLabs bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The LootLabs bypass runs on supported pages with no account or paid plan required.",
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
