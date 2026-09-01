import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Zifury';

const bypassType = 'Skip Countdown';

const description =
  'Zifury bypass clears GUEST DOWNLOAD and PLEASE WAIT on file save pages so Skip Wait opens the download without the guest timer gate.';

const domains = ['zifury.com'] as const;

const keywords = [
  'zifury bypass',
  'zifury download',
  'zifury guest download',
  'zifury please wait',
  'zifury timer bypass',
  'zifury file host',
  'zifury skip wait',
  'zifury chrome extension',
  'file host countdown bypass',
  'skip countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'Zifury free saves open on a guest gate: tap GUEST DOWNLOAD, sit through PLEASE WAIT seconds, then wait again while Fetching download link runs before the green Download button appears. Skip Wait is the Chrome extension that runs that guest path for you and opens the save as soon as the host allows it.';

const body = `## GUEST DOWNLOAD and a second wait after it

On a typical Zifury file page the free tier card shows GUEST DOWNLOAD first. After you press it, a PLEASE WAIT badge counts down in seconds. When the timer ends, the page swaps to Fetching download link and only then shows Download with the filename.

Some shares add a NEXT STEP hop before the final save button. Either way you are clicking through guest chrome instead of grabbing the file.

### What slows a Zifury free save

- GUEST DOWNLOAD before anything starts
- PLEASE WAIT seconds on the free tier card
- Fetching download link after the countdown
- Extra NEXT STEP screens on multi-hop shares

## Unlock without babysitting the guest card

On supported Zifury file pages, Skip Wait covers the guest gate with its own overlay, keeps the PLEASE WAIT timer off your screen, and continues the unlock in the background. When the host is ready, it sends you straight to the save—no GUEST DOWNLOAD click and no hunting for the green Download button.

You still get the file the guest path would have minted; the button tour is what disappears.

## When Zifury changes the guest wording

Skip Wait reads GUEST DOWNLOAD, PLEASE WAIT, Fetching download link, and Download labels from the live page. If Zifury renames those controls or adds another guest hop, the overlay keeps matching what you would have clicked.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which Zifury pages does Skip Wait handle?',
    answer:
      'Supported file save pages with GUEST DOWNLOAD and PLEASE WAIT on the free tier—the step where the host mints the final download after the guest countdown.',
  },
  {
    question: 'Do I still press GUEST DOWNLOAD or wait for Fetching download link?',
    answer:
      'No. Skip Wait starts the guest unlock automatically and opens the save when the host allows it.',
  },
  {
    question: 'Does Skip Wait remove every PLEASE WAIT second instantly?',
    answer:
      'The guest button tour and on-page countdown are skipped on your side. If Zifury still needs a short server hold, Skip Wait continues as soon as that hold clears.',
  },
  {
    question: 'What about NEXT STEP on some files?',
    answer:
      'Skip Wait follows the same multi-hop guest path the site would show and keeps advancing until the final download is ready.',
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
