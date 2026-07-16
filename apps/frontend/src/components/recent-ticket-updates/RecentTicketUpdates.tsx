import { useTicketUpdates } from "../../hooks/useTicketUpdates";

function RecentTicketUpdates() {
  const { updates, isLoading, errorMessage } = useTicketUpdates(1);

  return (
    <section className="recent-ticket-updates">
      <h2>Recent Ticket Updates</h2>

      {isLoading ? (
        <p>Loading ticket updates...</p>
      ) : errorMessage ? (
        <p role="alert">{errorMessage}</p>
      ) : updates.length === 0 ? (
        <p>No recent updates.</p>
      ) : (
        <ul>
          {updates.slice(0, 3).map((update) => (
            <li key={update.id}>{update.message}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentTicketUpdates;