import TicketDetails from '../components/ticket-details/TicketDetails'
import SharedViewCounter from '../components/shared-view-counter/SharedViewCounter'

function DetailsPage() {
  return (
    <section>
      <h2>Ticket Details</h2>
      <TicketDetails />

      <SharedViewCounter />
    </section>
  )
}

export default DetailsPage