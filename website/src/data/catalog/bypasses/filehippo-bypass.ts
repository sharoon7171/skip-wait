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

const intro = "Searching for FileHippo bypass to skip download waits? Skip Wait targets 4 supported websites in this network and replaces slow download flows with direct file access from the host page.";

const problem = "FileHippo often sits a download wait, generating timer, or intermediary screen in front of the real file link. Users look for a FileHippo bypass so the direct download opens immediately instead of after the forced delay.";

const howItWorks = "Add Skip Wait to Chrome, open a FileHippo file listing, and press download. Instead of sitting on a generating screen, the extension fetches the direct link and starts the file path immediately when the host allows it. Download buttons on 4 supported websites resolve to the real file sooner instead of another generating or wait page.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install the free Skip Wait extension from the Chrome Web Store. No account is required, and the FileHippo bypass activates on supported pages automatically.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait turned on in Chrome. There is no per site toggle to configure for FileHippo; supported flows run in the background when the page matches.",
  },
  {
    title: "Click download as usual",
    body: "Use the normal download buttons on FileHippo. Skip Wait handles the wait layer behind those buttons on supported pages.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait removes the download wait and opens or reveals the direct file link on the supported FileHippo page.",
  },
];

const skips = [
  "FileHippo direct download flows",
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
