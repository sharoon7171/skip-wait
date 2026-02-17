// HubCDN Redirect Content Script - Simple version
// Only execute if URL contains /dl/

(function(): void {
  const url = window.location.href;

  // Only execute if URL contains /dl/
  if (!url.includes('/dl/')) {
    return;
  }

  // Extract link parameter
  const linkMatch = url.match(/\/dl\/\?link=(.+)/);

  if (linkMatch && linkMatch[1]) {
    // Decode the real link
    const realLink = decodeURIComponent(linkMatch[1]);

    // Redirect to the real download link
    window.location.href = realLink;
  }
})();
