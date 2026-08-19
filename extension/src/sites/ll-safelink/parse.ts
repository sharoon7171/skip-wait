export function xxc(html: string): string | null {
  return (
    /href=["'](https?:\/\/[^"']+)["'][^>]*id=["']xxc["']|id=["']xxc["'][^>]*href=["'](https?:\/\/[^"']+)["']/i
      .exec(html)
      ?.slice(1)
      .find(Boolean) ?? null
  );
}
