type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({
  title,
  description,
}: SectionHeaderProps): React.ReactElement {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-headline text-ink">{title}</h2>
      <p className="mt-3 text-body text-ink-body">{description}</p>
    </div>
  );
}
