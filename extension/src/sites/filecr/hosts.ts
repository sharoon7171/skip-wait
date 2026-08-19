export const FILECR_PRODUCT_PATH = /^\/[^/]+\/[^/]+\/?$/i;
export const FILECR_DOWNLOAD_PATH = /^\/file-download\/?$/i;

export const MSG_FILECR_ROUTE = 'FILECR_ROUTE';

export function filecrPathname(): string {
  const path = location.pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function filecrPageKey(): string {
  return filecrPathname();
}
