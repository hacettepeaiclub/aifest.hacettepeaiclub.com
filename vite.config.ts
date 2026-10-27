import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Göreli base: hem GitHub Pages alt yolunda hem de aifest.hacettepeaiclub.com kökünde çalışır.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        // Sahne çekiliş ekranı: /cekilis/ (siteden link verilmez, admin girişiyle açılır)
        cekilis: resolve(import.meta.dirname, 'cekilis/index.html'),
        // Yönetim paneli: /yonetim/ — katılımcı Excel'i, oturum kodları, dışa aktarma
        yonetim: resolve(import.meta.dirname, 'yonetim/index.html'),
      },
    },
  },
})
