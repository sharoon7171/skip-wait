export type BypassTocItem = {
  id: string;
  label: string;
};

type BypassArticleTocProps = {
  items: readonly BypassTocItem[];
};

export function BypassArticleToc({ items }: BypassArticleTocProps): React.ReactElement {
  return (
    <nav aria-label="On this page">
      <p className="text-caption font-semibold text-ink">On this page</p>
      <ul className="m-0 mt-3 list-none border-l border-neutral-200 p-0">
        {items.map((item) => (
          <li key={item.id} className="leading-none">
            <a
              href={`#${item.id}`}
              className="block border-l-2 border-transparent py-2 pl-4 -ml-px text-caption font-semibold leading-5 whitespace-nowrap text-ink-soft no-underline transition-colors hover:border-primary-600 hover:text-primary-700 target:border-primary-600 target:text-primary-700"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
