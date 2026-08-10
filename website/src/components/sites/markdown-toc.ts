export type BypassTocItem = {
  id: string;
  label: string;
};

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tocFromMarkdown(markdown: string): BypassTocItem[] {
  const items: BypassTocItem[] = [];
  const seen = new Map<string, number>();
  for (const line of markdown.split('\n')) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const label = match[1]!.trim();
    let id = headingId(label);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    items.push({ id, label });
  }
  return items;
}
