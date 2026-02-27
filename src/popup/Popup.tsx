import React from 'react';
import { ContactSupport } from '../components/ContactSupport';

type StyleKey = 'header' | 'icon' | 'title' | 'subtitle';
const styles: Record<StyleKey, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  subtitle: {
    margin: '0 0 8px 0',
    fontSize: 12,
    color: '#666',
    lineHeight: 1.4,
  },
};

export function Popup(): React.ReactElement {
  return (
    <div>
      <header style={styles.header}>
        <img src="/icons/icon.png" alt="" style={styles.icon} />
        <h1 style={styles.title}>Skip Wait</h1>
      </header>
      <p style={styles.subtitle}>
        Bypass countdown timers and waiting pages on supported link shorteners and file hosts.
      </p>
      <ContactSupport />
    </div>
  );
}
