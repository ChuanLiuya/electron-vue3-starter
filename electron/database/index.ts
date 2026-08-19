// TypeORM 数据源配置（仅主进程使用）
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from '../config/env'
import { TestEntity } from './entities/test'

export const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: env.dbPath,
  entities: [TestEntity],
  synchronize: true, // 开发阶段：实体结构变化时自动同步表结构
})
