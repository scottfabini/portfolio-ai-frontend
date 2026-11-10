// Main-thread client for the in-browser SQLite todo database (see todoDb.worker.ts).

export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  position: number
  createdAt: string
  updatedAt: string
}

export interface DbInfo {
  persistent: boolean
  mode: 'opfs' | 'opfs-sahpool' | 'memory'
  reason?: string
}

let worker: Worker | null = null
let nextId = 1
const pending = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>()

const getWorker = () => {
  if (worker) return worker
  worker = new Worker(new URL('./todoDb.worker.ts', import.meta.url), { type: 'module' })
  worker.onmessage = (e: MessageEvent<{ id: number; result?: unknown; error?: string }>) => {
    const p = pending.get(e.data.id)
    if (!p) return
    pending.delete(e.data.id)
    if (e.data.error !== undefined) p.reject(new Error(e.data.error))
    else p.resolve(e.data.result)
  }
  worker.onerror = (e) => {
    pending.forEach((p) => p.reject(new Error(e.message || 'Database worker failed')))
    pending.clear()
  }
  return worker
}

const call = <T>(op: string, args?: unknown): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const id = nextId++
    pending.set(id, { resolve, reject })
    getWorker().postMessage({ id, op, args })
  })

// Tell other tabs that todos changed so they can re-query (BroadcastChannel never echoes to the
// sender). Only meaningful when the DB is shared across tabs (the 'opfs' mode).
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('todos-changed') : null
const notifyChanged = <T>(result: T): T => {
  channel?.postMessage('changed')
  return result
}

export const onTodosChanged = (cb: () => void) => {
  channel?.addEventListener('message', cb)
  return () => channel?.removeEventListener('message', cb)
}

export const initDb = () => call<DbInfo>('init')
export const listTodos = () => call<Todo[]>('list')
export const createTodo = (t: { title: string; description: string }) =>
  call<Todo>('create', t).then(notifyChanged)
export const updateTodo = (t: Pick<Todo, 'id' | 'title' | 'description' | 'completed'>) =>
  call<Todo>('update', t).then(notifyChanged)
export const deleteTodo = (id: number) => call<null>('remove', { id }).then(notifyChanged)
export const reorderTodos = (ids: number[]) => call<null>('reorder', { ids }).then(notifyChanged)
