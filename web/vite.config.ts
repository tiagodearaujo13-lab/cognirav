import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    include: ['./src/__tests__/**/*.test.tsx'],
  },
  server: {
    port: 5173,
    // Em dev, /api é proxied para o Express local (mesma origem, como na Vercel).
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
