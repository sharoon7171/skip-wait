export const prepClientChecks = (): void => {
  try {
    document.cookie = 'ab=1; path=/';
  } catch {}
  try {
    const w = window as unknown as { blurred?: boolean; onblur?: unknown; onfocus?: unknown };
    w.blurred = false;
    w.onblur = null;
    w.onfocus = null;
  } catch {}
  try {
    const av = (window as unknown as { app_vars?: Record<string, unknown> }).app_vars;
    if (av) av['force_disable_adblock'] = '0';
  } catch {}
};

export const requestVisibilitySpoof = (): void => {
  chrome.runtime.sendMessage({ type: 'INJECT_VISIBILITY_SPOOF' }).catch(() => {});
};
