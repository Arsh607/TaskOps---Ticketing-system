import './TicketList.css'

type Ticket = {
  id: number
  title: string
  status: string
  priority: string
  owner: string
}

interface TicketListProps {
  tickets: Ticket[]
  onRemoveTicket?: (ticketId: number) => void
}

function TicketList({ tickets, onRemoveTicket }: TicketListProps) {

  return (
    <section className="ticket-list" aria-labelledby="ticket-list-heading">
      <div className="ticket-list__intro">
        <h2 id="ticket-list-heading">TaskOps Ticket Queue</h2>
        <p>Review the latest tickets for the support workflow and triage priorities.</p>
      </div>

      {tickets.length === 0 ? (
        <div className="ticket-list__empty">
          <p>No tickets found. Create one to get started!</p>
        </div>
      ) : (
        <ul className="ticket-list__items">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="ticket-list__item">
              <article className="ticket-card">
                <div className="ticket-card__header">
                  <h3>{ticket.title}</h3>
                  {onRemoveTicket && (
                    <button
                      onClick={() => onRemoveTicket(ticket.id)}
                      className="ticket-card__remove-btn"
                      aria-label={`Remove ticket: ${ticket.title}`}
                      title="Remove this ticket"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <dl>
                  <div>
                    <dt>Status</dt>
                    <dd>{ticket.status}</dd>
                  </div>
                  <div>
                    <dt>Priority</dt>
                    <dd>{ticket.priority}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{ticket.owner}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TicketList
