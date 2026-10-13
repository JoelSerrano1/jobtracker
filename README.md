# JobTracker — full-stack demo (React + Node/Express + MongoDB)

A small CRUD app to track job applications. Built to demonstrate the exact stack
MVST wants (JavaScript/TypeScript, React, Node.js, Express, MongoDB) with clean,
readable code and a working end-to-end flow.

## Stack

- **Frontend:** React (Vite), plain CSS, no UI framework
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB via Mongoose (local or Atlas free tier)

## Run it

Prerequisites: Node.js 18+ and a MongoDB instance (either local or Atlas).

1. **Backend**

   ```bash
   cd server
   cp .env.example .env       # set MONGO_URI (see comments inside)
   npm install
   npm run seed               # optional: sample rows
   npm run dev                # http://localhost:5000
   ```

2. **Frontend** (in a second terminal)

   ```bash
   cd client
   npm install
   npm run dev                # http://localhost:5173
   ```

Open http://localhost:5173. The dev server proxies `/api` to the backend.

### MongoDB options

- **Local:** install MongoDB Community, leave `MONGO_URI` at
  `mongodb://localhost:27017/jobtracker`.
- **Atlas (free):** create a free cluster at https://www.mongodb.com/atlas,
  create a database user, whitelist your IP in Network Access, then use the
  connection string as `MONGO_URI`.

## API

| Method | Path                    | Body                          |
|--------|-------------------------|-------------------------------|
| GET    | /api/applications       | optional `?status=` filter    |
| GET    | /api/applications/:id   |                               |
| POST   | /api/applications       | `{company, role, url, status, notes}` |
| PATCH  | /api/applications/:id   | any subset of the fields      |
| DELETE | /api/applications/:id   |                               |

Statuses: `looking | applied | interview | offer | rejected`.

## Ideas to extend (for interviews)

- Validation + error handling on the server
- Edit-notes inline in the UI
- Search box plus the status filter
- Tests (Vitest + supertest)
- Deploy the API to Render/Railway and the frontend to Netlify/Vercel