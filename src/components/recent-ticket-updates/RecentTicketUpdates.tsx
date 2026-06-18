import { useTicketUpdates } from "../../hooks/useTicketUpdates";

function RecentTicketUpdates() {
  const { updates } = useTicketUpdates("TKT-1042");

  return (
    <section className="recent-ticket-updates">
      <h2>Recent Ticket Updates</h2>

      <ul>
        {updates.slice(0, 3).map((update) => (
          <li key={update.id}>{update.message}</li>
        ))}
      </ul>
    </section>
  );
}

export default RecentTicketUpdates;