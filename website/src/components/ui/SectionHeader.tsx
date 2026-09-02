type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({
  title,
  description,
}: SectionHeaderProps): React.ReactElement {
  return (
    <div className="max-w-measure">
      <h2 className="font-display text-headline text-ink">{title}</h2>
      <p className="mt-3 text-body-sm text-ink-body sm:text-body">{description}</p>
    </div>
  );
}
