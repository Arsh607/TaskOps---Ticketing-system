import { useState } from "react";
import RecentTicketUpdates from "../recent-ticket-updates/RecentTicketUpdates";
import "./Dashboard.css";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="dashboard">
      <section className="dashboard__content">
        <button
          className="dashboard__menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open navigation menu"
        >
          ☰
        </button>

        {menuOpen && (
          <nav className="dashboard__menu" aria-label="Dashboard navigation">
            <button onClick={() => (window.location.href = "/tickets")}>
              Tickets
            </button>

            <button onClick={() => (window.location.href = "/kanban")}>
              Kanban Board
            </button>
          </nav>
        )}

        <article className="dashboard__card">
          <p className="dashboard__label">Welcome back</p>
          <h1>TaskOps Dashboard</h1>

          <RecentTicketUpdates />
        </article>
      </section>

      <footer className="dashboard__footer">
        <p>
          © 2026 Arshdeep Singh Rishi, Muse Muse and Krupa Patel. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}

export default Dashboard;