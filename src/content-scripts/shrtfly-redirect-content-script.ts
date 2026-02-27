// Shrtfly redirect. Runs when enabled for current URL via Pastebin config.

interface ApiResponse {
  status: string;
  data: { final: string };
}

export function initShrtflyRedirect(): void {
  function getRealLink(): Promise<string> {
    const button = document.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!button?.form) return Promise.reject('No form found');
    const form = button.form;
    const formData = new FormData(form);
    const actionUrl = form.getAttribute('action');
    if (!actionUrl) return Promise.reject('No action URL');
    return fetch(actionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        _session_key: (formData.get('_session_key') as string) ?? '',
        action: (formData.get('action') as string) ?? '',
        extra: (formData.get('extra') as string) ?? '',
        method: (formData.get('method') as string) ?? '',
        alias: (formData.get('alias') as string) ?? '',
      }),
    })
      .then((r) => r.text())
      .then((html) => {
        try {
          const json: ApiResponse = JSON.parse(html);
          if (json.data?.final) return json.data.final;
        } catch {}
        const match = html.match(/"final":"([^"]+)"/);
        return match ? match[1] : '';
      })
      .then((url) => url || '');
  }

  getRealLink()
    .then((link) => link && (window.location.href = link))
    .catch(() => {});
}
