import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
      interval: 1000, // иногда нужно увеличить интервал для Docker
    },
    hmr: {
      clientPort: 5173, // Указываем порт, который видит браузер
    },
  },
})