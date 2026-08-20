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
    electronAPI: {
      platform: string
      versions: {
        electron: string
        chrome: string
        node: string
      }
      test: {
        list: () => Promise<NoteRow[]>
        add: (title: string, content: string) => Promise<unknown>
      }
      cat: {
        list: () => Promise<unknown>
        get: (id: number) => Promise<unknown>
        create: (data: unknown) => Promise<unknown>
        update: (id: number, data: unknown) => Promise<unknown>
        remove: (id: number) => Promise<unknown>
      }
    }
  }
}

export { }
