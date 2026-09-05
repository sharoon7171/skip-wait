import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Gaea Operations / Lockr';

const bypassType = 'Skip Content Locker';

const description =
  'Lockr bypass clears Unlock content tasks, ad-blocker walls, and Unlocks in waitlists so Skip Wait opens the destination without Premium.';

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
  'A Lockr share rarely ends at the file or channel you were promised. You land on Unlock content, grind Complete the 5 steps after a popup, browser-install offers, and Quick Step clicks, then sit on Unlocks in while Premium begs you to pay. Skip Wait is the $1.50/month Chrome extension for that locker card—cover the noise, clear the waitlist, open the real destination.';

const body = `## Unlock content cards that never feel finished

Gaea Operations runs Lockr as monetization middleware. Free visitors hit task stacks that change by device and region—step farms, Download the Best Gaming Browser offers, After the Popup article walls—then a red Unlocks in waitlist or Instant access Premium checkout. Disable your ad-blocker warnings, VPN soft-blocks, and nested lockers (one Lockr pointing at another) make it feel broken rather than monetized. Closing the wrong tab resets progress on the same Unlock content card.

### Noise on a typical free locker

- Offer tasks like Complete the 5 steps and Quick Step clicks
- After the Popup modals and forced pop-unders
- Ad-blocker / VPN screens that stall the card
- Unlock content waitlist timers and Unlocks in countdowns
- Premium Instant access as the only “fast” path

## Overlay on the offer wall, unlock when Lockr releases

When a supported locker loads, Skip Wait covers the offer wall so fake unlock buttons cannot steal the click. It drives Lockr’s unlock path past the task checklist and the long Unlocks in waitlist, then opens the real destination Unlock content would unlock—not a homepage guessed from a favicon. Status text stays plain; surveys, second-browser installs, and Premium trials stay optional for people who want them.

## Nested lockers and waitlists that outlast the checklist

Finishing every checkmark does not always feel finished. Many free lockers stack a long waiting list, nest another Lockr behind the first, or soft-block VPN users. Skip Wait targets that stuck Unlock content state—skip lockr tasks, skip lockr waitlist, and skip lockr premium without buying Instant access.
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
      'Visible task lists, popup/article walls, ad-blocker stalls, and the Unlock content / Unlocks in waitlist. Skip Wait opens the real destination when Lockr releases it.',
  },
  {
    question: 'Will I still see Unlock content or a waitlist?',
    answer:
      'The page underneath may still show those labels. The overlay is what you use—Skip Wait clears the waitlist path and redirects when ready.',
  },
  {
    question: 'Do I need Lockr Premium?',
    answer:
      'No. Premium is Lockr’s paid skip. Skip Wait does not ask for Lockr Premium or a card.',
  },
  {
    question: 'Why do some Lockr links feel endless after tasks?',
    answer:
      'Long Unlocks in waitlists, nested lockers, or VPN/ad-blocker soft-blocks. Skip Wait is built for that stuck Unlock content card.',
  },
  {
    question: 'Do I need a license?',
    answer:
      'Yes. Get a free trial or monthly license on EAS Store and activate your key in the extension popup.',
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
