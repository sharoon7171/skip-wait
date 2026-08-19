import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';

const ID = 'skip-wait-olamovies-link-banner';
const LOCK = 'sw-om-link-lock';
const LOCK_CTA = 'sw-om-link-lock-cta';
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Gen = { isFound?: boolean; shortener?: string; error?: string };
type Challenge = { ct: string; kind?: string; targetPos?: number };
type Phase = 'busy' | 'ok' | 'err';
type SetBanner = (s: string, d: string, phase?: Phase, pct?: number, href?: string) => void;

function linkId(): string | null {
  const id = location.pathname.replace(/^\/+|\/+$/g, '');
  return id && !id.includes('/') && !id.startsWith('api') && !id.startsWith('_next')
    ? id
    : null;
}

function fingerprint() {
  const n = navigator;
  const s = screen;
  let canvas: string | null = null;
  let webgl: { vendor: string; renderer: string } | null = null;
  try {
    const el = document.createElement('canvas');
    el.width = 200;
    el.height = 50;
    const c = el.getContext('2d');
    if (c) {
      c.textBaseline = 'top';
      c.font = "14px 'Arial'";
      c.fillStyle = '#f60';
      c.fillRect(0, 0, 200, 50);
      c.fillStyle = '#069';
      c.fillText('OmLinks captcha 👾', 2, 2);
      c.strokeStyle = 'rgba(102, 200, 0, 0.7)';
      c.beginPath();
      c.arc(50, 25, 18, 0, Math.PI * 2);
      c.stroke();
      const raw = el.toDataURL();
      let a = 0xcbf29ce484222325n;
      for (let i = 0; i < raw.length; i++) {
        a ^= BigInt(raw.charCodeAt(i));
        a = (1099511628211n * a) & 0xffffffffffffffffn;
      }
      canvas = a.toString(16).padStart(16, '0');
    }
  } catch {}
  try {
    const el = document.createElement('canvas');
    const gl = el.getContext('webgl') || el.getContext('experimental-webgl');
    const info = gl && (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (gl && info) {
      webgl = {
        vendor: (gl as WebGLRenderingContext).getParameter(info.UNMASKED_VENDOR_WEBGL) || '',
        renderer: (gl as WebGLRenderingContext).getParameter(info.UNMASKED_RENDERER_WEBGL) || '',
      };
    }
  } catch {}
  return {
    ua: n.userAgent || '',
    webdriver: !!n.webdriver,
    hc: n.hardwareConcurrency ?? 0,
    dm: (n as Navigator & { deviceMemory?: number }).deviceMemory ?? 0,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    tzOffset: new Date().getTimezoneOffset(),
    lang: n.language || '',
    langs: [...(n.languages || [])].slice(0, 5),
    platform: n.platform || '',
    touch: n.maxTouchPoints ?? 0,
    screen: { w: s.width || 0, h: s.height || 0, dpr: devicePixelRatio || 1 },
    plugins: n.plugins?.length ?? 0,
    cookieEnabled: !!n.cookieEnabled,
    canvas,
    webgl,
  };
}

function signals(kind: string, targetPos: number) {
  const fp = fingerprint();
  const hold = kind === 'hold';
  return {
    fingerprint: fp,
    trajectory: hold
      ? [
          [0, 512, 611],
          [1820, 0, 0],
        ]
      : [
          [0, 0, 40],
          [900, Math.round(300 * targetPos), 40],
        ],
    pointerType: 'mouse',
    buttons: 1,
    pressureSamples: [],
    pointerDownCount: 1,
    pointerUpCount: 1,
    inputEventCount: hold ? 0 : 2,
    startT: hold ? 650 : 400,
    endT: hold ? 2470 : 1300,
    keyEvents: [],
    visibilityChanges: [],
    focusEvents: 1,
    blurEvents: 0,
    mountToDragStartMs: hold ? 650 : 400,
    submitLatencyMs: hold ? 8 : 10,
  };
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const r = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    cache: 'no-store',
    body: JSON.stringify(body),
  });
  const data = (await r.json().catch(() => null)) as T | null;
  if (!r.ok || !data) throw new Error(`olamovies ${path}`);
  return data;
}

async function forgeVt(on: (s: string, d: string, pct: number) => void): Promise<string> {
  on('Preparing security check…', 'Skip Wait is getting a fresh check from the site.', 32);
  const ch = await postJson<Challenge>('/api/captcha/challenge', {});
  if (!ch.ct) throw new Error('olamovies captcha challenge');
  const kind = ch.kind || 'hold';
  for (let i = 1; i <= 4; i++) {
    on(
      kind === 'hold' ? 'Skipping hold check…' : 'Skipping slide check…',
      'Almost there — finishing the human check for you.',
      32 + i * 6,
    );
    await sleep(500);
  }
  on('Confirming you’re verified…', 'Skip Wait is unlocking the download button path.', 58);
  const targetPos = ch.targetPos ?? 0.5;
  const out = await postJson<{ ok?: boolean; vt?: string }>('/api/captcha/verify', {
    ct: ch.ct,
    signals: signals(kind, targetPos),
    finalPos: kind === 'hold' ? 0 : targetPos,
    honeypot: '',
  });
  if (!out.ok || !out.vt) throw new Error('olamovies captcha verify');
  return out.vt;
}

async function generate(id: string, vt?: string) {
  const r = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(vt ? { id, vt } : { id }),
  });
  return { status: r.status, body: (await r.json().catch(() => ({}))) as Gen };
}

function lockCaptchaUi(): void {
  document.documentElement.classList.add(LOCK);
  for (const el of document.querySelectorAll<HTMLElement>(
    '.cc-card, .cc-hold-target, .cc-hold-core, [data-cc], [role="slider"][data-cc-d]',
  )) {
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('tabindex', '-1');
  }
}

function lockVisitUi(): void {
  document.documentElement.classList.add(LOCK_CTA);
  for (const el of document.querySelectorAll<HTMLElement>('.visit-btn')) {
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('tabindex', '-1');
    if (el instanceof HTMLButtonElement) el.disabled = true;
  }
}

function banner(): SetBanner {
  let root = document.getElementById(ID) as HTMLElement | null;
  if (!document.getElementById(`${ID}-css`)) {
    const css = document.createElement('style');
    css.id = `${ID}-css`;
    css.textContent = `html.${LOCK} .cc-card,html.${LOCK} .cc-hold-target,html.${LOCK} [data-cc],html.${LOCK} [role="slider"][data-cc-d]{pointer-events:none!important;opacity:.38!important;filter:grayscale(.35);user-select:none!important;cursor:not-allowed!important}html.${LOCK_CTA} .visit-btn{pointer-events:none!important;opacity:.38!important;filter:grayscale(.35);user-select:none!important;cursor:not-allowed!important;box-shadow:none!important}#${ID}{display:flex;gap:12px;align-items:flex-start;box-sizing:border-box;width:100%;margin:0 0 24px;padding:14px 16px;text-align:left;border-radius:14px;border:1px solid var(--om-border,rgba(255,255,255,.12));background:var(--om-bg-card,rgba(255,255,255,.04));color:var(--om-text,#e8eaed);font:inherit;position:relative;z-index:5}#${ID} .m{flex:0 0 auto;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--om-accent,#6ea8fe) 18%,transparent);color:var(--om-accent,#6ea8fe)}#${ID}[data-phase=busy] .m svg{animation:sw-spin .85s linear infinite}#${ID} .b{min-width:0;flex:1}#${ID} .k{margin:0 0 4px;font:700 12px/1.2 inherit;letter-spacing:.04em;text-transform:uppercase;color:var(--om-accent,#6ea8fe)}#${ID} .s{margin:0;font:650 14.5px/1.35 inherit;letter-spacing:-.01em}#${ID} .d{margin:5px 0 0;font:12.5px/1.45 inherit;color:var(--om-text-subtle,var(--om-text-muted,rgba(232,234,237,.68)));word-break:break-word}#${ID} .d a.go{display:inline-block;margin-top:2px;color:var(--om-accent,#6ea8fe);font-weight:650;text-decoration:underline;text-underline-offset:3px;word-break:break-all}#${ID} .bar{margin-top:10px;height:3px;border-radius:99px;background:color-mix(in srgb,var(--om-border,rgba(255,255,255,.12)) 80%,transparent);overflow:hidden}#${ID} .bar>i{display:block;height:100%;width:var(--sw-p,8%);border-radius:inherit;background:var(--om-accent,#6ea8fe);transition:width .35s ease}#${ID}[data-phase=err]{border-color:color-mix(in srgb,#f87171 40%,var(--om-border,transparent))}#${ID}[data-phase=err] .m,#${ID}[data-phase=err] .k{color:#f87171;background:rgba(248,113,113,.1)}#${ID}[data-phase=err] .bar>i{background:#f87171}#${ID}[data-phase=ok] .m,#${ID}[data-phase=ok] .k{color:#34d399;background:rgba(52,211,153,.12)}#${ID}[data-phase=ok] .bar>i{background:#34d399}#${ID}[data-phase=ok] .bar{opacity:.55}@keyframes sw-spin{to{transform:rotate(360deg)}}@media(max-width:520px){#${ID}{margin-bottom:20px;padding:12px 14px;gap:10px;border-radius:12px}#${ID} .m{width:30px;height:30px;border-radius:9px}#${ID} .s{font-size:14px}}`;
    (document.head || document.documentElement).append(css);
  }
  if (!root) {
    root = document.createElement('aside');
    root.id = ID;
    root.setAttribute('role', 'status');
    root.setAttribute('aria-live', 'polite');
    root.innerHTML =
      '<div class="m" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div><div class="b"><p class="k">Skip Wait</p><p class="s"></p><p class="d"></p><div class="bar" aria-hidden="true"><i></i></div></div>';
  }
  const mark = root.querySelector('.m')!;
  const status = root.querySelector('.s')!;
  const detail = root.querySelector('.d')!;
  const bar = root.querySelector('.bar > i') as HTMLElement;
  const bolt =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
  const spin =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

  const place = () => {
    lockCaptchaUi();
    if (document.documentElement.classList.contains(LOCK_CTA)) lockVisitUi();
    const col = document.querySelector('main .relative.z-2');
    if (!col) return;
    const captcha = [...col.children].find((el) => el.querySelector('.cc-card'));
    const h1 = col.querySelector(':scope > h1');
    if (captcha) {
      if (root.nextElementSibling !== captcha) captcha.before(root);
      return;
    }
    if (h1) {
      if (root.previousElementSibling !== h1) h1.after(root);
      return;
    }
    if (root.parentElement !== col) col.prepend(root);
  };

  place();
  const mo = new MutationObserver(place);
  mo.observe(document.documentElement, { childList: true, subtree: true });

  return (s, d, phase = 'busy', pct = 12, href) => {
    place();
    status.textContent = s;
    root.dataset['phase'] = phase;
    bar.style.setProperty('--sw-p', `${Math.max(4, Math.min(100, pct))}%`);
    mark.innerHTML = phase === 'busy' ? spin : bolt;
    detail.replaceChildren();
    if (href) {
      const a = document.createElement('a');
      a.className = 'go';
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = href.replace(/^https?:\/\//, '');
      detail.append(a);
    } else {
      detail.textContent = d;
    }
  };
}

function showLink(set: SetBanner, url: string): void {
  lockVisitUi();
  set('Your link is ready', 'Tap the link below to continue.', 'ok', 100, url);
}

async function unlock(set: SetBanner): Promise<void> {
  const id = linkId();
  if (!id) {
    set('Nothing to unlock here', 'Open a movie download link from OlaMovies first.', 'err', 100);
    return;
  }
  set('Checking if you’re signed in…', 'Skip Wait only works after you log in on this page.', 'busy', 18);
  const probe = await generate(id);
  if (probe.status === 401 || probe.body.error === 'Unauthorized') {
    set(
      'Please sign in first',
      'Tap Login to Continue below, finish sign-in, then come back to this page.',
      'err',
      100,
    );
    return;
  }
  lockVisitUi();
  if (probe.body.isFound && probe.body.shortener) {
    showLink(set, probe.body.shortener);
    return;
  }
  if (probe.body.error && probe.body.error !== 'captcha_required') {
    set('Couldn’t create your link', 'Something went wrong. Refresh and try again.', 'err', 100);
    return;
  }
  const vt = await forgeVt((s, d, pct) => set(s, d, 'busy', pct));
  set('Creating your download link…', 'Skip Wait is fetching the shortener destination.', 'busy', 78);
  const out = await generate(id, vt);
  if (!out.body.isFound || !out.body.shortener) {
    set('Couldn’t create your link', 'Refresh the page and try again in a moment.', 'err', 100);
    return;
  }
  showLink(set, out.body.shortener);
}

export function initOlamoviesLinkGenerate(): void {
  void isRemoteSite('olamovies-link').then((ok) => {
    if (!ok) return;
    whenDomParsed(() => {
      const set = banner();
      set('Working on your link…', 'Skip Wait is bypassing the wait on this page.', 'busy', 8);
      void unlock(set).catch(() =>
        set('Something went wrong', 'Sign in if needed, then refresh and try again.', 'err', 100),
      );
    });
  });
}
