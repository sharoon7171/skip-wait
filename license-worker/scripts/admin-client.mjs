import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env');

export const LICENSE_KEY_RE = /^SW-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export const normalizeKey = (raw) => {
  const key = raw.trim().toUpperCase();
  return LICENSE_KEY_RE.test(key) ? key : null;
};

export const loadEnv = () => {
  const env = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const i = trimmed.indexOf('=');
    if (i === -1) continue;
    env[trimmed.slice(0, i)] = trimmed.slice(i + 1);
  }
  const workerUrl = env.WORKER_URL ?? '';
  const adminSecret = env.ADMIN_SECRET ?? '';
  if (!workerUrl || !adminSecret) {
    throw new Error('Missing license-worker/.env — run npm run setup first.');
  }
  return { workerUrl, adminSecret };
};

export const adminPost = async (path, body) => {
  const { workerUrl, adminSecret } = loadEnv();
  const res = await fetch(`${workerUrl}${path}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${adminSecret}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error ?? `HTTP ${res.status}`);
    err.data = data;
    throw err;
  }
  return data;
};

export const clientValidate = async (key, deviceId = 'a'.repeat(32)) => {
  const { workerUrl } = loadEnv();
  const res = await fetch(`${workerUrl}/v1/validate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ key, deviceId }),
  });
  return res.json();
};

export const printValidateResult = (label, result) => {
  if (result.ok) {
    console.log(`${label}: valid (${result.plan})`);
    return;
  }
  console.log(`${label}: blocked — ${result.error ?? 'unknown'}`);
};

export const formatExp = (ms) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(ms));
