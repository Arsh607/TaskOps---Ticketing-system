import type { Ticket } from '../types/Ticket'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

function buildUrl(path: string) {
  return `${apiBaseUrl}${path}`
}

export const TicketsApiRepository = {
  async getAll(): Promise<Ticket[]> {
    const response = await fetch(buildUrl('/tickets'))
    if (!response.ok) {
      throw new Error('Failed to load tickets')
    }
    return response.json()
  },

  async getById(id: number): Promise<Ticket | undefined> {
    const response = await fetch(buildUrl(`/tickets/${id}`))
    if (response.status === 404) {
      return undefined
    }
    if (!response.ok) {
      throw new Error('Failed to load ticket')
    }
    return response.json()
  },

  async create(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    const response = await fetch(buildUrl('/tickets'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    })
    if (!response.ok) {
      throw new Error('Failed to create ticket')
    }
    return response.json()
  },

  async update(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined> {
    const response = await fetch(buildUrl(`/tickets/${id}`), {
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

  async delete(id: number): Promise<boolean> {
    const response = await fetch(buildUrl(`/tickets/${id}`), {
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
