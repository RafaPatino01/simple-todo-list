import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { Plus, X, PencilSquare } from 'react-bootstrap-icons'
import { Priority, Category } from '../types/Todo'
import type { CreateTodoData, Todo } from '../types/Todo'

interface AddTaskModalProps {
  show: boolean
  onHide: () => void
  onAddTask: (taskData: CreateTodoData) => void
  onUpdateTask?: (id: string, taskData: CreateTodoData) => void
  editingTask?: Todo | null
}

const categoryLabels = {
  [Category.WORK]: 'Work',
  [Category.PERSONAL]: 'Personal',
  [Category.SHOPPING]: 'Shopping',
  [Category.HEALTH]: 'Health',
  [Category.FINANCE]: 'Finance',
  [Category.LEARNING]: 'Learning',
  [Category.OTHER]: 'Other'
}

const priorityLabels = {
  [Priority.HIGH]: 'High',
  [Priority.MEDIUM]: 'Medium',
  [Priority.LOW]: 'Low'
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  show, 
  onHide, 
  onAddTask, 
  onUpdateTask, 
  editingTask 
}) => {
  const [formData, setFormData] = useState<CreateTodoData>({
    title: '',
    description: '',
    priority: Priority.MEDIUM,
    category: Category.PERSONAL,
    dueDate: undefined
  })

  const [errors, setErrors] = useState<{ title?: string }>({})
  const [validationState, setValidationState] = useState<CreateTodoData>({
    title: '',
    description: '',
    priority: Priority.MEDIUM,
    category: Category.PERSONAL,
    dueDate: undefined
  })

  const isEditing = !!editingTask

  useEffect(() => {
    if (editingTask && show) {
      const editData = {
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        category: editingTask.category,
        dueDate: editingTask.dueDate
      }
      setFormData(editData)
    } else if (!editingTask && show) {
      const resetData = {
        title: '',
        description: '',
        priority: Priority.MEDIUM,
        category: Category.PERSONAL,
        dueDate: undefined
      }
      setFormData(resetData)
      setValidationState(resetData)
      setErrors({})
    }
  }, [editingTask, show])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const titleToValidate = isEditing ? validationState.title : formData.title
    
    if (!titleToValidate.trim()) {
      setErrors({ title: 'Task title is required' })
      return
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined
    }

    if (isEditing && editingTask && onUpdateTask) {
      onUpdateTask(editingTask.id, taskData)
    } else {
      onAddTask(taskData)
    }

    handleClose()
  }

  const handleClose = () => {
    if (!isEditing) {
      setFormData({
        title: '',
        description: '',
        priority: Priority.MEDIUM,
        category: Category.PERSONAL,
        dueDate: undefined
      })
      setValidationState({
        title: '',
        description: '',
        priority: Priority.MEDIUM,
        category: Category.PERSONAL,
        dueDate: undefined
      })
    }
    onHide()
  }

  const formatDateForInput = (date?: Date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (dateString: string) => {
    if (!dateString) {
      setFormData(prev => ({ ...prev, dueDate: undefined }))
      return
    }
    
    const date = new Date(dateString)
    date.setHours(23, 59, 59, 999)
    setFormData(prev => ({ ...prev, dueDate: date }))
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered className="add-task-modal">
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="h4 mb-0">
          {isEditing ? (
            <>
              <PencilSquare className="me-2" size={24} />
              Edit Task
            </>
          ) : (
            <>
              <Plus className="me-2" size={24} />
              Add New Task
            </>
          )}
        </Modal.Title>
        <Button variant="link" onClick={handleClose} className="p-0 border-0 text-muted">
          <X size={24} />
        </Button>
      </Modal.Header>

      <Modal.Body className="pt-3">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">Task Title *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task title..."
                  value={formData.title}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, title: e.target.value }))
                    if (!isEditing) {
                      setValidationState(prev => ({ ...prev, title: e.target.value }))
                    }
                  }}
                  isInvalid={!!errors.title}
                  className="task-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add notes or description (optional)..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="task-input"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Priority</Form.Label>
                <Form.Select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
                  className="task-input"
                >
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                  className="task-input"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formatDateForInput(formData.dueDate)}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="task-input"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={handleClose} className="px-4">
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!formData.title.trim()}
          className="px-4 add-task-btn"
        >
          {isEditing ? (
            <>
              <PencilSquare size={18} className="me-1" />
              Update Task
            </>
          ) : (
            <>
              <Plus size={18} className="me-1" />
              Add Task
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTaskModal
