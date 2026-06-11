import { useState } from 'react'
import TicketList from '../components/ticket-list/TicketList'
import TicketForm from '../components/ticket-form/TicketForm'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'
import type { Ticket } from '../components/ticket-form/TicketForm'
import './TicketsPage.css'

interface TicketsPageProps {
  tickets: Ticket[]
  onAddTicket: (ticket: Ticket) => void
  onRemoveTicket: (ticketId: number) => void
}

function TicketsPage({
  tickets,
  onAddTicket,
  onRemoveTicket,
}: TicketsPageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddTicket = (ticket: Ticket) => {
    onAddTicket(ticket)
    setIsFormOpen(false)
  }

  return (
    <section className="tickets-page">
      <h2>Ticket Management</h2>

      <button
        className="new-ticket-btn"
        onClick={() => setIsFormOpen(!isFormOpen)}
        aria-expanded={isFormOpen}
        aria-controls="ticket-form-section"
      >
        <span className="new-ticket-btn__icon">{isFormOpen ? '−' : '+'}</span>
        New Ticket
      </button>

      {isFormOpen && (
        <div id="ticket-form-section" className="form-section">
          <TicketForm onAddTicket={handleAddTicket} />
        </div>
      )}

      <TicketList tickets={tickets} onRemoveTicket={onRemoveTicket} />

      <SharedViewCounter />
    </section>
  )
}

export default TicketsPage