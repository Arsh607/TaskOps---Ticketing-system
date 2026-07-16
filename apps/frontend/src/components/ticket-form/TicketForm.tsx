import { useState } from 'react'
import './TicketForm.css'
import { useFormValidation } from '../../hooks'
import TicketsService from '../../services/TicketsService'
import type { Ticket } from '../../types/Ticket'

interface TicketFormProps {
  onAddTicket: (ticket: Ticket) => void
}

/**
 * TicketForm component
 * - Uses `useFormValidation` hook for presentation-only validation logic.
 * - Calls `TicketsService.createTicket` to persist new tickets (service -> repository).
 * - Notifies parent via `onAddTicket` after repository confirms creation.
 */
function TicketForm({ onAddTicket }: TicketFormProps) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('Open')
  const [priority, setPriority] = useState('Medium')
  const [owner, setOwner] = useState('')
  const { errors, validateFields, clearErrors } = useFormValidation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validateFields(
      { title, owner },
      {
        title: [
          (value) => (!value.trim() ? 'Title is required' : null),
          (value) => (value.trim().length < 3 ? 'Title must be at least 3 characters' : null)
        ],
        owner: [
          (value) => (!value.trim() ? 'Owner is required' : null)
        ]
      }
    )

    if (!isValid) {
      return
    }

    // Create via service which calls repository (test data in-memory)
    const created = await TicketsService.createTicket({
      title: title.trim(),
      status,
      priority,
      owner: owner.trim(),
    })

    onAddTicket(created)

    // Reset form
    setTitle('')
    setStatus('Open')
    setPriority('Medium')
    setOwner('')
    clearErrors()
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
