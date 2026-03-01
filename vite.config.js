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
        manualChunks: {
          // Bundle all vendor code together
          'vendor': [],
        },
        // Optimize chunk size
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      }
    },
    // Optimize build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // CSS optimization
    cssCodeSplit: true,
    // Asset optimization
    assetsInlineLimit: 4096,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy API requests to the backend during development
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [],
  },
});
