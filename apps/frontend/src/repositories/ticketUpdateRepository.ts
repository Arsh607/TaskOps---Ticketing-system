export interface TicketUpdate {
  id: number;
  ticketId: number;
  message: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketUpdateInput {
  ticketId: number;
  message: string;
  createdBy: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({
        error: `Request failed with status ${response.status}.`,
      }));

    throw new Error(
      errorBody.error ??
        `Request failed with status ${response.status}.`,
    );
  }

  return response.json() as Promise<T>;
}

export async function getTicketUpdates(
  ticketId: number,
): Promise<TicketUpdate[]> {
  const response = await fetch(
    `${API_URL}/api/tickets/${ticketId}/updates`,
  );

  return parseResponse<TicketUpdate[]>(response);
}

export async function createTicketUpdate(
  input: CreateTicketUpdateInput,
): Promise<TicketUpdate> {
  const response = await fetch(`${API_URL}/api/ticket-updates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseResponse<TicketUpdate>(response);
}

export async function updateTicketUpdate(
  updateId: number,
  message: string,
): Promise<TicketUpdate> {
  const response = await fetch(
    `${API_URL}/api/ticket-updates/${updateId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    },
  );

  return parseResponse<TicketUpdate>(response);
}

export async function deleteTicketUpdate(
  updateId: number,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/ticket-updates/${updateId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Delete request failed with status ${response.status}.`,
    );
  }
}