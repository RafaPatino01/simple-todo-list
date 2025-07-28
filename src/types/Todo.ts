export const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export type Priority = typeof Priority[keyof typeof Priority]

export const Category = {
  WORK: 'work',
  PERSONAL: 'personal',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  FINANCE: 'finance',
  LEARNING: 'learning',
  OTHER: 'other'
} as const

export type Category = typeof Category[keyof typeof Category]

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate?: Date
  createdAt: Date
}

export interface CreateTodoData {
  title: string
  description?: string
  priority: Priority
  category: Category
  dueDate?: Date
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodoAction = 
  | { type: 'ADD_TODO'; payload: CreateTodoData }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_TODOS'; payload: { todos: Todo[] } }