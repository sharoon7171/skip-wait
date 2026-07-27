export function runLksfyAdblockBypass(): void {
  const w = window as unknown as { __swLksfyAdblock?: boolean };
  if (w.__swLksfyAdblock) return;
  w.__swLksfyAdblock = true;

  const BAIT =
    /googlesyndication|doubleclick|pubmatic|taboola|adnxs|amazon-adsystem|adsbygoogle|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|code\.jquery\.com/i;
  const isBait = (url: unknown): boolean => BAIT.test(String(url ?? ''));

  type SwXhr = XMLHttpRequest & { __swMethod?: string; __swUrl?: string };
  const XO = XMLHttpRequest.prototype.open;
  const XS = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (
    this: SwXhr,
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    this.__swMethod = method;
    this.__swUrl = String(url);
    return XO.call(this, method, url, async ?? true, username, password);
  };
  XMLHttpRequest.prototype.send = function (
    this: SwXhr,
    body?: Document | XMLHttpRequestBodyInit | null,
  ) {
    if (isBait(this.__swUrl) && String(this.__swMethod || '').toUpperCase() === 'HEAD') {
      Object.defineProperty(this, 'status', { configurable: true, get: () => 200 });
      Object.defineProperty(this, 'readyState', { configurable: true, get: () => 4 });
      Object.defineProperty(this, 'responseText', { configurable: true, get: () => '' });
      queueMicrotask(() => {
        this.onreadystatechange?.call(this, null as unknown as Event);
        this.onload?.call(this, null as unknown as ProgressEvent<EventTarget>);
      });
      return;
    }
    return XS.call(this, body);
  };

  const _fetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = (
      init?.method ||
      (typeof input !== 'string' && !(input instanceof URL) ? input.method : 'GET') ||
      'GET'
    ).toUpperCase();
    if (isBait(url) && method === 'HEAD') {
      return Promise.resolve(new Response(null, { status: 200, statusText: 'OK' }));
    }
    return _fetch(input, init);
  };

  const forceOff = (): void => {
    try {
      const av = (window as unknown as { app_vars?: Record<string, unknown> }).app_vars;
      if (av) av['force_disable_adblock'] = '0';
    } catch {}
  };

  try {
    let vars: Record<string, unknown> | undefined = (window as unknown as { app_vars?: Record<string, unknown> })
      .app_vars;
    Object.defineProperty(window, 'app_vars', {
      configurable: true,
      enumerable: true,
      get: () => vars,
      set: (v: Record<string, unknown>) => {
        vars = v && typeof v === 'object' ? v : vars;
        if (vars) vars['force_disable_adblock'] = '0';
      },
    });
    if (vars) vars['force_disable_adblock'] = '0';
  } catch {
    forceOff();
  }

  forceOff();
  window.setInterval(forceOff, 250);
}
