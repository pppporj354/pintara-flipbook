import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true // Enable PWA in development mode
      // },
      manifest: {
        name: "Pintara Flipbook Reader",
        short_name: "PintaraLite",
        description: "A simple flipbook reader PWA.",
        theme_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png", // Create this icon in /public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // Create this icon in /public
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Precache the app shell (HTML, CSS, JS, etc.)
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],

        // Runtime caching for book images
        runtimeCaching: [
          {
            // Cache images from the /pages/ directory
            urlPattern: /^.*\.(png|jpg|jpeg|svg|gif)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "book-image-cache",
              expiration: {
                maxEntries: 50, // Max 50 images
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
              },
            },
          },
        ],
      },
    }),
  ],
})
