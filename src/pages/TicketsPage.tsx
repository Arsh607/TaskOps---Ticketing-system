import TicketList from '../components/ticket-list/TicketList'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'
import type { SharedCounterProps } from '../types/SharedCounterProps'

function TicketsPage({ viewCount, incrementViewCount }: SharedCounterProps) {
  return (
    <section>
      <h2>Ticket List</h2>
      <TicketList />

      <SharedViewCounter
        viewCount={viewCount}
        incrementViewCount={incrementViewCount}
      />
    </section>
  )
}

export default TicketsPage
