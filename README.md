# Todos

A simple todo list app built with Next.js, Prisma, and SQLite.

## Quick Start

```bash
pnpm install
pnpm db:push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 15** - React framework
- **Prisma** - Database ORM
- **SQLite** - File-based database
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Sentry** - Error tracking

## Features

- Add todos
- Mark todos as complete/incomplete
- Delete todos
- Stats showing total, completed, remaining

## Project Structure

```
todos/
├── prisma/
│   └── schema.prisma      # Todo model
├── src/
│   ├── app/
│   │   ├── api/todos/     # CRUD API routes
│   │   └── page.tsx       # Main UI
│   ├── components/ui/     # UI components
│   └── lib/               # Utilities
└── package.json
```

## Sentry Setup

Copy `.env.example` to `.env.local` and fill in your Sentry credentials.
