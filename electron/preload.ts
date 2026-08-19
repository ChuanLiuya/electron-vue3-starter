import { contextBridge, ipcRenderer } from 'electron'

const api = {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  test: {
    list: () => ipcRenderer.invoke('test:list'),
    add: (title: string, content: string) => ipcRenderer.invoke('test:add', title, content),
  }
}

contextBridge.exposeInMainWorld('electronAPI', api)
