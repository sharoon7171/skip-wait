import React from 'react';
import { Header } from '../components/header';
import { Contact } from '../components/contact';
import { Footer } from '../components/footer';

type StyleKey = 'wrapper' | 'header' | 'icon' | 'title' | 'subtitle' | 'card';
const styles: Record<StyleKey, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  icon: {
    width: 36,
    height: 36,
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  subtitle: {
    margin: 0,
    fontSize: 12,
    color: '#444',
    lineHeight: 1.4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
  },
};

export function Options(): React.ReactElement {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <img src="/icons/icon.png" alt="" style={styles.icon} />
        <h1 style={styles.title}>Skip Wait — Options</h1>
      </header>
      <p style={styles.subtitle}>
        Skip countdown timers and waiting pages on supported link shorteners and file hosts. No settings to configure—the extension works automatically on supported sites.
      </p>
      <div style={styles.card}>
        <Header />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
