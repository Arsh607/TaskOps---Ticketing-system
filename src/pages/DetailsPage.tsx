import TicketDetails from '../components/ticket-details/TicketDetails'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'
import type { SharedCounterProps } from '../types/SharedCounterProps'

function DetailsPage({ viewCount, incrementViewCount }: SharedCounterProps) {
  return (
    <section>
      <h2>Ticket Details</h2>
      <TicketDetails />

      <SharedViewCounter
        viewCount={viewCount}
        incrementViewCount={incrementViewCount}
      />
    </section>
  )
}

export default DetailsPage