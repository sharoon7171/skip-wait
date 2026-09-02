import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Link4Sub';

const bypassType = 'Skip Short Link';

const description =
  'Link4Sub bypass clears Vui lòng đợi gates, Tiến trình mở khoá, and Bước tiếp theo so Skip Wait opens the destination without social-follow babysitting.';

const domains = ['link4sub.com', 'blog.tapvietcode.com', 'pro.tapvietcode.com'] as const;

const keywords = [
  'link4sub bypass',
  'link 4 sub bypass',
  'bypass link4sub',
  'skip link4sub',
  'link4sub timer bypass',
  'link4sub countdown bypass',
  'link4sub skip wait',
  'tiến trình mở khoá bypass',
  'bước tiếp theo bypass',
  'vui lòng đợi bypass',
  'liên kết đã sẵn sàng continue',
  'tapvietcode bypass',
  'tap viet code short link',
  'key free link4sub',
  'sub to unlock link4sub',
  'youtube telegram unlock bypass',
  'link4sub chrome extension',
  'link4sub bypass chrome',
  'vietnamese short link bypass',
  'skip waiting page link4sub',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'Link4Sub shares often open a Vui lòng đợi screen, then park you on Tap Viet Code-style pages with Tiến trình mở khoá, YouTube or Telegram follow buttons, and Bước tiếp theo clicks before anything useful loads. Skip Wait is the $1.50/month Chrome extension that clears that Link4Sub timer bypass busywork and opens the destination on supported pages.';

const body = `## Unlock progress that wants social steps first

A Link4Sub (Link 4 Sub) share rarely ends on the first tab. You may see Vui lòng đợi / Loading…, then Liên kết đã sẵn sàng with Tiếp tục / Continue, and only afterward a card titled something like Key Free with Tiến trình mở khoá. That progress bar usually waits on Đăng ký kênh YouTube or Tham gia Group Telegram taps, each marked Vui lòng đợi.. then Đã hoàn tất, before Bước tiếp theo (1/2) appears.

Miss a step, leave mid-wait, or bounce between partner articles and the link4sub countdown bypass loop restarts. The brand says Link4Sub while the page may sit on Tap Viet Code blogs—same unlock chrome, different hostname.

### What the unlock card actually asks

- Vui lòng đợi / Loading gates before Continue is usable
- Tiến trình mở khoá with social follow or join buttons
- Six-second-style holds that flip buttons to Đã hoàn tất
- Bước tiếp theo across multiple action pages
- A final Continue that points at the publisher destination (sometimes another shortener)

## How Skip Wait changes the Link4Sub tab

On supported Link4Sub and Tap Viet Code unlock pages, Skip Wait covers the busy UI, finishes the live unlock those social timers gate, and opens the destination without you babysitting every YouTube or Telegram button. A link4sub chrome extension install keeps the session on the tab so you are not pasting the same alias into a separate web tool.

You still land on the real publisher target for that share—file, note, or next shortener—not a fabricated URL.

## When Continue opens VuotNhanh

Some Link4Sub destinations unlock into [VuotNhanh](/sites/vuotnhanh-bypass) (Vượt Nhanh) with its own Bạn chờ một chút nhé / Tiếp tục screen. Stay on the tab—Skip Wait continues with the VuotNhanh rule. This catalog page covers the Link4Sub hop; VuotNhanh has its own page when that brand appears alone.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a Link4Sub bypass clear?',
    answer:
      'It clears Vui lòng đợi gates, Tiến trình mở khoá social steps, and Bước tiếp theo page hopping so the destination opens without finishing every follow button by hand.',
  },
  {
    question: 'Do I still click YouTube subscribe or Telegram join?',
    answer:
      'On supported Link4Sub unlock pages, no. Skip Wait advances the unlock those buttons gate, then opens the destination.',
  },
  {
    question: 'Is Tap Viet Code a different product?',
    answer:
      'Those blogs often host the same Link4Sub unlock chrome. Supported Tap Viet Code hosts are covered with this Link4Sub bypass entry.',
  },
  {
    question: 'Continue opened VuotNhanh—same extension?',
    answer:
      'Yes. Stay on the tab. Skip Wait continues on VuotNhanh with the matching catalog rule.',
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
