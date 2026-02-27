// HDHub4u main-domain instant redirect. Runs when enabled for current URL via Pastebin config.

interface ApiResponse {
  c?: string;
  [key: string]: unknown;
}

export function initHdhub4uMainDomainRedirect(): void {
  const generateHourlySeed = (): number => {
    const now = new Date();
    return (now.getFullYear() * 1000000) +
           ((now.getMonth() + 1) * 10000) +
           (now.getDate() * 100) +
           now.getHours() + 1;
  };

  const apiUrl = `https://cdn.hub4u.cloud/host/?v=${generateHourlySeed()}`;

  fetch(apiUrl)
    .then((r) => r.ok ? r.json() : null)
    .then((apiData: ApiResponse | null) => {
      if (apiData?.c) {
        const cleanUrl = atob(apiData.c).split('?')[0] || atob(apiData.c);
        window.location.replace(cleanUrl);
      }
    })
    .catch(() => {});
}
