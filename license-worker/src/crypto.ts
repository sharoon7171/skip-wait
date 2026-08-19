import { DEVICE_ID_RE, LICENSE_KEY_RE } from './types';

export const timingSafeEqual = (left: string, right: string): boolean => {
  const enc = new TextEncoder();
  const a = enc.encode(left);
  const b = enc.encode(right);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
};

export const planDurationMs = (plan: 'trial10m' | 'monthly30d'): number =>
  plan === 'trial10m' ? 10 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;

export const generateLicenseKey = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `SW-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}`;
};

export const licenseKvKey = (key: string): string => `license:${key}`;

export const parseLicenseKey = (raw: string): string | null => {
  const key = raw.trim().toUpperCase();
  return LICENSE_KEY_RE.test(key) ? key : null;
};

export const parseDeviceId = (raw: string): string | null => {
  const deviceId = raw.trim().toLowerCase();
  return DEVICE_ID_RE.test(deviceId) ? deviceId : null;
};

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
} as const;

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...corsHeaders,
    },
  });

export const corsPreflight = (): Response =>
  new Response(null, { status: 204, headers: { ...corsHeaders } });

export const readJson = async <T>(request: Request): Promise<T | null> => {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
};

export const clientIp = (request: Request): string =>
  request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ?? 'unknown';
