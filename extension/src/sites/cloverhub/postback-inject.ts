export function runCloverLootPostbackInject(): void {
  type W = Window & { __swCloverTc?: boolean };
  const w = window as W;
  if (w.__swCloverTc) return;
  w.__swCloverTc = true;

  const host = 'cloverhub.app/api/l/';
  const origFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const req = input instanceof Request ? input : null;
    const url = String(req ? req.url : input);
    const method = String(init?.method || req?.method || 'GET').toUpperCase();

    if (url.includes('/tc') && method === 'POST') {
      const resp = await origFetch(input, init);
      const text = await resp.clone().text();
      try {
        const tasks = JSON.parse(text) as Array<{ postback_url?: string }>;
        if (Array.isArray(tasks)) {
          for (const task of tasks) {
            const postback = typeof task.postback_url === 'string' ? task.postback_url.trim() : '';
            if (postback.includes(host)) {
              location.replace(postback);
              break;
            }
          }
        }
      } catch {}
      return resp;
    }

    return origFetch(input, init);
  };
}
