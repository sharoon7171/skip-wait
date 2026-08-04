import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "FilesPayouts";

const bypassType = "Direct Download";

const description = "FilesPayouts bypass skips free download waits and mediator pages on this file host so Free Download starts the file immediately.";

const domains = [
  "filespayouts.com",
] as const;

const keywords = [
  "filespayouts bypass",
  "FilesPayouts bypass extension",
  "filespayouts timer bypass",
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

const intro = "FilesPayouts bypass skips free download waits and mediator pages on this file host so Free Download starts the file immediately. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "FilesPayouts shows a Free Download path that normally forces a countdown page before the real file link.";

const howItWorks = "Skip Wait posts straight through to the download step when you click Free Download, so the countdown and intermediary page never get in the way.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The FilesPayouts bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for FilesPayouts.",
  },
  {
    title: "Click Free Download as usual",
    body: "Use Free Download on FilesPayouts. Skip Wait labels the button and resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported FilesPayouts delay.",
  },
];

const skips = [
  "Free download countdown timers",
  "Mediator pages after Free Download",
  "Intermediary screens before the file link",
  "Client-side wait before Create Download Link",
] as const;

const faq: readonly BypassFaq[] = [
  {
    question: "What free download waits does Skip Wait skip on filespayouts.com?",
    answer: "Skip Wait bypasses free download countdown timers and mediator pages on filespayouts.com so Free Download starts the file immediately.",
  },
  {
    question: "Can my download start in one click on FilesPayouts with Skip Wait?",
    answer: "Yes. The extension resolves the download in the background and bypasses the countdown page that normally appears after Free Download.",
  },
  {
    question: "Does Skip Wait bypass mediator pages on FilesPayouts?",
    answer: "Yes. The wait page after Free Download is skipped so the file path opens immediately when the host allows it.",
  },
  {
    question: "Is the FilesPayouts bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The FilesPayouts bypass runs on supported pages with no account or paid plan required.",
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
