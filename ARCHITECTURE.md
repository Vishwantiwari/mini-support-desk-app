# Architecture

## Overview

Mini Support Desk is a small full-stack web app for creating, viewing, updating, commenting on, and deleting support tickets.

- **Frontend**: React (SPA) + React Router + React Query
- **Backend**: FastAPI (Python) + SQLAlchemy + SQLite (local)
- **API style**: REST JSON

The codebase is split into two top-level directories:

- `/frontend` — UI and client-side logic
- `/backend` — API, business logic and persistence

---

## Goals

1. **Clear separation of concerns** (UI / API / data access).
2. **Scalable list operations** (search, filter, sort without fetching everything).
3. **Good UX** (loading/empty/error states + validation).
4. **Maintainable growth path** (easy to add auth, pagination, Postgres, etc.).

## Non-goals (for this assignment scope)

- Authentication/authorization (RBAC)
- Multi-tenant org/account models
- Complex workflow automations and SLAs

---

## High-Level Flow

Frontend calls backend over HTTP:

- Ticket list: search + filters + sort
- Ticket detail: fetch single ticket by id
- Comments: fetch ticket comments, add new comment
- Updates: patch status/priority
- Delete: remove ticket and its comments

React Query caches server state and keeps UI consistent after mutations by invalidating the relevant queries.

---

## Frontend Design

### Key responsibilities

- Route-based pages:
  - Tickets list `/`
  - Create ticket `/create`
  - Ticket detail `/tickets/:id`
- Server state management:
  - **React Query** for fetching/caching/loading/error
- Form handling:
  - Input validation + friendly inline errors
  - Backend validation as the final authority

### Search, filter, sort choice

Implemented **server-side** (with debounced search input on frontend) because it:

- Works for large datasets without loading everything into the browser
- Supports future pagination easily
- Keeps business logic consistent and testable on the backend

---

## Backend Design

### Layered architecture

The backend is split into layers:

1. **API layer (routers/controllers)**

   - Defines endpoints and HTTP semantics (status codes, params)
   - Minimal logic

2. **Service layer**

   - Orchestrates use-cases and business rules
   - Keeps API handlers thin and easier to test

3. **Repository layer (data access)**

   - SQLAlchemy queries only
   - Makes it easy to swap SQLite → Postgres later

4. **Models & Schemas**
   - SQLAlchemy models: persistence structure
   - Pydantic schemas: validation + request/response boundaries

---

## Data Model

### Ticket

Fields:

- `id` (UUID string)
- `title` (5–80 chars)
- `description` (20–2000 chars)
- `status` (`OPEN | IN_PROGRESS | RESOLVED`)
- `priority` (`LOW | MEDIUM | HIGH`)
- `created_at`, `updated_at`

### Comment

Fields:

- `id` (UUID string)
- `ticket_id` (FK to Ticket)
- `author_name`
- `message`
- `created_at`

Delete behavior:

- Deleting a ticket deletes its related comments (either via cascade or explicit delete in repository).

---

## API Surface (Summary)

### Tickets

- `GET /tickets`
  - Query params: `q`, `status`, `priority`, `sort`, `order`, `page`, `limit`
  - Implements server-side search/filter/sort for scalability
- `POST /tickets`
- `GET /tickets/:id`
- `PATCH /tickets/:id` (status/priority updates)
- `DELETE /tickets/:id` (optional feature; implemented)

### Comments

- `GET /tickets/:id/comments`
- `POST /tickets/:id/comments`

---

## Validation & Error Handling

### Backend validation

- Enforced via Pydantic schemas + enum constraints
- Returns consistent HTTP errors:
  - `400` validation errors
  - `404` not found
  - `500` unexpected server errors

### Frontend validation & UX

- Forms validate before submit (length, required fields)
- User-friendly error messages shown inline
- Loading and empty states handled for each page
- Mutations show “Updating…” / “Deleting…” and errors without breaking navigation

---

## Scalability Considerations

### List growth

- Server-side search/filter/sort avoids loading all tickets
- Debounced search reduces API spam
- Pagination is supported by API params and can be surfaced in UI later

### Database evolution

- SQLite for local simplicity
- Postgres swap is straightforward because:
  - SQLAlchemy abstracts DB operations
  - repository layer isolates query logic

### Potential production improvements

- Indexes on: `status`, `priority`, `created_at`, and full-text search for `title/description`
- Add cursor pagination for large datasets
- Rate limiting and request logging
- Auth (JWT) + role permissions for ticket actions

---

## Deployment Notes

- CORS configured for frontend origin in production.
- Environment-driven configuration recommended:
  - Backend base URL consumed by frontend
  - Separate dev/prod settings

---

## Tradeoffs

- **No auth** to keep assignment scope small and focused
- **No UI pagination** currently, but API design supports it
- **Server-side search** chosen over client-side for scalability and cleaner architecture

---
