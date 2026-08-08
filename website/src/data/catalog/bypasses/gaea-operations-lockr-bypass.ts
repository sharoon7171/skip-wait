import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'Gaea Operations / Lockr';

const bypassType = 'Skip Content Locker';

const description =
  'Lockr bypass for Gaea Operations lockers: skip offer tasks, pop-up walls, adblock warnings, and the Unlock content waitlist so the real destination opens without surveys or Premium.';

const domains = ['lockr.net', 'lockr.so', 'lockr.to'] as const;

const keywords = [
  'lockr bypass',
  'lockr unlock bypass',
  'bypass lockr',
  'gaea operations lockr bypass',
  'gaea lockr bypass',
  'lockr content locker bypass',
  'lockr chrome extension',
  'lockr unlock extension',
  'skip lockr tasks',
  'skip lockr waitlist',
  'lockr unlock content',
  'unlock content lockr',
  'lockr waiting list',
  'lockr unlocks in',
  'lockr premium unlock',
  'skip lockr premium',
  'lockr complete the 5 steps',
  'lockr after the popup',
  'lockr download browser task',
  'lockr complete the quick step',
  'lockr offer wall',
  'lockr task bypass',
  'content locker bypass',
  'skip content locker',
  'bypass content locker',
  'skip waitlist unlock',
  'skip unlock timer',
  'bypass unlock timer',
  'skip waiting page',
  'link locker bypass',
  'social unlock bypass',
  'skip wait lockr',
  'skip wait chrome extension',
  'lockr.net bypass',
  'lockr.so bypass',
  'lockr.to bypass',
] as const;

const intro =
  'A Lockr share rarely ends at the file or channel you were promised. You land on a card titled Unlock content, get pushed through Complete the 5 steps after a popup, Download the Best Gaming Browser, Complete the Quick Step, and similar offer tasks, then sit on a red Unlocks in countdown while Premium banners ask you to pay to skip the line. People search Lockr bypass, skip Lockr tasks, Lockr waitlist, or Unlock content Lockr when that loop refuses to finish. Skip Wait is a free Chrome extension built for that exact locker screen: it covers the noise, works the unlock path in the background, and sends you to the real destination when Lockr would finally release it—without hunting articles under a modal or buying a trial.';

const problem =
  'Gaea Operations runs Lockr as monetization middleware between a shared link and the thing you actually want. Free visitors are routed into a task stack that changes by device and region—intentix-style step farms, browser install offers, short “quick step” clicks—plus pop-up layers that beg you to open articles until a close button unlocks. Even after every checkmark appears, many lockers still drop you on a waitlist for a long Unlock content timer, or bounce you into Instant access Premium checkout. Disable your ad-blocker messages, VPN blocks, and nested lockers (one Lockr link pointing at another) make it feel broken rather than monetized. Closing the wrong tab or missing the buried task arrow usually resets progress, which is why Lockr Chrome extension and content locker bypass searches spike around the same shares.';

const howItWorks =
  'When a supported Lockr locker page loads, Skip Wait puts a full-page overlay over the offer wall so pop-ups and fake unlock buttons cannot steal the click. It reads the locker the same way the page does, marks the required tasks complete on Lockr’s own unlock path, honors the wait Lockr still enforces on free traffic, then follows the real target URL Unlock content would open—not a bare website homepage guessed from a favicon. You stay on one tab, see plain status text while it works, and only move when the destination is ready. Nothing asks you to finish surveys, install a second browser, or start a Premium subscription to clear the gate.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait from the Chrome Web Store',
    body: 'Add Skip Wait once. Searches like Lockr Chrome extension, Lockr unlock extension, or skip wait chrome extension all point at this listing. Lockr support rides along with the install—no account and no separate toggle.',
  },
  {
    title: 'Leave Skip Wait enabled',
    body: 'Keep the extension on in Chrome. There is no per-link Lockr setting to flip before each share.',
  },
  {
    title: 'Open the Lockr link you were sent',
    body: 'Use the same short Lockr URL from Discord, Telegram, or a download page. When the Unlock content card appears, Skip Wait covers it so tasks and Premium CTAs stay out of the way.',
  },
  {
    title: 'Wait for the destination to open',
    body: 'Watch the overlay status. When Lockr’s unlock path returns the real link, Skip Wait opens it for you—no Complete the 5 steps clicks and no manual waitlist math.',
  },
];

const skips = [
  'Offer tasks like Complete the 5 steps, browser installs, and Quick Step clicks',
  'After the Popup article modals and forced pop-under layers',
  'Ad-blocker / VPN block screens that stop the locker from loading',
  'Unlock content waitlist timers and Unlocks in countdowns',
  'Premium Instant access upsells used as the only fast path',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'What is Lockr from Gaea Operations?',
    answer:
      'Lockr is a content locker: creators put it in front of files, mods, private pages, and invite links so visitors complete tasks or buy Premium before the destination appears. Gaea Operations GmbH operates the product.',
  },
  {
    question: 'What does a Lockr bypass actually skip?',
    answer:
      'Skip Wait skips the visible task list, popup / article walls, and the usual Unlock content busywork. It still follows Lockr’s unlock release for free traffic, then opens the real target instead of leaving you on the locker card.',
  },
  {
    question: 'Will I still see Unlock content or a waitlist?',
    answer:
      'The page underneath may still show those labels, but the overlay is what you use. Skip Wait drives the unlock path and redirects when the destination is ready, so you are not clicking every task by hand.',
  },
  {
    question: 'Do I need Lockr Premium for this?',
    answer:
      'No. Premium is Lockr’s paid skip. Skip Wait is free and does not ask you to start a trial, enter a card, or sign in to clear the locker.',
  },
  {
    question: 'Why do some Lockr links feel endless even after tasks?',
    answer:
      'Many free lockers add a long waitlist after the checks, stack another locker behind the first, or soft-block VPN and ad-blocker users. That is why people look for skip Lockr waitlist and Lockr unlock bypass help—the extension targets that stuck Unlock content state.',
  },
  {
    question: 'Is the Lockr bypass free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store. The Lockr path runs on supported locker pages with no subscription for the bypass itself.',
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
