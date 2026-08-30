export function bbmktsSubtounlockId(href = location.href): string | null {
  try {
    const u = new URL(href);
    if (!/^\/subtounlock\/(api|get)\/?$/i.test(u.pathname)) return null;
    const id = u.searchParams.get('id')?.trim();
    return id || null;
  } catch {
    return null;
  }
}
