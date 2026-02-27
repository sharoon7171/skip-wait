// HDHub4u timer bypass. Runs when enabled for current URL via Pastebin config.

interface StoredData {
  value: string;
  expiry: number;
}

interface DecodedResult {
  o?: string;
  [key: string]: unknown;
}

export function initHdhub4uTimerBypass(): void {
  (String.prototype as unknown as { ca: () => string }).ca = function (this: string) {
    return this.replace(/[a-zA-Z]/g, (c: string) => {
      const code = c.charCodeAt(0);
      if (c >= 'a' && c <= 'z') return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      if (c >= 'A' && c <= 'Z') return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      return c;
    });
  };
  (String.prototype as unknown as { en: () => string }).en = function (this: string) {
    return btoa(this);
  };
  (String.prototype as unknown as { de: () => string }).de = function (this: string) {
    return atob(this);
  };

  function getStorageData(key: string): string | null {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    try {
      const parsed: StoredData = JSON.parse(raw);
      if (Date.now() > parsed.expiry) {
        window.localStorage.removeItem(key);
        return null;
      }
      return parsed.value;
    } catch {
      return null;
    }
  }

  type StringWithDecode = string & { de(): StringWithDecode; ca(): StringWithDecode };
  function extractFinalUrl(): string | null {
    const encoded = getStorageData('o');
    if (!encoded) return null;
    try {
      const s = encoded as unknown as StringWithDecode;
      const decoded = s.de().de().ca().de() as string;
      const obj: DecodedResult = JSON.parse(decoded);
      return obj.o ? atob(obj.o) : null;
    } catch {
      return null;
    }
  }

  function run(): void {
    const url = extractFinalUrl();
    if (url) window.location.href = url;
  }

  setTimeout(run, 1000);
  setTimeout(run, 3000);
  setTimeout(run, 5000);
}
