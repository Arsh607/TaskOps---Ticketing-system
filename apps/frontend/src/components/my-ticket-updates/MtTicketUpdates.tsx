import { SignInButton } from "@clerk/react";

import { useMyTicketUpdates } from "../../hooks/useMyTicketUpdates";

function MyTicketUpdates() {
  const {
    updates,
    isLoading,
    errorMessage,
    isLoaded,
    isSignedIn,
  } = useMyTicketUpdates();

  if (!isLoaded) {
    return (
      <section className="my-ticket-updates">
        <h3>My Activity Updates</h3>
        <p>Checking your session...</p>
      </section>
    );
  }

  if (!isSignedIn) {
    return (
      <section className="my-ticket-updates">
        <h3>My Activity Updates</h3>

        <p>
          Sign in to view activity updates associated
          with your account.
        </p>

        <SignInButton mode="modal">
          <button type="button">
            Sign in
          </button>
        </SignInButton>
      </section>
    );
  }

  return (
    <section className="my-ticket-updates">
      <h3>My Activity Updates</h3>

      {isLoading ? (
        <p>Loading your updates...</p>
      ) : errorMessage ? (
        <p role="alert">{errorMessage}</p>
      ) : updates.length === 0 ? (
        <p>
          You have not created any ticket updates yet.
        </p>
      ) : (
        <ul>
          {updates.map((update) => (
            <li key={update.id}>
              <p>{update.message}</p>

              <small>
                Ticket #{update.ticketId} ·{" "}
                {new Date(
                  update.createdAt,
                ).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyTicketUpdates;