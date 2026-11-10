/// <reference lib="webworker" />

// Runs inside a Web Worker: OPFS sync access handles are only available there.

export {} // keep this file a module so its types don't collide with worker globals

type Row = Record<string, unknown>
type Request = { id: number; op: string; args?: any }

let db: any = null
let mode: 'opfs' | 'opfs-sahpool' | 'memory' = 'memory'
let ready: Promise<{ persistent: boolean; mode: string; reason?: string }> | null = null

// Ordered schema migrations, tracked with PRAGMA user_version (index + 1 = version).
// Append new entries; never edit or reorder existing ones.
const MIGRATIONS = [
  // v1
  `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  // v2: manual ordering; existing rows keep their current (id) order
  `ALTER TABLE todos ADD COLUMN position INTEGER NOT NULL DEFAULT 0;
   UPDATE todos SET position = id;`,
]

const userVersion = () => query('PRAGMA user_version')[0].user_version as number

const migrate = () => {
  if (userVersion() >= MIGRATIONS.length) return
  // BEGIN IMMEDIATE takes the write lock, so another tab opening at the same moment waits (busy
  // timeout) and then sees the new user_version instead of migrating twice.
  inTransaction(() => {
    for (let v = userVersion(); v < MIGRATIONS.length; v++) {
      db.exec(MIGRATIONS[v])
      db.exec(`PRAGMA user_version = ${v + 1}`)
    }
  })
}

const inTransaction = <T>(fn: () => T): T => {
  db.exec('BEGIN IMMEDIATE')
  try {
    const result = fn()
    db.exec('COMMIT')
    return result
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

const init = async () => {
  // Loaded from /public at runtime, not bundled (see scripts/copy-sqlite-wasm.js). The wasm and
  // OPFS async-proxy files are resolved next to index.mjs via its own import.meta.url.
  const { default: sqlite3InitModule } = await import(
    /* webpackIgnore: true */ `/sqlite-wasm/${process.env.NEXT_PUBLIC_SQLITE_WASM_VERSION}/index.mjs`
  )
  const sqlite3: any = await sqlite3InitModule()
  let reason: string | undefined
  // The library installs the OPFS VFS during init and only exposes OpfsDb when that succeeded.
  // (`'opfs' in sqlite3` is no longer reliable: the library removes that namespace after bootstrap.)
  if (sqlite3.oo1.OpfsDb) {
    // Standard OPFS VFS: needs cross-origin isolation (COOP/COEP headers), and supports
    // several tabs/connections at once through SQLite file locking.
    db = new sqlite3.oo1.OpfsDb('/todos.sqlite3', 'c')
    mode = 'opfs'
  } else {
    reason = `OPFS VFS unavailable (crossOriginIsolated=${self.crossOriginIsolated})`
    try {
      // Fallback without SharedArrayBuffer: single connection only.
      const pool = await sqlite3.installOpfsSAHPoolVfs({ directory: '/portfolio-todo' })
      db = new pool.OpfsSAHPoolDb('/todos.sqlite3')
      mode = 'opfs-sahpool'
    } catch (err) {
      reason += '; ' + (err instanceof Error ? err.message : String(err))
      db = new sqlite3.oo1.DB(':memory:', 'c')
      mode = 'memory'
    }
  }
  if (reason) console.warn('[todoDb]', reason, '-> using', mode)
  migrate()
  return { persistent: mode !== 'memory', mode, reason }
}

const toTodo = (r: Row) => ({
  id: r.id as number,
  title: r.title as string,
  description: r.description as string,
  completed: r.completed === 1,
  position: r.position as number,
  createdAt: r.created_at as string,
  updatedAt: r.updated_at as string,
})

const query = (sql: string, bind?: unknown[]): Row[] =>
  db.exec({ sql, bind, rowMode: 'object', returnValue: 'resultRows' })

const getById = (id: number) => toTodo(query('SELECT * FROM todos WHERE id = ?', [id])[0])

const handlers: Record<string, (args: any) => unknown> = {
  list: () => query('SELECT * FROM todos ORDER BY position, id').map(toTodo),
  create: ({ title, description }) => {
    const now = new Date().toISOString()
    const [{ id }] = query(
      `INSERT INTO todos (title, description, completed, created_at, updated_at, position)
       VALUES (?, ?, 0, ?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM todos)) RETURNING id`,
      [title, description ?? '', now, now]
    ) as { id: number }[]
    return getById(id)
  },
  update: ({ id, title, description, completed }) => {
    db.exec({
      sql: 'UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ?',
      bind: [title, description ?? '', completed ? 1 : 0, new Date().toISOString(), id],
    })
    return getById(id)
  },
  reorder: ({ ids }: { ids: number[] }) => {
    inTransaction(() => {
      ids.forEach((id, i) =>
        db.exec({ sql: 'UPDATE todos SET position = ? WHERE id = ?', bind: [i + 1, id] })
      )
    })
    return null
  },
  remove: ({ id }) => {
    db.exec({ sql: 'DELETE FROM todos WHERE id = ?', bind: [id] })
    return null
  },
}

self.onmessage = async (e: MessageEvent<Request>) => {
  const { id, op, args } = e.data
  try {
    if (!ready) ready = init()
    const info = await ready
    const result = op === 'init' ? info : handlers[op](args)
    self.postMessage({ id, result })
  } catch (err) {
    self.postMessage({ id, error: err instanceof Error ? err.message : String(err) })
  }
}
