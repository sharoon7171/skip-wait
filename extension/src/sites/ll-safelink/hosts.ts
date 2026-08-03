export const LL_SAFELINK_HOSTS = ['teknoasian.com'] as const;
export const LLAC_HOSTS = ['linegee.net'] as const;

export function xxc(html: string): string | null {
  return (
    /href=["'](https?:\/\/[^"']+)["'][^>]*id=["']xxc["']|id=["']xxc["'][^>]*href=["'](https?:\/\/[^"']+)["']/i
      .exec(html)
      ?.slice(1)
      .find(Boolean) ?? null
  );
}
