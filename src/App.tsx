import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import AddTaskModal from './components/AddTaskModal'
import ConfirmDialog from './components/ConfirmDialog'
import type { Todo, CreateTodoData, FilterType } from './types/Todo'
import { saveTodosToStorage, getInitialTodos } from './utils/localStorage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initialTodos = getInitialTodos()
    setTodos(initialTodos)
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      saveTodosToStorage(todos)
    }
  }, [todos, isInitialized])

  const addTodo = (taskData: CreateTodoData) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date()
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const updateTodo = (id: string, taskData: CreateTodoData) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, ...taskData } : todo
      )
    )
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDeleteClick = (id: string) => {
    setTodoToDelete(id)
    setShowDeleteConfirm(true)
  }

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo)
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingTodo(null)
  }

  const confirmDelete = () => {
    if (todoToDelete) {
      setTodos(prev => prev.filter(todo => todo.id !== todoToDelete))
      setTodoToDelete(null)
    }
    setShowDeleteConfirm(false)
  }

  const cancelDelete = () => {
    setTodoToDelete(null)
    setShowDeleteConfirm(false)
  }

  const todoToDeleteData = todoToDelete ? todos.find(t => t.id === todoToDelete) : null

  return (
    <div className="app">
      <Container className="py-4">
        <div className="text-center mb-5">
          <h1 className="app-title">Task Manager Pro</h1>
          <p className="text-light opacity-75">Stay organized and get things done efficiently</p>
        </div>
        
        <div className="max-width-container">
          <div className="row g-4">
            <div className="col-12 text-center">
              <AddTodo onShowModal={() => setShowAddModal(true)} />
            </div>
            <div className="col-12">
              <TodoList 
                todos={todos}
                filter={filter}
                onFilterChange={setFilter}
                onToggleTodo={toggleTodo}
                onDeleteTodo={handleDeleteClick}
                onEditTodo={handleEditClick}
              />
            </div>
          </div>
        </div>
      </Container>

      <AddTaskModal
        show={showAddModal}
        onHide={handleCloseModal}
        onAddTask={addTodo}
        onUpdateTask={updateTodo}
        editingTask={editingTodo}
      />

      <ConfirmDialog
        show={showDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${todoToDeleteData?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default App
