# Architecture Notes — Krupa Patel


## `useToggle` (Hook)
1. What it does
   - Keeps track of a simple on/off state for UI (like a menu or modal).
2. Why I put this here
   - Toggling is a UI concern only. Putting it in a hook avoids repeating the same state code in many components.
3. Where it's used
   - `src/components/dashboard/Dashboard.tsx` to open/close the dashboard menu.

## `useFormValidation` (Hook)
1. What it does
   - Manages form error messages and runs simple field validators.
2. Why I put this here
   - Showing validation messages is presentation logic; the hook keeps the form component cleaner.
3. Where it's used
   - `src/components/ticket-form/TicketForm.tsx` to check `title` and `owner` before creating a ticket.

## `TicketsRepository` (Repository)
1. What it does
   - Provides basic CRUD functions (`getAll`, `getById`, `create`, `update`, `delete`) for `Ticket` items.
2. Why I put this here
   - The repository separates how data is stored from the rest of the app. Right now it uses test data in memory so the app can work without a backend.
3. Where it's used
   - `src/services/TicketsService.ts` calls this repository. The app and components use the service instead of talking to the repository directly.

## `TicketsService` (Service)
1. What it does
   - A thin layer that calls the repository. It has methods like `fetchAll`, `createTicket`, and `deleteTicket`.
2. Why I put this here
   - The service is where business rules would go later. For now it keeps a stable API for components and can be extended later.
3. Where it's used
   - `src/App.tsx` uses it to load and modify tickets. `src/components/ticket-form/TicketForm.tsx` uses it to create new tickets.

## Data type and test data
1. Type
   - `src/types/Ticket.ts` defines the `Ticket` type used everywhere.
2. Test data
   - `src/data/ticketsTestData.ts` has 10 sample tickets. The repository imports this as the starting data.

