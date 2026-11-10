import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    proxy: {
      "/backend/api": {
        target: "http://backend",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend\/api/, "/backend/api/index.php"),
      },
      "/api": {
        target: "http://backend",
        changeOrigin: true,
      },
    },
  },
})
