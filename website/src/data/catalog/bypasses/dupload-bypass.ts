import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'DUpload';

const bypassType = 'Direct Download';

const description =
  'DUpload bypass skips the blog-mediator hop and Create download link wait, then puts a Direct Download · Skip Wait button on the file page so you can grab the free download without the timer maze.';

const domains = ['dupload.net', 'dupload.xyz'] as const;

const keywords = [
  'dupload bypass',
  'bypass dupload',
  'dupload download',
  'how to download from dupload',
  'dupload create download link',
  'create download link bypass',
  'dupload free download',
  'dupload direct download',
  'dupload timer bypass',
  'dupload skip wait',
  'dupload mediator bypass',
  'dupload chrome extension',
  'file host bypass',
  'direct download bypass',
  'skip waiting page',
  'skip wait chrome extension',
] as const;

const intro =
  'A shared DUpload link should mean getting the file—not proving you survived a partner blog. Skip Wait is a free Chrome extension that keeps you on the file page, prepares the real direct download in the background, and shows one Direct Download · Skip Wait control when it is ready. How to download from DUpload becomes open the link, wait for the overlay button, click once—no Create download link babysitting and no Google first-result scavenger hunt.';

const problem =
  'Free DUpload downloads are gated on purpose. Open the file and the page tries to shove you into a rotating blog mediator, then a site-search delay, then more continues before the host will treat the visit as “earned.” Miss the first result, refresh mid-hop, or bail early and the same loop starts again. Even back on the file card you still face Create download link and ad noise—the classic file-host bypass frustration dressed as a free download.';

const howItWorks =
  'On a matching DUpload file page Skip Wait drops a full-page overlay and stops the auto form posts that leave for mediators or fire the free-download submit. It resolves the same direct file URL the finished Create download link path would mint, then exposes that URL on Direct Download · Skip Wait. Nothing auto-starts; you click when you want the file.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait',
    body: 'Add the free extension from the Chrome Web Store. DUpload support turns on by itself—no account or paste box.',
  },
  {
    title: 'Leave it on',
    body: 'Keep Skip Wait enabled. File pages need no extra settings.',
  },
  {
    title: 'Open the shared file link',
    body: 'Use the URL the way you always do. When the file page loads, the overlay takes over.',
  },
  {
    title: 'Click Direct Download when ready',
    body: 'When Direct Download · Skip Wait appears, tap it to open the unlocked file.',
  },
];

const skips = [
  'Auto jumps into rotating blog mediators',
  'Google-style site-search first-result hops',
  'Create download link button waits',
  'Ad clicks while the overlay locks the page',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a DUpload bypass do?',
    answer:
      'It skips the mediator theater and Create download link wait so a free download can start from a Direct Download button on the file page instead of a blog hop.',
  },
  {
    question: 'Where is the download button?',
    answer:
      'Inside the full-page Skip Wait overlay on the file page—the view that shows your filename—not on a partner blog.',
  },
  {
    question: 'Will the file start downloading by itself?',
    answer:
      'No. Skip Wait only prepares Direct Download · Skip Wait. You choose when to click.',
  },
  {
    question: 'Do I still visit the mediator blogs?',
    answer:
      'No. Skip Wait holds the auto posts that send you there and unlocks from the file page itself.',
  },
  {
    question: 'Is the DUpload bypass free?',
    answer:
      'Yes. Skip Wait is a free Chrome extension with no account required for DUpload.',
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
