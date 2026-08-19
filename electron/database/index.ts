// SQLite 数据库连接与建表（仅主进程使用）
import Database from 'better-sqlite3'
import { env } from '../config/env'

const db = new Database(env.dbPath)
db.exec(`CREATE TABLE IF NOT EXISTS test (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  title   TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT ''
)`)

export { db }
