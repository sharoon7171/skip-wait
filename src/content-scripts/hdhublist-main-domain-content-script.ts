// HDHubList Main Domain Content Script

// TypeScript type definitions
type RedirectUrl = 'https://hdhublist.com/?re=hdhub';

// Main function with TypeScript
(function(): void {
  const currentUrl: string = window.location.href;
  const hasReParam: boolean = currentUrl.includes('re=hdhub');
  const redirectUrl: RedirectUrl = 'https://hdhublist.com/?re=hdhub';

  // Only redirect if we don't already have the re=hdhub parameter
  if (!hasReParam) {
    window.location.href = redirectUrl;
  }
})();
