import { totalBypasses, totalDomains } from '@/data/catalog';
import { PRICE } from '@/data/constants';

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: readonly FaqItem[] = [
  {
    question: 'How do I use Skip Wait?',
    answer:
      `Install Skip Wait from the Chrome Web Store, activate a ${PRICE.label} license in the popup, then open supported links as usual. On matching pages the extension either bypasses the countdown and redirects, or automates the wait and continue steps so you reach the file or destination faster.`,
  },
  {
    question: 'Can I use Skip Wait on Android?',
    answer:
      'Yes on Android with Quetta Browser, which installs Chrome Web Store extensions. Chrome for Android itself does not. Follow the Install on Android guide for Quetta’s official install steps. Quetta’s iOS app does not document Chrome extension support, so Skip Wait is not offered there.',
  },
  {
    question: 'Does it bypass timers, or only automate waits?',
    answer:
      'Both. When a site allows an instant skip, Skip Wait bypasses the timer and waiting page. When a full bypass isn’t possible, it automates waiting, unlocking, and clicking continue so you still save time without babysitting the page.',
  },
  {
    question: 'How much does Skip Wait cost?',
    answer:
      `Skip Wait is ${PRICE.label}. Activate a license key in the extension popup. Bypass runs on supported short-link and delay pages and leaves the rest of your browsing alone.`,
  },
  {
    question: 'What sites are supported?',
    answer: `Skip Wait works on ${totalBypasses()} bypasses across ${totalDomains()} websites—link shorteners like Linkvertise, GPLinks, and Ouo, plus safelinks, file hosts, and download countdown pages. Open Supported Sites and search by name or website address. Tap Refresh in the extension popup to pull the latest domain list without reinstalling.`,
  },
  {
    question: 'Can it handle “please wait” and “click to continue” pages?',
    answer:
      'On supported sites, yes. The extension detects waiting pages, countdowns, and continue gates, then completes the unlock path—instant redirect when possible, or automated waits and clicks when the site still requires a timed step.',
  },
  {
    question: 'How do I get newly added sites?',
    answer:
      'Open the extension popup and tap Refresh under Site list. That downloads the latest supported domains from GitHub—no Chrome Web Store update or reinstall required.',
  },
  {
    question: 'How do I request a new site?',
    answer:
      'Open a support request on GitHub, Telegram, or email with the page URL and how the wait or unlock flow works. After we add it, tap Refresh in the popup to pick up new domains.',
  },
] as const;
