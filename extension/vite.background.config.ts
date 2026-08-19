import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: false,
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    target: 'es2022',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      mangle: true,
    },
    rolldownOptions: {
      input: { background: resolve(__dirname, 'src/background/index.ts') },
      output: {
        entryFileNames: 'background.js',
        codeSplitting: false,
      },
    },
  },
});
