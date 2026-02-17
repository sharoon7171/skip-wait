// HDHub4u Timer Bypass Content Script

// TypeScript type definitions
interface StoredData {
  value: string;
  expiry: number;
}

interface DecodedResult {
  o?: string;
  [key: string]: unknown;
}

type StorageKey = string;
type DecodedString = string;

// Wrap in IIFE to prevent variable conflicts
(function() {
    // String prototype extensions for decoding
    (String.prototype as any).ca = function() {
        return this.replace(/[a-zA-Z]/g, function(character: string) {
            const codePoint = character.charCodeAt(0);
            if (character >= 'a' && character <= 'z') {
                return String.fromCharCode(((codePoint - 97 + 13) % 26) + 97);
            } else if (character >= 'A' && character <= 'Z') {
                return String.fromCharCode(((codePoint - 65 + 13) % 26) + 65);
            }
            return character;
        });
    };

    (String.prototype as any).en = function() {
        return btoa(this.toString());
    };

    (String.prototype as any).de = function() {
        return atob(this.toString());
    };

    // Get stored data with expiry check
    function getStorageData(storageKey: StorageKey): string | null {
        const rawData = window.localStorage.getItem(storageKey);
        if (!rawData) {
            return null;
        }
        
        try {
            const parsedData = JSON.parse(rawData);
            const currentTime = new Date();
            
            if (currentTime.getTime() > parsedData.expiry) {
                window.localStorage.removeItem(storageKey);
                return null;
            }
            
            return parsedData.value;
        } catch (parseError) {
            return null;
        }
    }

    // Get final download URL
    function extractFinalUrl(): string | null {
        const encodedData: string | null = getStorageData('o');

        if (!encodedData) {
            return null;
        }

        try {
            const decodedString: DecodedString = (encodedData as any).de().de().ca().de();
            const decodedObject: DecodedResult = JSON.parse(decodedString);

            if (decodedObject.o) {
                const downloadUrl: string = atob(decodedObject.o);
                return downloadUrl;
            } else {
                return null;
            }
        } catch (decodeError) {
            return null;
        }
    }

    // Main execution
    function performRedirect(): void {
        const targetUrl: string | null = extractFinalUrl();
        
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    }

    // Try multiple times with delays
    setTimeout(() => {
        performRedirect();
    }, 1000);

    setTimeout(() => {
        performRedirect();
    }, 3000);

    setTimeout(() => {
        performRedirect();
    }, 5000);
})();