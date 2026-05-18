import "./TicketDetails.css";

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
    comments: [
      "User confirmed the issue happens after login.",
      "Support team checked browser console and found a possible authentication error.",
      "Issue assigned to Application Support for further investigation.",
    ],
  };

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
        <h3>Activity Updates</h3>

        <ul className="ticket-details__updates">
          {ticket.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default TicketDetails;