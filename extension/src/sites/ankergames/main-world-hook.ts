type DownloadPage = Record<string, unknown> & { initiateDownload: () => Promise<void> };
type AlpineData = (name: string, factory: (...args: unknown[]) => DownloadPage) => void;

export function runAnkergamesInstantReady(): void {
  type Hooked = Window & { __swAnkergamesReady?: boolean; Alpine?: { data: AlpineData } };
  const w = window as Hooked;
  if (w.__swAnkergamesReady) return;
  w.__swAnkergamesReady = true;

  const WAIT_ARG = /(downloadPage\([^()]*,\s*)\d+(\s*\))/;

  const clearWaitTimer = (): boolean => {
    const page = document.querySelector('[x-data*="downloadPage("]');
    const data = page?.getAttribute('x-data');
    if (!page || !data || !WAIT_ARG.test(data)) return false;
    page.setAttribute(
      'x-data',
      data.replace(WAIT_ARG, (_match, head: string, tail: string) => `${head}0${tail}`),
    );
    return true;
  };

  if (!clearWaitTimer()) {
    const observer = new MutationObserver(() => {
      if (clearWaitTimer()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener('DOMContentLoaded', () => observer.disconnect(), { once: true });
  }

  document.addEventListener('alpine:init', () => {
    const alpine = w.Alpine;
    if (!alpine) return;
    const register = alpine.data.bind(alpine);
    alpine.data = (name, factory) => {
      if (name !== 'downloadPage') return register(name, factory);
      register(name, (...args) => {
        const page = factory(...args);
        page.initiateDownload = () => Promise.resolve();
        return page;
      });
    };
  });
}
