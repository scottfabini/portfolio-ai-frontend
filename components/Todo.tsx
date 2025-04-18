'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Add a type definition for the window.ENV object
declare global {
  interface Window {
    ENV?: {
      NEXT_PUBLIC_API_URL: string;
    };
  }
}

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get the API URL from window.ENV if available (for production) or fallback to process.env (for development)
  const getApiUrl = () => {
    if (typeof window !== 'undefined' && window.ENV?.NEXT_PUBLIC_API_URL) {
      return window.ENV.NEXT_PUBLIC_API_URL;
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  };

  const getApiEndpoint = () => {
    // Get the base URL
    const baseUrl = getApiUrl();
    console.log('Base URL:', baseUrl);
    
    // Check if it already includes /api
    if (baseUrl.endsWith('/api')) {
      return `${baseUrl}/todos`;
    } else {
      return `${baseUrl}/api/todos`;
    }
  };

  // Use this for all API calls
  const API_ENDPOINT = getApiEndpoint();
  
  useEffect(() => {
    console.log('Using API endpoint:', API_ENDPOINT);
    fetchTodos();
  }, [])
  
  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(API_ENDPOINT)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      setTodos(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching todos:', err)
      setError('Failed to load todos. Backend is not deployed at this time.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTodo = async () => {
    if (!newTodo.title.trim()) return

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const createdTodo = await response.json()
      setTodos([...todos, createdTodo])
      setNewTodo({ title: '', description: '' })
    } catch (err) {
      console.error('Error creating todo:', err)
      setError('Failed to create todo. Backend is not deployed at this time.')
    }
  }

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed }
      const response = await fetch(`${API_ENDPOINT}/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const returnedTodo = await response.json()
      setTodos(
        todos.map((t) => (t.id === returnedTodo.id ? returnedTodo : t))
      )
    } catch (err) {
      console.error('Error updating todo:', err)
      setError('Failed to update todo. Backend is not deployed at this time.')
    }
  }

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${todo.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      setTodos(todos.filter((t) => t.id !== todo.id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete todo. Backend is not deployed at this time.')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTodo) return

    try {
      const response = await fetch(`${API_ENDPOINT}/${editingTodo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTodo),
      })
      if (!response.ok) throw new Error('Failed to update todo')
      const data = await response.json()
      setTodos(todos.map(todo => todo.id === editingTodo.id ? data : todo))
      setEditingTodo(null)
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
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

          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
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
            ))}
          </AnimatePresence>

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