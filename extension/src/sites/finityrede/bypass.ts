import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay, type FullPageOverlay } from '../../injected-ui/full-page-overlay';
import { buildFullPageOverlayCss, overlayActiveClass } from '../../injected-ui/overlay-styles';
import { FINITYREDE_SLUG_RE } from './hosts';

const OVERLAY_ID = 'skip-wait-finityrede-overlay';
const BOOT_STYLE_ID = 'skip-wait-finityrede-boot';
const NOTE = {
  lead: 'Hang tight — unlocking your link.',
  detail: "You don't need to tap anything on the page.",
} as const;

let ui: FullPageOverlay | null = null;
let started = false;

const boot = (): void => {
  const active = overlayActiveClass(OVERLAY_ID);
  document.documentElement.classList.add(active);
  if (document.getElementById(BOOT_STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = BOOT_STYLE_ID;
  s.textContent = buildFullPageOverlayCss(OVERLAY_ID, active);
  (document.head ?? document.documentElement).appendChild(s);
};

const mount = (status: string): FullPageOverlay => {
  boot();
  if (ui) {
    ui.setStatus(status);
    ui.setError(null);
    return ui;
  }
  ui = createFullPageOverlay({ id: OVERLAY_ID, brand: 'Skip Wait', note: NOTE, status });
  return ui;
};

const slug = (): string | null => {
  const parts = location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts[0] === 'r' && parts.length === 2 && FINITYREDE_SLUG_RE.test(parts[1]!)) return parts[1]!;
  if (parts[0] === 'captcha' && parts.length === 1) {
    const dest = new URLSearchParams(location.search).get('dest')?.trim() ?? '';
    return FINITYREDE_SLUG_RE.test(dest) ? dest : null;
  }
  return null;
};

const resolve = async (dest: string): Promise<string> => {
  const cfg = (await (await fetch(`${location.origin}/config.json`, { cache: 'no-store' })).json()) as {
    supabaseUrl: string;
    supabaseAnonKey: string;
  };
  const base = cfg.supabaseUrl.replace(/\/+$/, '');
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    apikey: cfg.supabaseAnonKey,
    Authorization: `Bearer ${cfg.supabaseAnonKey}`,
  };
  const final = (await (
    await fetch(`${base}/functions/v1/get-final-link?dest=${encodeURIComponent(dest)}`, { headers })
  ).json()) as {
    success: boolean;
    link: { id: string };
    captcha: { token: string; timestamp: number };
  };
  if (!final.success) throw new Error('final');
  const reg = (await (
    await fetch(`${base}/functions/v1/register-click`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        link_id: final.link.id,
        captcha_token: final.captcha.token,
        captcha_timestamp: final.captcha.timestamp,
        captcha_answer: 'correct',
        expected_answer: 'correct',
        fingerprint: {
          has_js: true,
          screen_resolution: `${screen.width}x${screen.height}`,
          has_interaction: true,
          webdriver: false,
          canvas_hash: 'sw',
          solve_time_ms: 2800,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          languages: [...navigator.languages],
          touch_support: navigator.maxTouchPoints > 0,
        },
      }),
    })
  ).json()) as { success: boolean; url_destino: string };
  if (!reg.success || !reg.url_destino) throw new Error('destino');
  return new URL(reg.url_destino).href;
};

export const initFinityredeBypass = (): void => {
  if (window !== window.top || started) return;
  const dest = slug();
  if (!dest) return;
  void canBypass('finityrede').then((ok) => {
    if (!ok || started) return;
    started = true;
    const overlay = mount('Unlocking destination…');
    void resolve(dest)
      .then((url) => {
        overlay.setStatus('Redirecting now…');
        recordBypassSuccess();
        location.replace(url);
      })
      .catch(() => {
        started = false;
        overlay.setError('Could not unlock this link. Reload and try again.');
      });
  });
};
