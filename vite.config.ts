import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    /* Proxy를 사용하여 CORS 우회 */
    proxy: {
      '/aladin': {
        target: 'http://www.aladin.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aladin/, ''),
      },
    },
  },
})
