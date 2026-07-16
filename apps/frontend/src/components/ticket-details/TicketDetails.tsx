import "./TicketDetails.css";
import { useTicketUpdates } from "../../hooks/useTicketUpdates";

/*
  TicketDetails uses useTicketUpdates for presentation state.
  The hook calls the frontend repository, which sends requests to
  the Express backend. The backend then uses Prisma to persist the
  ticket updates in PostgreSQL.
*/
function TicketDetails() {
  const ticket = {
    id: 1,
    displayId: "TKT-1042",
    title: "User cannot access dashboard",
    status: "Open",
    priority: "High",
    owner: "Aashish",
    assignmentGroup: "Application Support",
    createdDate: "May 18, 2026",
    updatedDate: "May 19, 2026",
    description:
      "The user is unable to access the dashboard after logging into the application.",
    impact:
      "This issue prevents the user from viewing assigned tickets, notifications, and task updates.",
  };

  const {
    updates,
    newUpdate,
    setNewUpdate,
    errorMessage,
    isLoading,
    handleAddUpdate,
    handleRemoveUpdate,
  } = useTicketUpdates(ticket.id);

  return (
    <section className="ticket-details">
      <header className="ticket-details__header">
        <p className="ticket-details__id">{ticket.displayId}</p>
        <h2>{ticket.title}</h2>
        <p>
          Review ticket information, ownership, impact, and progress
          updates.
        </p>
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
            void handleAddUpdate("Arshdeep");
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
            <p className="ticket-details__error" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit">Add Update</button>
        </form>
      </article>

      <article className="ticket-details__card">
        <h3>Activity Updates</h3>

        {isLoading ? (
          <p>Loading ticket updates...</p>
        ) : updates.length === 0 ? (
          <p>No activity updates have been added yet.</p>
        ) : (
          <ul className="ticket-details__updates">
            {updates.map((update) => (
              <li key={update.id}>
                <div>
                  <p>{update.message}</p>
                  <small>
                    Added by {update.createdBy} on{" "}
                    {new Date(update.createdAt).toLocaleString()}
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void handleRemoveUpdate(update.id);
                  }}
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