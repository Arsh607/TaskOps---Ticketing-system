import type { Ticket } from '../types/Ticket'
import TicketsRepository from '../repositories/TicketsRepository'

export const TicketsService = {
  async fetchAll(): Promise<Ticket[]> {
    return TicketsRepository.getAll()
  },

  async fetchById(id: number): Promise<Ticket | undefined> {
    return TicketsRepository.getById(id)
  },

  async createTicket(data: Omit<Ticket, 'id'>): Promise<Ticket> {
    // minimal business logic could live here later
    return TicketsRepository.create(data)
  },

  async updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined> {
    return TicketsRepository.update(id, updates)
  },

  async deleteTicket(id: number): Promise<boolean> {
    return TicketsRepository.delete(id)
  }
}

export default TicketsService
