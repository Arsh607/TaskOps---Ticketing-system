import type { Ticket } from '../types/Ticket'
import {
  authenticatedFetch,
  type GetToken,
} from '../lib/authenticatedFetch'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

function buildUrl(path: string) {
  return `${apiBaseUrl}${path}`
}

export const TicketsApiRepository = {
  async getAll(getToken: GetToken): Promise<Ticket[]> {
    const response = await authenticatedFetch(buildUrl('/tickets'), getToken)
    if (!response.ok) {
      throw new Error('Failed to load tickets')
    }
    return response.json()
  },

  async getById(id: number, getToken: GetToken): Promise<Ticket | undefined> {
    const response = await authenticatedFetch(buildUrl(`/tickets/${id}`), getToken)
    if (response.status === 404) {
      return undefined
    }
    if (!response.ok) {
      throw new Error('Failed to load ticket')
    }
    return response.json()
  },

  async create(ticket: Omit<Ticket, 'id'>, getToken: GetToken): Promise<Ticket> {
    const response = await authenticatedFetch(buildUrl('/tickets'), getToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    })
    if (!response.ok) {
      throw new Error('Failed to create ticket')
    }
    return response.json()
  },

  async update(
    id: number,
    updates: Partial<Ticket>,
    getToken: GetToken,
  ): Promise<Ticket | undefined> {
    const response = await authenticatedFetch(buildUrl(`/tickets/${id}`), getToken, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (response.status === 404) {
      return undefined
    }
    if (!response.ok) {
      throw new Error('Failed to update ticket')
    }
    return response.json()
  },

  async delete(id: number, getToken: GetToken): Promise<boolean> {
    const response = await authenticatedFetch(buildUrl(`/tickets/${id}`), getToken, {
      method: 'DELETE',
    })
    if (response.status === 404) {
      return false
    }
    if (!response.ok) {
      throw new Error('Failed to delete ticket')
    }
    return true
  },
}

export default TicketsApiRepository
