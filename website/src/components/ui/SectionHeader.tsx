type SectionHeaderProps = {
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  titleAs?: 'h1' | 'h2';
};

export function SectionHeader({
  title,
  description,
  tone = 'light',
  titleAs: Title = 'h2',
}: SectionHeaderProps): React.ReactElement {
  const dark = tone === 'dark';

  return (
    <div className="max-w-2xl">
      <Title className={`font-display text-headline ${dark ? 'text-ink-inverse' : 'text-ink'}`}>
        {title}
      </Title>
      {description ? (
        <p className={`mt-4 text-body ${dark ? 'text-ink-inverse-body' : 'text-ink-body'}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
