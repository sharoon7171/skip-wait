/**
 * Background entry: register content scripts from remote config on startup/install and when tabs complete (throttled).
 */
import { registerFromConfig } from './registration';

chrome.runtime.onStartup.addListener(() => registerFromConfig().catch(() => {}));
chrome.runtime.onInstalled.addListener(() =>
  registerFromConfig().catch(() => {})
);

const THROTTLE_MS = 30_000;
let lastRegisterTime = 0;

chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  if (Date.now() - lastRegisterTime < THROTTLE_MS) return;
  lastRegisterTime = Date.now();
  registerFromConfig().catch(() => {});
});
