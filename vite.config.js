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
        ad: resolve(__dirname, 'ad.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
