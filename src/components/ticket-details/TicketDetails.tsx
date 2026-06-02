import { useState } from "react";
import "./TicketDetails.css";

interface TicketUpdate {
  id: number;
  message: string;
}

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

  const [newUpdate, setNewUpdate] = useState("");
  const [updates, setUpdates] = useState<TicketUpdate[]>([
    {
      id: 1,
      message: "User confirmed the issue happens after login.",
    },
    {
      id: 2,
      message:
        "Support team checked browser console and found a possible authentication error.",
    },
    {
      id: 3,
      message:
        "Issue assigned to Application Support for further investigation.",
    },
  ]);

  function handleAddUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newUpdate.trim() === "") {
      return;
    }

    const updateToAdd: TicketUpdate = {
      id: Date.now(),
      message: newUpdate,
    };

    setUpdates([...updates, updateToAdd]);
    setNewUpdate("");
  }

  function handleRemoveUpdate(updateId: number) {
    const filteredUpdates = updates.filter((update) => update.id !== updateId);
    setUpdates(filteredUpdates);
  }

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

        <form className="ticket-details__form" onSubmit={handleAddUpdate}>
          <label htmlFor="ticket-update">Update message</label>

          <textarea
            id="ticket-update"
            value={newUpdate}
            onChange={(event) => setNewUpdate(event.target.value)}
            placeholder="Enter a new update for this ticket..."
          />

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