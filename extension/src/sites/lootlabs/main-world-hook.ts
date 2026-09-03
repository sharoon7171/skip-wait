import type { LootPostMessage } from './messages';

export { LOOT_MSG_SOURCE } from './messages';

export function runLootCaptchaBridge(msgSource: string): void {
  if (!/\/captcha(?:\?|$)/i.test(`${location.pathname}${location.search}`)) return;
  type W = Window & {
    __swLootBridgeInit?: boolean;
    __swLootTokenSent?: boolean;
    __swLootPollId?: number;
    __swLootNativeOnToken?: (token: string) => void;
    TOKEN?: string | null;
    onToken?: (token: string) => void;
  };
  const w = window as W;
  if (w.__swLootTokenSent) return;

  const lockGo = (): void => {
    const go = document.getElementById('go');
    if (!go) return;
    go.setAttribute('disabled', '');
    (go as HTMLButtonElement).disabled = true;
    go.style.pointerEvents = 'none';
  };

  if (!w.__swLootBridgeInit) {
    w.__swLootBridgeInit = true;
    const style = document.createElement('style');
    style.textContent =
      '#go,#msg,.badge,.foot,h1,p.sub,main>.orb{display:none!important}main{padding:12px 16px 16px!important}';
    (document.documentElement ?? document.head).appendChild(style);
    new MutationObserver(lockGo).observe(document.documentElement, { childList: true, subtree: true });
    lockGo();
  }

  const emit = (token: string): void => {
    if (w.__swLootTokenSent || !token) return;
    w.__swLootTokenSent = true;
    window.parent.postMessage({ source: msgSource, type: 'captcha-token', token }, '*');
    lockGo();
    if (w.__swLootPollId != null) {
      clearInterval(w.__swLootPollId);
      delete w.__swLootPollId;
    }
  };

  if (!w.__swLootNativeOnToken && typeof w.onToken === 'function') {
    w.__swLootNativeOnToken = w.onToken;
  }

  w.onToken = (token: string) => {
    emit(token);
    w.__swLootNativeOnToken?.(token);
  };

  if (typeof w.TOKEN === 'string' && w.TOKEN) emit(w.TOKEN);

  if (!w.__swLootPollId) {
    w.__swLootPollId = window.setInterval(() => {
      if (typeof w.TOKEN === 'string' && w.TOKEN) emit(w.TOKEN);
    }, 200);
    window.setTimeout(() => {
      if (w.__swLootPollId != null) {
        clearInterval(w.__swLootPollId);
        delete w.__swLootPollId;
      }
    }, 120000);
  }
}

export function runLootBootstrap(msgSource: string): void {
  type LootTask = {
    urid: string;
    task_id: number;
    ad_url?: string;
    action_pixel_url?: string;
    auto_complete_seconds?: number;
  };
  type LootTcBody = { tid: number; rkey: string; session: string; botd?: string };
  type TcCap = { url: string; body: LootTcBody; text: string };
  type LootWin = Window & {
    __swLootHooked?: boolean;
    __swLootPierce?: boolean;
    __swLootBlockWs?: boolean;
    __swLootDone?: boolean;
    __swLootReplace?: (url: string) => void;
    __swLootFetch?: typeof fetch;
    INCENTIVE_SERVER_DOMAIN?: string;
  };

  const w = window as LootWin;
  if (w.__swLootHooked) return;
  w.__swLootHooked = true;
  w.__swLootReplace = location.replace.bind(location);

  try {
    location.assign = () => {};
    location.replace = () => {};
  } catch {}
  try {
    Object.defineProperty(navigator, 'webdriver', { get: () => false, configurable: true });
  } catch {}

  const post = (payload: LootPostMessage): void => {
    window.postMessage({ source: msgSource, ...payload }, location.origin);
  };

  const parseTuple = (raw: string): unknown[] => {
    const body = raw.trim().replace(/;$/, '');
    if (!body.startsWith('(') || !body.endsWith(')')) return [];
    try {
      return JSON.parse(`[${body.slice(1, -1)}]`) as unknown[];
    } catch {
      return [];
    }
  };

  const parseR = (msg: string): string => {
    const bin = atob(msg.slice(2));
    if (bin.length < 6) throw new Error('r');
    const key = [...bin.slice(0, 5)].map((c) => c.charCodeAt(0));
    return [...bin.slice(5)]
      .map((c, i) => {
        const k = key[i % key.length];
        if (k === undefined) throw new Error('r');
        return String.fromCharCode(c.charCodeAt(0) ^ k);
      })
      .join('')
      .trim();
  };

  const autosOf = (tasks: LootTask[]): Array<{ task: LootTask; sec: number }> => {
    const out: Array<{ task: LootTask; sec: number }> = [];
    for (const t of tasks) {
      const n = Number(t.auto_complete_seconds);
      if (!Number.isFinite(n) || n <= 0) continue;
      out.push({ task: t, sec: n });
    }
    return out;
  };

  const captchaOf = (tasks: LootTask[]): LootTask | null => {
    for (const t of tasks) {
      const href = typeof t.ad_url === 'string' ? t.ad_url.trim() : '';
      if (/\/captcha(?:\?|$)/i.test(href)) return t;
    }
    return null;
  };

  const sanitizeBody = (raw: string): string => {
    const body = JSON.parse(raw) as LootTcBody;
    if (typeof body.botd === 'string') {
      try {
        const botd = JSON.parse(body.botd) as { bot?: boolean; botKind?: string };
        botd.bot = false;
        delete botd.botKind;
        body.botd = JSON.stringify(botd);
      } catch {}
    }
    return JSON.stringify(body);
  };

  const wsBaseReady = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const start = Date.now();
      const id = window.setInterval(() => {
        const wsBase =
          typeof w.INCENTIVE_SERVER_DOMAIN === 'string' ? w.INCENTIVE_SERVER_DOMAIN.trim() : '';
        if (wsBase) {
          clearInterval(id);
          resolve(wsBase);
          return;
        }
        if (Date.now() - start > 20000) {
          clearInterval(id);
          reject(new Error('ws base'));
        }
      }, 50);
    });

  const origWs = window.WebSocket;
  const deadWs = (): WebSocket => {
    const s = { readyState: 3, send() {}, close() {}, addEventListener() {}, removeEventListener() {} };
    return s as unknown as WebSocket;
  };
  window.WebSocket = function (url: string | URL, protocols?: string | string[]) {
    const u = String(url);
    if (w.__swLootBlockWs && u.includes('/c?uid=')) return deadWs();
    return new origWs(url, protocols);
  } as unknown as typeof WebSocket;
  Object.assign(window.WebSocket, origWs);
  window.WebSocket.prototype = origWs.prototype;

  const pierce = async (cap: TcCap): Promise<void> => {
    if (w.__swLootPierce || w.__swLootDone) return;
    w.__swLootPierce = true;
    const rawFetch = w.__swLootFetch;
    if (!rawFetch) {
      post({ type: 'err', message: 'fetch' });
      return;
    }

    try {
      const tcDomain = new URL(cap.url).hostname;
      const tid = Number(cap.body.tid);
      const key = String(cap.body.rkey);
      const session = String(cap.body.session);
      if (!tcDomain || !tid || !key || !session) throw new Error('tc capture incomplete');

      const tasks = JSON.parse(cap.text) as LootTask[];
      if (!Array.isArray(tasks) || !tasks.length) throw new Error('tc empty');

      const autos = autosOf(tasks);
      if (!autos.length) throw new Error('no auto-complete task');

      const capTask = captchaOf(tasks);
      const waitSec = Math.max(...autos.map((a) => a.sec));
      const waitStarted = Date.now();
      post({ type: 'wait', endTs: waitStarted + waitSec * 1000 });

      const captchaHref = typeof capTask?.ad_url === 'string' ? capTask.ad_url.trim() : '';
      if (captchaHref && capTask?.urid) {
        post({
          type: 'captcha',
          url: captchaHref,
          urid: capTask.urid,
          taskId: Number(capTask.task_id),
        });
      }

      const wsBase = await wsBaseReady();
      const sub = Number(String(tasks[0]?.urid ?? '').slice(-5)) % 3;
      const st = (t: LootTask): void => {
        navigator.sendBeacon(
          `https://${sub}.${wsBase}/st?uid=${t.urid}&cat=${t.task_id}`,
          new Blob([], { type: 'text/plain' }),
        );
      };
      const td = (ac: string, t: LootTask): void => {
        void rawFetch(`https://${tcDomain}/td?ac=${ac}&urid=${t.urid}&cat=${t.task_id}&tid=${tid}`, {
          credentials: 'include',
          mode: 'cors',
        });
      };

      let captchaTd = false;
      const fireCaptchaTd = (): void => {
        if (captchaTd || !capTask) return;
        captchaTd = true;
        td('captcha', capTask);
      };

      window.addEventListener('message', (ev: MessageEvent) => {
        if (ev.origin !== location.origin) return;
        const data = ev.data as { source?: string; type?: string };
        if (data?.source !== msgSource || data.type !== 'captcha-ok') return;
        fireCaptchaTd();
      });

      const hit = await new Promise<string>((resolve, reject) => {
        const ws = new origWs(
          `wss://${sub}.${wsBase}/c?uid=${tasks.map((t) => t.urid).join(',')}&cat=${tasks
            .map((t) => t.task_id)
            .join(',')}&key=${key}&session_id=${session}&is_loot=1&tid=${tid}`,
        );
        let keep: number | null = null;
        const autoTimers: number[] = [];
        const wsTimeout = window.setTimeout(
          () => {
            stop();
            reject(new Error('ws timeout'));
          },
          (waitSec + 90) * 1000,
        );
        const stop = (): void => {
          clearTimeout(wsTimeout);
          if (keep != null) clearInterval(keep);
          for (const id of autoTimers) clearTimeout(id);
          ws.close();
        };
        ws.onerror = () => {
          stop();
          reject(new Error('ws error'));
        };
        ws.onopen = () => {
          ws.send('0');
          keep = window.setInterval(() => ws.send('0'), 10000);
          for (const t of tasks) st(t);
          for (const a of autos) {
            autoTimers.push(
              window.setTimeout(() => {
                td('auto_complete', a.task);
                const pixel = a.task.action_pixel_url;
                if (pixel) void rawFetch(`https:${pixel}`, { credentials: 'omit', mode: 'cors' });
              }, Math.max(0, waitStarted + a.sec * 1000 - Date.now())),
            );
          }
        };
        ws.onmessage = (ev) => {
          const msg = String(ev.data);
          if (!msg.startsWith('r:')) return;
          stop();
          resolve(parseR(msg));
        };
      });

      if (!hit || !/^https?:\/\//i.test(hit)) throw new Error('dest');
      w.__swLootDone = true;
      post({ type: 'dest', dest: hit });
      w.__swLootReplace?.(hit);
    } catch (err) {
      w.__swLootPierce = false;
      w.__swLootBlockWs = false;
      post({ type: 'err', message: err instanceof Error ? err.message : String(err) });
    }
  };

  const onTc = (url: string, bodyJson: string, text: string, status: number): void => {
    if (status !== 200) {
      post({ type: 'err', message: `tc ${status}` });
      return;
    }
    let body: LootTcBody;
    try {
      body = JSON.parse(bodyJson) as LootTcBody;
    } catch {
      post({ type: 'err', message: 'tc body' });
      return;
    }
    w.__swLootBlockWs = true;
    void pierce({ url, body, text });
  };

  const tcRequest = async (url: string, bodyJson: string): Promise<string> => {
    const resp = await (w.__swLootFetch ?? fetch)(url, {
      method: 'POST',
      body: bodyJson,
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
    });
    const text = await resp.text();
    onTc(url, bodyJson, text, resp.status);
    return text;
  };

  const subtle = crypto.subtle;
  const enc = subtle.encrypt.bind(subtle);
  subtle.encrypt = async (algo, key, data) => {
    try {
      const text = new TextDecoder().decode(data);
      if (text.includes('"bot"')) {
        const obj = JSON.parse(text) as { bot?: boolean; botKind?: string };
        obj.bot = false;
        delete obj.botKind;
        data = new TextEncoder().encode(JSON.stringify(obj));
      }
    } catch {}
    return enc(algo, key, data);
  };

  const origFetch = window.fetch.bind(window);
  w.__swLootFetch = origFetch;
  window.fetch = async (input, init) => {
    const req = input instanceof Request ? input : null;
    const url = String(req ? req.url : input);
    const method = String(init?.method || req?.method || 'GET').toUpperCase();

    if (url.includes('params_only=1')) {
      const resp = await origFetch(input, init);
      const wsBase = String(parseTuple(await resp.clone().text())[9] ?? '').trim();
      if (wsBase) w.INCENTIVE_SERVER_DOMAIN = wsBase;
      return resp;
    }

    if (url.includes('/tc') && method === 'POST') {
      let bodyJson =
        typeof init?.body === 'string'
          ? init.body
          : init?.body
            ? await new Response(init.body).text()
            : req
              ? await req.clone().text()
              : '';
      try {
        bodyJson = sanitizeBody(bodyJson);
      } catch {}
      const text = await tcRequest(url, bodyJson);
      return new Response(text, { status: 200 });
    }

    return origFetch(input, init);
  };
}
