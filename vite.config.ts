// TanStack Start SPA mode with the build output forced into the directory
// Hostinger's static-hosting expects.
//
// Why we configure `environments` explicitly:
//  - The TanStack Start plugin registers two Vite 8 environments:
//      * "client" (type: "client") — the SPA bundle
//      * "server" (type: "server") — the SSR / server-functions bundle
//  - The plugin writes the client to `<root>/dist/client` and the server to
//    `<root>/dist/server` by default. Hostinger publishes whatever sits at
//    the configured document root, so we collapse both into a single
//    `dist/` directory by overriding each environment's `outDir`.
//
// Plugin order matters:
//  - `tanstackStart` must come BEFORE `@vitejs/plugin-react` so the
//    router code-gen runs before JSX transformation.
//  - `tsConfigPaths` runs first so alias `@/...` resolves in all plugins.
//
// Reference: https://github.com/TanStack/router/discussions/5478
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
          // Default shell path is `/_shell` (`dist/_shell.html`). Hostinger
          // serves `index.html`, so write the shell there.
          outputPath: "/index",
        },
      },
    }),
    viteReact(),
  ],
  // Vite 8 environments — override the per-environment outDir so the SPA
  // bundle lands directly in `dist/` (no nested `dist/client/` folder).
  // Hostinger serves the document root, so `dist/index.html` is what gets
  // exposed as `https://avexmkt.com.br/`.
  environments: {
    client: {
      build: {
        outDir: "dist",
        emptyOutDir: true,
        copyPublicDir: true,
      },
    },
    // The "server" environment is created by the plugin. In SPA mode it
    // still emits a server bundle, but Hostinger never serves it. We send
    // it to a hidden subdirectory to keep the deploy artifact clean.
    ssr: {
      build: {
        outDir: "dist/.server",
        emptyOutDir: false,
        copyPublicDir: false,
      },
    },
  },
});
