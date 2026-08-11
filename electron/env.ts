// 集中管理 Electron 主进程的环境变量

/** 是否为开发模式（vite-plugin-electron 在 dev 时注入 VITE_DEV_SERVER_URL） */
export const isDev = !!process.env.VITE_DEV_SERVER_URL

/** Vite 开发服务器地址（仅开发模式存在） */
export const devServerUrl = process.env.VITE_DEV_SERVER_URL
