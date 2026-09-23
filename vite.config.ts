// TanStack Start in SPA mode for static-hosting deployment (Hostinger).
// Build emits HTML+JS+CSS in `dist/` and the server bundle is skipped.
// Plugin order matters: TanStack Router must come before @vitejs/plugin-react
// so the router can process `.tsx` route files before JSX transformation.
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
      // Keep the auto-generated route tree in sync with src/routes/*.tsx.
      target: "react",
      autoCodeSplitting: true,
    }),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
        },
      },
    }),
    viteReact(),
  ],
});
