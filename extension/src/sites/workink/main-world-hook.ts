export function runWorkinkWsHooks(msgSource = 'skip-wait-workink'): void {
  const w = window as Window & {
    __swWorkinkWsHooked?: boolean;
    __swWorkinkWsProto?: boolean;
    __swWorkinkWs?: WebSocket | null;
    __swWorkinkForged?: boolean;
    __swWorkinkUnlock?: string | null;
  };

  const OUTER = 'FOyWLycLacw35PbZpwK8Q3N6ouw6PBQ2snZHMIDmXrUXoCUXv7XgOiVlrl9NMn2p';
  const INNER = 'FMEB197nNpP8ge1zElwAHAqufR3U7KZ4jIDqBPQzous0k5cUkjQ96994zIM0qSFd';

  type WsMsg = { type?: string; payload?: { url?: string } | string };
  type SwSocket = WebSocket & { __swWorkinkAttached?: boolean };

  const xorDecode = (hex: string, key: string): string => {
    const k = [...key].map((c) => c.charCodeAt(0) & 255);
    let x = Number.parseInt(hex.slice(0, 2), 16);
    const parts = hex.slice(2).match(/.{1,2}/g) ?? [];
    const out: number[] = [];
    for (const [i, part] of parts.entries()) {
      const b = Number.parseInt(part!, 16);
      out.push((((b - (i % 8) + 256) % 256) ^ k[(i * 2 + x) % k.length]!) & 255);
      x = (x * 19 + 29) % 256;
    }
    return new TextDecoder().decode(Uint8Array.from(out));
  };

  const xorEncode = (plain: string, key: string): string => {
    const k = [...key].map((c) => c.charCodeAt(0) & 255);
    const bytes = new TextEncoder().encode(plain);
    let x = Math.floor(Math.random() * 256);
    const out = [x.toString(16).padStart(2, '0')];
    for (const [i, byte] of bytes.entries()) {
      out.push((((byte! ^ k[(i * 2 + x) % k.length]!) + (i % 8)) % 256).toString(16).padStart(2, '0'));
      x = (x * 19 + 29) % 256;
    }
    return out.join('');
  };

  const decodeWs = (hex: string): WsMsg => {
    const msg = JSON.parse(xorDecode(hex, OUTER)) as WsMsg;
    if (typeof msg.payload === 'string' && /^[0-9a-f]+$/i.test(msg.payload)) {
      msg.payload = JSON.parse(xorDecode(msg.payload, INNER)) as { url?: string };
    }
    return msg;
  };

  const encodeWs = (type: string, payload: object): string =>
    xorEncode(JSON.stringify({ type, payload: xorEncode(JSON.stringify(payload), INNER) }), OUTER);

  const emit = (payload: Record<string, unknown>): void => {
    window.postMessage({ source: msgSource, ...payload }, location.origin);
  };

  const isWorkinkWs = (ws: WebSocket): boolean => {
    try {
      return String(ws.url).includes('/_api/v2/ws');
    } catch {
      return false;
    }
  };

  const forge = (): void => {
    const ws = w.__swWorkinkWs;
    if (w.__swWorkinkForged || w.__swWorkinkUnlock || !ws || ws.readyState !== 1) return;
    w.__swWorkinkForged = true;
    ws.send(encodeWs('c_premium_modal_done', {}));
    emit({ type: 'forged' });
  };

  const attach = (raw: WebSocket): void => {
    const ws = raw as SwSocket;
    if (!isWorkinkWs(ws)) return;
    w.__swWorkinkWs = ws;
    if (ws.readyState === 1) emit({ type: 'ready' });
    else ws.addEventListener('open', () => emit({ type: 'ready' }), { once: true });
    if (ws.__swWorkinkAttached) return;
    ws.__swWorkinkAttached = true;

    ws.addEventListener('message', (ev) => {
      if (typeof ev.data !== 'string') return;
      let decoded: WsMsg | null = null;
      try {
        decoded = decodeWs(ev.data);
      } catch {
        return;
      }
      if (!decoded?.type) return;
      if (decoded.type === 's_lkds') {
        const url = typeof decoded.payload === 'object' ? decoded.payload?.url : undefined;
        if (!url) return;
        w.__swWorkinkUnlock = url;
        emit({ type: 'unlock', url });
        return;
      }
      if (decoded.type === 's_tstc' || decoded.type === 's_sthc') {
        emit({ type: 'gate-start', gate: decoded.type });
        return;
      }
      if (decoded.type === 's_hcok' || decoded.type === 's_tsac') {
        emit({ type: 'gate-done', gate: decoded.type });
        if (decoded.type === 's_hcok') forge();
      }
    });
  };

  if (!w.__swWorkinkWsProto) {
    w.__swWorkinkWsProto = true;
    const protoSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (this: WebSocket, data: string | ArrayBufferLike | Blob | ArrayBufferView) {
      if (isWorkinkWs(this)) attach(this);
      return protoSend.call(this, data as string);
    };

    const protoAdd = WebSocket.prototype.addEventListener;
    WebSocket.prototype.addEventListener = function (
      this: WebSocket,
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) {
      if (type === 'message') attach(this);
      return protoAdd.call(this, type, listener, options);
    };

    const onMsg = Object.getOwnPropertyDescriptor(WebSocket.prototype, 'onmessage');
    if (onMsg?.set && onMsg.get) {
      const getOn = onMsg.get;
      const setOn = onMsg.set;
      Object.defineProperty(WebSocket.prototype, 'onmessage', {
        configurable: true,
        enumerable: !!onMsg.enumerable,
        get(this: WebSocket) {
          return getOn.call(this);
        },
        set(this: WebSocket, value: ((this: WebSocket, ev: MessageEvent) => unknown) | null) {
          attach(this);
          return setOn.call(this, value);
        },
      });
    }
  }

  if (!w.__swWorkinkWsHooked) {
    w.__swWorkinkWsHooked = true;
    w.__swWorkinkWs = w.__swWorkinkWs ?? null;
    w.__swWorkinkForged = false;
    w.__swWorkinkUnlock = null;

    const NativeWS = window.WebSocket;
    window.WebSocket = function (url: string | URL, protocols?: string | string[]) {
      const ws = protocols === undefined ? new NativeWS(url) : new NativeWS(url, protocols);
      if (String(url).includes('/_api/v2/ws')) attach(ws);
      return ws;
    } as unknown as typeof WebSocket;
    window.WebSocket.prototype = NativeWS.prototype;
    Object.assign(window.WebSocket, NativeWS);
    window.WebSocket.toString = () => 'function WebSocket() { [native code] }';

    const nativeOpen = window.open.bind(window);
    window.open = ((url?: string | URL, target?: string, features?: string) => {
      const href = String(url ?? '');
      if (w.__swWorkinkUnlock && href && (href === w.__swWorkinkUnlock || href.includes('outgoing.work.ink'))) {
        return null;
      }
      return nativeOpen(url, target, features);
    }) as typeof window.open;
  }

  if (w.__swWorkinkWs?.readyState === 1) emit({ type: 'ready' });
}
