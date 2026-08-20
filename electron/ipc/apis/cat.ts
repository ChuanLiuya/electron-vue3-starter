// 猫（Cat）模块的 IPC 处理器
import { ipcMain } from 'electron'
import { dataSource } from '@electron/database'
import { CatEntity } from '@electron/database/entities/cat'

/** 猫的增删改查控制器：register() 注册全部 IPC 通道，每个方法对应一个操作 */
export class CatController {
  /** 懒获取 cat 表的仓库（TypeORM Repository） */
  private get repo() {
    return dataSource.getRepository(CatEntity)
  }

  /** 注册所有 cat 相关的 IPC 通道 */
  register() {
    ipcMain.handle('cat:list', () => this.list())
    ipcMain.handle('cat:get', (_e, id: number) => this.get(id))
    ipcMain.handle('cat:create', (_e, data: Partial<CatEntity>) => this.create(data))
    ipcMain.handle('cat:update', (_e, id: number, data: Partial<CatEntity>) =>
      this.update(id, data),
    )
    ipcMain.handle('cat:remove', (_e, id: number) => this.remove(id))
  }

  /** 查（全部）：按 id 倒序 */
  async list(): Promise<CatEntity[]> {
    return this.repo.find({ order: { id: 'DESC' } })
  }

  /** 查（单条） */
  async get(id: number): Promise<CatEntity | null> {
    return this.repo.findOneBy({ id })
  }

  /** 增 */
  async create(data: Partial<CatEntity>): Promise<number> {
    const saved = await this.repo.save(this.repo.create(data))
    return saved.id
  }

  /** 改：更新字段并返回最新记录 */
  async update(id: number, data: Partial<CatEntity>): Promise<CatEntity | null> {
    await this.repo.update(id, data)
    return this.repo.findOneBy({ id })
  }

  /** 删 */
  async remove(id: number): Promise<boolean> {
    await this.repo.delete(id)
    return true
  }
}

