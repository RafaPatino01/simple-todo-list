import React from 'react'
import { Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'

interface AddTodoProps {
  onShowModal: () => void
}

const AddTodo: React.FC<AddTodoProps> = ({ onShowModal }) => {
  return (
    <div className="add-todo-container mb-4">
      <Button 
        variant="primary" 
        size="lg"
        onClick={onShowModal}
        className="add-task-trigger-btn"
      >
        <Plus size={20} className="me-2" />
        Add New Task
      </Button>
      <p className="text-light mt-2 mb-0 small opacity-75">
        Create a new task with priority, category, and due date
      </p>
    </div>
  )
}

export default AddTodo