import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Em dev, /api é proxied para o Express local (mesma origem, como na Vercel).
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
