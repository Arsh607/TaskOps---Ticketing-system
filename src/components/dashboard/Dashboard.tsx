import "./Dashboard.css";
import { useToggle } from "../../hooks";

function Dashboard() {

  const { isOpen: menuOpen, toggle: toggleMenu } = useToggle(false);

  return (
    <main className="dashboard">
      <section className="dashboard__content">
        <button
          className="dashboard__menu-button"
          onClick={toggleMenu}
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