import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
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
      input: { popup: resolve(__dirname, 'src/ui/popup/main.tsx') },
      output: {
        entryFileNames: 'popup.js',
        assetFileNames: '[name].[ext]',
        codeSplitting: false,
      },
    },
  },
});
