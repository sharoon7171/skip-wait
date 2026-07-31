export type BypassStep = {
  title: string;
  body: string;
};

export type BypassFaq = {
  question: string;
  answer: string;
};

export type BypassArticle = {
  intro: string;
  problem?: string;
  howItWorks: string;
  steps?: readonly BypassStep[];
  skips: readonly string[];
  faq: readonly BypassFaq[];
};

export type SupportedBypass = {
  name: string;
  bypass: string;
  description: string;
  domains: readonly string[];
  keywords: readonly string[];
  article: BypassArticle;
};
