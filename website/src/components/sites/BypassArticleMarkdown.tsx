import type { Components } from 'react-markdown';
import type { ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { Schema } from 'hast-util-sanitize';
import { headingId } from '@/components/sites/markdown-toc';

const prose = 'max-w-prose text-body-sm leading-relaxed text-ink-body';

const articleClassName = [
  'border-b border-neutral-200 py-8 sm:py-10',
  '[&>*:first-child]:mt-0 [&_h2]:mt-0 [&_h2~h2]:mt-8 [&_h1~h2]:mt-8',
  '[&_.hljs]:bg-transparent [&_.hljs]:text-neutral-200',
  '[&_.hljs-comment]:italic [&_.hljs-comment]:text-neutral-400 [&_.hljs-quote]:italic [&_.hljs-quote]:text-neutral-400',
  '[&_.hljs-keyword]:text-blue-300 [&_.hljs-selector-tag]:text-blue-300 [&_.hljs-addition]:text-blue-300',
  '[&_.hljs-number]:text-green-300 [&_.hljs-string]:text-green-300 [&_.hljs-literal]:text-green-300 [&_.hljs-doctag]:text-green-300 [&_.hljs-regexp]:text-green-300',
  '[&_.hljs-meta_.hljs-meta-string]:text-green-300',
  '[&_.hljs-title]:text-amber-300 [&_.hljs-section]:text-amber-300 [&_.hljs-name]:text-amber-300 [&_.hljs-selector-id]:text-amber-300 [&_.hljs-selector-class]:text-amber-300',
  '[&_.hljs-attribute]:text-pink-300 [&_.hljs-attr]:text-pink-300 [&_.hljs-variable]:text-pink-300 [&_.hljs-template-variable]:text-pink-300 [&_.hljs-type]:text-pink-300',
  '[&_.hljs-class_.hljs-title]:text-pink-300',
  '[&_.hljs-symbol]:text-cyan-300 [&_.hljs-bullet]:text-cyan-300 [&_.hljs-link]:text-cyan-300',
  '[&_.hljs-built_in]:text-orange-300 [&_.hljs-builtin-name]:text-orange-300 [&_.hljs-meta]:text-orange-300 [&_.hljs-deletion]:text-orange-300',
  '[&_.hljs-emphasis]:italic [&_.hljs-strong]:font-bold',
].join(' ');

const attrs = defaultSchema.attributes ?? {};

const sanitizeSchema: Schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'mark', 'kbd'],
  attributes: {
    ...attrs,
    '*': [...(attrs['*'] ?? []), 'className', 'id'],
    a: [...(attrs['a'] ?? []), 'target', 'rel', 'title'],
    code: [...(attrs['code'] ?? []), ['className', /.+/]],
    span: [...(attrs['span'] ?? []), ['className', /.+/]],
    pre: [...(attrs['pre'] ?? []), ['className', /.+/]],
    img: [...(attrs['img'] ?? []), 'alt', 'title', 'width', 'height', 'loading'],
    mark: [['className', /.+/]],
    kbd: [['className', /.+/]],
    h1: [...(attrs['h1'] ?? []), 'id'],
    h2: [...(attrs['h2'] ?? []), 'id'],
    h3: [...(attrs['h3'] ?? []), 'id'],
    h4: [...(attrs['h4'] ?? []), 'id'],
  },
};

function textOf(children: ReactNode): string {
  if (children == null || typeof children === 'boolean') return '';
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textOf).join('');
  if (typeof children === 'object' && 'props' in children) {
    return textOf((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function Heading({
  as: Tag,
  children,
  className,
}: {
  as: 'h1' | 'h2' | 'h3' | 'h4';
  children: ReactNode;
  className: string;
}): React.ReactElement {
  const text = textOf(children);
  return (
    <Tag id={headingId(text)} className={className}>
      {children}
    </Tag>
  );
}

const components: Components = {
  h1: ({ children }) => (
    <Heading as="h1" className="scroll-mt-24 font-display text-title-lg text-ink">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" className="scroll-mt-24 font-display text-title text-ink">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" className="scroll-mt-24 mt-6 font-display text-body font-semibold text-ink">
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading as="h4" className="scroll-mt-24 mt-5 font-display text-body-sm font-semibold text-ink">
      {children}
    </Heading>
  ),
  p: ({ children }) => <p className={`mt-4 ${prose}`}>{children}</p>,
  ul: ({ children }) => (
    <ul className={`m-0 mt-3 list-disc space-y-2 pl-5 ${prose}`}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className={`m-0 mt-3 list-decimal space-y-2 pl-5 ${prose}`}>{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  del: ({ children }) => <del className="text-ink-soft">{children}</del>,
  mark: ({ children }) => (
    <mark className="rounded-sm bg-primary-50 px-0.5 text-ink ring-1 ring-primary-100">{children}</mark>
  ),
  kbd: ({ children }) => (
    <kbd className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-domain text-ink ring-1 ring-neutral-300">
      {children}
    </kbd>
  ),
  a: ({ href, children, title }) => {
    const external = Boolean(href && /^https?:\/\//i.test(href));
    return (
      <a
        href={href}
        title={title}
        className="font-medium text-primary-700 underline decoration-primary-200 underline-offset-2 transition-colors hover:text-primary-800 hover:decoration-primary-500"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mt-4 max-w-prose border-l-2 border-primary-200 pl-4 text-body-sm leading-relaxed text-ink-soft italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 max-w-prose border-0 border-t border-neutral-200" />,
  img: ({ src, alt, title }) => (
    <img
      src={src}
      alt={alt ?? ''}
      title={title}
      loading="lazy"
      className="mt-4 max-h-[28rem] w-auto max-w-full rounded-md ring-1 ring-neutral-200"
    />
  ),
  table: ({ children }) => (
    <div className="mt-4 max-w-prose overflow-x-auto ring-1 ring-neutral-200">
      <table className="w-full border-collapse text-left text-body-sm text-ink-body">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-neutral-50 text-ink">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr className="border-b border-neutral-200">{children}</tr>,
  th: ({ children }) => (
    <th className="px-3 py-2 font-display text-caption font-semibold">{children}</th>
  ),
  td: ({ children }) => <td className="px-3 py-2 align-top">{children}</td>,
  pre: ({ children }) => (
    <pre className="mt-4 max-w-prose overflow-x-auto rounded-md bg-neutral-950 p-4 text-caption leading-relaxed text-neutral-100 ring-1 ring-neutral-800 [&_code]:block [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit [&_code]:shadow-none [&_code]:ring-0">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    if (className) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-domain text-ink ring-1 ring-neutral-200">
        {children}
      </code>
    );
  },
  input: ({ checked, disabled, type }) =>
    type === 'checkbox' ? (
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        readOnly
        className="mr-2 align-middle"
      />
    ) : null,
};

type BypassArticleMarkdownProps = {
  markdown: string;
};

export function BypassArticleMarkdown({ markdown }: BypassArticleMarkdownProps): React.ReactElement {
  return (
    <div className={articleClassName}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema], rehypeHighlight]}
        components={components}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
