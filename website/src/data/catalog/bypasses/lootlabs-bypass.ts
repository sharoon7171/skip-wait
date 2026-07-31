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

const intro = "LootLabs content lockers add ad gates before downloads unlock. Skip Wait bypasses those locker waits on 9 supported websites in this network and opens the destination when the server releases the link.";

const problem = "LootLabs locks the destination behind content locker waits and ad gates. A LootLabs bypass unlocks the link without sitting through those timers.";

const howItWorks = "With Skip Wait enabled, open a LootLabs locker link and keep the tab active. The extension works through the locker flow on supported hosts and redirects you when the destination becomes available. Locker waits on 9 supported websites are bypassed for an automatic redirect to the destination.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the LootLabs bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for LootLabs; supported flows run in the background when the page matches.",
  },
  {
    title: "Open a supported link",
    body: "Visit a LootLabs link the same way you normally would. You do not need a special paste tool or extra settings.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background, skips the supported LootLabs delay layer, and sends you to the destination or unlock result.",
  },
];

const skips = [
  "LootLabs skip content locker flows",
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
