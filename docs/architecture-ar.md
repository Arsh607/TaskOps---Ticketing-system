# Architecture Notes - ASR

## Resource: Ticket Updates

This document explains the hook, service, and repository implementations created for the Ticket Updates feature in TaskOps.

## Hook: useTicketUpdates

### What does this hook do?
`useTicketUpdates` manages presentation state for ticket activity updates. It stores the update list, the current form input, and validation error messages.

### How does it separate concerns?
The hook only manages React state and presentation-related behavior. It does not directly access test data and does not contain business rules like sorting or validation. Those responsibilities are handled by the service.

### Where is it used?
The hook is used in `TicketDetails.tsx` to display, add, and remove ticket updates. It is also used in `RecentTicketUpdates.tsx` to display recent activity updates.

## Service: ticketUpdateService

### What does this service do?
The `ticketUpdateService` handles business logic for ticket updates. It validates update messages, creates new update records, sorts updates, and coordinates removal.

### How does it separate concerns?
Business rules are kept out of components and hooks. This keeps UI code focused on rendering and state, while the service handles application rules.

### Where is it used?
The service is used by `useTicketUpdates.ts`. The hook calls the service whenever updates are loaded, added, or removed.

## Repository: ticketUpdateRepository

### What does this repository do?
The `ticketUpdateRepository` handles data access for ticket updates. It provides CRUD methods for reading, creating, updating, and deleting ticket update records.

### How does it separate concerns?
The repository only manages data access. It currently imports test data from `ticketUpdatesTestData`, but later this can be replaced with backend API calls.

### Where is it used?
The repository is used by `ticketUpdateService.ts`, which calls repository methods when ticket update data needs to be read or changed.