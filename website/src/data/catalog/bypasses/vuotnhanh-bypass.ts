import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'VuotNhanh';

const bypassType = 'Skip Short Link';

const description =
  'VuotNhanh bypass clears Bạn chờ một chút nhé stalls and Tiếp tục timers so Skip Wait opens the destination without sitting on the redirect screen.';

const domains = ['vuotnhanh.com'] as const;

const keywords = [
  'vuotnhanh bypass',
  'vượt nhanh bypass',
  'vuot nhanh bypass',
  'bypass vuotnhanh',
  'skip vuotnhanh',
  'vuotnhanh timer bypass',
  'vuotnhanh countdown bypass',
  'vuotnhanh skip wait',
  'bạn chờ một chút nhé bypass',
  'tiếp tục vuotnhanh',
  'chuyển hướng vượt link bypass',
  'vietnamese short link bypass',
  'vuotnhanh chrome extension',
  'vuotnhanh bypass chrome',
  'rút gọn link bypass',
  'skip waiting page vuotnhanh',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait chrome extension',
] as const;

const intro =
  'VuotNhanh (Vượt Nhanh) short links often freeze on Bạn sẽ được chuyển hướng… with Bạn chờ một chút nhé… and a Tiếp tục control that only softens after a short circle timer. Skip Wait is the $1.50/month Chrome extension that clears that VuotNhanh timer bypass stall and opens the destination on supported pages.';

const body = `## Redirect screens that sell a paid skip

A VuotNhanh alias rarely behaves like a quiet 302. The tab shows copy about being redirected through a vượt link hop, a Bạn chờ một chút nhé status line, and a large Tiếp tục button that stays muted until the on-page timer finishes. Ads and a “go to the original link for a fee” offer sit beside that control, and a login modal can interrupt if the share wants a paid unlock instead of the free path.

Close the tab mid-wait or miss Tiếp tục and you restart the same vuotnhanh countdown bypass from the short URL. Vietnamese publishers use Vượt Nhanh heavily for key drops and file shares, so the same chrome repeats even when the final destination brand changes.

### What you see before the destination

- Banner text about chuyển hướng / vượt link before anything useful loads
- Bạn chờ một chút nhé… while the page prepares Tiếp tục
- A circular countdown around the continue control
- Optional buy-original / membership prompts next to the free path
- Login walls when the publisher priced the link instead of leaving it open

## What Skip Wait does on VuotNhanh

On supported VuotNhanh short URLs, Skip Wait covers the busy redirect UI, finishes the live unlock that Tiếp tục represents, and opens the destination without you watching the circle timer or hunting the button under ads. A vuotnhanh chrome extension install keeps the browser session on the tab—paste-only tools that miss the live redirect often fail here.

If the free path is closed and only a purchase login appears, that is a paid gate, not a countdown. Clear or complete that account step in the tab, then reload the short link so Skip Wait can run again on an unlockable share.

## When another shortener hands you here

[Link4Sub](/sites/link4sub-bypass) and similar Vietnamese unlockers sometimes finish into VuotNhanh. Stay on the same tab—Skip Wait continues with this rule once the VuotNhanh short link opens. Use the Link4Sub catalog page when you need that earlier hop alone.
`;

const faq: readonly BypassFaq[] = [
  {
    question: 'What does a VuotNhanh bypass skip?',
    answer:
      'It skips Bạn chờ một chút nhé stalls and Tiếp tục timer babysitting so the destination opens without sitting on the redirect screen.',
  },
  {
    question: 'Is Vượt Nhanh the same product?',
    answer:
      'Yes. VuotNhanh is the Latin spelling for Vượt Nhanh. This entry covers that brand’s short-link unlock pages.',
  },
  {
    question: 'What if I only see a login / buy link modal?',
    answer:
      'That share is priced or locked to an account. Complete or clear the login in the tab, then reload an unlockable short link.',
  },
  {
    question: 'I arrived from Link4Sub—same extension?',
    answer:
      'Yes. Stay on the tab. After Link4Sub, Skip Wait continues on VuotNhanh with this rule.',
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
