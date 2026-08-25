import { clearLicenseSession, getLicenseSession, licenseIsLive } from './storage';

export const verifyLicense = async (): Promise<boolean> => {
  const session = await getLicenseSession();
  if (!session) return false;
  if (!licenseIsLive(session.exp)) {
    await clearLicenseSession();
    return false;
  }
  return true;
};
