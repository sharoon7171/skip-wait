import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Gaea Operations / Lockr';

const bypassType = 'Skip Content Locker';

const description =
  'Lockr bypass for Gaea Operations lockers: skip offer tasks, popup walls, adblock warnings, and the Unlock content waitlist without buying Premium.';

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
] as const;

const intro =
  'A Lockr share rarely ends at the file or channel you were promised. You land on Unlock content, grind Complete the 5 steps after a popup, browser-install offers, and Quick Step clicks, then sit on Unlocks in while Premium begs you to pay. Skip Wait is the free Chrome extension built for that locker card—cover the noise, finish the unlock path, open the real destination.';

const body = `## Unlock content cards that never feel finished

Gaea Operations runs Lockr as monetization middleware. Free visitors hit task stacks that change by device and region—step farms, Download the Best Gaming Browser offers, After the Popup article walls—then often a red waitlist or Instant access Premium checkout. Disable your ad-blocker warnings, VPN soft-blocks, and nested lockers (one Lockr pointing at another) make it feel broken rather than monetized. Closing the wrong tab resets progress, which is why lockr chrome extension and skip lockr waitlist searches spike around the same Discord shares.

### Noise on a typical free locker

- Offer tasks like Complete the 5 steps and Quick Step clicks
- After the Popup modals and forced pop-unders
- Ad-blocker / VPN screens that stall the card
- Unlock content waitlist timers and Unlocks in countdowns
- Premium Instant access as the only “fast” path

## Overlay on the offer wall, unlock on Lockr’s path

When a supported locker loads, Skip Wait covers the offer wall so fake unlock buttons cannot steal the click. It marks required tasks complete on Lockr’s own unlock path, honors the wait free traffic still owes, then follows the real target Unlock content would open—not a homepage guessed from a favicon. Status text stays plain; surveys, second-browser installs, and Premium trials stay optional for people who want them.

## Nested lockers and waitlists that outlast the checklist

Finishing every checkmark does not always release the file. Many free lockers add a long waiting list, stack another Lockr behind the first, or soft-block VPN users. Skip Wait targets that stuck Unlock content state—skip lockr tasks and skip lockr premium without pretending Lockr stopped monetizing free traffic entirely.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What is Lockr from Gaea Operations?',
    answer:
      'Lockr is a content locker in front of files, mods, private pages, and invites. Visitors complete tasks or buy Premium before the destination appears. Gaea Operations GmbH operates the product.',
  },
  {
    question: 'What does a Lockr bypass skip?',
    answer:
      'Visible task lists, popup/article walls, and Unlock content busywork. Skip Wait still follows Lockr’s unlock release for free traffic, then opens the real target.',
  },
  {
    question: 'Will I still see Unlock content or a waitlist?',
    answer:
      'The page underneath may still show those labels. The overlay is what you use—Skip Wait drives unlock and redirects when ready.',
  },
  {
    question: 'Do I need Lockr Premium?',
    answer:
      'No. Premium is Lockr’s paid skip. Skip Wait is free and does not ask for a trial or card.',
  },
  {
    question: 'Why do some Lockr links feel endless after tasks?',
    answer:
      'Long waitlists, nested lockers, or VPN/ad-blocker soft-blocks. That is why skip lockr waitlist and lockr unlock bypass searches cluster around stuck Unlock content cards.',
  },
  {
    question: 'Is the Lockr bypass free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store with no subscription for the bypass itself.',
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
    body,
    faq,
  },
} satisfies SupportedBypass;
