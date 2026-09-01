import { verifyLease } from './lease';
import { clearLicenseSession, getLicenseSession, sessionIsLive } from './storage';

export const verifyLicense = async (): Promise<boolean> => {
  const session = await getLicenseSession();
  if (!session) return false;
  const verified = await verifyLease(session.lease, {
    applicationId: session.applicationId,
    nonce: session.nonce,
  });
  if (!verified || verified.activationId !== session.activationId) {
    await clearLicenseSession();
    return false;
  }
  return sessionIsLive(session);
};
