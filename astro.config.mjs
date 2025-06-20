import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import fs from "fs";
import path from "path";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import db from "@astrojs/db";
import { envField } from "astro/config";

const themePath = path.join(process.cwd(), "src/themes/theme.json");
const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));

export default defineConfig({
  site: "https://brayancodes.com",
  base: "/",
  trailingSlash: "never",
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    isr: {
      expiration: 60 * 60 * 24,
    },
  }),
  prefetch: {
    prefetchAll: true,
  },
  image: {
    domains: ["astro.build"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx(), db()],
  markdown: {
    shikiConfig: {
      theme: theme,
      tailwind: true,
      langs: [
        "typescript",
        "javascript",
        "tsx",
        "jsx",
        "js",
        "css",
        "html",
        "go",
        "json",
        "yaml",
        "markdown",
      ],
      wrap: false,
      transformers: [],
    },
  },
  env: {
    schema: {
      ASTRO_DB_REMOTE_URL: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      ASTRO_DB_APP_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },
});
