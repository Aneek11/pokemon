import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vuedevtools from 'vite-plugin-vue-devtools' 
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vuedevtools()
  ],
})
