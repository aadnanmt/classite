# Classite

> Digital class, currently built with Astro 6 static site + Turso + Tailwind v4 + Neo-brutalism

## Stack

- **Framework:** Astro 6 (static output)
- **DB:** Turso (libSQL)
- **CSS:** Tailwind CSS v4 + Neo-brutalism tokens (angie-inspired)
- **Font:** Space Grotesk Variable
- **Package manager:** pnpm

## Commands

| Command            | Action                         |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Dev server in `localhost:4321` |
| `pnpm build`       | Build to `./dist/`             |
| `pnpm preview`     | Preview build local            |
| `pnpm format`      | Prettier (write)               |
| `pnpm astro check` | Type check                     |

## Structure

```
src/
  components/
    core/       → BaseHead, Navbar, Footer
    ui/         → BrutalBtn, BrutalCard, Container
    home/       → Landing page components
  db/           → Turso client + schema
  layouts/      → Mainlayout
  lib/          → Utility functions
  pages/        → File-based routing
  styles/       → global.css (Tailwind v4 + design tokens)
public/         → Static assets (favicon, audio)
```

## Deployment

Static output, deploy ke CF Pages / Vercel / Netlify (free tier)

## Environment

Copy `.env.example` to `.env`:

```
TURSO_DB_URL=libsql://[db]-[org].turso.io
TURSO_TOKEN=your-auth-token
```

## License

MIT
