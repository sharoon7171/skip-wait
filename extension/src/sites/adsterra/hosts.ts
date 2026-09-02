export const SITE = 'adsterra' as const;

export const OVERLAY_ID = 'skip-wait-adsterra-overlay';

export const isAesGate = (): boolean =>
  !!document.querySelector('script[src*="aes.js"]') && /slowAES\.decrypt/.test(document.documentElement.innerHTML);

export const isCheckpoint = (): boolean =>
  /\/checkpoint\.php$/i.test(location.pathname) && !isAesGate();

export const isAdStep = (): boolean =>
  /\/ad-page\.php$/i.test(location.pathname) ||
  /\/final-page\.php$/i.test(location.pathname) ||
  (!!document.getElementById('download') && /finalDestinationUrl/.test(document.documentElement.innerHTML));

export const keyText = (): string | null => {
  const text = document.querySelector('.keybox')?.textContent?.trim();
  return text || null;
};

export const checkpointToken = (): string | null => {
  const token = new URL(location.href).searchParams.get('token')?.trim();
  return token && /^[a-f0-9]{16,}$/i.test(token) ? token : null;
};

export const currentStep = (): number | null => {
  const rows = document.querySelectorAll('.row');
  for (const row of rows) {
    const label = row.querySelector('span:first-child')?.textContent?.trim();
    const value = row.querySelector('span:last-child')?.textContent?.trim();
    if (label === 'Current Step' && value && /^\d+$/.test(value)) return parseInt(value, 10);
  }
  return null;
};

export const stepCompleteUrl = (token: string, step: number): string =>
  `${location.origin}/step_complete.php?token=${encodeURIComponent(token)}&step=${step}`;

export const destinationUrl = (): string | null => {
  const fromQuery = new URL(location.href).searchParams.get('url')?.trim();
  if (fromQuery && /^https?:\/\//i.test(fromQuery)) return fromQuery;
  const raw = document.documentElement.innerHTML.match(
    /var\s+finalDestinationUrl\s*=\s*['"]([^'"]+)['"]/,
  )?.[1];
  if (!raw) return null;
  const url = raw.replace(/\\\//g, '/');
  return /^https?:\/\//i.test(url) ? url : null;
};
