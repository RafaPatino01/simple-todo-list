import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ExclamationTriangle, Trash2 } from 'react-bootstrap-icons'

interface ConfirmDialogProps {
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel
}) => {
  return (
    <Modal show={show} onHide={onCancel} centered size="sm" className="confirm-dialog">
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="h5 d-flex align-items-center gap-2">
          {variant === 'danger' && <ExclamationTriangle className="text-danger" size={24} />}
          {variant === 'warning' && <ExclamationTriangle className="text-warning" size={24} />}
          {title}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-2">
        <p className="mb-0 text-muted">{message}</p>
      </Modal.Body>
      
      <Modal.Footer className="border-0 pt-0">
        <Button variant="outline-secondary" onClick={onCancel} className="px-3">
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm} className="px-3">
          {variant === 'danger' && <Trash2 size={16} className="me-1" />}
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDialog