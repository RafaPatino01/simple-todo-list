import React from 'react'
import { Button, ButtonGroup, Badge } from 'react-bootstrap'
import { List, CheckCircle, Circle, Funnel } from 'react-bootstrap-icons'
import type { FilterType } from '../types/Todo'

interface FilterBarProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  taskCounts: {
    all: number
    active: number
    completed: number
  }
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeFilter, 
  onFilterChange, 
  taskCounts 
}) => {
  const filterButtons = [
    {
      key: 'all' as FilterType,
      label: 'All Tasks',
      icon: List,
      count: taskCounts.all,
      variant: 'outline-primary'
    },
    {
      key: 'active' as FilterType,
      label: 'Active',
      icon: Circle,
      count: taskCounts.active,
      variant: 'outline-warning'
    },
    {
      key: 'completed' as FilterType,
      label: 'Completed',
      icon: CheckCircle,
      count: taskCounts.completed,
      variant: 'outline-success'
    }
  ]

  return (
    <div className="filter-bar">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <Funnel size={20} className="text-muted" />
          <span className="fw-semibold text-muted">Filter Tasks:</span>
        </div>
        
        <ButtonGroup className="filter-buttons">
          {filterButtons.map(({ key, label, icon: Icon, count, variant }) => (
            <Button
              key={key}
              variant={activeFilter === key ? variant.replace('outline-', '') : variant}
              onClick={() => onFilterChange(key)}
              className="filter-btn d-flex align-items-center gap-2"
            >
              <Icon size={16} />
              <span>{label}</span>
              <Badge 
                bg={activeFilter === key ? 'light' : 'secondary'} 
                text={activeFilter === key ? 'dark' : 'light'}
                className="ms-1"
              >
                {count}
              </Badge>
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  )
}

export default FilterBar