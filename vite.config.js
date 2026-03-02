import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        places: resolve(__dirname, 'places.html'),
        paintings: resolve(__dirname, 'paintings.html'),
        void: resolve(__dirname, 'void.html'),
        maps: resolve(__dirname, 'maps.html'),
        ticker: resolve(__dirname, 'ticker.html'),
        ad: resolve(__dirname, 'ad.html'),
        pixelblog: resolve(__dirname, 'pixelblog.html')
      },
      output: {
        // Create shared chunks
        manualChunks: {
          // All CSS will be extracted to a shared CSS file automatically
          'shared': ['./style.css', './public/fonts/fonts.css']
        },
        // Naming patterns
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          // CSS files
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/styles-[hash][extname]';
          }
          // JS files
          if (/\.js$/i.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Extract all CSS to a single file per entry
    cssCodeSplit: false,
    cssMinify: true,
    // JS optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Asset optimization
    assetsInlineLimit: 4096,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      }
    }
  },
  // CSS preprocessing
  css: {
    devSourcemap: true,
  }
});
