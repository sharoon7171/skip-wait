import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'FastDL';

const bypassType = 'Direct Download';

const description =
  'FastDL bypass skips the countdown download page and opens the direct file download link without waiting on any intermediary screen or gate page.';

const domains = ['fastdl.zip'] as const;

const keywords = [
  'fastdl bypass',
  'FastDL bypass extension',
  'fastdl timer bypass',
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
  'A FastDL bypass search usually means you clicked download and got parked on a countdown or generating page instead of the archive. Skip Wait is the Chrome extension that resolves the real file URL behind that click so the intermediary screen never owns the transfer.';

const body = `## Generating screens between click and file

FastDL sits a download wait, generating timer, or intermediary redirect in front of the real file link. You press the same button you always use, then stare at countdown chrome before the CDN path opens. Miss the moment or refresh mid-generate and you restart the same fastdl timer bypass loop.

That is why direct download bypass, download timer skip, and file host bypass queries cluster around FastDL bypass extension installs—people want the archive from the button, not another gate page.

## Resolving the archive URL behind the button

Skip Wait watches the download click on supported pages. It resolves the real file URL in the background and bypasses the timer or redirect page that normally appears after the click. You stay on the host you already opened; nothing asks you to paste the share into another website.

Client generating theater gets out of the way when the host allows the link. Required holds still finish honestly so the fetch does not fail with a fake zero-second cheat.

## Mirror clicks without a second timer page

Extra wait screens on mirror and host buttons get the same treatment on supported paths: one click, resolved file, fewer intermediary hops. A skip wait extension install keeps that direct download path working without a separate userscript per button.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does Skip Wait skip on FastDL?',
    answer:
      'The countdown download page and intermediary screens that normally sit between your click and the file. The extension opens the direct download link when the host allows it.',
  },
  {
    question: 'Do I still click the download button myself?',
    answer:
      'Yes. Use the same button. Skip Wait resolves the real file URL in the background behind that click.',
  },
  {
    question: 'Are mirror button waits covered too?',
    answer:
      'Yes on supported paths. Extra wait screens on mirror and host buttons are bypassed so the file opens from the button you pressed.',
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
