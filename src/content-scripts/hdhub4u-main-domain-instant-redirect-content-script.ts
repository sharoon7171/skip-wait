// HDHub4u Main Domain Instant Redirect Content Script

// TypeScript type definitions
interface ApiResponse {
  c?: string;
  [key: string]: unknown;
}

type ApiUrl = `https://cdn.hub4u.cloud/host/?v=${number}`;

// Main function with TypeScript
(function(): void {
  // Generate unique hourly seed with proper TypeScript
  const generateHourlySeed = (): number => {
    const now = new Date();
    return (now.getFullYear() * 1000000) +
           ((now.getMonth() + 1) * 10000) +
           (now.getDate() * 100) +
           now.getHours() + 1;
  };

  const seed = generateHourlySeed();
  const apiUrl: ApiUrl = `https://cdn.hub4u.cloud/host/?v=${seed}`;

  // Fetch final destination and redirect with TypeScript
  const performRedirect = async (): Promise<void> => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return;
      }

      const apiData: ApiResponse = await response.json();

      if (apiData.c) {
        const encodedUrl: string = atob(apiData.c);
        const cleanUrl: string = encodedUrl.split('?')[0] || encodedUrl;

        window.location.replace(cleanUrl);
      }
    } catch (error) {
      // Silently handle error
    }
  };

  // Execute redirect
  performRedirect();
})();
