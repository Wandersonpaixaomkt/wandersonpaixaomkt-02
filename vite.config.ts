// TanStack Start build for Netlify.
// Plugin order matters — see https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    viteReact(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      // Nitro builds from this entry.
      server: { entry: "server" },
    }),
    netlify(),
  ],
});
