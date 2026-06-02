import { useState } from 'react'
import './TicketForm.css'

export type Ticket = {
  id: number
  title: string
  status: string
  priority: string
  owner: string
}

interface TicketFormProps {
  onAddTicket: (ticket: Ticket) => void
}

function TicketForm({ onAddTicket }: TicketFormProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('Open')
  const [priority, setPriority] = useState('Medium')
  const [owner, setOwner] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    if (!owner.trim()) {
      newErrors.owner = 'Owner is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newTicket: Ticket = {
      id: Date.now(),
      title: title.trim(),
      status,
      priority,
      owner: owner.trim(),
    }

    onAddTicket(newTicket)

    // Reset form
    setTitle('')
    setStatus('Open')
    setPriority('Medium')
    setOwner('')
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="ticket-form" noValidate>
      <fieldset>
        <legend>Create New Ticket</legend>

        <div className="form-group">
          <label htmlFor="ticket-title">
            Title <span aria-label="required">*</span>
          </label>
          <input
            id="ticket-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            className={errors.title ? 'input-error' : ''}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <span id="title-error" className="error-message">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ticket-status">Status</label>
          <select
            id="ticket-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ticket-priority">Priority</label>
          <select
            id="ticket-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ticket-owner">
            Owner <span aria-label="required">*</span>
          </label>
          <input
            id="ticket-owner"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Enter ticket owner name"
            className={errors.owner ? 'input-error' : ''}
            aria-invalid={!!errors.owner}
            aria-describedby={errors.owner ? 'owner-error' : undefined}
          />
          {errors.owner && (
            <span id="owner-error" className="error-message">
              {errors.owner}
            </span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Ticket
        </button>
      </fieldset>
    </form>
  )
}

export default TicketForm
