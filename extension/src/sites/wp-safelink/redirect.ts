import { isRemoteSite } from '../../hosts/check';
import { whenDomParsed } from '../../utils/domain-check';
import { destFromDocument, destFromLocation } from './decrypt';

const open = (url: string): void => {
  if (url === location.href) return;
  location.replace(url);
};

export function initWpSafelinkRedirect(): void {
  void isRemoteSite('wp-safelink').then((ok) => {
    if (!ok) return;
    void destFromLocation().then((url) => {
      if (url) {
        open(url);
        return;
      }
      whenDomParsed(() => {
        void destFromDocument().then((found) => {
          if (found) open(found);
        });
      });
    });
  });
}
