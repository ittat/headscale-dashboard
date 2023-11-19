import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'


import tailwindcss from  'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],

  css:{
    postcss:{
      plugins:[
       tailwindcss,
       autoprefixer
      ]
    }
  },
  resolve:{
    alias:{
      '@': path.resolve('src'),
    }
  },
  server:{
    // 开发代理
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path // 不可以省略rewrite
      }
    }

}
})
