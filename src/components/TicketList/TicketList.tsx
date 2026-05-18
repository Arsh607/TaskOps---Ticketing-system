import { useState } from 'react'
import './TicketList.css'

type Ticket = {
  id: number
  title: string
  status: string
  priority: string
  owner: string
}

function TicketList() {
  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      title: 'User cannot access dashboard',
      status: 'Open',
      priority: 'High',
      owner: 'Aashish',
    },
    {
      id: 2,
      title: 'Email notification not sending',
      status: 'In Progress',
      priority: 'Medium',
      owner: 'Team Ops',
    },
    {
      id: 3,
      title: 'Add search filter to ticket list',
      status: 'Planned',
      priority: 'Low',
      owner: 'Dev Squad',
    },
  ])

  return (
    <section className="ticket-list" aria-labelledby="ticket-list-heading">
      <div className="ticket-list__intro">
        <h2 id="ticket-list-heading">TaskOps Ticket Queue</h2>
        <p>Review the latest tickets for the support workflow and triage priorities.</p>
      </div>

      <ul className="ticket-list__items">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-list__item">
            <article className="ticket-card">
              <h3>{ticket.title}</h3>
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
    </section>
  )
}

export default TicketList
