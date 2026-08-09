type RinkuHookWindow = Window & {
  __skipWaitRinkuStorage?: boolean;
  __skipWaitRinkuClickGuard?: boolean;
};

export const runRinkuPageHooks = (): void => {
  const w = window as RinkuHookWindow;
  const noop = (): void => {};
  const forceAdKey = (key: string): boolean => /^(mustClickAd|viewTask)\d+$/i.test(key);

  for (const [name, value] of [
    ['muzammil', true],
    ['tabSwitched', true],
    ['tabSwitchedTime', Date.now() - 120_000],
    ['redirectToErrorPage', noop],
  ] as const) {
    Object.defineProperty(window, name, {
      configurable: true,
      enumerable: true,
      get: () => value,
      set: noop,
    });
  }

  for (let i = 0; i < 8; i++) {
    sessionStorage.setItem(`mustClickAd${i}`, '0');
    sessionStorage.setItem(`viewTask${i}`, '0');
  }
  if (!w.__skipWaitRinkuStorage) {
    w.__skipWaitRinkuStorage = true;
    const ss = sessionStorage;
    const getItem = ss.getItem.bind(ss);
    const setItem = ss.setItem.bind(ss);
    ss.getItem = (key: string): string | null => (forceAdKey(key) ? '0' : getItem(key));
    ss.setItem = (key: string, value: string): void => {
      setItem(key, forceAdKey(key) ? '0' : value);
    };
  }

  document.cookie = 'adScriptCooldown=1; path=/; max-age=3600';

  if (!w.__skipWaitRinkuClickGuard) {
    w.__skipWaitRinkuClickGuard = true;
    document.addEventListener(
      'click',
      (event: MouseEvent): void => {
        if (event.target instanceof Element && event.target.closest('button')) {
          event.stopImmediatePropagation();
        }
      },
      true,
    );
  }
};
