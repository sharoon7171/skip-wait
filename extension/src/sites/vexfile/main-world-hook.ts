import { VEXFILE_VERIFIED_ATTR } from './hosts';

type VexWin = Window & { __skipWaitVexVerifyHook?: boolean };

export function runVexfileVerifyHook(): void {
  const w = window as VexWin;
  if (w.__skipWaitVexVerifyHook) return;
  w.__skipWaitVexVerifyHook = true;
  const orig = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const res = await orig(input, init);
    const url =
      typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
    if (!url.includes('/verify-cf-captcha')) return res;
    try {
      const data = (await res.clone().json()) as { success?: boolean };
      if (data.success) document.documentElement.setAttribute(VEXFILE_VERIFIED_ATTR, '1');
    } catch {
      /* non-JSON */
    }
    return res;
  };
}
