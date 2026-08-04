import { useState, useEffect } from 'react'
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from '@clerk/react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import KanbanPage from './pages/KanbanPage'
import TicketsPage from './pages/TicketsPage'
import DetailsPage from './pages/DetailsPage'
import type { Ticket } from './types/Ticket'
import TicketsService from './services/TicketsService'

function TaskOpsApplication() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return
    }

    let ignoreResult = false

    void TicketsService.fetchAll(getToken).then((items) => {
      if (!ignoreResult) {
        setTickets(items)
      }
    })

    return () => {
      ignoreResult = true
    }
  }, [getToken, isLoaded, isSignedIn])


  function addTicket(ticket: Ticket) {
    setTickets((currentTickets) => [...currentTickets, ticket])
  }

  async function removeTicket(ticketId: number) {
    const ok = await TicketsService.deleteTicket(ticketId, getToken)
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

function App() {
  return (
    <>
      <Show when="signed-out">
        <main className="auth-page">
          <h1>TaskOps Ticketing System</h1>
          <p>Sign in or create an account to continue.</p>

          <div className="auth-page__actions">
            <SignInButton mode="modal">
              <button type="button">Sign in</button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button type="button">Create account</button>
            </SignUpButton>
          </div>
        </main>
      </Show>

      <Show when="signed-in">
        <div className="authenticated-app">
          <div className="auth-toolbar">
            <UserButton />
          </div>

          <TaskOpsApplication />
        </div>
      </Show>
    </>
  )
}

export default App
