export function runStreamerviewerbotTrialHook(): void {
  type SvbWin = Window & { __swSvbTrial?: boolean };
  const w = window as SvbWin;
  if (w.__swSvbTrial) return;
  w.__swSvbTrial = true;

  const BRAND = 'skipwait-svb-brand';
  const native = window.setInterval.bind(window);

  window.setInterval = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
    if (timeout === 1000 && typeof handler === 'function') {
      if (Function.prototype.toString.call(handler).includes('timeLeft')) {
        queueMicrotask(() => {
          for (let i = 0; i < 241; i++) (handler as () => void)();
        });
        return native(() => {}, 1e9);
      }
    }
    return native(handler, timeout, ...args);
  }) as typeof setInterval;

  const mountBrand = (): void => {
    if (document.getElementById(BRAND)) return;
    const anchor = document.querySelector('.submit-wrapper');
    if (!anchor) return;
    const el = Object.assign(document.createElement('div'), {
      id: BRAND,
      innerHTML:
        '<strong style="display:block;font-size:13px;font-weight:700;margin-bottom:2px">Skip Wait</strong>' +
        '<span style="font-size:12px;font-weight:500;line-height:1.45">Preparing timer skipped — complete reCAPTCHA and start your free trial.</span>',
    });
    el.setAttribute('role', 'status');
    el.style.cssText =
      'text-align:center;margin:0 0 12px;padding:10px 14px;box-sizing:border-box;width:100%;' +
      'border-radius:8px;background:#e8f0ff;border:1px solid #0057ff;' +
      'font:12px/1.45 Inter,system-ui,sans-serif;color:#003399';
    anchor.before(el);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountBrand, { once: true });
  } else {
    mountBrand();
  }
}
