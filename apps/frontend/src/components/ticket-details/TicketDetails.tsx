import "./TicketDetails.css";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import { useTicketUpdates } from "../../hooks/useTicketUpdates";
import TicketsService from "../../services/TicketsService";
import type { Ticket } from "../../types/Ticket";

/*
  TicketDetails uses useTicketUpdates for presentation state.
  The hook calls the frontend repository, which sends requests to
  the Express backend. The backend then uses Prisma to persist the
  ticket updates in PostgreSQL.
*/
function TicketDetails() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketLoadError, setTicketLoadError] = useState("");

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    let ignoreResult = false;

    async function loadFirstTicket() {
      try {
        const tickets = await TicketsService.fetchAll(getToken);

        if (!ignoreResult) {
          setSelectedTicket(tickets[0] ?? null);
          setTicketLoadError("");
        }
      } catch (error) {
        if (!ignoreResult) {
          setTicketLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load tickets for details.",
          );
        }
      }
    }

    void loadFirstTicket();

    return () => {
      ignoreResult = true;
    };
  }, [getToken, isLoaded, isSignedIn]);

  const {
    updates,
    newUpdate,
    setNewUpdate,
    errorMessage,
    isLoading,
    handleAddUpdate,
    handleRemoveUpdate,
  } = useTicketUpdates(selectedTicket?.id ?? null);

  const displayId = selectedTicket
    ? `TKT-${selectedTicket.id.toString().padStart(4, "0")}`
    : "No ticket selected";

  return (
    <section className="ticket-details">
      <header className="ticket-details__header">
        <p className="ticket-details__id">{displayId}</p>
        <h2>{selectedTicket?.title ?? "Ticket details"}</h2>
        <p>
          Review ticket information, ownership, impact, and progress
          updates.
        </p>
        {ticketLoadError && (
          <p className="ticket-details__error" role="alert">
            {ticketLoadError}
          </p>
        )}
      </header>

      <article className="ticket-details__card">
        <p className="ticket-details__id">{displayId}</p>
        <h3>Ticket Overview</h3>

        <dl className="ticket-details__grid">
          <div>
            <dt>Status</dt>
            <dd>{selectedTicket?.status ?? "-"}</dd>
          </div>

          <div>
            <dt>Priority</dt>
            <dd>{selectedTicket?.priority ?? "-"}</dd>
          </div>

          <div>
            <dt>Owner</dt>
            <dd>{selectedTicket?.owner ?? "-"}</dd>
          </div>

          <div>
            <dt>Assignment Group</dt>
            <dd>Application Support</dd>
          </div>

          <div>
            <dt>Created</dt>
            <dd>Available in backend resource data</dd>
          </div>

          <div>
            <dt>Updated</dt>
            <dd>Available in backend resource data</dd>
          </div>
        </dl>
      </article>

      <article className="ticket-details__card">
        <h3>Description</h3>
        <p>
          Detailed issue description is managed separately. This view focuses on
          persisted update history for the selected ticket.
        </p>
      </article>

      <article className="ticket-details__card">
        <h3>Impact</h3>
        <p>
          Ticket updates are associated with the logged-in user and stored in
          PostgreSQL through the backend API.
        </p>
      </article>

      <article className="ticket-details__card">
        <h3>Add Activity Update</h3>

        <form
          className="ticket-details__form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleAddUpdate(selectedTicket?.owner ?? "Unknown");
          }}
        >
          <label htmlFor="ticket-update">Update message</label>

          <textarea
            id="ticket-update"
            value={newUpdate}
            onChange={(event) => setNewUpdate(event.target.value)}
            placeholder="Enter a new update for this ticket..."
            disabled={!selectedTicket}
          />

          {errorMessage && (
            <p className="ticket-details__error" role="alert">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={!selectedTicket}>
            Add Update
          </button>
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