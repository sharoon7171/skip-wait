import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'HaxPC';

const bypassType = 'Direct Download';

const description =
  'HaxPC bypass for software posts: Skip Wait resolves the real file-host URL behind generating waits so download and mirror buttons open the host without the forced delay screen.';

const domains = ['haxpc.net'] as const;

const keywords = [
  'haxpc bypass',
  'haxpc bypass chrome',
  'haxpc bypass extension',
  'bypass haxpc',
  'skip haxpc',
  'haxpc timer bypass',
  'haxpc download bypass',
  'haxpc waiting page',
  'direct download bypass',
  'download timer skip',
  'file host bypass',
  'software download bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A HaxPC bypass search usually means you clicked a software download and got a generating wait instead of the file host. Skip Wait is the Chrome extension that resolves the real link in the background so the same download button opens the host without that delay page.';

const body = `## Download clicks that stall on a generating screen

Software posts on HaxPC often put a waiting or generating intermediary between the button and the file host. The installer or archive does not change during that pause—you only watch a timer or redirect screen before the mirror list appears.

That is why haxpc timer bypass, direct download bypass, and download timer skip sit next to software download bypass: people want the host URL, not another interstitial after every click.

### What the button actually hides

- Generating timers after Download or mirror presses
- Intermediary redirect pages before the file host
- Extra wait screens that repeat on each mirror
- Manual refreshes when the wait page stalls

## Opening the host from the button you already pressed

Skip Wait’s HaxPC support watches the download UI you already use. It resolves the real file URL in the background and bypasses the timer or redirect that normally appears after the click, so the host opens directly when the page allows it.

You stay on the software post—no paste tool, no alternate download site. Client-only wait chrome gets out of the way; the file path that the host already issued still opens honestly.

## Why sitting through delays never improves the file

Manual waits on every post waste time without changing the archive. A HaxPC bypass chrome install keeps the direct path on supported pages so mirror and host buttons open from the control you pressed, not after another generating screen.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What does a HaxPC bypass skip?',
    answer:
      'The extra waiting or generating page after download clicks so buttons open the file host directly when the link is ready.',
  },
  {
    question: 'Do mirror buttons get the same treatment?',
    answer:
      'Yes on supported paths. Extra wait screens and intermediary redirects before the file are skipped from the button you pressed.',
  },
  {
    question: 'Does every delay vanish instantly?',
    answer:
      'Waiting-page busywork goes away and the host opens when the page allows it—a reliable HaxPC download bypass, not a broken fetch that returns nothing.',
  },
  {
    question: 'Do I change how I click download?',
    answer:
      'No. Use the same UI. Skip Wait resolves the real URL behind the click.',
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
