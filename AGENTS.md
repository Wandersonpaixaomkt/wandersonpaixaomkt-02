# AGENTS.md

Project notes for AI coding agents working in this repository.

## Stack

- TanStack Start + TanStack Router + TanStack Query
- React 19, TypeScript
- Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- shadcn/ui (new-york style, lucide icons)
- ESLint + Prettier
- Nitro server (target: netlify)

## Conventions

- Components live in `src/components/`; shadcn primitives in `src/components/ui/`.
- Utility helpers in `src/lib/`, hooks in `src/hooks/`.
- Routes in `src/routes/`, generated tree in `src/routeTree.gen.ts` (do not edit by hand).
- Brand colors and design tokens are defined in `src/styles.css`.

## Commands

- `bun install` / `npm install` — install deps
- `bun run dev` / `npm run dev` — start the dev server
- `bun run build` / `npm run build` — production build
- `bun run lint` / `npm run lint` — eslint
- `bun run format` / `npm run format` — prettier
