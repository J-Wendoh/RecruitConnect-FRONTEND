import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT, 10) || 5173, // Use environment PORT or default to 3000
  },
  build: {
    outDir: 'dist', // Directory for production build
  },
});

