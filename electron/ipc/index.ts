// 笔记相关的 IPC 处理器（主进程）
import { ipcMain } from 'electron'
import { dataSource } from '../database'
import { TestEntity } from '../database/entities/test'

export function registerTestIpc() {
  ipcMain.handle('test:list', async () => {
    const repo = dataSource.getRepository(TestEntity)
    return repo.find({ order: { id: 'DESC' } })
  })

  ipcMain.handle('test:add', async (_e, title: string, content: string) => {
    const repo = dataSource.getRepository(TestEntity)
    const saved = await repo.save(repo.create({ title, content }))
    return saved.id
  })
}
