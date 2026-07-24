import { isAllowedHost } from '../../utils/domain-check';
import {
  BSTSHRT_HOSTS,
  bstshrtLegacyPath,
  bstshrtLockerSlug,
} from './hosts';

export type BstshrtLockerConfig = {
  slug: string;
  finalUrl: string;
  rewardsEnabled: boolean;
  fromDb: boolean;
};

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

export const isBstshrtHost = (): boolean => isAllowedHost(BSTSHRT_HOSTS);

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

export function parseBstshrtLockerConfig(): BstshrtLockerConfig | null {
  const slugFromPath = bstshrtLockerSlug();
  const raw = scriptsText();
  const finalUrl = readQuoted(raw, 'finalUrl')?.trim() ?? '';
  if (!/^https?:\/\//i.test(finalUrl)) return null;
  const slug = readQuoted(raw, 'slug')?.trim() || slugFromPath;
  if (!slug) return null;
  return {
    slug,
    finalUrl,
    rewardsEnabled: readBool(raw, 'rewardsEnabled'),
    fromDb: readBool(raw, 'fromDb'),
  };
}

const hasBstshrtLockerMarkers = (): boolean => {
  if (parseBstshrtLockerConfig()) return true;
  if (document.querySelector('[data-bst-lv], [data-locker-continue-javascript-injector]')) return true;
  const raw = scriptsText();
  return (
    /"finalUrl"\s*:/.test(raw) &&
    (/\/api\/u\//.test(raw) || /locker-session/.test(raw) || /"Content Locked"/.test(raw))
  );
};

export const bstlarLinkActionId = (): string | null => {
  const el = document.getElementById('link_action_id');
  if (!(el instanceof HTMLInputElement)) return null;
  const v = el.value.trim();
  return v || null;
};

const hasLegacyLockerMarkers = (): boolean => {
  if (!bstlarLinkActionId()) return false;
  if (
    [...document.scripts].some((s) =>
      /(?:bstlar|boostellar)\.com\/js\/(?:app\.js|chunks\/)/i.test(s.src),
    )
  ) {
    return true;
  }
  return Boolean(document.querySelector('.unlock-wrapper, .link-card, .link-card-sub-title'));
};

export const isBstshrtLockerPage = (): boolean =>
  isBstshrtHost() && !isCloudflareChallenge() && hasBstshrtLockerMarkers();

export const isBstshrtLegacyPage = (): boolean => {
  if (!isBstshrtHost() || isCloudflareChallenge() || hasBstshrtLockerMarkers()) return false;
  const host = location.hostname.toLowerCase();
  if (host === 'bstshrt.com' || host.endsWith('.bstshrt.com')) return false;
  return Boolean(bstshrtLegacyPath()) && hasLegacyLockerMarkers();
};
