export type CurrentAppUser = {
  id: number;
  clerkUserId: string;
  createdAt: string;
  updatedAt: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function syncCurrentUser(sessionToken: string): Promise<CurrentAppUser> {
  const response = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to sync user: ${response.status}`);
  }

  return response.json() as Promise<CurrentAppUser>;
}
