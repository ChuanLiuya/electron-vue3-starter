// 笔记相关的 IPC 处理器（主进程）
import { ipcMain } from 'electron'
import { db } from '../database'

export function registerTestIpc() {
  ipcMain.handle('test:list', () =>
    db.prepare('SELECT * FROM test ORDER BY id DESC').all())
  ipcMain.handle('test:add', (_e, title: string, content: string) =>
    db.prepare('INSERT INTO test (title, content) VALUES (?, ?)').run(title, content))
}
