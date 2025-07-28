import type { Todo } from '../types/Todo'

const STORAGE_KEY = 'todo-app-todos'

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos to localStorage:', error)
  }
}

export const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
    }))
  } catch (error) {
    console.error('Error loading todos from localStorage:', error)
    return []
  }
}

export const getInitialTodos = (): Todo[] => {
  return loadTodosFromStorage()
}
