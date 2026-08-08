const FULL_RE = /^https:\/\/link4m\.co\/full\/\?/i;

export const initLink4mRedirect = (): void => {
  chrome.webNavigation.onBeforeNavigate.addListener(
    (details) => {
      if (details.frameId !== 0 || !FULL_RE.test(details.url)) return;
      const raw = new URL(details.url).searchParams.get('url')?.trim();
      if (!raw) throw new Error('link4m url');
      const decoded = atob(raw);
      if (!/^https?:\/\//i.test(decoded)) throw new Error('link4m dest');
      void chrome.tabs.update(details.tabId, { url: decoded });
    },
    { url: [{ hostEquals: 'link4m.co', pathPrefix: '/full/' }] },
  );
};
