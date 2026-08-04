import type { BypassFaq, BypassStep, SupportedBypass } from '@/types/catalog';

const name = "UploadRAR";

const bypassType = "Direct Download";

const description = "UploadRAR bypass skips free download waits and mediator pages on this file host so Free Download starts the file immediately.";

const domains = [
  "uploadrar.com",
] as const;

const keywords = [
  "uploadrar bypass",
  "UploadRAR bypass extension",
  "uploadrar timer bypass",
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

const intro = "UploadRAR bypass skips free download waits and mediator pages on this file host so Free Download starts the file immediately. Install Skip Wait once and it runs automatically on supported pages.";

const problem = "UploadRAR shows a Free Download path that normally forces a countdown page before the real file link.";

const howItWorks = "Skip Wait resolves the direct file URL in the background when you click Free Download, so the countdown and intermediary page never get in the way.";

const steps: readonly BypassStep[] = [
  {
    title: "Add Skip Wait to Chrome",
    body: "Install Skip Wait from the Chrome Web Store. The UploadRAR bypass turns on automatically on supported pages—no account needed.",
  },
  {
    title: "Keep the extension enabled",
    body: "Leave Skip Wait on in Chrome. There is nothing to configure for UploadRAR.",
  },
  {
    title: "Click Free Download as usual",
    body: "Use Free Download on UploadRAR. Skip Wait labels the button and resolves the wait behind it.",
  },
  {
    title: "Reach the destination faster",
    body: "Skip Wait runs in the background on the matching page and moves you past the supported UploadRAR delay.",
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
    question: "What free download waits does Skip Wait skip on uploadrar.com?",
    answer: "Skip Wait bypasses free download countdown timers and mediator pages on uploadrar.com so Free Download starts the file immediately.",
  },
  {
    question: "Can my download start in one click on UploadRAR with Skip Wait?",
    answer: "Yes. The extension resolves the real file URL in the background and bypasses the countdown page that normally appears after Free Download.",
  },
  {
    question: "Does Skip Wait bypass mediator pages on UploadRAR?",
    answer: "Yes. The wait page after Free Download is skipped so the file path opens immediately when the host allows it.",
  },
  {
    question: "Is the UploadRAR bypass free with Skip Wait?",
    answer: "Yes. Skip Wait is a free Chrome extension. The UploadRAR bypass runs on supported pages with no account or paid plan required.",
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
