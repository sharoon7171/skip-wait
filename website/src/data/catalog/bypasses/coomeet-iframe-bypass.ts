import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Coomeet Iframe';

const bypassType = 'Skip Embedded Wait';

const description =
  'Coomeet iframe bypass that shortens embedded please-wait countdown timers inside the frame so loading screens finish in seconds instead of long minutes.';

const domains = ['iframe.coomeet.com'] as const;

const keywords = [
  'coomeet iframe bypass',
  'Coomeet Iframe bypass extension',
  'coomeet iframe bypass chrome',
  'bypass coomeet iframe',
  'skip coomeet iframe',
  'coomeet iframe timer bypass',
  'coomeet loading screen skip',
  'iframe timer bypass',
  'embedded countdown skip',
  'embedded please wait bypass',
  'skip embedded wait',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'skip wait extension',
] as const;

const intro =
  'A Coomeet iframe bypass search usually means the chat embed is still stuck on a long please-wait countdown inside the frame. Skip Wait is the $1/month Chrome extension that shortens that embedded timer so the loading screen finishes in seconds instead of dragging for minutes.';

const body = `## Chat embeds stuck on a long iframe load

Coomeet embeds often put a multi-minute countdown inside an iframe before the chat or video UI becomes usable. You are not waiting on a shortener hop—you are waiting on embedded chrome that pads load time. That is why coomeet loading screen skip, iframe timer bypass, and skip embedded wait queries describe a different pain than classic Get Link pages.

### What the frame shows

- Embedded iframe countdown timers
- Long please-wait loading screens before the UI
- Client clocks that stretch far past real asset load
- Repeated stalls when the embed reloads

## Compressing please-wait inside the frame

Skip Wait shortens the embedded please-wait countdown on supported Coomeet iframe pages so the frame finishes loading much sooner. One Coomeet Iframe bypass extension install covers matching embeds—no paste tool and no userscript for a loading clock.

You still get the chat or video surface the embed was going to show; the extension only compresses the busywork timer that sat in front of it.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'What embedded timers does Skip Wait speed up?',
    answer:
      'Please-wait countdown timers embedded inside supported Coomeet iframes, so loading screens finish in seconds instead of long minutes.',
  },
  {
    question: 'How much faster do loading screens finish?',
    answer:
      'Long please-wait loading screens that normally take minutes are compressed to seconds by shortening the embedded iframe countdown.',
  },
  {
    question: 'Does this work only inside the iframe?',
    answer:
      'Yes. This path targets embedded wait flows inside the Coomeet iframe, not a separate shortener Get Link page.',
  },
  {
    question: 'Do I need a userscript for the embed?',
    answer:
      'No. Skip Wait runs as a Chrome extension on matching iframe pages with no Tampermonkey requirement.',
  },
  {
    question: 'How much does the Coomeet Iframe path cost?',
    answer:
      'Skip Wait is $1 per month. Activate a license in the popup. The Coomeet Iframe bypass runs on supported pages.',
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
