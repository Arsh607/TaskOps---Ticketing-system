import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <h1>TaskOps Ticketing System</h1>
          <p>Navigate between the feature pages using the links below.</p>
        </div>

        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            <li>
              <NavLink end to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/kanban" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Kanban
              </NavLink>
            </li>
            <li>
              <NavLink to="/tickets" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Tickets
              </NavLink>
            </li>
            <li>
              <NavLink to="/details" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Details
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-shell__content">
        <Outlet />
      </main>

      <footer className="app-shell__footer">
        <p>Team Members: Krupa Patel, Arshdeep Singh, Muse Muse</p>
      </footer>
    </div>
  )
}

export default Layout
