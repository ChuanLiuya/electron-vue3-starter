// 猫（Cat）模块的渲染进程 API（对应主进程 CatController 注册的 IPC 通道）
import { ipcRenderer } from 'electron'
import { IpcChannels } from '../../ipc/channels'

/** 通过 ipcRenderer 调用主进程 cat:* 通道 */
export const catApi = {
  /** 查（全部）：api:cat:list */
  list: () => ipcRenderer.invoke(IpcChannels.cat.list),
  /** 查（单条）：api:cat:get */
  get: (id: number) => ipcRenderer.invoke(IpcChannels.cat.get, id),
  /** 增：api:cat:create */
  create: (data: unknown) => ipcRenderer.invoke(IpcChannels.cat.create, data),
  /** 改：api:cat:update */
  update: (id: number, data: unknown) => ipcRenderer.invoke(IpcChannels.cat.update, id, data),
  /** 删：api:cat:remove */
  remove: (id: number) => ipcRenderer.invoke(IpcChannels.cat.remove, id),
}
