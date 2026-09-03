import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'ReShortFly';

const bypassType = 'Skip Waiting Page';

const description =
  'ReShortFly bypass clears PLEASE WAIT TO PROCEED countdowns and Please wait Get Link so Skip Wait opens the destination without babysitting the timer.';

const domains = ['reshortfly.com'] as const;

const keywords = [
  'reshortfly bypass',
  'bypass reshortfly',
  'skip reshortfly',
  'reshortfly timer bypass',
  'reshortfly countdown bypass',
  'reshortfly get link',
  'reshortfly please wait',
  'please wait to proceed to the destination page',
  'reshortfly chrome extension',
  'please wait seconds bypass',
  'get link shortener bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'ReShortFly parks you on PLEASE WAIT TO PROCEED TO THE DESTINATION PAGE with a Seconds counter and a grey Please wait control. Skip Wait is the $1.50/month Chrome extension that covers that waiting page, holds for the real unlock delay, then finishes Get Link so you are not staring at the timer.';

const body = `## PLEASE WAIT is the whole product

[ReShortFly](https://reshortfly.com/) aliases open a banner page titled PLEASE WAIT TO PROCEED TO THE DESTINATION PAGE. A Seconds readout counts down while Get Link stays disabled as Please wait. Extra Get a link / Download tiles around the page are ads—not the unlock. Leave early, reload mid-count, or fight an ad-block wall and the same please wait seconds loop starts again.

The on-screen timer is not only decoration. Unlock rejects Get Link until that delay has actually elapsed, which is why a reshortfly timer bypass has to wait honestly once, then finish—not zero the label and hope.

### What you see on the alias

- PLEASE WAIT TO PROCEED TO THE DESTINATION PAGE headline
- Seconds countdown before anything useful is enabled
- Please wait disabled control that later becomes Get Link
- Ad tiles labeled Get a link or Download that are not the destination

## Cover the wait, then Get Link

On supported ReShortFly short URLs, Skip Wait drops a full-page overlay with its own countdown for the enforced delay. When unlock is allowed, it completes Get Link and opens whatever URL that step returns—another shortener or a direct page.

You do not hunt the real control under ads, and you do not babysit the Seconds strip by hand. That is a reshortfly countdown bypass and get link shortener bypass inside Chrome for this host.

## Ads are not unlock

The floating Download creatives and Get a link buttons are monetization chrome. Skip Wait ignores them and only finishes the real Get Link path after the wait. A reshortfly chrome extension install covers this waiting page; if the destination is another supported shortener, stay on the tab for that brand’s rule.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a ReShortFly bypass clear?',
    answer:
      'The PLEASE WAIT TO PROCEED waiting page: Seconds countdown busywork and Please wait / Get Link babysitting on supported aliases.',
  },
  {
    question: 'Does the Seconds counter vanish instantly?',
    answer:
      'No. ReShortFly enforces a real delay before Get Link works. Skip Wait shows that wait on the overlay once, then unlocks—reliable timer bypass, not a fake zero-second cheat.',
  },
  {
    question: 'Are Get a link and Download the destination?',
    answer:
      'No. Those are ads. Unlock is the Get Link control that appears after Please wait ends. Skip Wait finishes that control, not the ad tiles.',
  },
  {
    question: 'Which URLs start Skip Wait?',
    answer:
      'Short alias links on ReShortFly (one path segment). Home, login, and other site pages do not start it.',
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
