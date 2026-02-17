// MultiUp Content Script

// TypeScript type definitions
type MultiUpId = string;
type PhpMatch = RegExpMatchArray | null;
type DirectMatch = RegExpMatchArray | null;

// Pattern constants with proper typing
const MULTIUP_PHP_PATTERN = /\/multiup\.php\?id=([a-zA-Z0-9]+)/;
const MULTIUP_DIRECT_PATTERN = /multiup\.io\/([a-zA-Z0-9]+)/;
const MIRROR_PATH = '/en/mirror/';
const BASE_REDIRECT_URL = 'https://multiup.io/en/mirror/';

// Main function with TypeScript
(function(): void {
  const currentUrl: string = window.location.href;

  // Exit early if URL doesn't contain "multiup"
  if (!currentUrl.includes('multiup')) {
    return;
  }

  // Skip if already on mirror page
  if (currentUrl.includes(MIRROR_PATH)) {
    return;
  }

  // Extract ID from URL with proper TypeScript
  const extractMultiUpId = (url: string): MultiUpId | null => {
    // Check for multiup.php?id=ID pattern
    const phpMatch: PhpMatch = url.match(MULTIUP_PHP_PATTERN);
    if (phpMatch && phpMatch[1]) {
      return phpMatch[1];
    }

    // Check for multiup.io/ID pattern
    const directMatch: DirectMatch = url.match(MULTIUP_DIRECT_PATTERN);
    if (directMatch && directMatch[1]) {
      return directMatch[1];
    }

    return null;
  };

  const id: MultiUpId | null = extractMultiUpId(currentUrl);

  // Redirect if ID found
  if (id) {
    const redirectUrl: string = `${BASE_REDIRECT_URL}${id}`;
    window.location.href = redirectUrl;
  }
})();
