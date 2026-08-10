import { whenDomParsed } from '../../utils/domain-check';
import {
  clearUnlocktoearnChain,
  readUnlocktoearnChain,
  unlocktoearnAliasValid,
  unlocktoearnDefaultOrigin,
  writeUnlocktoearnChain,
  type UnlocktoearnChain,
} from './chain';
import { isUnlocktoearnHost } from './hosts';
import { createUnlocktoearnOverlay } from './overlay';

const mount = createUnlocktoearnOverlay(
  'skip-wait-unlocktoearn-mediator',
  'skip-wait-unlocktoearn-mediator-boot',
);

function fieldMap(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  for (const inp of form.querySelectorAll<HTMLInputElement>('input[name]')) {
    if (inp.name) out[inp.name] = inp.value ?? '';
  }
  return out;
}

function aliasMatches(fields: Record<string, string>, alias: string): boolean {
  return Object.entries(fields).some(
    ([name, value]) => /^tp\d*$/i.test(name) && value === alias,
  );
}

function hasGateHint(): boolean {
  return Boolean(
    document.querySelector('#tp98, #nextForm, #unlockForm, #unlockBtn, .unlock-box'),
  );
}

function isSafePhpHop(): boolean {
  return /\/safe\.php$/i.test(location.pathname);
}

function safePhpLinkAlias(): string | null {
  if (!isSafePhpHop()) return null;
  const link = new URLSearchParams(location.search).get('link')?.trim();
  return link && unlocktoearnAliasValid(link) ? link : null;
}

function gateFormForAlias(alias: string): HTMLFormElement | null {
  for (const form of document.querySelectorAll<HTMLFormElement>('form')) {
    const fields = fieldMap(form);
    if (!aliasMatches(fields, alias)) continue;
    if (
      form.id === 'tp98' ||
      form.id === 'nextForm' ||
      form.id === 'unlockForm' ||
      form.querySelector('#unlockBtn')
    ) {
      return form;
    }
  }
  return null;
}

function isFinalUnlockForm(form: HTMLFormElement): boolean {
  const fields = fieldMap(form);
  return form.id === 'unlockForm' && fields['submit'] === 'abc';
}

async function resolveChain(): Promise<UnlocktoearnChain | null> {
  const existing = await readUnlocktoearnChain();
  if (existing) return existing;
  const alias = safePhpLinkAlias();
  if (!alias) return null;
  return writeUnlocktoearnChain(alias, unlocktoearnDefaultOrigin());
}

export function initUnlocktoearnMediator(): void {
  if (window !== window.top) return;
  if (isUnlocktoearnHost(location.hostname)) return;

  void (async (): Promise<void> => {
    const chain = await resolveChain();
    if (!chain) return;

    let done = false;
    let observer: MutationObserver | null = null;

    const advance = async (): Promise<boolean> => {
      if (done) return true;
      const form = gateFormForAlias(chain.alias);
      if (!form) return false;

      done = true;
      observer?.disconnect();
      mount('Skipping Unlock To Earn gate…');
      if (isFinalUnlockForm(form)) await clearUnlocktoearnChain();
      HTMLFormElement.prototype.submit.call(form);
      return true;
    };

    const arm = (): void => {
      void (async (): Promise<void> => {
        if (await advance()) return;
        if (!isSafePhpHop() && !hasGateHint() && document.readyState !== 'loading') {
          observer?.disconnect();
        }
      })();
    };

    mount(
      isSafePhpHop() || hasGateHint()
        ? 'Detecting Unlock To Earn gate…'
        : 'Waiting for Unlock To Earn gate…',
    );

    if (await advance()) return;

    observer = new MutationObserver(arm);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    whenDomParsed(arm);
  })();
}
