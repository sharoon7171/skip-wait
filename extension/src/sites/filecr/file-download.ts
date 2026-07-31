import { isAllowedHost, whenDomParsed } from '../../utils/domain-check';
import { go, resolveDownloadInfo, type FilecrDownloadInfo } from './api';
import { FILECR_HOSTS, FILECR_DOWNLOAD_PATH, filecrPageKey } from './hosts';
import { onFilecrRoute } from './route';

let runningKey: string | null = null;

function readInfo(): FilecrDownloadInfo | null {
  const raw =
    sessionStorage.getItem('downloadData') ??
    sessionStorage.getItem('info') ??
    localStorage.getItem('info');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FilecrDownloadInfo;
  } catch {
    return null;
  }
}

function run(): void {
  if (!FILECR_DOWNLOAD_PATH.test(location.pathname)) {
    runningKey = null;
    return;
  }
  const key = filecrPageKey();
  if (runningKey === key) return;
  const info = readInfo();
  if (!info) return;
  runningKey = key;
  void resolveDownloadInfo(info).then((url) => {
    if (filecrPageKey() !== key) return;
    if (url) go(url);
    else runningKey = null;
  });
}

export function initFilecrFileDownload(): void {
  if (!isAllowedHost(FILECR_HOSTS)) return;
  onFilecrRoute(() => {
    whenDomParsed(run);
  });
}
