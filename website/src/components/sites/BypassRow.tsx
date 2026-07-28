import type { SupportedBypass } from '@/types/catalog';

type BypassRowProps = {
  entry: SupportedBypass;
  domains?: 'full' | 'summary';
  titleAs?: 'h2' | 'h3';
};

export function BypassRow({
  entry,
  domains = 'full',
  titleAs: Title = 'h2',
}: BypassRowProps): React.ReactElement {
  const shown =
    domains === 'summary' && entry.domains.length > 3
      ? entry.domains.slice(0, 3)
      : entry.domains;
  const hiddenCount = entry.domains.length - shown.length;

  return (
    <article className="min-w-0 flex-1">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Title className="font-display text-title text-ink">{entry.name}</Title>
        <p className="rounded-full bg-primary-50 px-2.5 py-0.5 text-caption font-semibold text-primary-700 ring-1 ring-primary-100">
          {entry.bypass}
        </p>
      </div>

      <p
        className={
          domains === 'summary'
            ? 'mt-2 hidden text-body-sm text-ink-body lg:block'
            : 'mt-2 text-body-sm text-ink-body'
        }
      >
        {entry.description}
      </p>

      <div className="mt-3">
        <p className="text-caption font-semibold text-ink-soft">Works on</p>
        <ul
          className="mt-2 m-0 flex list-none flex-wrap gap-2 p-0"
          aria-label={`Websites supported for ${entry.name}`}
        >
          {shown.map((domain) => (
            <li
              key={domain}
              className="rounded-chip bg-neutral-100 px-3 py-1.5 font-mono text-caption font-medium text-ink ring-1 ring-neutral-300"
            >
              {domain}
            </li>
          ))}
          {hiddenCount > 0 ? (
            <li className="rounded-chip bg-primary-50 px-3 py-1.5 text-caption font-semibold text-primary-700 ring-1 ring-primary-200">
              +{hiddenCount} more
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}
