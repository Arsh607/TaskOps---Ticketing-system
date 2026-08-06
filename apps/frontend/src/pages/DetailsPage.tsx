import MyTicketUpdates from "../components/my-ticket-updates/MtTicketUpdates";
import SharedViewCounter from "../components/shared-view-counter/SharedViewCounter";
import TicketDetails from "../components/ticket-details/TicketDetails";

function DetailsPage() {
  return (
    <section>
      <h2>Ticket Details</h2>

      <TicketDetails />

      <MyTicketUpdates />

      <SharedViewCounter />
    </section>
  );
}

export default DetailsPage;