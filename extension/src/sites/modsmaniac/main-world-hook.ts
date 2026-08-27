type Flagged = Window & { __swModsmaniac?: boolean };

export function runModsmaniacReveal(): void {
  const w = window as Flagged;
  if (w.__swModsmaniac) return;
  w.__swModsmaniac = true;

  const brand = (): void => {
    if (document.getElementById('skipwait-modsmaniac-brand')) return;
    const box = document.querySelector('div#download');
    if (!box) return;
    const banner = document.createElement('p');
    banner.id = 'skipwait-modsmaniac-brand';
    banner.className = 'text-center text-muted mb-2';
    banner.setAttribute('role', 'status');
    const strong = document.createElement('strong');
    strong.textContent = 'Skip Wait';
    banner.append(strong, document.createTextNode(' — ~15s wait skipped; download is ready now.'));
    box.after(banner);
  };

  const hideChrome = (): void => {
    const notif = document.getElementById('notifx');
    const progress = document.getElementById('progress_new');
    const waitme = document.getElementsByClassName('waitme')[0] as HTMLElement | undefined;
    if (notif) notif.style.display = 'none';
    if (progress) progress.style.display = 'none';
    if (waitme) waitme.style.display = 'none';
  };

  const ensureButton = (): boolean => {
    if (document.getElementById('no-link')) return true;
    const apk = new URL(location.href).searchParams.get('urls');
    const progress = document.getElementById('progress_new');
    if (!apk || !progress) return false;

    const high = window.setInterval(() => {}, 1e6);
    for (let i = 1; i <= high; i++) window.clearInterval(i);

    const box = document.createElement('div');
    box.id = 'download';
    box.className = 'text-center mb-4';
    box.style.display = 'block';
    const a = document.createElement('a');
    a.id = 'no-link';
    a.className = 'btn btn-secondary px-5';
    a.href = apk;
    a.setAttribute('download', '');
    const span = document.createElement('span');
    span.className = 'align-middle';
    span.textContent = 'Download';
    a.append(span);
    box.append(a);
    const sib = progress.nextElementSibling;
    if (sib instanceof HTMLParagraphElement && !sib.id) sib.replaceWith(box);
    else progress.after(box);
    return true;
  };

  const nativeSI = window.setInterval.bind(window);
  window.setInterval = ((handler: TimerHandler, delay?: number, ...rest: unknown[]) => {
    if (
      delay === 900 &&
      typeof handler === 'function' &&
      document.getElementById('progress_new') &&
      document.getElementsByClassName('waitme')[0]
    ) {
      queueMicrotask(() => {
        for (let i = 0; i < 20; i++) {
          try {
            (handler as () => void)();
          } catch {
            break;
          }
        }
        brand();
      });
      return 0 as unknown as number;
    }
    return nativeSI(handler as TimerHandler, delay, ...(rest as []));
  }) as typeof setInterval;

  const reveal = (): boolean => {
    if (!document.getElementById('progress_new') && !document.getElementsByClassName('waitme')[0]) {
      return false;
    }
    if (!ensureButton()) return false;
    hideChrome();
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
