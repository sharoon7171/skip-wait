import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { initTipsguruCookieDest, TIPSGURU_GET_DEST } from './cookie-dest';
import {
  decodeProlinkDest,
  isTimedDestUrl,
  TIPSGURU_HOSTS,
  TIPSGURU_WAIT_MS,
} from './hosts';

export { initTipsguruCookieDest };

const OVERLAY_ID = 'skip-wait-tipsguru-overlay';
const WAIT_KEY = 'skip-wait-tipsguru-wait';
const FINAL_URL_RE = /"finalUrl"\s*:\s*"([^"]+)"/;
const COOKIE_RE = /(?:^|;\s*)(?:tipsguru|vidyays|mineverse360|mineverse)=([^;]+)/i;

type WaitState = { dest: string; endAt: number };

let started = false;

function decodeUriComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function unescapeJsonString(value: string): string {
  try {
    return JSON.parse(`"${value}"`) as string;
  } catch {
    return value.replace(/\\\//g, '/');
  }
}

function stopPageTimers(): void {
  const highest = window.setInterval(() => {}, 1e9);
  for (let i = 0; i <= highest; i++) window.clearInterval(i);
}

function destFromId(): string | null {
  if (!/\/prolink\.php\/?$/i.test(location.pathname)) return null;
  const id = new URLSearchParams(location.search).get('id');
  if (!id) return null;
  return decodeProlinkDest(decodeUriComponent(id));
}

function destFromFinalUrl(): string | null {
  const m = FINAL_URL_RE.exec(document.documentElement.innerHTML);
  if (!m?.[1]) return null;
  const dest = unescapeJsonString(m[1]).trim();
  return /^https?:\/\//i.test(dest) ? dest : null;
}

function destFromDocumentCookie(): string | null {
  const m = COOKIE_RE.exec(document.cookie);
  if (!m?.[1]) return null;
  return decodeProlinkDest(decodeUriComponent(m[1]));
}

function requestDestFromBackground(): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage({ type: TIPSGURU_GET_DEST }, (resp: { url?: string | null }) => {
        if (chrome.runtime.lastError) {
          resolve(null);
          return;
        }
        const url = typeof resp?.url === 'string' ? resp.url.trim() : '';
        resolve(url || null);
      });
    } catch {
      resolve(null);
    }
  });
}

async function resolveDest(): Promise<string | null> {
  for (let i = 0; i < 20; i++) {
    const local = destFromId() ?? destFromFinalUrl() ?? destFromDocumentCookie();
    if (local) return local;
    const fromBg = await requestDestFromBackground();
    if (fromBg) return fromBg;
    await new Promise((r) => setTimeout(r, 50));
  }
  return null;
}

function isOffsiteDest(href: string): boolean {
  try {
    return new URL(href).hostname.toLowerCase() !== location.hostname.toLowerCase();
  } catch {
    return false;
  }
}

function readWait(): WaitState | null {
  try {
    const raw = sessionStorage.getItem(WAIT_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as WaitState;
    if (!state?.dest || !isTimedDestUrl(state.dest) || typeof state.endAt !== 'number') {
      sessionStorage.removeItem(WAIT_KEY);
      return null;
    }
    return state;
  } catch {
    sessionStorage.removeItem(WAIT_KEY);
    return null;
  }
}

function waitOnHome(state: WaitState): void {
  stopPageTimers();

  const left = state.endAt - Date.now();
  if (left <= 0) {
    sessionStorage.removeItem(WAIT_KEY);
    location.replace(state.dest);
    return;
  }

  const ui = createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: {
      lead: 'Skip Wait is generating your access.',
      detail: 'Leave this tab open — no TipsGuru steps needed.',
    },
    status: 'Waiting for access window…',
    countdownLabel: 'Seconds left',
  });
  ui.startCountdown(state.endAt);

  window.setTimeout(() => {
    sessionStorage.removeItem(WAIT_KEY);
    ui.setStatus('Opening access…');
    location.replace(state.dest);
  }, left);
}

function startTimedWait(dest: string): void {
  if (started) return;
  started = true;
  stopPageTimers();
  const state: WaitState = { dest, endAt: Date.now() + TIPSGURU_WAIT_MS };
  sessionStorage.setItem(WAIT_KEY, JSON.stringify(state));
  createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: {
      lead: 'Skip Wait is generating your access.',
      detail: 'Starting wait…',
    },
    status: 'Starting wait…',
  });
  if (location.pathname === '/') {
    waitOnHome(state);
    return;
  }
  location.replace(`${location.origin}/`);
}

async function redirect(): Promise<void> {
  if (started) return;
  const dest = await resolveDest();
  if (!dest || !isOffsiteDest(dest)) return;
  if (isTimedDestUrl(dest)) {
    startTimedWait(dest);
    return;
  }
  started = true;
  stopPageTimers();
  createFullPageOverlay({
    id: OVERLAY_ID,
    brand: 'Skip Wait',
    note: {
      lead: 'Skip Wait found your destination.',
      detail: 'Opening now…',
    },
    status: 'Redirecting…',
  });
  location.replace(dest);
}

export function initTipsguruRedirect(): void {
  if (!isAllowedHost(TIPSGURU_HOSTS)) return;

  const pending = readWait();
  if (pending && location.pathname === '/') {
    started = true;
    waitOnHome(pending);
    return;
  }

  void redirect();
  whenDomParsed(() => {
    void redirect();
  });
}
