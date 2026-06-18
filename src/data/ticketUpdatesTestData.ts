import type { TicketUpdate } from "../types/TicketUpdate";

export const ticketUpdatesTestData: TicketUpdate[] = [
  {
    id: 1,
    ticketId: "TKT-1042",
    message: "User confirmed the issue happens after login.",
    createdBy: "Arshdeep",
    createdAt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: 2,
    ticketId: "TKT-1042",
    message: "Support team checked browser console.",
    createdBy: "Support Team",
    createdAt: "2026-06-01T10:30:00.000Z",
  },
  {
    id: 3,
    ticketId: "TKT-1042",
    message: "Issue assigned to Application Support.",
    createdBy: "Muse",
    createdAt: "2026-06-01T11:00:00.000Z",
  },
  {
    id: 4,
    ticketId: "TKT-1042",
    message: "Dashboard route tested locally.",
    createdBy: "Krupa",
    createdAt: "2026-06-01T11:30:00.000Z",
  },
  {
    id: 5,
    ticketId: "TKT-1042",
    message: "Issue appears after refreshing the page.",
    createdBy: "Arshdeep",
    createdAt: "2026-06-01T12:00:00.000Z",
  },
  {
    id: 6,
    ticketId: "TKT-2045",
    message: "Kanban board does not save new tasks.",
    createdBy: "Support Team",
    createdAt: "2026-06-02T09:00:00.000Z",
  },
  {
    id: 7,
    ticketId: "TKT-2045",
    message: "Task addition works but resets after reload.",
    createdBy: "Muse",
    createdAt: "2026-06-02T09:45:00.000Z",
  },
  {
    id: 8,
    ticketId: "TKT-3001",
    message: "New ticket form reviewed for accessibility.",
    createdBy: "Krupa",
    createdAt: "2026-06-03T13:00:00.000Z",
  },
  {
    id: 9,
    ticketId: "TKT-3001",
    message: "Form labels checked with Axe DevTools.",
    createdBy: "Arshdeep",
    createdAt: "2026-06-03T13:30:00.000Z",
  },
  {
    id: 10,
    ticketId: "TKT-4002",
    message: "Assignment group data will be connected later.",
    createdBy: "Support Team",
    createdAt: "2026-06-04T15:00:00.000Z",
  },
];