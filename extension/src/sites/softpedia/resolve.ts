export function destinationFromRefreshContent(content: string, base: string = location.href): string {
  const match = content.match(/url\s*=\s*(.+)/i);
  const raw = match?.[1]?.trim().replace(/^['"]|['"]$/g, '');
  if (!raw) throw new Error('softpedia refresh url missing');
  return new URL(raw, base).href;
}

export function destinationFromWaitDocument(doc: Document, base: string = location.href): string {
  const meta = [...doc.querySelectorAll('meta')].find(
    (el) => el.httpEquiv.toLowerCase() === 'refresh',
  );
  const content = meta?.content;
  if (!content) throw new Error('softpedia refresh meta missing');
  return destinationFromRefreshContent(content, base);
}

export function destinationFromWaitHtml(html: string, base: string = location.href): string {
  const match =
    html.match(/http-equiv\s*=\s*["']?refresh["']?[^>]*content\s*=\s*["']([^"']+)["']/i) ||
    html.match(/content\s*=\s*["']([^"']+)["'][^>]*http-equiv\s*=\s*["']?refresh/i);
  if (!match?.[1]) throw new Error('softpedia refresh meta missing');
  return destinationFromRefreshContent(match[1], base);
}

export async function resolveWaitDestination(waitUrl: string): Promise<string> {
  const res = await fetch(waitUrl, { credentials: 'include' });
  if (!res.ok) throw new Error(`softpedia wait fetch ${res.status}`);
  return destinationFromWaitHtml(await res.text(), waitUrl);
}
