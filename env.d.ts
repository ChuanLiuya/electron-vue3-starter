/// <reference types="vite/client" />

// preload 通过 contextBridge 暴露到 window 上的 API 类型声明
declare global {
  interface Window {
    electronAPI: {
      platform: string
      versions: {
        electron: string
        chrome: string
        node: string
      }
    }
  }
}

export {}
