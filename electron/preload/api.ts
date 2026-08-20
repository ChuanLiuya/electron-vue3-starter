// preload API 汇总：所有暴露给渲染进程的接口在这里组合成 api 对象
import { ipcRenderer } from 'electron'
import { catApi } from './apis/cat'

/** 渲染进程可见的 API，由 preload.ts 通过 contextBridge.exposeInMainWorld('electronAPI', api) 暴露 */
export const api = {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  test: {
    list: () => ipcRenderer.invoke('test:list'),
    add: (title: string, content: string) => ipcRenderer.invoke('test:add', title, content),
  },
  cat: catApi,
}
