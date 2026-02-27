// MultiUp redirect. Runs when enabled for current URL via Pastebin config.

type MultiUpId = string;
type PhpMatch = RegExpMatchArray | null;
type DirectMatch = RegExpMatchArray | null;

const MULTIUP_PHP_PATTERN = /\/multiup\.php\?id=([a-zA-Z0-9]+)/;
const MULTIUP_DIRECT_PATTERN = /multiup\.io\/([a-zA-Z0-9]+)/;
const MIRROR_PATH = '/en/mirror/';
const BASE_REDIRECT_URL = 'https://multiup.io/en/mirror/';

export function initMultiup(): void {
  const currentUrl = window.location.href;
  if (!currentUrl.includes('multiup')) return;
  if (currentUrl.includes(MIRROR_PATH)) return;

  const extractMultiUpId = (url: string): MultiUpId | null => {
    const phpMatch: PhpMatch = url.match(MULTIUP_PHP_PATTERN);
    if (phpMatch?.[1]) return phpMatch[1];
    const directMatch: DirectMatch = url.match(MULTIUP_DIRECT_PATTERN);
    return directMatch?.[1] ?? null;
  };

  const id = extractMultiUpId(currentUrl);
  if (id) window.location.href = `${BASE_REDIRECT_URL}${id}`;
}
