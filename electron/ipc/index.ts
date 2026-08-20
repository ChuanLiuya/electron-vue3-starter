// IPC 处理器汇总注册（所有模块的入口）
import { ipcMain } from 'electron'
import { dataSource } from '@electron/database'
import { TestEntity } from '@electron/database/entities/test'
import { CatController } from './apis/cat'

export function registerIpc() {
  // 示例 / 测试模块（test 表）
  ipcMain.handle('test:list', async () => {
    const repo = dataSource.getRepository(TestEntity)
    return repo.find({ order: { id: 'DESC' } })
  })

  ipcMain.handle('test:add', async (_e, title: string, content: string) => {
    const repo = dataSource.getRepository(TestEntity)
    const saved = await repo.save(repo.create({ title, content }))
    return saved.id
  })

  // 猫模块（class 风格）
  new CatController().register()
}
