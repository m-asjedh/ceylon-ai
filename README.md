# Ceylon AI

Sri Lanka's AI chat assistant — Next.js frontend + NestJS backend.

```
ceylon-ai/
├── frontend/   # Next.js app (port 3000) — deploy to Vercel
└── backend/    # NestJS API (port 3001) — deploy to Railway
```

## Prerequisites

- Node.js 20+
- [OpenRouter](https://openrouter.ai/) API key (free models available)
- [Neon](https://neon.tech/) PostgreSQL database

## Quick start

**Backend:**

```bash
cd backend
cp .env.example .env
# Edit .env — DATABASE_URL, JWT_SECRET, OPENROUTER_API_KEY

npm install
npm run db:migrate
npm run dev
```

**Frontend** (separate terminal):

```bash
cd frontend
cp .env.example .env

npm install
npm run dev
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:3001 |

## Deploy

**Vercel (frontend)** — set **Root Directory** to `frontend`. Add env:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Your Railway backend URL |

**Railway (backend)** — set **Root Directory** to `backend`. Add env vars from `backend/.env.example`. Set `FRONTEND_URL` to your Vercel URL.

## Environment variables

**Backend** (`backend/.env`):

| Variable | Example |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `JWT_SECRET` | Random secret string |
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `OPENROUTER_MODEL` | `openrouter/free` (default) |
| `PORT` | `3001` |
| `FRONTEND_URL` | `http://localhost:3000` |

**Frontend** (`frontend/.env`):

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` |
| `PORT` | `3000` |

Get an OpenRouter API key at [openrouter.ai/keys](https://openrouter.ai/keys).

## Scripts

Run from each package directory (`cd frontend` or `cd backend`):

| Package | Command | Description |
|---------|---------|-------------|
| frontend | `npm run dev` | Start Next.js |
| frontend | `npm run build` | Production build |
| backend | `npm run dev` | Start NestJS |
| backend | `npm run build` | Build API |
| backend | `npm run db:migrate` | Run Prisma migrations |

## API endpoints

| Method | Route | Auth |
|--------|-------|------|
| POST | `/auth/signup` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | JWT |
| POST | `/chat` | JWT |
| GET | `/chat` | JWT |
| GET | `/chat/:id` | JWT |
| POST | `/chat/:id/message` | JWT |
| DELETE | `/chat/:id` | JWT |

## Port conflicts

Frontend must use **3000**, backend **3001**. If 3000 is busy, Next.js may grab 3001 and conflict with the API.

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
cd frontend && npm run dev   # terminal 1
cd backend && npm run dev    # terminal 2
```

## Demo mode

If the backend is unavailable, the chat UI falls back to mock data so you can preview the interface.
