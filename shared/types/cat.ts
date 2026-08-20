// 猫（Cat）模块的对外契约类型：前后端共享的"单一数据源"
// 渲染进程（window.electronAPI）、preload、主进程 IPC handler 都从本文件取类型，
// 修改契约只需改这一处，两端自动同步。

/** 一只猫的完整数据（通过 IPC 返回给渲染进程的结构） */
export interface CatDTO {
  id: number
  name: string
  age: number
  breeds: string
}

/** 创建一只猫的入参（不含 id） */
export type CatCreateInput = Omit<CatDTO, 'id'>

/** 更新一只猫的可选字段 */
export type CatUpdateInput = Partial<Omit<CatDTO, 'id'>>
