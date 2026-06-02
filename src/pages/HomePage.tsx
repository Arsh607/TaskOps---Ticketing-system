import Dashboard from '../components/dashboard/Dashboard'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'
import type { SharedCounterProps } from '../types/SharedCounterProps'

function HomePage({ viewCount, incrementViewCount }: SharedCounterProps) {
  return (
    <section>
      <h2>Welcome to TaskOps</h2>
      <p>
        This multi-page version of the ticketing system uses React Router for navigation.
        Use the links above to visit the Kanban board, ticket list, or ticket details pages.
      </p>

      <h2>Dashboard</h2>
      <Dashboard />

      <SharedViewCounter
        viewCount={viewCount}
        incrementViewCount={incrementViewCount}
      />
    </section>
  )
}

export default HomePage