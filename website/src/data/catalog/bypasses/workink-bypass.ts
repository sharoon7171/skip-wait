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
  'Work.ink bypass skips short-link unlock gates on work.ink links, pins captcha when required, and opens your destination URL faster. Install Skip Wait once and it runs automatically on supported short URLs.';

const problem =
  'Work.ink short links put captcha and unlock gates between the short URL and your destination so you wait through verification before the real link opens.';

const howItWorks =
  'On a matching work.ink short URL, Skip Wait shows an overlay, pins hCaptcha when required, then unlocks and opens the destination after you complete the check.';

const steps: readonly BypassStep[] = [
  {
    title: 'Add Skip Wait to Chrome',
    body: 'Install Skip Wait from the Chrome Web Store. The Work.ink bypass turns on automatically on supported short URLs—no account needed.',
  },
  {
    title: 'Keep the extension enabled',
    body: 'Leave Skip Wait on in Chrome. There is nothing to configure for Work.ink.',
  },
  {
    title: 'Open a supported short link',
    body: 'Open a work.ink short URL the same way you usually do. No paste tool or special settings.',
  },
  {
    title: 'Reach the destination faster',
    body: 'Complete captcha when Skip Wait pins it. The destination opens automatically after verification.',
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
      'Only work.ink short-link paths (for example /2MVo/test)—not every page on the domain.',
  },
  {
    question: 'Do I still need to solve captcha on Work.ink?',
    answer:
      'Yes when the site shows one. Skip Wait pins it in the overlay; after you solve it, unlock continues automatically.',
  },
  {
    question: 'Why might the Work.ink bypass not work?',
    answer:
      'A publisher login at https://auth.work.ink/ can block the free-path unlock. Log out of that session, then open the short link again.',
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
