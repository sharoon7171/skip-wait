import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Content script is built as a single IIFE (Chrome MV3 runs it as a classic script).
 * URL patterns where it runs are defined via Pastebin config.
 */
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content-scripts/index.ts'),
      },
      output: {
        format: 'iife',
        entryFileNames: 'content.js',
        assetFileNames: '[name][extname]',
      },
    },
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      mangle: true,
    },
    target: 'es2020',
  },
});
