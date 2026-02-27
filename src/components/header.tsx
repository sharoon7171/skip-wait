import React from 'react';

const styles: {
  root: React.CSSProperties;
  title: React.CSSProperties;
  description: React.CSSProperties;
} = {
  root: {
    marginTop: 10,
    paddingTop: 8,
    borderTop: '1px solid #e5e5e5',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: 12,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  description: {
    margin: 0,
    fontSize: 11,
    color: '#444',
    lineHeight: 1.4,
  },
};

export function Header(): React.ReactElement {
  return (
    <header style={styles.root}>
      <h2 style={styles.title}>Request a domain or get help</h2>
      <p style={styles.description}>
        Want a site added for bypass timers or automation? Contact me with the domain or link—I'll add support when possible.
      </p>
    </header>
  );
}
