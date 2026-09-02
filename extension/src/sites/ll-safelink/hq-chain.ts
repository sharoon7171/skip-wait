import { recordBypassSuccess } from '../../free-bypass';
import { canBypass } from '../../gate';
import { createFullPageOverlay } from '../../injected-ui/full-page-overlay';
import { whenDomParsed } from '../../utils/domain-check';
import { xxc } from './parse';

const ll = (h: string) => /var LLPayload = '([^']+)'/.exec(h)?.[1] ?? null;
const hq = (h: string) =>
  /name=['"]hq['"][^>]*value=['"]([^'"]+)['"]|value=['"]([^'"]+)['"][^>]*name=['"]hq['"]/i
    .exec(h)
    ?.slice(1)
    .find(Boolean) ?? null;
const action = (h: string) => /action=['"](https?:\/\/[^'"]+)['"]/i.exec(h)?.[1] ?? null;

const post = (url: string, body: Record<string, string>) =>
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body),
  }).then((r) => r.text());

function holdHqSubmit(): () => void {
  const proto = HTMLFormElement.prototype;
  const native = proto.submit;
  proto.submit = function () {
    if (this.querySelector('[name="hq"]')) return;
    return native.call(this);
  };
  return () => {
    proto.submit = native;
  };
}

async function unwrap(hw: string): Promise<string | null> {
  const hop = await post(`${location.origin}/`, { hw });
  const url = action(hop);
  const next = hq(hop);
  if (!url || !next) return null;
  await post(url, { hq: next });
  return xxc(await post(url, { hw: next }));
}

async function unlock(): Promise<string | null> {
  let token = hq(document.documentElement.innerHTML);
  if (!token && new URLSearchParams(location.search).has('ht')) {
    token = hq(await fetch(location.href, { credentials: 'include' }).then((r) => r.text()));
  }
  if (token) {
    await post(`${location.origin}/`, { hq: token });
    return unwrap(token);
  }
  const hw = ll(document.documentElement.innerHTML);
  if (!hw) return null;
  return (location.pathname.replace(/\/+$/, '') || '/') === '/'
    ? unwrap(hw)
    : xxc(await post(location.href, { hw }));
}

export function initLlSafelinkHqChain(): void {
  void canBypass('ll-safelink').then((ok) => {
    if (!ok) return;
    const ht = new URLSearchParams(location.search).has('ht');
    const release = ht ? holdHqSubmit() : null;
    const go = () => {
      const ui = createFullPageOverlay({
        id: 'skip-wait-ll-safelink-overlay',
        brand: 'Skip Wait',
        note: { lead: 'Unlocking your link.', detail: "You don't need to tap anything on the page." },
        status: 'Getting things ready…',
      });
      void unlock()
        .then((dest) => {
          if (dest) {
            ui.setStatus('Redirecting now…');
            recordBypassSuccess();
            location.replace(dest);
            return;
          }
          ui.remove();
        })
        .catch(() => ui.remove())
        .finally(() => release?.());
    };
    if (ht) go();
    else whenDomParsed(go);
  });
}
