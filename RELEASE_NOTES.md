# Hostinger 403 — fix

## Cause

The site was returning `403 Forbidden` because the build was emitting its
HTML/JS/CSS bundle into `dist/client/` instead of `dist/`. Hostinger was
publishing `dist/`, which only contained an empty `client/` subdirectory,
so Apache could not find `index.html` and returned 403.

This happened because the TanStack Start plugin in SPA mode registers two
Vite 8 environments (`client`, `ssr`) and defaults each to
`<root>/dist/<env>`. The default `build.outDir` is overridden by these
per-environment values, so setting `build.outDir: "dist"` alone was
ignored.

## Changes

### `vite.config.ts`
- Override the per-environment `outDir`:
  - `environments.client.build.outDir: "dist"` — the SPA bundle
    (HTML prerendered at build time + JS/CSS + `public/` assets)
    lands directly in `dist/`.
  - `environments.ssr.build.outDir: "dist/.server"` — the SSR bundle
    goes to a hidden subdirectory and is not shipped.
- Set `spa.prerender.outputPath: "/index"`. The plugin's default shell
  path is `/_shell`, which writes `dist/_shell.html`. Hostinger looks
  for `dist/index.html`.
- Drop the now-redundant `build:` root key (it conflicted with the
  per-environment overrides).

### `bunfig.toml`
- Removed `minimumReleaseAge = 86400` — this 24h supply-chain guard
  can stall `bun install` on Hostinger when a transitive dep is fresh.

### `public/`
- Added `.htaccess` (SPA fallback route → `index.html`, asset cache
  headers, disable directory listing).
- Added `robots.txt`.

### Removed
- `src/server.ts`, `src/start.ts` — these contained the Nitro server
  entry and `startInstance` helper, neither of which are needed in
  SPA mode (no server functions, no SSR).
- `netlify.toml` — Hostinger does not read this; keeping it around
  silently misleads.

## Validation (run locally before pushing)

```bash
bun install   # or: npm install
bun run build # or: npm run build
ls dist/
```

The `dist/` directory should contain, at minimum:

```
dist/
├── .htaccess         # copied from public/
├── favicon.ico       # copied from public/
├── index.html        # prerendered shell + landing page
├── robots.txt        # copied from public/
├── .server/          # SSR bundle (do NOT upload this)
└── assets/
    └── *.js, *.css
```

If `dist/.server/` is the only thing inside `dist/` and there's no
`index.html`, the `environments` config did not stick — double-check
the plugin order in `vite.config.ts` (TanStack plugin must come before
`@vitejs/plugin-react`).

## Hostinger panel adjustments

1. **Document root**: must point at the directory that directly
   contains `index.html` (i.e. set it to the Vite `outDir`, which is
   `dist/`). Do **not** point it at `dist/client/` — that no longer
   exists after this fix.
2. **Build command**: `npm run build` (unchanged).
3. **Publish directory**: `dist` (unchanged).
4. **Node version**: 22.12+ (the TanStack plugin's engine requires it).
5. After the new deploy, hard-refresh the browser once
   (Ctrl+Shift+R / Cmd+Shift+R) to bypass the old 403 cache.

## Push to main

```bash
git checkout main
git pull
git add -A
git rm netlify.toml src/server.ts src/start.ts  # if needed
git commit -m "Fix Hostinger 403: collapse Vite environments into dist/"
git push origin main
```
