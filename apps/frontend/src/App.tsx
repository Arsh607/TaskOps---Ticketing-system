import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/react";

import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import KanbanPage from "./pages/KanbanPage";
import TicketsPage from "./pages/TicketsPage";
import DetailsPage from "./pages/DetailsPage";

import type { Ticket } from "./types/Ticket";
import TicketsService from "./services/TicketsService";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    TicketsService.fetchAll()
      .then((items) => setTickets(items))
      .catch((error) => {
        console.error("Failed to load tickets:", error);
      });
  }, []);

  function addTicket(ticket: Ticket) {
    setTickets((currentTickets) => [...currentTickets, ticket]);
  }

  async function removeTicket(ticketId: number) {
    try {
      const ok = await TicketsService.deleteTicket(ticketId);

      if (ok) {
        setTickets((currentTickets) =>
          currentTickets.filter((ticket) => ticket.id !== ticketId),
        );
      }
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  }

  return (
    <Routes>
      {/* Clerk authentication pages */}
      <Route
        path="/sign-in/*"
        element={
          <main className="auth-page">
            <SignIn
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/"
            />
          </main>
        }
      />

      <Route
        path="/sign-up/*"
        element={
          <main className="auth-page">
            <SignUp
              signInUrl="/sign-in"
              fallbackRedirectUrl="/"
            />
          </main>
        }
      />

      {/* Existing application pages */}
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
  );
}

export default App;