import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FileHippo";

const bypassType = "Direct Download";

const description = "FileHippo bypass skips the post click download delay and opens the real mirror file link instantly when you hit the download button on the page.";

const domains = [
  "filehippo.com",
  "filehippo.de",
  "filehippo.jp",
  "filehippo.pl",
] as const;

const keywords = [
  "filehippo bypass",
  "FileHippo bypass extension",
  "filehippo timer bypass",
  "direct download",
  "skip countdown timer",
  "bypass countdown timer",
  "skip waiting page",
  "link shortener bypass",
  "skip wait extension",
  "direct download bypass",
  "download timer skip",
  "file host bypass",
] as const;

const intro = "FileHippo bypass skips the post click download delay and opens the real mirror file link instantly when you hit the download button on the page. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FileHippo often sits a download wait, generating timer, or intermediary screen in front of the real file link.";

const howItWorks = "Instead of sitting on a generating screen, Skip Wait fetches the direct link and starts the file path immediately when the host allows it.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FileHippo bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FileHippo.",
  },
  {
    title: "Click download as usual",
    body: "Use the same download button you already click on FileHippo. Skip Wait resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FileHippo delay.",
  },
];

const skips = [
  "Direct-download generating timers",
  "Download generating timers after button clicks",
  "Intermediary redirect pages before the file",
  "Extra wait screens on mirror and host buttons",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What post-click delay does Skip Wait remove on FileHippo downloads?",
    answer: "Skip Wait skips the post-download waiting page after mirror selection and opens the direct file download link without extra delay.",
  },
  {
    question: "Which regional FileHippo sites like filehippo.de does Skip Wait support?",
    answer: "Skip Wait works on filehippo.com, filehippo.de, filehippo.jp, and filehippo.pl, resolving real mirror file links across all four regional sites.",
  },
  {
    question: "Does Skip Wait open the real mirror file link after I hit download?",
    answer: "Yes. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path when the host allows it.",
  },
  {
    question: "Is the FileHippo bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FileHippo bypass runs on supported pages with no account or paid plan required.",
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
