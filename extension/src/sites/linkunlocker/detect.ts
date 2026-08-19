import {
  isLinkunlockerVerifyPath,
  linkunlockerLockerSlug,
} from './hosts';

export const isCloudflareChallenge = (): boolean => {
  if (/just a moment|performing security verification|attention required|um momento|un momento/i.test(document.title)) {
    return true;
  }
  return Boolean(
    document.querySelector(
      [
        '#challenge-error-text',
        '#cf-challenge-running',
        '#challenge-form',
        '.cf-challenge',
        '.cf-browser-verification',
        'script[src*="challenges.cloudflare.com"]',
      ].join(', '),
    ),
  );
};

const scriptsText = (): string =>
  [...document.querySelectorAll('script')]
    .map((s) => s.textContent || '')
    .join('\n')
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n');

const readQuoted = (raw: string, key: string): string | null => {
  const m = new RegExp(`"${key}":"((?:\\\\.|[^"\\\\])*)"`).exec(raw);
  if (!m?.[1]) return null;
  try {
    return JSON.parse(`"${m[1]}"`) as string;
  } catch {
    return m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
};

const readBool = (raw: string, key: string): boolean =>
  new RegExp(`"${key}":true\\b`).test(raw);

export type LinkunlockerLockerConfig = {
  slug: string;
  destinationDomain: string;
  hasSnippet: boolean;
};

export function parseLinkunlockerLockerConfig(): LinkunlockerLockerConfig | null {
  const slugFromPath = linkunlockerLockerSlug();
  if (!slugFromPath) return null;
  const raw = scriptsText();
  const destinationDomain = readQuoted(raw, 'destinationDomain')?.trim() || '';
  if (!destinationDomain) return null;
  const slug = readQuoted(raw, 'slug')?.trim() || slugFromPath;
  return {
    slug,
    destinationDomain,
    hasSnippet: readBool(raw, 'hasSnippet'),
  };
}

const pageText = (): string => document.body?.innerText ?? '';

const hasLockerUi = (): boolean => {
  const text = pageText();
  if (!/Unlock link/i.test(text)) return false;
  return (
    /Clear every step below/i.test(text) ||
    /\d+\s*\/\s*\d+\s*done/i.test(text)
  );
};

export const isLinkunlockerLockerPage = (): boolean => {
  if (isCloudflareChallenge()) return false;
  if (!hasLockerUi() && !parseLinkunlockerLockerConfig()) return false;
  return Boolean(linkunlockerLockerSlug());
};

export type LinkunlockerVerifyParams = {
  hash: string;
  target: string;
  profileId: string;
};

export function parseLinkunlockerVerifyParams(
  href = location.href,
): LinkunlockerVerifyParams | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (!isLinkunlockerVerifyPath(url.pathname)) return null;
  const hash = url.searchParams.get('hash')?.trim() ?? '';
  const target = url.searchParams.get('target')?.trim() ?? '';
  const profileId = url.searchParams.get('profileId')?.trim() ?? '';
  if (!hash || !target || !profileId) return null;
  return { hash, target, profileId };
}

export const isLinkunlockerVerifyPage = (): boolean =>
  !isCloudflareChallenge() && Boolean(parseLinkunlockerVerifyParams());
