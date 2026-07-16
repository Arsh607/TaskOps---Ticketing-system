import type { Ticket } from '../types/Ticket'
import { ticketsTestData } from '../data/ticketsTestData'

// In-memory copy of test data to simulate a backend resource
let ticketsStore: Ticket[] = [...ticketsTestData]

export const TicketsRepository = {
  async getAll(): Promise<Ticket[]> {
    // simulate async
    return Promise.resolve([...ticketsStore])
  },

  async getById(id: number): Promise<Ticket | undefined> {
    const found = ticketsStore.find((t) => t.id === id)
    return Promise.resolve(found)
  },

  async create(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    const newId = Math.max(0, ...ticketsStore.map((t) => t.id)) + 1
    const newTicket: Ticket = { id: newId, ...ticket }
    ticketsStore.push(newTicket)
    return Promise.resolve(newTicket)
  },

  async update(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined> {
    const index = ticketsStore.findIndex((t) => t.id === id)
    if (index === -1) return Promise.resolve(undefined)
    ticketsStore[index] = { ...ticketsStore[index], ...updates }
    return Promise.resolve(ticketsStore[index])
  },

  async delete(id: number): Promise<boolean> {
    const before = ticketsStore.length
    ticketsStore = ticketsStore.filter((t) => t.id !== id)
    return Promise.resolve(ticketsStore.length < before)
  },

  // Utility for tests or reset
  _resetStore() {
    ticketsStore = [...ticketsTestData]
  }
}

export default TicketsRepository
