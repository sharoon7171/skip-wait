import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Plugin to copy manifest.json and icons to dist folder
const copyManifestPlugin = () => {
  return {
    name: 'copy-manifest',
    writeBundle() {
      const manifestPath = resolve(__dirname, 'manifest.json');
      const distManifestPath = resolve(__dirname, 'dist/manifest.json');

      if (existsSync(manifestPath)) {
        copyFileSync(manifestPath, distManifestPath);
      }

      const iconsDir = resolve(__dirname, 'icons');
      const distIconsDir = resolve(__dirname, 'dist/icons');
      if (existsSync(iconsDir)) {
        mkdirSync(distIconsDir, { recursive: true });
        for (const file of readdirSync(iconsDir)) {
          copyFileSync(resolve(iconsDir, file), resolve(distIconsDir, file));
        }
      }
    }
  };
};

export default defineConfig((_env) => ({
    base: './',
    plugins: [
      react(),
      copyManifestPlugin()
    ],
    build: {
      modulePreload: false,
      rollupOptions: {
        input: {
          'popup': resolve(__dirname, 'popup.html'),
          'options': resolve(__dirname, 'options.html'),
          'background': resolve(__dirname, 'src/background/index.ts'),
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          // Name shared chunk explicitly; without this Rollup names it from a module path (e.g. footer.js)
          manualChunks(id) {
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('components/footer') ||
              id.includes('components/header') ||
              id.includes('components/contact')
            )
              return 'client';
          },
        }
      },
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      target: 'es2020',
      terserOptions: {
        compress: { drop_console: true, drop_debugger: true },
        mangle: true,
      }
    }
}));
