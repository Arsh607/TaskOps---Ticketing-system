import { Router } from 'express'
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController.js'
import { validateTicketBody } from '../middleware/validateTicketBody.js'
import { validateTicketIdParam } from '../middleware/validateTicketId.js'

const ticketsRouter = Router()

ticketsRouter.get('/', getAllTickets)
 ticketsRouter.get('/:id', validateTicketIdParam, getTicketById)
 ticketsRouter.post('/', validateTicketBody, createTicket)
 ticketsRouter.put('/:id', validateTicketIdParam, validateTicketBody, updateTicket)
 ticketsRouter.delete('/:id', validateTicketIdParam, deleteTicket)

export default ticketsRouter
