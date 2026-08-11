import { app, shell, BrowserWindow } from 'electron'
import { join } from 'node:path'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    title: 'Electron Vue3 Starter',
    webPreferences: {
      preload: join(import.meta.dirname, 'preload.mjs'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 开发模式：加载 Vite 开发服务器（支持 HMR）
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    // 生产模式：加载构建产物
    mainWindow.loadFile(join(import.meta.dirname, '../dist/index.html'))
  }

  // 外部链接交给系统浏览器打开
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()

  // macOS：点击 Dock 图标时若无窗口则重新创建
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Windows / Linux：所有窗口关闭即退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
