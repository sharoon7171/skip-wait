export function tumadamUnlockSlug(pathname = location.pathname): string | null {
  const m = /^\/([A-Za-z0-9_-]+)\.html$/i.exec(pathname);
  return m?.[1] ?? null;
}
