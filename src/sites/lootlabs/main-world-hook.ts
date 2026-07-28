export const LOOT_MSG_SOURCE = 'skip-wait-loot' as const;
export const MSG_INJECT_LOOT = 'INJECT_LOOT' as const;

type LootTcBody = {
  tid: number;
  rkey: string;
  session: string;
  botd?: string;
};

type LootTcCapture = {
  url: string;
  body: LootTcBody;
  text: string;
};

type LootTask = {
  urid: string;
  task_id: number;
  action_pixel_url?: string;
  auto_complete_seconds?: number;
};

type LootWin = Window & {
  __swLootHooked?: boolean;
  __swLootRunning?: boolean;
  __swLootDone?: boolean;
  __swLootReplace?: (url: string) => void;
  __swLootWsBase?: string;
  __swLootTc?: LootTcCapture;
  __swLootOnTc?: (cap: LootTcCapture) => void;
};

function parseTuple(raw: string): unknown[] {
  const body = raw.trim().replace(/;$/, '');
  return Function(`"use strict"; return [${body.slice(1, -1)}];`)() as unknown[];
}

function parseR(msg: string): string {
  const payload = msg.slice(2);
  if (/^https?:\/\//i.test(payload)) return payload.trim();
  const bin = atob(payload);
  const key = [...bin.slice(0, 5)].map((c) => c.charCodeAt(0));
  return [...bin.slice(5)]
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (key[i % 5] ?? 0)))
    .join('')
    .trim();
}

function wsHost(urid: string): number {
  return Number(String(urid).slice(-5)) % 3;
}

async function readRequestBody(input: RequestInfo | URL, init?: RequestInit): Promise<string> {
  if (typeof init?.body === 'string') return init.body;
  if (init?.body) return await new Response(init.body).text();
  if (input instanceof Request) return await input.clone().text();
  return '';
}

function sanitizeTcBody(raw: string): LootTcBody {
  const body = JSON.parse(raw) as LootTcBody;
  if (typeof body.botd === 'string') {
    const botd = JSON.parse(body.botd) as { bot?: boolean; botKind?: string };
    botd.bot = false;
    delete botd.botKind;
    body.botd = JSON.stringify(botd);
  }
  return body;
}

export function runLootBootstrap(msgSource: string, earlyOnly?: boolean): void {
  const w = window as LootWin;

  if (!w.__swLootHooked) {
    w.__swLootHooked = true;
    w.__swLootReplace = location.replace.bind(location);

    try {
      location.assign = () => {};
      location.replace = () => {};
    } catch {}

    try {
      Object.defineProperty(navigator, 'webdriver', { get: () => false, configurable: true });
    } catch {}

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
    window.fetch = async (input, init) => {
      const req = input instanceof Request ? input : null;
      const url = String(req ? req.url : input);
      const method = String(init?.method || req?.method || 'GET').toUpperCase();

      if (url.includes('params_only=1')) {
        const resp = await origFetch(input, init);
        try {
          const tuple = parseTuple(await resp.clone().text());
          const wsBase = String(tuple[9] ?? '');
          if (wsBase) w.__swLootWsBase = wsBase;
        } catch {}
        return resp;
      }

      if (url.includes('/tc') && method === 'POST') {
        if (w.__swLootDone) return new Response('', { status: 499 });

        let body: LootTcBody;
        try {
          body = sanitizeTcBody(await readRequestBody(input, init));
        } catch {
          return origFetch(input, init);
        }

        const tcInit: RequestInit = {
          method: 'POST',
          body: JSON.stringify(body),
          credentials: init?.credentials ?? req?.credentials ?? 'same-origin',
        };
        const headers = init?.headers ?? req?.headers;
        if (headers) tcInit.headers = headers;
        const resp = await origFetch(url, tcInit);
        const text = await resp.text();
        if (resp.status === 200) {
          const cap = { url, body, text };
          w.__swLootTc = cap;
          w.__swLootOnTc?.(cap);
        }
        return new Response('', { status: 499 });
      }

      return origFetch(input, init);
    };
  }

  if (earlyOnly) return;

  const post = (
    payload: { type: 'wait'; endTs: number } | { type: 'dest'; dest: string } | { type: 'err'; message: string },
  ) => {
    window.postMessage({ source: msgSource, ...payload }, location.origin);
  };

  const wait = <T>(read: () => T | null | undefined) =>
    new Promise<T>((resolve) => {
      const tick = () => {
        const v = read();
        if (v) return resolve(v);
        requestAnimationFrame(tick);
      };
      tick();
    });

  const pierce = async (cap: LootTcCapture) => {
    if (w.__swLootRunning || w.__swLootDone) return;
    w.__swLootRunning = true;

    try {
      const wsBase = await wait(() => w.__swLootWsBase);
      const tcDomain = new URL(cap.url).hostname;
      const tid = Number(cap.body.tid);
      const key = String(cap.body.rkey);
      const session = String(cap.body.session);
      if (!tcDomain || !tid || !key || !session) throw new Error('tc capture incomplete');

      const tasks = JSON.parse(cap.text) as LootTask[];
      if (!tasks.length) throw new Error('tc empty');

      let task: LootTask | null = null;
      let autoSec = Infinity;
      for (const t of tasks) {
        const sec = Number(t.auto_complete_seconds);
        if (!Number.isFinite(sec) || sec <= 0) throw new Error('auto_complete_seconds missing');
        if (sec < autoSec) {
          autoSec = sec;
          task = t;
        }
      }
      if (!task) throw new Error('tc empty');
      const lead = task;
      const host = wsHost(lead.urid);
      const ws = new WebSocket(
        `wss://${host}.${wsBase}/c?uid=${lead.urid}&cat=${lead.task_id}&key=${key}&session_id=${session}&is_loot=1&tid=${tid}`,
      );
      const hit = await new Promise<string>((resolve, reject) => {
        const fail = (message: string) => {
          try {
            ws.close();
          } catch {}
          reject(new Error(message));
        };
        ws.onerror = () => fail('ws error');
        ws.onopen = () => {
          ws.send('0');
          void fetch(`https://${host}.${wsBase}/st?uid=${lead.urid}&cat=${lead.task_id}`, { method: 'POST' });
          post({ type: 'wait', endTs: Date.now() + autoSec * 1000 });
          void fetch(
            `https://${tcDomain}/td?ac=auto_complete&urid=${lead.urid}&cat=${lead.task_id}&tid=${tid}`,
          ).then(() => {
            if (lead.action_pixel_url) void fetch(`https:${lead.action_pixel_url}`);
          });
        };
        ws.onmessage = (ev) => {
          const msg = String(ev.data);
          if (msg === 'aaaa') {
            ws.send('0');
            return;
          }
          if (!msg.startsWith('r:')) return;
          try {
            ws.close();
          } catch {}
          resolve(parseR(msg));
        };
      });

      w.__swLootDone = true;
      post({ type: 'dest', dest: hit });
      w.__swLootReplace?.(hit);
    } catch (err) {
      w.__swLootRunning = false;
      post({ type: 'err', message: err instanceof Error ? err.message : String(err) });
    }
  };

  w.__swLootOnTc = (cap) => {
    void pierce(cap);
  };
  if (w.__swLootTc) void pierce(w.__swLootTc);
}
