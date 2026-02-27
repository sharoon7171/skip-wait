import React from 'react';
import { ContactSupport } from '../components/ContactSupport';

type StyleKey = 'header' | 'icon' | 'title' | 'subtitle' | 'card';
const styles: Record<StyleKey, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  subtitle: {
    margin: '0 0 24px 0',
    fontSize: 14,
    color: '#666',
    lineHeight: 1.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
};

export function Options(): React.ReactElement {
  return (
    <div>
      <header style={styles.header}>
        <img src="/icons/icon.png" alt="" style={styles.icon} />
        <h1 style={styles.title}>Skip Wait — Options</h1>
      </header>
      <p style={styles.subtitle}>
        Skip countdown timers and waiting pages on supported link shorteners and file hosts. No settings to configure—the extension works automatically on supported sites.
      </p>
      <div style={styles.card}>
        <ContactSupport />
      </div>
    </div>
  );
}
