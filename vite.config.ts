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
import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig, type Plugin, type ViteBuilder } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// The project lives under a folder whose name contains `|`. TanStack Start
// builds a RegExp from the absolute path of `routeTree.gen.ts` without
// escaping, so `|` is treated as regex OR and the route-tree `load()` hook
// hijacks every module in this tree (CSS, routes, the lot).
function escapeStartRouteTreeFilter(): Plugin {
  const escapeRe = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return {
    name: "escape-start-route-tree-filter",
    configResolved(config) {
      for (const plugin of config.plugins) {
        if (plugin.name !== "tanstack-start:route-tree-client-plugin") continue;
        const load = plugin.load as
          { filter?: { id?: { include?: RegExp | RegExp[] } } } | undefined;
        const include = load?.filter?.id?.include;
        if (!include) continue;
        const patch = (re: RegExp) => new RegExp(escapeRe(re.source), re.flags);
        if (include instanceof RegExp) {
          load.filter!.id!.include = patch(include);
        } else if (Array.isArray(include)) {
          load.filter!.id!.include = include.map((re) => (re instanceof RegExp ? patch(re) : re));
        }
      }
    },
  };
}

// TanStack Start's SPA mode renders `index.html` by starting a temporary
// `vite preview` server and fetching it over HTTP. Hostinger's build
// container can't reach that server (the request times out), so the build
// fails. We replace that step: import the freshly built server bundle and
// call its `fetch` handler in-process — same HTML, no network involved.
function inProcessSpaShell(): Plugin {
  const SHELL_HEADER = "X-TSS_SHELL"; // HEADERS.TSS_SHELL in start-server-core

  async function renderShell(builder: ViteBuilder) {
    const client = builder.environments.client;
    const server = builder.environments.ssr;
    if (!client || !server) throw new Error("[spa-shell] client/ssr environment missing");

    const root = builder.config.root;
    const clientOut = path.resolve(root, client.config.build.outDir);
    const serverEntry = path.resolve(root, server.config.build.outDir, "server.js");

    process.env.TSS_PRERENDERING = "true";
    process.env.TSS_CLIENT_OUTPUT_DIR = clientOut;
    const { default: handler } = await import(pathToFileURL(serverEntry).href);
    const res: Response = await handler.fetch(
      new Request("http://localhost/", { headers: { [SHELL_HEADER]: "true" } }),
    );
    if (!res.ok) throw new Error(`[spa-shell] render failed: ${res.status} ${res.statusText}`);

    await writeFile(path.join(clientOut, "index.html"), await res.text());
    builder.config.logger.info("[spa-shell] wrote index.html (in-process, no preview server)");

    // Hostinger maps sada.avexmkt.com.br to public_html/sada. Include its
    // SPA shell and public assets in every GitHub deployment as well.
    const subdomainOut = path.join(clientOut, "sada");
    await mkdir(subdomainOut, { recursive: true });
    const entries = await readdir(clientOut);
    for (const entry of entries) {
      if (entry === "sada" || entry === ".server" || entry.startsWith("._")) continue;
      await cp(path.join(clientOut, entry), path.join(subdomainOut, entry), { recursive: true });
    }
    builder.config.logger.info("[sada] wrote subdomain shell and public assets");
  }

  return {
    name: "in-process-spa-shell",
    configResolved(config) {
      const postBuild = config.plugins.find((p) => p.name === "tanstack-start-core:post-build");
      const hook = postBuild?.buildApp;
      if (!hook || typeof hook !== "object") {
        throw new Error("[spa-shell] tanstack-start-core:post-build hook not found");
      }
      hook.handler = renderShell;
    },
  };
}

export default defineConfig({
  plugins: [
    escapeStartRouteTreeFilter(),
    inProcessSpaShell(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
      skip: (dir) => dir === "node_modules-backup",
    }),
    tailwindcss(),
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
