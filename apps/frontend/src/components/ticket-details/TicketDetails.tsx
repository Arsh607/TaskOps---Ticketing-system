import "./TicketDetails.css";
import { useTicketUpdates } from "../../hooks/useTicketUpdates";

/*
  TicketDetails uses the useTicketUpdates hook to separate presentation state
  from the component. The hook calls the ticketUpdateService for business logic,
  and the service calls the ticketUpdateRepository for test data access.
*/
function TicketDetails() {
  const ticket = {
    id: "TKT-1042",
    title: "User cannot access dashboard",
    status: "Open",
    priority: "High",
    owner: "Aashish",
    assignmentGroup: "Application Support",
    createdDate: "May 18, 2026",
    updatedDate: "May 19, 2026",
    description:
      "The user is unable to access the dashboard after logging into the application. The page loads briefly and then displays a blank screen.",
    impact:
      "This issue prevents the user from viewing assigned tickets, notifications, and task updates.",
  };

  const {
    updates,
    newUpdate,
    setNewUpdate,
    errorMessage,
    handleAddUpdate,
    handleRemoveUpdate,
  } = useTicketUpdates(ticket.id);

  return (
    <section className="ticket-details">
      <header className="ticket-details__header">
        <p className="ticket-details__id">{ticket.id}</p>
        <h2>{ticket.title}</h2>
        <p>Review ticket information, ownership, impact, and progress updates.</p>
      </header>

      <article className="ticket-details__card">
        <h3>Ticket Overview</h3>

        <dl className="ticket-details__grid">
          <div>
            <dt>Status</dt>
            <dd>{ticket.status}</dd>
          </div>

          <div>
            <dt>Priority</dt>
            <dd>{ticket.priority}</dd>
          </div>

          <div>
            <dt>Owner</dt>
            <dd>{ticket.owner}</dd>
          </div>

          <div>
            <dt>Assignment Group</dt>
            <dd>{ticket.assignmentGroup}</dd>
          </div>

          <div>
            <dt>Created</dt>
            <dd>{ticket.createdDate}</dd>
          </div>

          <div>
            <dt>Updated</dt>
            <dd>{ticket.updatedDate}</dd>
          </div>
        </dl>
      </article>

      <article className="ticket-details__card">
        <h3>Description</h3>
        <p>{ticket.description}</p>
      </article>

      <article className="ticket-details__card">
        <h3>Impact</h3>
        <p>{ticket.impact}</p>
      </article>

      <article className="ticket-details__card">
        <h3>Add Activity Update</h3>

        <form
          className="ticket-details__form"
          onSubmit={(event) => {
            event.preventDefault();
            handleAddUpdate("Arshdeep");
          }}
        >
          <label htmlFor="ticket-update">Update message</label>

          <textarea
            id="ticket-update"
            value={newUpdate}
            onChange={(event) => setNewUpdate(event.target.value)}
            placeholder="Enter a new update for this ticket..."
          />

          {errorMessage && (
            <p className="ticket-details__error">{errorMessage}</p>
          )}

          <button type="submit">Add Update</button>
        </form>
      </article>

      <article className="ticket-details__card">
        <h3>Activity Updates</h3>

        {updates.length === 0 ? (
          <p>No activity updates have been added yet.</p>
        ) : (
          <ul className="ticket-details__updates">
            {updates.map((update) => (
              <li key={update.id}>
                <span>{update.message}</span>

                <button
                  type="button"
                  onClick={() => handleRemoveUpdate(update.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}

export default TicketDetails;