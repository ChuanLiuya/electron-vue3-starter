
import { ipcRenderer } from 'electron'
import { IpcChannels } from '../../ipc/channels'
import type { CatDTO, CatCreateInput, CatUpdateInput } from '@shared/types/cat'

export const catApi = {
  /** 查（全部）：api:cat:findAll */
  findAll: (): Promise<CatDTO[]> => ipcRenderer.invoke(IpcChannels.cat.findAll),
  /** 查（单条）：api:cat:findOneById */
  get: (id: number): Promise<CatDTO | null> =>
    ipcRenderer.invoke(IpcChannels.cat.findOneById, id),
  /** 增：api:cat:create */
  create: (data: CatCreateInput): Promise<number> =>
    ipcRenderer.invoke(IpcChannels.cat.create, data),
  /** 改：api:cat:update */
  update: (id: number, data: CatUpdateInput): Promise<CatDTO | null> =>
    ipcRenderer.invoke(IpcChannels.cat.update, id, data),
  /** 删：api:cat:remove */
  remove: (id: number): Promise<boolean> => ipcRenderer.invoke(IpcChannels.cat.remove, id),
}

/** catApi 的方法签名类型，可复用于 window 声明 */
export type CatApi = typeof catApi
