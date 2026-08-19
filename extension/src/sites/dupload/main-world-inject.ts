import { isDuploadFileUrl } from './hosts';

function runHold(): void {
  const w = window as Window & { __swDuploadHold?: boolean };
  if (w.__swDuploadHold) return;
  w.__swDuploadHold = true;
  const native = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function () {
    if (this.querySelector('input[name="op"][value="download2"]')) return;
    try {
      const h = new URL(this.action, location.href).hostname.toLowerCase();
      if (h !== location.hostname && h !== 'dupload.xyz' && !h.endsWith('.dupload.xyz')) return;
    } catch {}
    return native.call(this);
  };
}

export const initDuploadHoldNav = (): void => {
  chrome.webNavigation.onCommitted.addListener(({ frameId, tabId, url }) => {
    if (frameId !== 0) return;
    void (async () => {
      if (!(await isDuploadFileUrl(url))) return;
      void chrome.scripting.executeScript({
        target: { tabId, frameIds: [0] },
        world: 'MAIN',
        injectImmediately: true,
        func: runHold,
      });
    })();
  });
};
