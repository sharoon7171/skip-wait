export const SURVEY_VIEWED_KEY = 'skipWaitSurveyViewed_v1';

export const SURVEY_URL = 'https://forms.gle/fhLkTY62C7rEtej39';

let claim: Promise<void> | null = null;

const openSurveyOnce = async (): Promise<void> => {
  const stored = await chrome.storage.local.get(SURVEY_VIEWED_KEY);
  if (stored[SURVEY_VIEWED_KEY]) return;
  await chrome.storage.local.set({ [SURVEY_VIEWED_KEY]: Date.now() });
  await chrome.tabs.create({ url: SURVEY_URL, active: true });
};

export const initSurveyPrompt = (): void => {
  const run = (): void => {
    claim ??= openSurveyOnce().finally(() => {
      claim = null;
    });
    void claim;
  };
  chrome.runtime.onInstalled.addListener(run);
  chrome.runtime.onStartup.addListener(run);
};
