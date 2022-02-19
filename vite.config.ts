import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VuePrimer',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        '@primer/css',
        '@primer/octicons',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
})
