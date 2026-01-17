# Hop

A simple link shortener built with Next.js, Prisma, and SQLite.

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

## Features

- Create short links with custom or auto-generated slugs
- Click tracking and analytics
- Copy short URLs to clipboard
- Delete links

## Project Structure

```
hop/
├── prisma/
│   └── schema.prisma    # Database schema
├── src/
│   ├── app/
│   │   ├── api/links/   # CRUD API routes
│   │   ├── [slug]/      # Redirect handler
│   │   └── page.tsx     # Dashboard
│   ├── components/ui/   # UI components
│   └── lib/             # Utilities
└── package.json
```
