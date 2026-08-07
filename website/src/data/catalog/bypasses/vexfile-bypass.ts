import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = 'VexFile';

const bypassType = 'Direct Download';

const description =
  'VexFile bypass for vexfile.com: skip Generate link, Cloudflare Turnstile waits buried under ads, and Complete an offer unlock walls. Skip Wait shows filename, size, and a Direct Download button with the real file URL.';

const domains = ['vexfile.com'] as const;

const keywords = [
  'vexfile bypass',
  'vexfile.com bypass',
  'bypass vexfile',
  'vexfile download',
  'how to download from vexfile',
  'how to download from vexfile.com',
  'vexfile free download',
  'vexfile generate link',
  'generate link vexfile',
  'vexfile generate link bypass',
  'skip generate link vexfile',
  'vexfile step 2',
  'vexfile step 2 download',
  'vexfile offer wall',
  'vexfile complete an offer',
  'complete an offer to unlock the download',
  'vexfile checking completion',
  'vexfile unlock download',
  'vexfile content locker',
  'vexfile captcha',
  'vexfile turnstile',
  'vexfile cloudflare captcha',
  'vexfile verify you are human',
  'vexfile pre-download page',
  'vexfile timer bypass',
  'vexfile skip wait',
  'vexfile skip ads',
  'vexfile direct download',
  'vexfile chrome extension',
  'vexfile download extension',
  'vexfile apk download',
  'vexfile mod apk',
  'download apk from vexfile',
  'vexfile.com download link',
  'skip wait vexfile',
  'skip wait chrome extension',
  'file host offer wall bypass',
  'skip content locker download',
] as const;

const intro =
  'Shared VexFile links look simple—open vexfile.com/download/…, confirm you are human, tap Generate link—yet most people never land on the file. After Cloudflare Turnstile they get pushed into Step 2 pages, pop-under ads, fake green buttons, and a locker that says Complete an offer to unlock the download link while Checking completion spins forever. Skip Wait is built for that exact vexfile.com download path: a free Chrome extension that covers the page, keeps the real human check visible inside its overlay, then surfaces one Direct Download · Skip Wait button with your real filename and size once the file URL is ready—so a VexFile bypass search ends in a clickable download, not another survey.';

const problem =
  'VexFile monetizes free traffic with layered gates on the download card. You solve the captcha, press Generate link, and instead of a clean save dialog you meet pre-download warnings, offer walls, and “visit this page” detours that open extra tabs. Mods, APKs, and archives shared from Discord or Telegram often use this host, so people type how to download from VexFile, VexFile generate link bypass, VexFile offer wall, or VexFile Chrome extension when they are stuck. Closing the wrong tab, failing Checking completion, or missing the buried control sends you back to the same Generate link screen with no progress.';

const howItWorks =
  'On a supported vexfile.com file page, Skip Wait draws a full-page overlay so the noisy page underneath cannot steal clicks. Your filename and size stay on the overlay so you know which share you opened. If Cloudflare Turnstile is required, the same check is pinned into the overlay—you still prove you are human, without digging under ads for the widget. After that, Skip Wait reads the page’s own Generate link target, resolves the real file download URL VexFile would expose after Step 2, and places it on a branded Direct Download · Skip Wait button. Nothing starts until you tap it; the extension does not paste links into random websites or ask you to finish offers.';

const steps: readonly BypassStep[] = [
  {
    title: 'Install Skip Wait from the Chrome Web Store',
    body: 'Add Skip Wait once. Searches like VexFile Chrome extension, VexFile download extension, or skip wait chrome extension all refer to this store listing. Support for vexfile.com loads with the extension—no account and no developer mode.',
  },
  {
    title: 'Leave the extension turned on',
    body: 'Keep Skip Wait enabled in Chrome. There is no separate VexFile toggle to flip before each download.',
  },
  {
    title: 'Open the shared VexFile URL',
    body: 'Use the same vexfile.com/download/… link someone sent you. When the file card loads, Skip Wait covers the page so ads and offer walls cannot interrupt you.',
  },
  {
    title: 'Finish the check, then tap Direct Download',
    body: 'If the overlay asks you to complete Turnstile, do that first. When Direct Download · Skip Wait appears with your file name, click it to save—Generate link and Complete an offer stay out of the way.',
  },
];

const skips = [
  'Buried Generate link presses after Turnstile on the file card',
  'Step 2 offer walls that demand Complete an offer to unlock',
  'Checking completion loops on the content locker',
  'Pre-download page detours and extra captcha tabs',
  'Fake download buttons and pop-unders while the overlay is active',
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: 'Does Skip Wait remove the Cloudflare check on VexFile?',
    answer:
      'No. When VexFile requires Turnstile, you still complete Verify you are human—but the widget is shown inside the Skip Wait overlay so you are not hunting for it under ads.',
  },
  {
    question: 'What happens to the Generate link button?',
    answer:
      'You do not need to use it. Skip Wait follows the same destination that Generate link would open, prepares the real download URL, and puts it on the Direct Download · Skip Wait button instead.',
  },
  {
    question: 'Will I still see Complete an offer to unlock?',
    answer:
      'The offer wall stays under the locked overlay and is not part of the download path Skip Wait uses. You should not need surveys or locker tasks to reach the file.',
  },
  {
    question: 'Where do I click to download?',
    answer:
      'Only inside the Skip Wait overlay: look for Direct Download · Skip Wait under your filename and size. The page underneath stays non-interactive while the overlay is up.',
  },
  {
    question: 'Does the APK or archive start downloading automatically?',
    answer:
      'No. The extension prepares the link and waits. You choose when to press Direct Download so nothing saves in the background.',
  },
  {
    question: 'Is this VexFile bypass free?',
    answer:
      'Yes. Skip Wait is free on the Chrome Web Store for vexfile.com downloads—no subscription and no sign-in required to use the overlay.',
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
