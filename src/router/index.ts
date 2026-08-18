import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // 使用 Hash 模式：Electron 打包后通过 file:// 协议加载，
  // History 模式无法正确解析路由，会导致页面白屏
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
