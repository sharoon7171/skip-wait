const FULL_RE = /^https:\/\/link4m\.co\/full\/\?/i;

export function initLink4mRedirect(): void {
  chrome.webNavigation.onBeforeNavigate.addListener(
    (details) => {
      if (details.frameId !== 0 || !FULL_RE.test(details.url)) return;
      try {
        const raw = new URL(details.url).searchParams.get('url')?.trim();
        if (!raw) return;
        const decoded = atob(raw);
        if (!/^https?:\/\//i.test(decoded)) return;
        void chrome.tabs.update(details.tabId, { url: decoded });
      } catch {}
    },
    { url: [{ hostEquals: 'link4m.co', pathPrefix: '/full/' }] },
  );
}
