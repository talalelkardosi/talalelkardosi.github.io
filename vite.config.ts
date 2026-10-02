// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target unless disabled below),
//     VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // GitHub Pages serves this portfolio from the domain root.
    base: "/",
  },
  tanstackStart: {
    // Use the server entry for build-time prerendering; only dist/client is published.
    server: { entry: "server" },
    pages: [
      {
        path: "/",
        prerender: { enabled: true, crawlLinks: false },
      },
    ],
    prerender: { enabled: true },
  },
  // TanStack Start's prerender output is static; don't emit a Nitro server.
  nitro: false,
});
