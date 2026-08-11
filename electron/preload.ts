import { contextBridge } from 'electron'

// 通过 contextBridge 安全地向渲染进程暴露受控 API
// （不要直接暴露整个 Node 环境，避免安全风险）
const api = {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
}

contextBridge.exposeInMainWorld('electronAPI', api)
