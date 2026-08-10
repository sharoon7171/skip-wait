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
  body: string;
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
