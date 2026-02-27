/**
 * Background service worker: fetches Pastebin config so content scripts don't hit CORS.
 * Content script requests config via chrome.runtime.sendMessage.
 */
import { registerMessageListener } from './message-listener';

registerMessageListener();
