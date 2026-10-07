# AGENTS.md

Project notes for AI coding agents working in this repository.

## Stack

- TanStack Start in SPA mode (no server bundle, prerenders HTML at build time)
- TanStack Router (file-based routing)
- TanStack Query
- React 19, TypeScript
- Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- shadcn/ui (new-york style, lucide icons)
- ESLint + Prettier

## Deployment target

- Hostinger (Apache). Run `bun run build` (or `npm run build`) then
  upload the contents of `dist/` to `public_html` (or the directory
  configured in the Hostinger panel) via FTP or the File Manager.
- `vite.config.ts` sets `environments.client.build.outDir: "dist"` so
  the SPA bundle (HTML + JS + CSS + assets) lands at the configured
  publish root. `spa.prerender.outputPath` is `/index`, which writes
  `dist/index.html` (the plugin default is `dist/_shell.html`). The
  plugin's `ssr` environment writes to `dist/.server` and is not
  shipped to Hostinger.
- `public/.htaccess` provides SPA fallback (sends unknown routes to
  `index.html`) and long-cache headers for `/assets/*`.

## Troubleshooting a 403 after deploy

1. Confirm the build produced `dist/index.html` (run `ls dist/`).
   **Pitfall:** without the `environments` override in `vite.config.ts`
   the TanStack Start plugin writes to `dist/client/index.html` instead
   of `dist/index.html`. Hostinger then serves an empty directory and
   returns 403.
2. Confirm `dist/.htaccess`, `dist/robots.txt` and `dist/favicon.ico`
   are present (they are copied from `public/`).
3. In Hostinger's panel, set the publish / document root to the
   directory that contains `index.html` (i.e. `dist/` itself, **not**
   `dist/client/`).
4. If the build "completes" but the page is still 403, check the
   Hostinger file manager for the published path — the document root
   in the panel must point at the same directory Vite writes to.
5. If the build fails with a prerender / preview-server timeout: the
   plugin's default SPA shell step starts `vite preview` and fetches it
   over HTTP, which Hostinger's build container can't reach. The
   `inProcessSpaShell` plugin in `vite.config.ts` replaces that step by
   calling the built server bundle's `fetch` directly — keep it.
6. If using `bun install` on Hostinger, see `bunfig.toml` — supply-chain
   guards (`minimumReleaseAge`) can stall installs there.

## Conventions

- The diagnostic page is published at `https://sada.avexmkt.com.br/diagnostico`.
  Hostinger maps that subdomain to `public_html/sada`. After rendering the SPA
  shell, `inProcessSpaShell` copies the client output into `dist/sada`, including
  `.htaccess` and public assets but excluding `.server` and the `sada` directory
  itself. Keep that copy step so automatic GitHub deployments update the subdomain.
  Diagnostic links and canonical metadata use `DIAGNOSTIC_URL` in `src/routes/index.tsx`.

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
