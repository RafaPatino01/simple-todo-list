import React from 'react'
import { Card } from 'react-bootstrap'
import TodoItem from './TodoItem'
import FilterBar from './FilterBar'
import type { Todo, FilterType } from '../types/Todo'

interface TodoListProps {
  todos: Todo[]
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onEditTodo: (todo: Todo) => void
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  filter, 
  onFilterChange, 
  onToggleTodo, 
  onDeleteTodo,
  onEditTodo 
}) => {
  const activeTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)
  
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return activeTodos
      case 'completed':
        return completedTodos
      default:
        return todos
    }
  }

  const filteredTodos = getFilteredTodos()
  const taskCounts = {
    all: todos.length,
    active: activeTodos.length,
    completed: completedTodos.length
  }

  return (
    <div>
      <FilterBar 
        activeFilter={filter}
        onFilterChange={onFilterChange}
        taskCounts={taskCounts}
      />
      
      <Card className="todo-list-card mt-3">
        <Card.Body className="todo-list-body">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-0">
                {filter === 'active' && 'No active tasks. Great job! 🎉'}
                {filter === 'completed' && 'No completed tasks yet. Get started! 💪'}
                {filter === 'all' && 'No tasks yet. Add one above to get started! ✨'}
              </p>
            </div>
          ) : (
            <div className="todo-items">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                  onEdit={onEditTodo}
                />
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default TodoList