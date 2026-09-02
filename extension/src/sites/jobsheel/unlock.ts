import { linksGoFormFromHtml, postLinksGo, revealTimerLinks } from '../adlinkfly/unlock';
import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { babylinksAliasFromPath } from './hosts';
import { createOverlay, spoofVisibility } from './overlay';

const mount = createOverlay('skip-wait-jobsheel-babylinks', 'skip-wait-jobsheel-babylinks-boot');
const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
let done = false;

function hasForm(): boolean {
  return !!document.querySelector('#go-link input[name="ad_form_data"], form[action*="/links/go"]');
}

function continueForm(): HTMLFormElement | null {
  const byId = document.querySelector<HTMLFormElement>('#form-continue');
  if (byId) return byId;
  const action = document.querySelector<HTMLInputElement>(
    'form input[name="action"][value="continue"]',
  );
  const form = action?.form ?? null;
  if (!form || form.id === 'link-view') return null;
  return form;
}

function counterSec(html: string): number {
  const m = html.match(/["']counter_value["']\s*:\s*["']?(\d+)/);
  if (m?.[1]) return Math.max(0, parseInt(m[1], 10));
  const n = parseInt(
    document.querySelector('#timer, #countdown, .timer, #counter')?.textContent?.trim() ?? '',
    10,
  );
  return Number.isFinite(n) && n > 0 ? n : 0;
}

async function postContinue(form: HTMLFormElement): Promise<string | null> {
  const body = new URLSearchParams();
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    'input[name], textarea[name]',
  )) {
    body.append(el.name, el.value);
  }
  try {
    const res = await fetch(location.href, {
      method: 'POST',
      body,
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

async function resolveUrl(html: string, overlay: ReturnType<typeof mount>): Promise<string | null> {
  const form = linksGoFormFromHtml(html, location.href);
  if (!form) return null;

  overlay.setStatus('Unlocking…');
  let url = await postLinksGo(form, location.href);
  if (url) return url;

  const sec = counterSec(html);
  if (sec <= 0) {
    revealTimerLinks();
    const link = document.querySelector<HTMLAnchorElement>('a.get-link, #gt-link');
    return link?.href?.startsWith('http') ? link.href : null;
  }

  spoofVisibility();
  overlay.setStatus('Waiting…');
  overlay.startCountdown(Date.now() + sec * 1000);
  await sleep(sec * 1000 + 500);
  overlay.hideCountdown();
  overlay.setStatus('Unlocking…');

  url = await postLinksGo(form, location.href);
  if (url) return url;
  const endAt = Date.now() + 3000;
  while (!url && Date.now() < endAt) {
    revealTimerLinks();
    url = await postLinksGo(form, location.href);
    if (url) break;
    await sleep(200);
  }
  if (url) return url;
  const link = document.querySelector<HTMLAnchorElement>('a.get-link, #gt-link');
  return link?.href?.startsWith('http') ? link.href : null;
}

async function unlock(): Promise<void> {
  if (done) return;
  done = true;
  spoofVisibility();
  document.cookie = 'ab=1; path=/';
  const overlay = mount('Unlocking…');

  let html = document.documentElement.outerHTML;
  const cont = continueForm();
  if (cont) {
    overlay.setStatus('Skipping continue…');
    const next = await postContinue(cont);
    if (!next) {
      overlay.setError('Could not unlock.');
      return;
    }
    html = next;
  }

  const url = await resolveUrl(html, overlay);
  if (!url) {
    overlay.setError('Could not unlock.');
    return;
  }
  overlay.setStatus('Opening…');
  recordBypassSuccess();
  location.replace(url);
}

function run(): void {
  if (done) return;
  if (!babylinksAliasFromPath(location.pathname)) return;
  if (!hasForm() && !continueForm()) {
    if (document.readyState !== 'loading') mount('Waiting for unlock…');
    return;
  }
  void unlock();
}

export function initJobsheelBabylinksUnlock(): void {
  if (window !== window.top) return;
  if (!babylinksAliasFromPath(location.pathname)) return;
  void canBypass('jobsheel-babylinks').then((ok) => {
    if (!ok) return;
    mount('Unlocking…');
    run();
    if (done) return;
    const observer = new MutationObserver(() => {
      run();
      if (done) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, true);
    }
  });
}
