type Flagged = Window & { __swApkvision?: boolean };

export function runApkvisionReveal(): void {
  const w = window as Flagged;
  if (w.__swApkvision) return;
  w.__swApkvision = true;

  let done = false;
  const reveal = (): void => {
    if (done) return;
    const loading = document.querySelector<HTMLElement>('.download-loading');
    const ready = document.querySelector<HTMLElement>('.download-ready');
    if (!loading || !ready) return;
    done = true;
    loading.style.display = 'none';
    ready.style.display = 'block';

    const banner = document.createElement('div');
    banner.id = 'skipwait-apkvision-brand';
    banner.className = 'b-dwn-spoiler__instruction';
    banner.setAttribute('role', 'status');
    const strong = document.createElement('strong');
    strong.textContent = 'Skip Wait';
    banner.append(strong, document.createTextNode(' 7-second timer skipped — download is ready now.'));
    ready.before(banner);
  };

  const nativeSetInterval = window.setInterval.bind(window);
  window.setInterval = ((handler: TimerHandler, delay?: number, ...rest: unknown[]) => {
    if (
      delay === 1000 &&
      document.querySelector('.download-loading') &&
      document.querySelector('.download-ready')
    ) {
      queueMicrotask(reveal);
      return 0 as unknown as ReturnType<typeof setInterval>;
    }
    return nativeSetInterval(handler, delay, ...rest);
  }) as typeof setInterval;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
}
