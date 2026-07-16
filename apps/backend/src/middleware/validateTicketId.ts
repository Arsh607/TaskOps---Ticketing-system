import type { Request, Response, NextFunction } from 'express'

export function validateTicketIdParam(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = Number(request.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    response.status(400).json({ message: 'Invalid ticket id parameter' })
    return
  }

  next()
}
