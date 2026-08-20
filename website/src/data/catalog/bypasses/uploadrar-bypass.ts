import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'UploadRAR';

const bypassType = 'Direct Download';

const description =
  'UploadRAR bypass that resolves the real file URL when you click Free Download—skipping free-download countdowns and mediator pages so the save starts without a wait tour.';

const domains = ['uploadrar.com'] as const;

const keywords = [
  'uploadrar bypass',
  'uploadrar bypass extension',
  'uploadrar timer bypass',
  'uploadrar free download',
  'uploadrar create download link',
  'direct download',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
] as const;

const intro =
  'An UploadRAR bypass or download timer skip search usually means Free Download shoved you onto a countdown or mediator page instead of the archive. Skip Wait is the $1/month Chrome extension that resolves the real file URL behind Free Download so a direct download bypass does not require sitting through Create Download Link theater.';

const body = `## Free Download that is not free of waits

UploadRAR’s free path often forces a countdown page or intermediary screen after Free Download before the real file link appears. You click the green button, watch the timer, sometimes hit another hop, then finally get a create-link style step—classic file host bypass friction.

That is why people search uploadrar timer bypass, uploadrar free download, and skip waiting page next to generic download timer skip queries.

### Delays after the green button

- Free-download countdown timers
- Mediator pages after Free Download
- Intermediary screens before the file link
- Client-side waits before Create Download Link

## Resolving the file behind Free Download

Skip Wait labels and watches Free Download on the file page. When you click it, the extension resolves the direct file URL in the background so the countdown and intermediary page never become your job.

Nothing requires a paste box. You use the same Free Download control; Skip Wait clears the wait behind it.

## Countdown skins that change between files

Manual “wait then refresh” habits fail when the next mediator skin appears. An UploadRAR bypass extension that follows the live free-download pattern stays useful without relearning each wait page.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What free-download waits does Skip Wait skip on UploadRAR?',
    answer:
      'Free-download countdowns and mediator pages after Free Download. The extension resolves the real file URL so those screens are not your path.',
  },
  {
    question: 'Can the download start in one click?',
    answer:
      'When the host allows it, yes. Skip Wait bypasses the countdown page that normally appears after Free Download.',
  },
  {
    question: 'Do I still use Free Download?',
    answer:
      'Yes. Click the same control; Skip Wait handles the wait and intermediary screen behind it.',
  },
  {
    question: 'How much does the UploadRAR bypass cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup.',
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
