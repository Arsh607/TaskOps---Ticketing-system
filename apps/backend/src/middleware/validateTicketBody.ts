import type { Request, Response, NextFunction } from 'express'

const requiredFields = ['title', 'status', 'priority', 'owner'] as const

export function validateTicketBody(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const body = request.body

  if (body == null || typeof body !== 'object') {
    response.status(400).json({ message: 'Request body must be an object' })
    return
  }

  for (const field of requiredFields) {
    if (!(field in body) || typeof body[field] !== 'string' || body[field].trim() === '') {
      response.status(400).json({ message: `Field '${field}' is required and must be a non-empty string` })
      return
    }
  }

  next()
}
