import { defineConfig } from 'vite';
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

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      copyManifestPlugin()
    ],
    build: {
      rollupOptions: {
        input: {
          'background': resolve(__dirname, 'src/background.ts'),
          'multiup-content-script': resolve(__dirname, 'src/content-scripts/multiup-content-script.ts'),
          'hubcdn-redirect-content-script': resolve(__dirname, 'src/content-scripts/hubcdn-redirect-content-script.ts'),
          'hdhub4u-timer-bypass-content-script': resolve(__dirname, 'src/content-scripts/hdhub4u-timer-bypass-content-script.ts'),
          'hdhublist-main-domain-content-script': resolve(__dirname, 'src/content-scripts/hdhublist-main-domain-content-script.ts'),
          'hdhub4u-main-domain-instant-redirect-content-script': resolve(__dirname, 'src/content-scripts/hdhub4u-main-domain-instant-redirect-content-script.ts'),
          'shrtfly-redirect-content-script': resolve(__dirname, 'src/content-scripts/shrtfly-redirect-content-script.ts'),
          'fc-lc-redirect-content-script': resolve(__dirname, 'src/content-scripts/fc-lc-redirect-content-script.ts'),
          'prmovies-redirect-content-script': resolve(__dirname, 'src/content-scripts/prmovies-redirect-content-script.ts')
        },
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]'
        }
      },
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      target: 'es2020',
      terserOptions: {
        compress: { drop_console: true, drop_debugger: true },
        mangle: false // Keep variable names – no a/b/c conflicts across content scripts
      }
    }
  };
});
