'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars2Icon } from '@heroicons/react/24/outline'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  type Todo as TodoItem,
  initDb,
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  onTodosChanged,
  reorderTodos,
} from '@/lib/todoDb'

// Positions a row via dnd-kit's transform. The row's own motion.div (enter/exit animation) lives
// inside it, so the two libraries never animate the same element.
type DragHandleProps = {
  attributes: ReturnType<typeof useSortable>['attributes']
  listeners: ReturnType<typeof useSortable>['listeners']
  setActivatorNodeRef: (el: HTMLElement | null) => void
}

const SortableRow = ({
  id,
  children,
}: {
  id: number
  children: (handle: DragHandleProps) => React.ReactNode
}) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      {children({ attributes, listeners, setActivatorNodeRef })}
    </div>
  )
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    const load = async () => {
      try {
        const info = await initDb()
        if (!info.persistent) {
          setNotice(
            "Browser storage (OPFS) isn't available here, so todos won't persist after reload." +
              (info.reason ? ` (${info.reason})` : '')
          )
        } else if (info.mode === 'opfs-sahpool') {
          setNotice(
            'Running in single-tab mode: changes in other tabs will not be shared.' +
              (info.reason ? ` (${info.reason})` : '')
          )
        }
        setTodos(await listTodos())
        setError(null)
      } catch (err) {
        console.error('Error loading todos:', err)
        setError('Failed to load todos from the in-browser database.')
      } finally {
        setIsLoading(false)
      }
    }
    load()

    // Another tab changed the shared database: re-query so this tab updates live.
    return onTodosChanged(() => {
      listTodos()
        .then((fresh) => {
          setTodos(fresh)
          setEditingTodo((cur) => (cur && fresh.some((t) => t.id === cur.id) ? cur : null))
        })
        .catch((err) => console.error('Error refreshing todos:', err))
    })
  }, [])

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    try {
      const createdTodo = await createTodo(newTodo)
      setTodos([...todos, createdTodo])
      setNewTodo({ title: '', description: '' })
    } catch (err) {
      console.error('Error creating todo:', err)
      setError('Failed to create todo.')
    }
  }

  const handleToggleComplete = async (todo: TodoItem) => {
    try {
      const returnedTodo = await updateTodo({ ...todo, completed: !todo.completed })
      setTodos(todos.map((t) => (t.id === returnedTodo.id ? returnedTodo : t)))
    } catch (err) {
      console.error('Error updating todo:', err)
      setError('Failed to update todo.')
    }
  }

  const handleDeleteTodo = async (todo: TodoItem) => {
    try {
      await deleteTodo(todo.id)
      setTodos(todos.filter((t) => t.id !== todo.id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete todo.')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTodo) return

    try {
      const data = await updateTodo(editingTodo)
      setTodos(todos.map((todo) => (todo.id === editingTodo.id ? data : todo)))
      setEditingTodo(null)
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const from = todos.findIndex((t) => t.id === active.id)
    const to = todos.findIndex((t) => t.id === over.id)
    if (from < 0 || to < 0) return
    const reordered = arrayMove(todos, from, to)
    setTodos(reordered) // optimistic
    try {
      await reorderTodos(reordered.map((t) => t.id))
    } catch (err) {
      console.error('Error reordering todos:', err)
      setError('Failed to reorder todos.')
      setTodos(await listTodos()) // restore the persisted order
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <section id="todo" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Todo List
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your tasks efficiently
          </p>
        </motion.div>

        {notice && (
          <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg mb-6">
            {notice}
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleCreateTodo} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Todo title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Add Todo
              </button>
            </div>
          </form>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {todos.map((todo) => (
              <SortableRow key={todo.id} id={todo.id}>
              {({ attributes, listeners, setActivatorNodeRef }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4 shadow-sm"
              >
                {editingTodo?.id === todo.id ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                      type="text"
                      value={editingTodo.title}
                      onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      value={editingTodo.description}
                      onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTodo(null)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      ref={setActivatorNodeRef}
                      {...attributes}
                      {...listeners}
                      aria-label={`Reorder ${todo.title}`}
                      className="mt-0.5 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing touch-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                    >
                      <Bars2Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        todo.completed
                          ? 'bg-primary-600 border-primary-600'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-medium ${
                          todo.completed
                            ? 'text-gray-500 dark:text-gray-400 line-through'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p
                          className={`mt-1 ${
                            todo.completed
                              ? 'text-gray-500 dark:text-gray-400'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {todo.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTodo(todo)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo)}
                        className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
              )}
              </SortableRow>
            ))}
          </AnimatePresence>
          </SortableContext>
          </DndContext>

          {todos.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No todos yet. Add one above!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Todo 