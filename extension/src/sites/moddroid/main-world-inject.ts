import { canBypassHost } from '../../gate';
import { MODDROID_FILE_PAGE } from './hosts';
import { runModdroidReveal } from './main-world-hook';

const isFilePage = async (url: string): Promise<boolean> => {
  if (!URL.canParse(url)) return false;
  const u = new URL(url);
  if (!MODDROID_FILE_PAGE.test(u.pathname)) return false;
  return canBypassHost(u.hostname, 'moddroid');
};

export function initModdroidMainWorldInject(): void {
  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId !== 0) return;
    void isFilePage(details.url).then((ok) => {
      if (!ok) return;
      void chrome.scripting.executeScript({
        target: { tabId: details.tabId, frameIds: [0] },
        world: 'MAIN',
        injectImmediately: true,
        func: runModdroidReveal,
      });
    });
  });
}
