import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Smart Locker',
        short_name: 'SmartLocker',
        description: 'Smart Locker Application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'marker.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'marker.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})