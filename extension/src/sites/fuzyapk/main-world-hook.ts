type W = Window & {
  __swFuzyapk?: boolean;
  fuzy_lang?: string;
  fuzy_file_size?: string;
  fuzy_real_download?: string;
};

export function runFuzyapkReveal(): void {
  const w = window as W;
  if (w.__swFuzyapk) return;
  w.__swFuzyapk = true;

  Object.defineProperty(w, 'fuzy_smartlink_url', {
    configurable: true,
    enumerable: true,
    get: () => '',
    set: () => {},
  });

  let done = false;
  const reveal = (): void => {
    if (done || !/\/download\/\d+\/?$/i.test(location.pathname)) return;
    const btn = document.getElementById('fuzy-real-download');
    const text = btn?.querySelector<HTMLElement>('.fuzy-download-text');
    const wrap = document.getElementById('fuzy-download-btn-wrap');
    if (!btn || !text || !wrap) return;
    done = true;

    const size = w.fuzy_file_size || '0MB';
    const dl = w.fuzy_real_download;
    btn.classList.remove('loading', 'disabled');
    text.innerText = w.fuzy_lang === 'vi' ? `Tải xuống (${size})` : `Download (${size})`;
    btn.onclick = (e: MouseEvent) => {
      e.preventDefault();
      if (dl) location.href = dl;
    };

    const banner = document.createElement('div');
    banner.id = 'skipwait-fuzyapk-brand';
    banner.className = 'fuzy-download-notice';
    banner.setAttribute('role', 'status');
    const strong = document.createElement('strong');
    strong.textContent = 'Skip Wait';
    banner.append(strong, document.createTextNode(' 10-second timer skipped — download is ready now.'));
    wrap.after(banner);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(reveal, 0), { once: true });
  } else {
    setTimeout(reveal, 0);
  }
}
