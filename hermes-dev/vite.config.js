import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':'http://localhost:8080'
    }},
  define: {
    global: 'window', // This shims 'global' to 'window' for browser compatibility
  }
})
