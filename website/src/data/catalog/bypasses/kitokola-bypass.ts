import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Kitokola';

const bypassType = 'Direct Download';

const description =
  'Kitokola bypass that clears the on-page download countdown so Skip Wait can open the direct file link without the usual forced wait after you press download.';

const domains = ['kitokola.id'] as const;

const keywords = [
  'kitokola bypass',
  'kitokola bypass chrome',
  'kitokola bypass extension',
  'bypass kitokola',
  'skip kitokola',
  'kitokola timer bypass',
  'kitokola download bypass',
  'kitokola countdown',
  'direct download',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A Kitokola bypass search usually means the download button started an on-page countdown instead of the file. Skip Wait is the free Chrome extension that clears that timer busywork and opens the direct link when the page allows it—without a separate wait screen.';

const body = `## Download buttons that start a clock first

Kitokola posts often put a countdown between the click and the file path. You press download, watch the timer, then finally get the host or direct link. The archive does not change during that pause.

That is why kitokola timer bypass and download timer skip sit next to direct download bypass: people want the file, not another forced delay on every press.

### What the countdown actually delays

- On-page timers after Download clicks
- Intermediary screens before the file path appears
- Extra waits that repeat on mirror-style buttons
- Manual refreshes when the countdown stalls mid-way

## Opening the file from the same click

Skip Wait watches the download UI you already use. Instead of sitting on the generating or countdown chrome, it fetches the direct link and starts the file path when the host allows it.

You stay on the post—no paste tool. Client-only wait UI gets out of the way; any host-enforced release still finishes honestly.

## Forced delays that never improve the download

Watching the clock on every file wastes time without changing the bytes. A Kitokola bypass extension install keeps the direct path on supported pages so the button you pressed opens the file instead of another countdown.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Kitokola bypass skip?',
    answer:
      'The on-page download countdown and wait chrome so the direct file link opens when the page allows it.',
  },
  {
    question: 'Do I still press the same download button?',
    answer:
      'Yes. Skip Wait resolves the wait behind that click—no alternate download page hunt.',
  },
  {
    question: 'Is every delay removed instantly?',
    answer:
      'Countdown busywork goes away. When the host still gates release, the file opens as soon as that path is allowed—a reliable Kitokola download bypass.',
  },
  {
    question: 'Will mirror-style buttons also skip the wait?',
    answer:
      'Yes on supported paths. Extra wait screens before the file are cleared from the button you pressed.',
  },
  {
    question: 'Is this free?',
    answer:
      'Yes. Skip Wait is free. The Kitokola path runs on supported pages with no paid plan.',
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
