// preload 入口：通过 contextBridge 将 api 暴露到渲染进程的 window.electronAPI
import { contextBridge } from 'electron'
import { api } from './api'

contextBridge.exposeInMainWorld('electronAPI', api)
