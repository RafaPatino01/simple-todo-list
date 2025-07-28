import React from 'react'
import { Card, Form, Button, Badge } from 'react-bootstrap'
import { 
  Trash, 
  Calendar, 
  ExclamationTriangle, 
  Clock,
  Flag,
  Briefcase,
  Person,
  Cart,
  Heart,
  CreditCard,
  Book,
  ThreeDots,
  PencilSquare
} from 'react-bootstrap-icons'
import { Priority, Category } from '../types/Todo'
import type { Todo } from '../types/Todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

const categoryIcons = {
  [Category.WORK]: Briefcase,
  [Category.PERSONAL]: Person,
  [Category.SHOPPING]: Cart,
  [Category.HEALTH]: Heart,
  [Category.FINANCE]: CreditCard,
  [Category.LEARNING]: Book,
  [Category.OTHER]: ThreeDots
}

const categoryColors = {
  [Category.WORK]: 'primary',
  [Category.PERSONAL]: 'info',
  [Category.SHOPPING]: 'warning',
  [Category.HEALTH]: 'success',
  [Category.FINANCE]: 'dark',
  [Category.LEARNING]: 'secondary',
  [Category.OTHER]: 'light'
}

const priorityColors = {
  [Priority.HIGH]: 'danger',
  [Priority.MEDIUM]: 'warning',
  [Priority.LOW]: 'success'
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatDueDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const getDueDateStatus = (dueDate: Date) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const due = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { status: 'overdue', variant: 'danger', icon: ExclamationTriangle }
    if (diffDays === 0) return { status: 'due-today', variant: 'warning', icon: Clock }
    if (diffDays <= 3) return { status: 'due-soon', variant: 'warning', icon: Calendar }
    return { status: 'upcoming', variant: 'secondary', icon: Calendar }
  }

  const CategoryIcon = categoryIcons[todo.category]
  const dueDateInfo = todo.dueDate ? getDueDateStatus(todo.dueDate) : null

  return (
    <Card className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.priority}-priority`}>
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between mb-2">
          <div className="d-flex align-items-start flex-grow-1">
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="todo-checkbox me-3 mt-1"
            />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-1">
                <h6 className={`todo-title mb-0 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                  {todo.title}
                </h6>
                <Badge bg={priorityColors[todo.priority]} className="priority-badge">
                  <Flag size={12} className="me-1" />
                  {todo.priority.toUpperCase()}
                </Badge>
              </div>
              
              {todo.description && (
                <p className={`todo-description small mb-2 ${todo.completed ? 'text-muted' : 'text-secondary'}`}>
                  {todo.description}
                </p>
              )}
              
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Badge bg={categoryColors[todo.category]} className="category-badge">
                  <CategoryIcon size={12} className="me-1" />
                  {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
                </Badge>
                
                {todo.dueDate && dueDateInfo && (
                  <Badge bg={dueDateInfo.variant} className="due-date-badge">
                    <dueDateInfo.icon size={12} className="me-1" />
                    {formatDueDate(todo.dueDate)}
                  </Badge>
                )}
                
                <small className="text-muted">
                  Created {formatDate(todo.createdAt)}
                </small>
              </div>
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEdit(todo)}
              className="todo-edit-btn"
            >
              <PencilSquare size={16} />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(todo.id)}
              className="todo-delete-btn"
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TodoItem