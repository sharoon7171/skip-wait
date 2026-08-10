import type { BypassFaq, SupportedBypass } from '@/types/catalog';

const name = 'CPMLink';

const bypassType = 'Skip Short Link';

const description =
  'CPMLink bypass that advances hop pages and unlock countdown waits on this ad-link monetization platform so the final destination opens without babysitting every gate.';

const domains = ['cpm.link', 'cpmlink.pro', 'bildirim.online'] as const;

const keywords = [
  'cpmlink bypass',
  'CPMLink bypass extension',
  'cpmlink bypass chrome',
  'bypass cpmlink',
  'skip cpmlink',
  'cpmlink timer bypass',
  'cpmlink countdown bypass',
  'cpm link bypass',
  'ad link bypass',
  'short link bypass',
  'monetized link bypass',
  'skip short link',
  'go page unlock bypass',
  'skip countdown timer',
  'bypass countdown timer',
  'skip waiting page',
  'link shortener bypass',
  'skip wait extension',
] as const;

const intro =
  'A CPMLink bypass search usually starts after an ad-monetized short URL chains hop pages and unlock countdowns before the real destination. Skip Wait is the free Chrome extension that walks those gates so you are not babysitting every verification screen by hand.';

const body = `## Ad-monetized hops before the final URL

CPMLink-style shares rarely resolve in one step. You bounce through verification gates, ad link countdown timers, and go-page unlock hops before the destination appears. Close a tab early and the chain can reset—hence cpmlink countdown bypass, monetized link bypass, and go page unlock bypass searches from people who just want the final URL.

### What the chain inserts

- Short-link verification gates
- Ad link countdown timers
- Go page and unlock redirect hops
- Extra checks before the destination is released

## Walking verification and unlock screens

Skip Wait automates the short link bypass steps on supported CPMLink hosts: it continues through gates and unlock waits until the destination URL is ready. One CPMLink bypass extension install covers the matching pages listed here—no paste box and no per-hop userscript.

Timers the platform still enforces server-side are waited honestly; client busywork and button hunting go away.
`;


const faq: readonly BypassFaq[] = [
  {
    question: 'Which CPMLink hosts are supported?',
    answer:
      'The hosts listed in the domains section on this page. Skip Wait automates short link bypass steps across those matching pages.',
  },
  {
    question: 'What hop pages does Skip Wait advance?',
    answer:
      'Go page and unlock redirect hops, ad link countdown timers, and verification steps before the destination are automated until the final URL is ready.',
  },
  {
    question: 'Can Skip Wait clear unlock countdown waits?',
    answer:
      'Yes on supported flows. Open the monetized link once and the extension continues through gates and countdowns automatically.',
  },
  {
    question: 'Do I paste the URL into another site?',
    answer:
      'No. Stay in Chrome on the live short link chain with Skip Wait enabled.',
  },
  {
    question: 'Is the CPMLink path free?',
    answer:
      'Yes. Skip Wait is free. The CPMLink bypass runs on supported pages with no account or paid plan.',
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
