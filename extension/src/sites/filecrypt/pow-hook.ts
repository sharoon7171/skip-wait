type SigApi = {
  start?: () => void;
  recordPointer?: (e: Event) => void;
  recordClick?: (e: Event) => void;
  collect?: () => string;
};

export function runFilecryptPowBypass(): void {
  const w = window as Window & { __swFcPow?: boolean };
  if (w.__swFcPow) return;
  w.__swFcPow = true;

  const signalDone = (): void => {
    w.__swFcPow = false;
    window.postMessage({ source: 'skip-wait-filecrypt', type: 'done' }, location.origin);
  };

  const fail = (): void => {
    w.__swFcPow = false;
    window.postMessage({ source: 'skip-wait-filecrypt', type: 'err' }, location.origin);
  };

  const status = (text: string): void => {
    window.postMessage({ source: 'skip-wait-filecrypt', type: 'status', text }, location.origin);
  };

  const pageState = (): 'pow' | 'open' | 'pending' => {
    if (document.getElementById('pow-captcha')) return 'pow';
    if (
      document.querySelector(
        'a.button.download, a[href*="/Link/"], .window.container, .dlcdownload, .cnl',
      )
    ) {
      return 'open';
    }
    return 'pending';
  };

  const whenPowEl = (): Promise<HTMLElement | null> =>
    new Promise((resolve) => {
      const snap = pageState();
      if (snap === 'pow') {
        resolve(document.getElementById('pow-captcha'));
        return;
      }
      if (snap === 'open') {
        resolve(null);
        return;
      }
      const mo = new MutationObserver(() => {
        const next = pageState();
        if (next === 'pending') return;
        mo.disconnect();
        resolve(next === 'pow' ? document.getElementById('pow-captcha') : null);
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    });

  const loadMod = new Function(
    'u',
    'return import(u)',
  ) as (u: string) => Promise<Record<string, unknown>>;

  const workerSource = `
const W = new Int32Array(80);
const block = new Uint8Array(64);

function sha1ok(difficulty) {
  let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
  for (let i = 0; i < 16; i++) {
    const j = i << 2;
    W[i] = (block[j] << 24) | (block[j + 1] << 16) | (block[j + 2] << 8) | block[j + 3];
  }
  for (let i = 16; i < 80; i++) {
    const v = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
    W[i] = (v << 1) | (v >>> 31);
  }
  let a = h0, b = h1, c = h2, d = h3, e = h4;
  for (let i = 0; i < 20; i++) {
    const t = (((a << 5) | (a >>> 27)) + ((b & c) | (~b & d)) + e + 0x5A827999 + W[i]) | 0;
    e = d; d = c; c = ((b << 30) | (b >>> 2)) | 0; b = a; a = t;
  }
  for (let i = 20; i < 40; i++) {
    const t = (((a << 5) | (a >>> 27)) + (b ^ c ^ d) + e + 0x6ED9EBA1 + W[i]) | 0;
    e = d; d = c; c = ((b << 30) | (b >>> 2)) | 0; b = a; a = t;
  }
  for (let i = 40; i < 60; i++) {
    const t = (((a << 5) | (a >>> 27)) + ((b & c) | (b & d) | (c & d)) + e + 0x8F1BBCDC + W[i]) | 0;
    e = d; d = c; c = ((b << 30) | (b >>> 2)) | 0; b = a; a = t;
  }
  for (let i = 60; i < 80; i++) {
    const t = (((a << 5) | (a >>> 27)) + (b ^ c ^ d) + e + 0xCA62C1D6 + W[i]) | 0;
    e = d; d = c; c = ((b << 30) | (b >>> 2)) | 0; b = a; a = t;
  }
  const u = ((h0 + a) | 0) >>> 0;
  return difficulty >= 32 ? u === 0 : u < (1 << (32 - difficulty));
}

function digitsOf(n) {
  if (n < 10) return 1;
  if (n < 100) return 2;
  if (n < 1000) return 3;
  if (n < 10000) return 4;
  if (n < 100000) return 5;
  if (n < 1000000) return 6;
  if (n < 10000000) return 7;
  if (n < 100000000) return 8;
  if (n < 1000000000) return 9;
  return 10;
}

function writeNonce(off, n, digits) {
  let x = n;
  for (let i = digits - 1; i >= 0; i--) {
    block[off + i] = 48 + (x % 10);
    x = (x / 10) | 0;
  }
}

function prepareBand(prefix, digits) {
  const msgLen = prefix.length + digits;
  block.fill(0);
  block.set(prefix, 0);
  block[msgLen] = 0x80;
  const bitLen = msgLen << 3;
  block[60] = (bitLen >>> 24) & 0xff;
  block[61] = (bitLen >>> 16) & 0xff;
  block[62] = (bitLen >>> 8) & 0xff;
  block[63] = bitLen & 0xff;
  return msgLen;
}

self.onmessage = (ev) => {
  const { challenge, difficulty, start, step } = ev.data;
  const prefix = new Uint8Array(String(challenge).length + 1);
  for (let i = 0; i < String(challenge).length; i++) prefix[i] = String(challenge).charCodeAt(i);
  prefix[prefix.length - 1] = 58;
  const t0 = performance.now();
  let nonce = start | 0;
  const stride = step | 1;
  let n = 0;
  let digits = digitsOf(nonce);
  let bandEnd = 10 ** digits;
  prepareBand(prefix, digits);
  const pLen = prefix.length;
  for (;;) {
    while (nonce >= bandEnd) {
      digits++;
      bandEnd *= 10;
      prepareBand(prefix, digits);
    }
    writeNonce(pLen, nonce, digits);
    if (sha1ok(difficulty)) {
      self.postMessage({ type: 'done', nonce, ms: Math.round(performance.now() - t0) });
      return;
    }
    nonce += stride;
    n++;
    if ((n & 0x3ffff) === 0) self.postMessage({ type: 'tick', delta: 0x40000 });
  }
};
`;

  const parallelSolve = (
    challenge: string,
    difficulty: number,
  ): Promise<{ nonce: number; ms: number }> =>
    new Promise((resolve, reject) => {
      const hwc = navigator.hardwareConcurrency || 4;
      const cores = Math.max(2, Math.min(hwc * 2, 32));
      const blob = new Blob([workerSource], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const workers: Worker[] = [];
      let settled = false;
      let tried = 0;
      const t0 = performance.now();
      const expected = Math.pow(2, Math.max(0, difficulty - 1));

      const cleanup = () => {
        for (const worker of workers) {
          try {
            worker.terminate();
          } catch {}
        }
        URL.revokeObjectURL(url);
      };

      const onDone = (nonce: number) => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve({ nonce, ms: Math.round(performance.now() - t0) });
      };

      try {
        for (let i = 0; i < cores; i++) {
          const worker = new Worker(url);
          workers.push(worker);
          worker.onmessage = (ev) => {
            const d = ev.data as { type?: string; nonce?: number; delta?: number };
            if (d?.type === 'tick') {
              tried += d.delta || 0;
              const pct = Math.min(99, Math.round((1 - Math.exp(-tried / expected)) * 100));
              status(`Almost there… ${pct}%`);
              return;
            }
            if (d?.type === 'done' && d.nonce !== undefined) onDone(d.nonce);
          };
          worker.onerror = () => {
            if (settled) return;
            settled = true;
            cleanup();
            reject(new Error('pow worker'));
          };
          worker.postMessage({ challenge, difficulty, start: i, step: cores });
        }
      } catch (e) {
        cleanup();
        reject(e);
      }
    });

  const yNonce = (): string => {
    try {
      const a = new Uint32Array(2);
      crypto.getRandomValues(a);
      return a[0]!.toString(36) + a[1]!.toString(36);
    } catch {
      return String(Date.now()) + Math.random().toString(36).slice(2);
    }
  };

  const fetchCid = async (bases: string[], yn: string): Promise<string> => {
    const results = await Promise.all(
      bases.map(async (base) => {
        const u = base + (base.includes('?') ? '&' : '?') + 't=' + yn;
        try {
          const r = await fetch(u, { cache: 'no-store', mode: 'cors' });
          if (!r.ok) return '';
          const j = (await r.json()) as { cid?: string };
          return j?.cid || '';
        } catch {
          return '';
        }
      }),
    );
    return results.find(Boolean) || '';
  };

  const run = async (): Promise<void> => {
    const el = await whenPowEl();
    if (!el) {
      signalDone();
      return;
    }

    const sessionUrl = el.getAttribute('data-session');
    const xUrl = el.getAttribute('data-ext');
    const sigUrl = el.getAttribute('data-sig');
    const yUrls = (el.getAttribute('data-px') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!sessionUrl || !xUrl || !sigUrl) {
      fail();
      return;
    }

    const form =
      (el.closest('form') as HTMLFormElement | null) ||
      (document.getElementById('cform') as HTMLFormElement | null);
    if (!form) {
      fail();
      return;
    }

    status('Checking the page…');
    const yn = yNonce();
    const modsP = Promise.all([loadMod(xUrl), loadMod(sigUrl)]);
    const cidP = fetchCid(yUrls, yn);
    const [cid, [xMod, sigMod]] = await Promise.all([cidP, modsP]);
    const R = xMod['R'] as (() => Promise<string>) | undefined;
    const sig = sigMod['S'] as SigApi | undefined;
    if (!R || !sig) {
      fail();
      return;
    }
    try {
      sig.start?.();
    } catch {}

    const powXP = R().catch(() => '');
    const body = new URLSearchParams({
      pow_x: '',
      pow_y: cid,
      pow_yn: yn,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
    });
    const sj = (await (
      await fetch(sessionUrl, { method: 'POST', cache: 'no-store', body })
    ).json()) as {
      challenge?: { id?: string; challenge?: string; difficulty?: number | string };
    };
    const c = sj.challenge;
    if (!c?.id || !c?.challenge || c.difficulty === undefined) {
      fail();
      return;
    }

    const difficulty = parseInt(String(c.difficulty), 10);
    status('Skipping the security check…');
    const solveP = parallelSolve(String(c.challenge), difficulty);
    const [solved, powX] = await Promise.all([solveP, powXP]);

    const box = el.querySelector('.pow-captcha__box');
    if (box) {
      const rect = box.getBoundingClientRect();
      const x = rect.left + Math.max(4, rect.width * 0.2);
      const y = rect.top + Math.max(4, rect.height * 0.5);
      try {
        sig.recordPointer?.(
          new PointerEvent('pointerdown', {
            bubbles: true,
            clientX: x,
            clientY: y,
            pointerId: 1,
            pointerType: 'mouse',
            isPrimary: true,
          }),
        );
        sig.recordClick?.(new MouseEvent('click', { bubbles: true, clientX: x, clientY: y }));
      } catch {}
    }

    let powData = '';
    try {
      powData = sig.collect?.() || '';
    } catch {}

    const set = (name: string, value: string) => {
      const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      if (input) input.value = value;
    };
    set('pow_id', c.id);
    set('pow_nonce', String(solved.nonce));
    set('pow_elapsed', String(solved.ms));
    set('pow_pauses', '0');
    set('pow_data', powData);
    set('pow_x', powX || '');

    status('Opening downloads…');
    if (typeof form.requestSubmit === 'function') form.requestSubmit();
    else form.submit();
  };

  void run().catch(fail);
}
