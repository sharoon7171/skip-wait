export type LicensePlan = 'trial10m' | 'monthly30d';

export type LicenseStatus = 'active' | 'revoked';

export type LicenseRecord = {
  key: string;
  plan: LicensePlan;
  status: LicenseStatus;
  exp: number;
  deviceId: string | null;
  issuedAt: number;
  rev: number;
};

export type ClientBody = {
  key?: string;
  deviceId?: string;
};

export type AdminIssueBody = {
  plan?: LicensePlan;
};

export type AdminKeyBody = {
  key?: string;
};

export const LICENSE_KEY_RE = /^SW-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export const DEVICE_ID_RE = /^[a-f0-9]{32}$/;
