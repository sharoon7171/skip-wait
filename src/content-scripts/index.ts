/**
 * Single content.js in manifest, runs on all URLs at document_start.
 * Fetches Pastebin config: which content scripts run on which URL patterns.
 * Runs only the inits for scripts enabled for the current URL.
 */
import { fetchPastebinConfig, getEnabledScriptNames } from './pastebin';
import { initMultiup } from './multiup-content-script';
import { initHubcdnRedirect } from './hubcdn-redirect-content-script';
import { initHdhub4uTimerBypass } from './hdhub4u-timer-bypass-content-script';
import { initHdhublistMainDomain } from './hdhublist-main-domain-content-script';
import { initHdhub4uMainDomainRedirect } from './hdhub4u-main-domain-instant-redirect-content-script';
import { initShrtflyRedirect } from './shrtfly-redirect-content-script';
import { initFcLcRedirect } from './fc-lc-redirect-content-script';
import { initPrmoviesRedirect } from './prmovies-redirect-content-script';
import { initSub2getRedirect } from './sub2get-redirect-content-script';
import { initClipiRedirect } from './clipi-redirect-content-script';

const SCRIPT_INITS: Record<string, () => void> = {
  'multiup-content-script': initMultiup,
  'hubcdn-redirect-content-script': initHubcdnRedirect,
  'hdhub4u-timer-bypass-content-script': initHdhub4uTimerBypass,
  'hdhublist-main-domain-content-script': initHdhublistMainDomain,
  'hdhub4u-main-domain-instant-redirect-content-script': initHdhub4uMainDomainRedirect,
  'shrtfly-redirect-content-script': initShrtflyRedirect,
  'fc-lc-redirect-content-script': initFcLcRedirect,
  'prmovies-redirect-content-script': initPrmoviesRedirect,
  'sub2get-redirect-content-script': initSub2getRedirect,
  'clipi-redirect-content-script': initClipiRedirect,
};

fetchPastebinConfig()
  .then((rules) => {
    const enabled = getEnabledScriptNames(rules, window.location.href);
    for (const name of enabled) {
      const init = SCRIPT_INITS[name];
      if (init) {
        try {
          init();
        } catch {
          // Extension context invalidated or script error
        }
      }
    }
  })
  .catch(() => {});
