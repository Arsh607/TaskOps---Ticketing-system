import { prisma } from '../lib/prisma.js'

type TicketPayload = {
  title: string
  status: string
  priority: string
  owner: string
}

export const TicketService = {
  async getAllTickets() {
    return prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        owner: true,
      },
    })
  },

  async getTicketById(id: number) {
    return prisma.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        owner: true,
      },
    })
  },

  async createTicket(data: TicketPayload) {
    return prisma.ticket.create({
      data,
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        owner: true,
      },
    })
  },

  async updateTicket(id: number, updates: Partial<TicketPayload>) {
    try {
      return prisma.ticket.update({
        where: { id },
        data: updates,
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          owner: true,
        },
      })
    } catch {
      return null
    }
  },

  async deleteTicket(id: number) {
    try {
      await prisma.ticket.delete({ where: { id } })
      return true
    } catch {
      return false
    }
  },
}
