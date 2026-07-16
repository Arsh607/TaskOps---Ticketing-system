import type { Request, Response } from 'express'
import { TicketService } from '../services/ticketService.js'

export async function getAllTickets(_request: Request, response: Response) {
  const tickets = await TicketService.getAllTickets()
  response.status(200).json(tickets)
}

export async function getTicketById(request: Request, response: Response) {
  const ticketId = Number(request.params.id)

  const ticket = await TicketService.getTicketById(ticketId)

  if (!ticket) {
    response.status(404).json({ message: 'Ticket not found' })
    return
  }

  response.status(200).json(ticket)
}

export async function createTicket(request: Request, response: Response) {
  const ticketData = request.body

  const created = await TicketService.createTicket(ticketData)
  response.status(201).json(created)
}

export async function updateTicket(request: Request, response: Response) {
  const ticketId = Number(request.params.id)
  const updates = request.body

  const updated = await TicketService.updateTicket(ticketId, updates)

  if (!updated) {
    response.status(404).json({ message: 'Ticket not found' })
    return
  }

  response.status(200).json(updated)
}

export async function deleteTicket(request: Request, response: Response) {
  const ticketId = Number(request.params.id)

  const deleted = await TicketService.deleteTicket(ticketId)

  if (!deleted) {
    response.status(404).json({ message: 'Ticket not found' })
    return
  }

  response.status(204).send()
}
