import type { Ticket } from '../types/Ticket'
import TicketsApiRepository from '../repositories/TicketsApiRepository'
import type { GetToken } from '../lib/authenticatedFetch'

export const TicketsService = {
  async fetchAll(getToken: GetToken): Promise<Ticket[]> {
    return TicketsApiRepository.getAll(getToken)
  },

  async fetchById(id: number, getToken: GetToken): Promise<Ticket | undefined> {
    return TicketsApiRepository.getById(id, getToken)
  },

  async createTicket(data: Omit<Ticket, 'id'>, getToken: GetToken): Promise<Ticket> {
    return TicketsApiRepository.create(data, getToken)
  },

  async updateTicket(
    id: number,
    updates: Partial<Ticket>,
    getToken: GetToken,
  ): Promise<Ticket | undefined> {
    return TicketsApiRepository.update(id, updates, getToken)
  },

  async deleteTicket(id: number, getToken: GetToken): Promise<boolean> {
    return TicketsApiRepository.delete(id, getToken)
  }
}

export default TicketsService
