import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,  // Ensures Vite always starts on this port
    strictPort: true,  // Prevents Vite from switching to another port
    open: true,  // Opens the browser automatically
  }
});
