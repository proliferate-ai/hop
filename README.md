# Todos

A simple todo list app for demoing AI coding agents.

## Purpose

This is a minimal, self-contained app designed for testing and demoing AI coding agents that fix bugs. It's intentionally simple so:

- **Anyone can understand it** - It's a todo list, not a complex system
- **Easy to introduce bugs** - Simple codebase, obvious places to break things
- **Single page** - No navigation, everything visible at once
- **Sentry integrated** - Errors get reported, triggering the AI fix flow

## Demo Flow

1. Introduce a bug (e.g., break the "complete" toggle)
2. Use the app → error fires → Sentry catches it
3. AI agent receives the error, finds the bug, fixes it
4. Show the fix working

## Quick Start

```bash
pnpm install
pnpm db:push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sentry Setup

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SENTRY_DSN` - From Sentry project settings
- `SENTRY_ORG` - Your org slug
- `SENTRY_PROJECT` - Project name

## Stack

- Next.js 15
- Prisma + SQLite (no external DB needed)
- Tailwind + shadcn/ui
- Sentry for error tracking

## Easy Bugs to Plant

| Bug | File | What to break |
|-----|------|---------------|
| Complete doesn't toggle | `src/app/api/todos/[id]/route.ts` | Remove `completed` from update |
| Count is wrong | `src/app/page.tsx` | Off-by-one in filter |
| Delete fails | `src/app/api/todos/[id]/route.ts` | Use wrong variable |
| New todo doesn't appear | `src/app/page.tsx` | Skip the refetch |
