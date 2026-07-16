import type { Ticket } from '../types/Ticket'
import TicketsApiRepository from '../repositories/TicketsApiRepository'

export const TicketsService = {
  async fetchAll(): Promise<Ticket[]> {
    return TicketsApiRepository.getAll()
  },

  async fetchById(id: number): Promise<Ticket | undefined> {
    return TicketsApiRepository.getById(id)
  },

  async createTicket(data: Omit<Ticket, 'id'>): Promise<Ticket> {
    return TicketsApiRepository.create(data)
  },

  async updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined> {
    return TicketsApiRepository.update(id, updates)
  },

  async deleteTicket(id: number): Promise<boolean> {
    return TicketsApiRepository.delete(id)
  }
}

export default TicketsService
