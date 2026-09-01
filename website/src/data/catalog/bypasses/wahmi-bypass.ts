import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Wahmi';

const bypassType = 'Skip Countdown';

const description =
  'Wahmi bypass that clears the file download countdown and get-link delay so the direct download link appears without watching the unlock timer on this free file host.';

const domains = ['wahmi.org'] as const;

const keywords = [
  'wahmi bypass',
  'wahmi bypass extension',
  'wahmi timer bypass',
  'wahmi download',
  'wahmi get link',
  'skip countdown',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'countdown timer bypass',
  'skip timer unlock',
  'file host bypass',
] as const;

const intro =
  'A Wahmi bypass or wahmi timer bypass search usually means a free file page forced a download countdown before Get Link. Skip Wait is the Chrome extension that clears that unlock delay so skip countdown is not watching the clock on every archive.';

const body = `## Countdown before the download link

Wahmi free saves put a timer or unlock delay in front of Continue / Get Link. You open the file page, wait for the clock, then finally see the direct download link—classic skip timer unlock friction on a small file host.

Miss the moment the button enables, refresh too early, or fight overlays and you restart the same countdown timer bypass loop.

### Delays that block the save

- Countdown timers on unlock pages
- Get Link delay screens after the clock
- Disabled continue chrome until the timer ends
- Restarting the page when the tab sleeps

## Showing the direct link when unlock allows it

Skip Wait runs on the file page inside Chrome. It continues the flow when the site allows it, skipping the timer chrome that normally blocks the download link, and surfaces the direct URL without a paste tool.

Client busywork disappears; required unlock still finishes honestly.

## Timer skins that change between uploads

Hardcoded “click after N seconds” scripts break when the next unlock skin appears. A Wahmi bypass extension keyed to countdown release stays useful without relearning each wait page.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What download countdown does Skip Wait skip on Wahmi?',
    answer:
      'The file download countdown and get-link delay on supported free saves. Skip Wait continues when unlock is allowed so you are not watching the clock.',
  },
  {
    question: 'Does the direct download link appear immediately?',
    answer:
      'As soon as the host allows unlock, yes. Timer UI and get-link delay screens are cleared so the link is usable without a manual wait tour.',
  },
  {
    question: 'Is every second removed instantly?',
    answer:
      'Client-only countdown chrome goes away. When the host still needs a real hold, Skip Wait stays until unlock is allowed, then continues.',
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
