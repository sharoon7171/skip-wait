import { isRemoteSite } from '../../hosts/check';

const GATE_RE = /^\/a\/([^/]+)\/?$/i;
const TIP_ID = 'skipwait-keyforge-tip';

const gateId = (): string | null => {
  const m = GATE_RE.exec(location.pathname);
  const id = m?.[1] ? decodeURIComponent(m[1]).trim() : '';
  return id || null;
};

const cardRoot = (): Element | null =>
  document.querySelector('.ad-gate-card') ||
  document.querySelector('.ad-provider-choice')?.parentElement ||
  null;

const mountTip = (): void => {
  if (document.getElementById(TIP_ID) || !document.body) return;
  const card = cardRoot();
  if (!card) return;

  const tip = document.createElement('div');
  tip.id = TIP_ID;
  tip.setAttribute('role', 'status');
  tip.style.cssText = [
    'box-sizing:border-box',
    'width:100%',
    'max-width:100%',
    'margin:0 0 12px',
    'padding:10px 12px',
    'border-radius:12px',
    'border:1px solid rgba(167,139,250,.35)',
    'background:rgba(167,139,250,.12)',
    'color:#f5f3ff',
    'font:13px/1.45 Nunito,system-ui,sans-serif',
  ].join(';');
  tip.innerHTML =
    '<strong style="display:block;margin:0 0 4px;color:#c4b5fd">Skip Wait</strong>' +
    'Linkvertise can take up to <strong>1 hour</strong> on some IPs — use <strong>BoostyLink</strong> instead, finish their steps, then return here and press Verify.';

  card.prepend(tip);
};

const pickBoostylink = (): void => {
  const boosty = [...document.querySelectorAll<HTMLButtonElement>('.ad-provider-choice')].find(
    (el) => /boostylink/i.test(el.textContent || ''),
  );
  if (!boosty) return;
  if (!boosty.classList.contains('is-active') && boosty.getAttribute('aria-pressed') !== 'true') {
    boosty.click();
  }
};

const tick = (): void => {
  if (!gateId()) return;
  mountTip();
  pickBoostylink();
};

const safeTick = (): void => {
  try {
    tick();
  } catch {}
};

export function initKeyforgeGate(): void {
  if (window !== window.top || !gateId()) return;
  void isRemoteSite('keyforge').then((ok) => {
    if (!ok) return;
    new MutationObserver(safeTick).observe(document.documentElement, { childList: true, subtree: true });
    safeTick();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeTick, true);
    window.addEventListener('load', safeTick, true);
  });
}
