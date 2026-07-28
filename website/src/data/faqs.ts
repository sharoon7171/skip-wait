import { totalBypasses, totalDomains } from '@/data/catalog-queries';

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: readonly FaqItem[] = [
  {
    question: 'How do I use Skip Wait?',
    answer:
      'Install Skip Wait from the Chrome Web Store, then open supported links as usual. On matching pages the extension either bypasses the countdown and redirects, or automates the wait and continue steps so you reach the file or destination faster.',
  },
  {
    question: 'Does it bypass timers, or only automate waits?',
    answer:
      'Both. When a site allows an instant skip, Skip Wait bypasses the timer and waiting page. When a full bypass isn’t possible, it automates waiting, unlocking, and clicking continue so you still save time without babysitting the page.',
  },
  {
    question: 'Is Skip Wait free?',
    answer:
      'Yes. Skip Wait is free, with no account, subscription, or paywall. It only runs on supported short-link and delay pages and leaves the rest of your browsing alone.',
  },
  {
    question: 'What sites are supported?',
    answer: `Skip Wait covers ${totalBypasses()} supported flows across ${totalDomains()} domains—link shorteners, safelinks, file hosts, and download countdown pages. Browse the full list on the Supported Sites page and search by name or domain.`,
  },
  {
    question: 'Can it handle “please wait” and “click to continue” pages?',
    answer:
      'On supported sites, yes. The extension detects waiting pages, countdowns, and continue gates, then completes the unlock path—instant redirect when possible, or automated waits and clicks when the site still requires a timed step.',
  },
  {
    question: 'How do I request a new site?',
    answer:
      'Open a support request on GitHub, Telegram, or email with the page URL and how the wait or unlock flow works. We’ll add a bypass or automation when it’s possible.',
  },
] as const;
