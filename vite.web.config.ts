import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'


import tailwindcss from  'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
