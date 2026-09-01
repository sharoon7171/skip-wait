import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'Sub4Unlock';

const bypassType = 'Skip Waiting Page';

const description =
  'Sub4Unlock bypass skips multi-slot creator tasks—subscribe, follow, join, like, comment, custom links—plus countdown waits and password gates so the destination opens without finishing every slot.';

const domains = [
  'sub4unlock.com',
  'sub4unlock.pro',
] as const;

const keywords = [
  'sub4unlock bypass',
  'Sub4Unlock bypass extension',
  'sub4unlock.com bypass',
  'sub4unlock.pro bypass',
  'sub4unlock timer bypass',
  'sub4unlock password bypass',
  'sub4unlock social unlock',
  'skip waiting page',
  'skip countdown timer',
  'bypass countdown timer',
  'link shortener bypass',
  'skip wait extension',
  'please wait bypass',
  'waiting page bypass',
  'skip click to continue',
] as const;

const intro =
  'A Sub4Unlock bypass or sub4unlock password bypass search usually means a share with up to ten creator task slots—subscribe, follow, join, like, comment, custom links—then a countdown and an optional password screen. Skip Wait is the Chrome extension that reads the destination on supported unlock pages so skip waiting page busywork is not a full checklist.';

const body = `## Ten task slots, then Get Link, then a password

Sub4Unlock on the main product hosts can require a long slot list before Get Link works: subscribe, follow, join, like, comment, or custom outbound links—sometimes all the way through url1–url10 style steps. After the slots, a countdown still holds the unlock, and some pages add a password or code gate. That stacked checklist is why sub4unlock timer bypass and sub4unlock social unlock queries differ from a single YouTube subscribe wall.

The destination is already on the unlock page. The product is forcing every slot green before redirect.

### Checklist friction that is not a shortener timer

- Multi-slot creator tasks (subscribe, follow, join, like, comment, custom)
- Countdown waits before Get Link enables
- Password and code gates on the final page
- Manual continue loops after a failed slot

## Matching /S/, LP, and LPD unlock pages

Skip Wait matches supported unlock page shapes, reads the destination already present, and redirects without requiring each task slot to be completed by hand.

Client slot gating and countdown busywork disappear. That is a Sub4Unlock bypass extension for multi-slot checklists—not a WhatsApp/TikTok locker tour.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which unlock actions does Skip Wait cover on Sub4Unlock?',
    answer:
      'Every supported creator task slot—subscribe, follow, join, like, comment, custom links—plus countdown waits and password gates on the main Sub4Unlock product hosts.',
  },
  {
    question: 'Does Skip Wait jump straight to the destination?',
    answer:
      'Yes on supported /S/, LP, and LPD unlock pages. You reach the destination without completing the full action list when the URL is already on the page.',
  },
  {
    question: 'Is a password still required?',
    answer:
      'Password UI busywork is part of what the extension clears on supported pages. The destination still comes from the unlock page itself—not a guessed URL.',
  },
  {
    question: 'How is this different from Sub2Unlock?',
    answer:
      'This entry targets multi-slot checklists and password gates. Sub2Unlock focuses on YouTube-first social blocks on its own host.',
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
