import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import KanbanPage from './pages/KanbanPage'
import TicketsPage from './pages/TicketsPage'
import DetailsPage from './pages/DetailsPage'
import type { Ticket } from './components/ticket-form/TicketForm'

function App() {
  const [viewCount, setViewCount] = useState(0)
  const [tickets, setTickets] = useState<Ticket[]>([
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

  function incrementViewCount() {
    setViewCount((currentViewCount) => currentViewCount + 1)
  }

  function addTicket(ticket: Ticket) {
    setTickets((currentTickets) => [...currentTickets, ticket])
  }

  function removeTicket(ticketId: number) {
    setTickets((currentTickets) => currentTickets.filter((t) => t.id !== ticketId))
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <HomePage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />

        <Route
          path="kanban"
          element={
            <KanbanPage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />

        <Route
          path="tickets"
          element={
            <TicketsPage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
              tickets={tickets}
              onAddTicket={addTicket}
              onRemoveTicket={removeTicket}
            />
          }
        />

        <Route
          path="details"
          element={
            <DetailsPage
              viewCount={viewCount}
              incrementViewCount={incrementViewCount}
            />
          }
        />
      </Route>
    </Routes>
  )
}

export default App