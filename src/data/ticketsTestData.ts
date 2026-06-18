import type { Ticket } from '../types/Ticket'

export const ticketsTestData: Ticket[] = [
  { id: 1, title: 'User cannot access dashboard', status: 'Open', priority: 'High', owner: 'Aashish' },
  { id: 2, title: 'Email notification not sending', status: 'In Progress', priority: 'Medium', owner: 'Team Ops' },
  { id: 3, title: 'Add search filter to ticket list', status: 'Planned', priority: 'Low', owner: 'Dev Squad' },
  { id: 4, title: 'Fix header responsive layout', status: 'Open', priority: 'Low', owner: 'UI Team' },
  { id: 5, title: 'Implement authentication flow', status: 'In Progress', priority: 'High', owner: 'Auth Team' },
  { id: 6, title: 'Improve error handling on forms', status: 'Planned', priority: 'Medium', owner: 'QA' },
  { id: 7, title: 'Add unit tests for TicketForm', status: 'Planned', priority: 'Low', owner: 'Dev Squad' },
  { id: 8, title: 'Database schema for tickets', status: 'Open', priority: 'High', owner: 'DBA' },
  { id: 9, title: 'Optimize bundle size', status: 'In Progress', priority: 'Medium', owner: 'Frontend' },
  { id: 10, title: 'Accessibility audit', status: 'Planned', priority: 'High', owner: 'Accessibility' },
]

export default ticketsTestData
