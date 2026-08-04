import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'Work.ink';

const bypassType = 'Skip Short Link';

const description =
  'Work.ink bypass skips short-link unlock gates on work.ink links, pins captcha when required, and opens your destination URL faster.';

const domains = ['work.ink'] as const;

const keywords = [
  'work.ink bypass',
  'Work.ink bypass extension',
  'workink bypass',
  'work.ink timer bypass',
  'skip short link',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
  'hcaptcha short link',
  'monetized link bypass',
] as const;

const intro =
  'Work.ink bypass skips short-link unlock gates on work.ink links, pins captcha when required, and opens your destination URL faster. Install Skip Wait once and it runs automatically on supported short URLs. If you are logged in as a publisher at https://auth.work.ink/, the bypass may not work—log out of that publisher session first.';

const problem =
  'Work.ink short links put captcha and unlock gates between the short URL and your destination so you wait through verification before the real link opens.';

const howItWorks =
  'Skip Wait detects work.ink short-link pages, shows an overlay, pins hCaptcha when the site requires it, then unlocks and opens the destination after you complete the check. Publisher login sessions from auth.work.ink can block this free-path unlock.';

const steps: readonly BypassStep[] = [
  {
    title: 'Add Skip Wait to Chrome',
    body: 'Install Skip Wait from the Chrome Web Store. The Work.ink bypass turns on automatically on supported short URLs—no account needed.',
  },
  {
    title: 'Stay logged out of publisher auth',
    body: 'If you use a Work.ink publisher account, log out at https://auth.work.ink/ first. A publisher session can prevent the free-path bypass from unlocking.',
  },
  {
    title: 'Keep the extension enabled',
    body: 'Leave Skip Wait on in Chrome. There is nothing to configure for Work.ink.',
  },
  {
    title: 'Open a supported short link',
    body: 'Open a work.ink short URL the same way you usually do. Complete captcha when Skip Wait pins it, then the destination opens automatically.',
  },
];

const skips = [
  'Short-link unlock gates on work.ink',
  'Post-captcha unlock waits before the destination',
  'Manual continue loops after verification',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Which Work.ink links does Skip Wait support?',
    answer:
      'Skip Wait runs on work.ink short-link URLs (for example paths like /2MVo/test). It does not treat the whole domain the same—only real short-link pages.',
  },
  {
    question: 'Do I still need to solve captcha on Work.ink?',
    answer:
      'Yes when the site requires it. Skip Wait pins hCaptcha in the overlay; after you solve it, the extension unlocks and opens the destination.',
  },
  {
    question: 'Why might the Work.ink bypass not work?',
    answer:
      'If you are logged in as a publisher at https://auth.work.ink/, the free-path unlock may fail. Log out of the publisher session, then open the short link again.',
  },
  {
    question: 'Is the Work.ink bypass free with Skip Wait?',
    answer:
      'Yes. Skip Wait is a free Chrome extension. The Work.ink bypass runs on supported short URLs with no account or paid plan required.',
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
