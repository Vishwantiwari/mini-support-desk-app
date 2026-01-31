# Mini Support Desk

A small full-stack web app to create, view, update, comment on, and delete support tickets.

## Live Demo

- Frontend: https://mini-support-desk-app.vercel.app/
- Backend: https://mini-support-desk-app.onrender.com/docs

---

## Features (Requirement Coverage)

### Tickets List

- Displays: **title, status, priority, created date**
- **Search** by title/description _(server-side, debounced for scalability)_
- **Filter** by status and priority
- **Sort** by created date _(newest/oldest)_

### Ticket Details

- Full ticket view: **title, description, status, priority, createdAt, updatedAt**
- View comments (with timestamps)
- Add comment (validation + user-friendly errors)
- Update status/priority (loading + error states)
- Delete ticket _(optional feature implemented)_

### Create Ticket

- Create form: title, description, priority
- Validation + clean UX + friendly error messages

---

## Tech Stack

### Frontend

- React
- React Router
- React Query
- react-hook-form
- Custom dark UI styling (CSS tokens)

### Backend

- FastAPI (Python)
- SQLAlchemy
- SQLite (local dev)

---

## Repository Structure

/frontend
/backend
README.md
ARCHITECTURE.md

---

## Local Setup (Run Locally)

### 1) Backend (FastAPI)

cd backend
python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000

Backend runs at:

http://127.0.0.1:8000

Seed Data (optional but recommended)
cd backend
source .venv/bin/activate
python -m app.seed

---

### 2) Frontend (React)

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
