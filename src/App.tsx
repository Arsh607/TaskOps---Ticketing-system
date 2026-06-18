import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import KanbanPage from './pages/KanbanPage'
import TicketsPage from './pages/TicketsPage'
import DetailsPage from './pages/DetailsPage'
import type { Ticket } from './types/Ticket'
import TicketsService from './services/TicketsService'

function App() {
  const [viewCount, setViewCount] = useState(0)
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    // Load tickets from repository via service (uses test data)
    TicketsService.fetchAll().then((items) => setTickets(items))
  }, [])


  async function addTicket(ticket: Ticket) {
    const created = await TicketsService.createTicket({
      title: ticket.title,
      status: ticket.status,
      priority: ticket.priority,
      owner: ticket.owner,
    })
    setTickets((currentTickets) => [...currentTickets, created])
  }

  async function removeTicket(ticketId: number) {
    const ok = await TicketsService.deleteTicket(ticketId)
    if (ok) setTickets((currentTickets) => currentTickets.filter((t) => t.id !== ticketId))
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="kanban" element={<KanbanPage />} />
        <Route
          path="tickets"
          element={
            <TicketsPage
              tickets={tickets}
              onAddTicket={addTicket}
              onRemoveTicket={removeTicket}
            />
          }
        />
        <Route path="details" element={<DetailsPage />} />
      </Route>
    </Routes>
  )
}

export default App