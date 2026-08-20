// preload 入口：通过 contextBridge 将 API 暴露到渲染进程
import { contextBridge } from 'electron'
import { api } from './api'
import { systemInfo } from './system'

// 业务功能
contextBridge.exposeInMainWorld('electronAPI', api)
// 系统环境信息
contextBridge.exposeInMainWorld('systemInfo', systemInfo)
