/// <reference types="vite/client" />

// preload 通过 contextBridge 暴露到 window 上的 API 类型声明
declare global {
  /** 笔记表的一行记录 */
  interface NoteRow {
    id: number
    title: string
    content: string
  }

  interface Window {
    /** 业务功能 API（走 IPC 调用主进程） */
    electronAPI: {
      cat: {
        list: () => Promise<unknown>
        get: (id: number) => Promise<unknown>
        create: (data: unknown) => Promise<unknown>
        update: (id: number, data: unknown) => Promise<unknown>
        remove: (id: number) => Promise<unknown>
      }
    }
    /** 系统环境信息（preload 直接读取，不经过 IPC） */
    systemInfo: {
      platform: string
      versions: {
        electron: string
        chrome: string
        node: string
      }
    }
  }
}

export { }
