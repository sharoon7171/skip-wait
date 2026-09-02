import { totalBypasses, totalDomains } from '@/data/catalog';
import { FREE, LICENSE, PRICE } from '@/data/constants';

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: readonly FaqItem[] = [
  {
    question: 'How do I use Skip Wait?',
    answer: `Install Skip Wait from the Chrome Web Store. You get ${FREE.dailyLimit} free bypasses each day with no key. Open supported links as usual. Skip Wait skips the countdown when it can, or waits and clicks Continue for you. For unlimited use, get a 30-minute trial or ${PRICE.summary} license on EAS Store, paste the key in the popup, and tap Activate.`,
  },
  {
    question: 'Do I need a license?',
    answer: LICENSE.faqAnswer,
  },
  {
    question: 'How much does Skip Wait cost?',
    answer: `${FREE.dailyLimit} free bypasses each day with no key. A short link that uses a few pages still counts as one use. EAS Store also offers a 30-minute ${LICENSE.trialLabel.toLowerCase()} and a ${PRICE.summary} plan with no daily limit. Paste a key in the popup and tap Activate. ${LICENSE.deviceLimit} A live license does not use the daily free count.`,
  },
  {
    question: 'Is Skip Wait a FastForward or Universal Bypass alternative?',
    answer:
      'Yes. Skip Wait is a Chrome extension to skip wait, bypass timers, run a countdown bypass, and bypass URL shorteners on supported sites. It is not FastForward or Universal Bypass—those are separate products. Skip Wait skips the wait when it can. If the site still needs Continue, Skip Wait clicks it for you.',
  },
  {
    question: 'Does it bypass timers, or only wait for me?',
    answer:
      'Both. Skip Wait skips countdown timers, waiting pages, and URL shorteners when the site allows it. If the site still needs a wait or Continue, Skip Wait does those steps for you.',
  },
  {
    question: 'What sites are supported?',
    answer: `Skip Wait works on ${totalBypasses()} bypasses across ${totalDomains()} websites—URL shorteners like Linkvertise, GPLinks, and Ouo, plus waiting pages, safelinks, file-host timers, content lockers, and direct downloads. Open Supported Sites and search by name or website address. Tap Refresh in the extension popup to pull the latest domain list without reinstalling.`,
  },
  {
    question: 'Can it handle “please wait” and “click to continue” pages?',
    answer:
      'Yes on supported sites. Skip Wait skips please-wait pages and countdown timers when it can. If the site still needs a wait or Continue, Skip Wait handles those clicks.',
  },
  {
    question: 'Can I use Skip Wait on Android?',
    answer:
      'Yes on Android with Quetta Browser, which installs Chrome Web Store extensions. Chrome for Android itself does not. Follow the Install on Android guide for Quetta’s official install steps. Quetta’s iOS app does not document Chrome extension support, so Skip Wait is not offered there.',
  },
  {
    question: 'How do I get newly added sites?',
    answer:
      'Open the extension popup and tap Refresh under Site list. That downloads the latest supported domains from GitHub—no Chrome Web Store update or reinstall required.',
  },
  {
    question: 'How do I request a new site?',
    answer:
      'Open a support request on GitHub, Telegram, or email with the page URL and how the wait works. After we add it, tap Refresh in the popup to pick up new domains.',
  },
] as const;
