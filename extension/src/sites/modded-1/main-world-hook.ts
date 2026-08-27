type Flagged = Window & { __swModded1?: boolean };

export function runModded1Reveal(): void {
  const w = window as Flagged;
  if (w.__swModded1) return;
  w.__swModded1 = true;

  const brand = (): void => {
    if (document.getElementById('skipwait-modded1-brand')) return;
    const dl = document.getElementById('download');
    if (!dl) return;
    const banner = document.createElement('div');
    banner.id = 'skipwait-modded1-brand';
    banner.className = 'super-container';
    banner.setAttribute('role', 'status');
    const title = document.createElement('div');
    title.className = 'super-container-title';
    title.textContent = 'Skip Wait';
    const copy = document.createElement('p');
    copy.textContent = '4-second loading skipped — download is ready now.';
    banner.append(title, copy);
    dl.after(banner);
  };

  const reveal = (): boolean => {
    const dl = document.getElementById('download');
    const loading = document.getElementById('download-loading');
    if (!dl || !loading) return false;
    loading.style.display = 'none';
    dl.style.display = 'block';
    brand();
    return true;
  };

  if (reveal()) return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      reveal();
    }, { once: true });
  }
}
