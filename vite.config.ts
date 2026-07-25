import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// ASCEND OS — Life Operating System
// PWA config: precache the app shell, runtime-cache nothing external (fully offline-first).
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png'],
      manifest: {
        name: 'ASCEND OS',
        short_name: 'ASCEND',
        description: 'Build Yourself. Every Day. Your complete Life Operating System.',
        theme_color: '#0D0D0D',
        background_color: '#0D0D0D',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // App is fully client-side / IndexedDB backed, so a simple cache-first
        // strategy for the shell is enough. No API calls to worry about.
        runtimeCaching: []
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    host: true, // expose on LAN so you can open it on your phone during dev
    port: 5173
  }
})
