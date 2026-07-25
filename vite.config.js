import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base path for GitHub Pages deployment
  base: './',
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
