import React from 'react';
import { Header } from '../components/header';
import { Contact } from '../components/contact';
import { Footer } from '../components/footer';

type StyleKey = 'wrapper' | 'header' | 'icon' | 'title' | 'subtitle';
const styles: Record<StyleKey, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  icon: {
    width: 28,
    height: 28,
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  subtitle: {
    margin: 0,
    fontSize: 11,
    color: '#444',
    lineHeight: 1.35,
  },
};

export function Popup(): React.ReactElement {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <img src="/icons/icon.png" alt="" style={styles.icon} />
        <h1 style={styles.title}>Skip Wait</h1>
      </header>
      <p style={styles.subtitle}>
        Bypass countdown timers and waiting pages on supported link shorteners and file hosts.
      </p>
      <Header />
      <Contact />
      <Footer />
    </div>
  );
}
