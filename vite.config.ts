import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import electron from 'vite-plugin-electron/simple'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    electron({
      main: {
        // 主进程入口，构建产物输出到 dist-electron/
        entry: 'electron/main.ts',
      },
      preload: {
        // 预加载脚本入口
        input: 'electron/preload.ts',
      },
      // 可选：若渲染进程需要使用 Node.js API，取消下面注释
      // renderer: {},
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
