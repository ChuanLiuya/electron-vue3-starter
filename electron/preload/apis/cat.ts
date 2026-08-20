// 猫（Cat）模块的渲染进程 API（对应主进程 CatController 注册的 IPC 通道）
import { ipcRenderer } from 'electron'

/** 通过 ipcRenderer 调用主进程 cat:* 通道 */
export const catApi = {
  /** 查（全部）：cat:list */
  list: () => ipcRenderer.invoke('cat:list'),
  /** 查（单条）：cat:get */
  get: (id: number) => ipcRenderer.invoke('cat:get', id),
  /** 增：cat:create */
  create: (data: unknown) => ipcRenderer.invoke('cat:create', data),
  /** 改：cat:update */
  update: (id: number, data: unknown) => ipcRenderer.invoke('cat:update', id, data),
  /** 删：cat:remove */
  remove: (id: number) => ipcRenderer.invoke('cat:remove', id),
}
