// fc-lc.xyz Redirect Content Script
// Works on fc-lc.xyz domain

interface RedirectScript {
    REDIRECT_URL: string;
    MIN_DWELL_MS: number;
    MIN_SCORE: number;
    REQ_TYPES: number;
}

(function(): void {
    function bypassRedirect(): void {
        // Extract redirect URL from script
        const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll('script');
        let redirectUrl: string = '';

        scripts.forEach((script: HTMLScriptElement) => {
            if (script.textContent?.includes('REDIRECT_URL')) {
                const match: RegExpMatchArray | null = script.textContent.match(/REDIRECT_URL\s*=\s*"([^"]+)"/);
                if (match && match[1]) {
                    redirectUrl = match[1];
                }
            }
        });

        if (!redirectUrl) {
            return;
        }

        // Redirect immediately
        window.location.replace(redirectUrl);
    }

    // Run the bypass
    bypassRedirect();
})();
