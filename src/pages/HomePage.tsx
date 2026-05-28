import Dashboard from '../components/dashboard/Dashboard'

function HomePage() {
  return (
    <section>
      <h2>Welcome to TaskOps</h2>
      <p>
        This multi-page version of the ticketing system uses React Router for navigation.
        Use the links above to visit the Kanban board, ticket list, or ticket details pages.
      </p>

      <h2>Dashboard</h2>
      <Dashboard />
    </section>
  )
}

export default HomePage
