import { app } from 'electron'
import { join } from 'node:path'
import Database from 'better-sqlite3'

const db = new Database(join(app.getPath('userData'), 'notes.db'))
db.exec(`CREATE TABLE IF NOT EXISTS test (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  title   TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT ''
)`)

export { db }
