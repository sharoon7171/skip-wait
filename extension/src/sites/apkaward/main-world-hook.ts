type Flagged = Window & { __swApkaward?: boolean };

export function runApkawardReveal(): void {
  const w = window as Flagged;
  if (w.__swApkaward) return;
  w.__swApkaward = true;

  let done = false;
  const reveal = (): void => {
    if (done) return;
    const container = document.getElementById('page-cdn-btns');
    if (!container?.classList.contains('counter-active')) return;
    done = true;
    container.classList.remove('counter-active');
    for (const el of container.querySelectorAll<HTMLElement>('.offcounter')) {
      el.style.removeProperty('display');
    }

    const banner = document.createElement('div');
    banner.id = 'skipwait-apkaward-brand';
    banner.className = 'noteccc';
    banner.setAttribute('role', 'status');
    const strong = document.createElement('strong');
    strong.textContent = 'Skip Wait';
    banner.append(strong, document.createTextNode(' 5-second timer skipped — download is ready now.'));
    container.before(banner);
  };

  const nativeSetInterval = window.setInterval.bind(window);
  window.setInterval = ((handler: TimerHandler, delay?: number, ...rest: unknown[]) => {
    if (
      delay === 1000 &&
      document.getElementById('page-cdn-btns')?.classList.contains('counter-active')
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
