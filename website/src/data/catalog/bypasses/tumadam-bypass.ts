import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Tumadam';

const bypassType = 'Skip Waiting Page';

const description =
  'Tumadam bypass clears the Đang chuẩn bị link của bạn countdown and locked Tiếp tục button so Skip Wait opens the unlock destination without the wait ring.';

const domains = ['unlock.tumadam.com'] as const;

const keywords = [
  'tumadam bypass',
  'tumadam unlock bypass',
  'tumadam timer bypass',
  'tumadam countdown bypass',
  'đang chuẩn bị link của bạn',
  'tiếp tục bypass',
  'tumadam waiting page',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
] as const;

const intro =
  'Tumadam unlock pages open with Đang chuẩn bị link của bạn, a ring countdown, and a disabled Tiếp tục control. Skip Wait is the Chrome extension that clears that waiting page so you are not stuck watching còn lại ticks.';

const body = `## The prepare-link card is the whole gate

[Tumadam](https://unlock.tumadam.com/main/) unlock shares land on a single card: Đang chuẩn bị link của bạn, a circular timer, Hệ thống đang xác thực copy, and Tiếp tục that stays locked until the client countdown hits zero. Reload mid-wait and the same ring starts again.

That card is the product pain—not a multi-blog tour. The timer and spinner are page chrome; Tiếp tục is the only control that continues once the wait ends.

### What you sit through without Skip Wait

- Đang chuẩn bị link của bạn title and hint text
- Ring countdown with còn lại seconds
- Locked Tiếp tục / Đang tải… until the client clock finishes
- Progress bar theater under the card

## Leaving the wait ring for the unlock destination

Skip Wait runs on the Tumadam unlock page you already opened. It skips the client-only countdown busywork and advances the same continue path Tiếp tục would use when the page marks itself ready.

Cosmetic seconds disappear; you stay on the tab until the unlock destination loads. No paste site, no second tool—just the Tumadam waiting page path after license activation.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does Tumadam bypass clear?',
    answer:
      'The Đang chuẩn bị link của bạn countdown card and the locked Tiếp tục wait so you are not babysitting còn lại seconds.',
  },
  {
    question: 'Do I still tap Tiếp tục myself?',
    answer:
      'No on supported unlock pages. Skip Wait advances the continue path once the page destination is known.',
  },
  {
    question: 'Is every second removed instantly?',
    answer:
      'Client countdown theater is skipped. If a real hold remains, Skip Wait finishes that step once, then continues.',
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
