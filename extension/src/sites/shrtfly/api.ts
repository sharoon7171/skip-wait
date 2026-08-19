export type UnlockData = {
  final?: string;
  next_page?: string;
  speed_token?: string;
};

export type UnlockResponse = {
  status?: string;
  data?: UnlockData | string;
};

export const unlockForm = (): HTMLFormElement | null =>
  document.querySelector<HTMLFormElement>('form[action*="api-endpoint/verify"]');

export const formAction = (form: HTMLFormElement): string =>
  form.querySelector<HTMLInputElement>('input[name="action"]')?.value?.trim() ?? '';

export const postUnlock = async (form: HTMLFormElement): Promise<UnlockResponse> => {
  const url = form.getAttribute('action') || `${location.origin}/api-endpoint/verify`;
  const body = new URLSearchParams();
  new FormData(form).forEach((v, k) => body.append(k, String(v)));
  const res = await fetch(url, {
    method: 'POST',
    body,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return (await res.json()) as UnlockResponse;
};

export const goNext = (next: string, token: string): void => {
  const f = document.createElement('form');
  f.method = 'POST';
  f.action = next;
  const i = document.createElement('input');
  i.type = 'hidden';
  i.name = 'speed_token';
  i.value = token;
  f.appendChild(i);
  document.body.appendChild(f);
  f.submit();
};

export const finishUnlock = (overlay: { setStatus: (s: string) => void }, data: UnlockData): void => {
  const final = data.final?.trim() ?? '';
  if (final) {
    overlay.setStatus('Opening your link…');
    location.replace(final);
    return;
  }
  const next = data.next_page?.trim() ?? '';
  const token = data.speed_token?.trim() ?? '';
  if (!next || !token) throw new Error('empty next hop');
  overlay.setStatus('Continuing…');
  goNext(next, token);
};
