# TaskOps - Ticket Management System

## Overview

TaskOps is a full-stack ticket management application developed as part of the Full-Stack Development course. The application allows users to manage support tickets through an interactive dashboard, Kanban board, and ticket management system.

The project follows a layered architecture consisting of a React frontend, an Express backend, Prisma ORM, and a PostgreSQL database running inside Docker.

---

## Team Members
- Arshdeep Rishi
- Muse Muse 
- Krupa Patel

## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- React Router

### Backend
- Node.js
- Express
- TypeScript

### Database
- PostgreSQL
- Prisma ORM
- Docker

### Authentication
- Clerk Authentication

---

## Project Structure

```
TaskOps/
│
├── apps/
│   ├── frontend/
│   └── backend/
│
├── prisma/
│
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Local Setup

## Prerequisites

Before running the project, install:

- Node.js (v20 or newer)
- npm
- Docker Desktop
- Git

---

## Clone the Repository

```bash
git clone <repository-url>
cd TaskOps
```

---

## Install Dependencies

Install all workspace dependencies from the project root.

```bash
npm install
```

---

## Environment Variables

### Backend (.env)

Create a `.env` file in the project root containing:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5433/taskops_dev
```

---

### Frontend (.env)

Create a `.env` file inside:

```
apps/frontend/
```

Add the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
```
### Frontend (.env)

Create a `.env` file inside:

```
apps/backend/
```

Add the following variables:

```env
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```
---

## Database Setup

The project uses PostgreSQL running inside Docker.

Start the database:

```bash
docker compose up -d
```

Verify that the container is running:

```bash
docker ps
```

---

## Prisma Setup

After the database has started, apply all database migrations.

```bash
npx prisma migrate dev
```

Generate the Prisma Client.

```bash
npx prisma generate
```

---

## Running the Backend

From the project root:

```bash
npm run dev:backend
```

The backend runs on:

```
http://localhost:3000
```

---

## Running the Frontend

Open another terminal.

From the project root:

```bash
npm run dev:frontend
```

The frontend runs on:

```
http://localhost:5173
```

---

## Running the Complete Application

Open three terminals.

### Terminal 1

```bash
docker compose up -d
```

### Terminal 2

```bash
npm run dev:backend
```

### Terminal 3

```bash
npm run dev:frontend
```

Then open:

```
http://localhost:5173
```

---

## Available Scripts

### Root

```bash
npm install
npm run build
npm run dev:frontend
npm run dev:backend
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run dev
npm run build
npm run start
```

---

## Features

- Ticket Management
- Ticket Details
- Ticket Updates
- Kanban Board
- Shared View Counter
- REST API
- PostgreSQL Database
- Prisma ORM
- Clerk Authentication
- CORS Configuration

---

## Team

Developed as a collaborative Full-Stack Development course project.

# Sprint 1

- Github project, Vercel and Kanban setup: Muse and Arshdeep
- `STYLEGUIDE.md`: Muse
- `README.md`: Arshdeep
- kanban-board component: Muse
- ticket-details component: Arshdeep
- ticket-list component: Krupa
- App.tsx integration: Krupa

---

---

# Sprint 2

- Multi-page Navigation: Krupa
- Naivgation Interfaces: Kurpa and Arshdeep
- Shared state across pages: Muse
- kanban-board feature page and form component: Muse
- ticket-list feature page and form component: Krupa
- ticket-details feature page and form component: Arshdeep

---
---

# Sprint 3

- T.1: Hook Definition(s): Krupa
- T.2: Service Definition(s): Arshdeep
- T.4: Shared-page-state Refactor: Muse
- kanban-task resource, test-data and hooks, services, and repository architecture: Muse
- service, types and repository and custom hooks for ticket-form resource: Krupa
- Refactored the Ticket Details feature to follow the Hook–Service–Repository: Arshdeep

---
---

# Sprint 4

- T.1: Back-end App Initialization: Muse
- T.2: Development SQL Database: Krupa
- T.3: Prisma Installation and Client Initialization: Krupa
- T.4: Back-end CORS Configuration: Arshdeep
- kanban-board backend integration: Muse
- Ticket backend integration: Krupa
- Ticket update backend integration: Arshdeep

---
---

# Sprint 5

- T.1: Clerk Auth Setup: Muse
- T.2: Back-end User Management: Krupa 
- T.3: User Login/Registration: Muse
- T.4: Local Setup Instructions: Arshdeep

---
