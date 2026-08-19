import { ipcMain } from 'electron'
import { db } from './db'

export function registerTestIpc() {
  ipcMain.handle('test:list', () =>
    db.prepare('SELECT * FROM test ORDER BY id DESC').all())
  ipcMain.handle('test:add', (_e, title: string, content: string) =>
    db.prepare('INSERT INTO test (title, content) VALUES (?, ?)').run(title, content))
}
