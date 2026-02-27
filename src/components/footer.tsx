import React from 'react';

const SQ_TECH_URL = 'https://www.sqtech.dev/';

type StyleKey = 'root' | 'link';
const styles: Record<StyleKey, React.CSSProperties> = {
  root: {
    marginTop: 10,
    paddingTop: 8,
    borderTop: '1px solid #e5e5e5',
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
  },
  link: {
    color: '#0a66c2',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export function Footer(): React.ReactElement {
  return (
    <footer style={styles.root}>
      Developed by{' '}
      <a href={SQ_TECH_URL} target="_blank" rel="noopener noreferrer" style={styles.link}>
        SQ Tech
      </a>
    </footer>
  );
}
