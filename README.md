# Ceylon AI

Sri Lanka's AI chat assistant — monorepo with Next.js frontend and NestJS backend.

```
ceylon-ai/
├── frontend/   # Next.js app (port 3000)
├── backend/    # NestJS API (port 3001)
└── package.json
```

## Prerequisites

- Node.js 20+
- [OpenRouter](https://openrouter.ai/) API key (free models available)
- [Neon](https://neon.tech/) PostgreSQL database

## Quick start

From the **repo root**:

```bash
npm install

# Backend env
cp backend/.env.example backend/.env
# Edit backend/.env — DATABASE_URL, JWT_SECRET, OPENROUTER_API_KEY

# Frontend env
cp frontend/.env.example frontend/.env

# Database
npm run db:migrate

# Run both servers
npm run dev
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:3001 |

### Run separately

```bash
npm run dev:backend   # API only
npm run dev:frontend  # UI only
```

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

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run build` | Build both packages |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:generate` | Generate Prisma client |

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
npm run dev
```

## Demo mode

If the backend is unavailable, the chat UI falls back to mock data so you can preview the interface.
