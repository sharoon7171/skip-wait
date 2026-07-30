import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';

const HOSTS = ['swiftuploads.com'] as const;
const FILE_PATH_RE = /^\/([^/]+)\/file\/?$/i;
const CUSTOM_UI =
  '.custom-download-button, .custom-download-section, #customDownloadBtn, #customDownloadBtn2, .custom-download-btn';
const FREE_UI =
  '.download-type.original-button button, #downloadSubmitBtn, #originalDownloadBtn, .original-download-btn';
const GENERATING = 'Generating...';
const BRAND_ID = 'skipwait-swiftuploads-brand';

type GenerateResponse = { download_link?: string; error?: string };
type PageKind = 'pick' | 'create' | 'download';

function fileId(): string | null {
  return location.pathname.match(FILE_PATH_RE)?.[1] ?? null;
}

function csrfToken(): string | null {
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content?.trim() ?? null;
}

function pageKind(): PageKind {
  if (document.getElementById('originalDownloadBtn')) return 'download';
  if (document.getElementById('down_2Form')) return 'create';
  return 'pick';
}

function setRqfCookie(id: string): void {
  const expires = new Date(Date.now() + 86_400_000).toUTCString();
  document.cookie = `rqf=${id}; expires=${expires}; path=/`;
}

async function postStepFast(fileUrl: string, step: string, token: string): Promise<void> {
  const res = await fetch(fileUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: new URLSearchParams({ _token: token, p: step, method: 'free' }).toString(),
  });
  await res.body?.cancel?.();
}

async function warmSession(id: string): Promise<void> {
  const token = csrfToken();
  if (!token) return;
  const fileUrl = `${location.origin}/${id}/file`;
  await postStepFast(fileUrl, 'down_1', token);
  await postStepFast(fileUrl, 'down_2', token);
}

async function fetchDownloadLink(id: string, token: string): Promise<string | null> {
  setRqfCookie(id);
  const res = await fetch(`${location.origin}/${id}/file/generate`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRF-TOKEN': token,
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const data = (await res.json().catch(() => null)) as GenerateResponse | null;
  return typeof data?.download_link === 'string' ? data.download_link : null;
}

async function resolveDirectUrl(id: string): Promise<string | null> {
  const token = csrfToken();
  if (!token) return null;
  await warmSession(id);
  return fetchDownloadLink(id, token);
}

function hideCustomUi(): void {
  for (const el of document.querySelectorAll<HTMLElement>(CUSTOM_UI)) {
    el.style.display = 'none';
  }
}

function mountBrand(): void {
  const box = document.querySelector('.download-section-box');
  if (!box || document.getElementById(BRAND_ID)) return;

  const banner = document.createElement('div');
  banner.id = BRAND_ID;
  banner.className = 'alert alert-secondary text-center mb-4';
  banner.setAttribute('role', 'status');

  const title = document.createElement('div');
  title.className = 'text-primary fw-bold mb-2';
  const icon = document.createElement('i');
  icon.className = 'fa fa-bolt me-1';
  title.append(icon, document.createTextNode('Skip Wait'));

  const detail = document.createElement('p');
  detail.className = 'mb-0 text-break';
  detail.textContent = 'Extra download steps bypassed — click Free Download for a direct link.';

  banner.append(title, detail);

  const heading = box.querySelector('h5');
  if (heading) box.insertBefore(banner, heading);
  else box.prepend(banner);
}

function revealFreeDownload(): void {
  mountBrand();
  hideCustomUi();

  const kind = pageKind();
  if (kind === 'pick') {
    const original = document.querySelector<HTMLElement>('.download-type.original-button');
    if (original) original.style.display = 'block';
    return;
  }

  if (kind === 'create') {
    const form = document.getElementById('down_2Form');
    if (form) form.style.display = 'block';
    const btn = document.querySelector<HTMLButtonElement>('#downloadSubmitBtn');
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('disabled');
    }
    return;
  }

  const link = document.getElementById('originalDownloadBtn');
  if (link) {
    link.style.display = 'inline-block';
    link.classList.remove('disabled');
  }
}

function freeControl(el: Element): HTMLElement | null {
  if (el.matches(FREE_UI)) return el as HTMLElement;
  return el.querySelector<HTMLElement>(FREE_UI);
}

function setGenerating(el: HTMLElement, active: boolean): void {
  if (active) {
    if (!el.dataset['skipwaitHtml']) el.dataset['skipwaitHtml'] = el.innerHTML;
    el.innerHTML = `<div class="spinner-border spinner-border-sm me-2"></div><span>${GENERATING}</span>`;
    if (el instanceof HTMLButtonElement) el.disabled = true;
    else el.classList.add('disabled');
    return;
  }

  if (el.dataset['skipwaitHtml']) el.innerHTML = el.dataset['skipwaitHtml'];
  if (el instanceof HTMLButtonElement) el.disabled = false;
  else el.classList.remove('disabled');
}

function wire(id: string): void {
  revealFreeDownload();

  let busy = false;

  const go = (e: Event): void => {
    if ((e.target as Element).closest(CUSTOM_UI)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    const trigger = (e.target as Element).closest(FREE_UI);
    if (!trigger || busy) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const control = freeControl(trigger);
    if (control) setGenerating(control, true);
    busy = true;

    void resolveDirectUrl(id)
      .then((url) => {
        if (url) location.assign(url);
      })
      .finally(() => {
        busy = false;
        if (control) setGenerating(control, false);
      });
  };

  document.addEventListener('click', go, true);
  document.addEventListener(
    'submit',
    (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.querySelector('input[name="p"][value="down_1"], input[name="p"][value="down_2"]')) return;
      go(e);
    },
    true,
  );

  const box = document.querySelector('.download-section-box');
  if (!box) return;
  new MutationObserver(revealFreeDownload).observe(box, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
}

export function initSwiftuploadsDirectDownload(): void {
  if (!isAllowedHost(HOSTS)) return;
  whenDomParsed(() => {
    const id = fileId();
    if (!id || !document.querySelector('.download-section')) return;
    wire(id);
  });
}
